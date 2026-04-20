package main

import (
	"encoding/json"
	"fmt"
	"net"
	"regexp"
	"strings"
	"time"
)

type FilterCondition struct {
	Field    string `json:"field"`
	Operator string `json:"operator"`
	Value    string `json:"value"`
}

type WhitelistItem struct {
	CIDR        string `json:"cidr"`
	Description string `json:"description"`
	Enabled     bool   `json:"enabled"`
}

type FilterEngine struct {
	policy *FilterPolicy
	parser *LogParser
}

func NewFilterEngine(policy *FilterPolicy) (*FilterEngine, error) {
	engine := &FilterEngine{
		policy: policy,
	}
	
	if policy.ParseTemplateID > 0 {
		template, err := GetParseTemplateByID(policy.ParseTemplateID)
		if err != nil {
			return nil, fmt.Errorf("failed to get parse template: %v", err)
		}
		
		parser, err := NewLogParser(template)
		if err != nil {
			return nil, fmt.Errorf("failed to create parser: %v", err)
		}
		engine.parser = parser
	}
	
	return engine, nil
}

func (e *FilterEngine) Match(log *SyslogLog) (bool, map[string]interface{}, error) {
	var parsedData map[string]interface{}
	var err error
	
	if e.parser != nil {
		parsedData, err = e.parser.Parse(log.RawMessage)
		if err != nil {
			return false, nil, err
		}
	} else {
		if log.ParsedData != "" {
			if err := json.Unmarshal([]byte(log.ParsedData), &parsedData); err != nil {
				parsedData = make(map[string]interface{})
			}
		} else {
			parsedData = make(map[string]interface{})
		}
	}
	
	// 先检查白名单
	if e.policy.Whitelist != "" && e.policy.WhitelistField != "" {
		matched, err := e.matchWhitelist(parsedData)
		if err != nil {
			return false, nil, err
		}
		// 如果匹配白名单，直接返回false（不推送告警）
		if matched {
			return false, parsedData, nil
		}
	}
	
	if e.policy.Conditions == "" {
		return true, parsedData, nil
	}
	
	var conditions []FilterCondition
	if err := json.Unmarshal([]byte(e.policy.Conditions), &conditions); err != nil {
		return false, nil, fmt.Errorf("invalid conditions: %v", err)
	}
	
	matched := e.evaluateConditions(conditions, parsedData, e.policy.ConditionLogic)
	
	return matched, parsedData, nil
}

func (e *FilterEngine) matchWhitelist(data map[string]interface{}) (bool, error) {
	var whitelist []WhitelistItem
	if err := json.Unmarshal([]byte(e.policy.Whitelist), &whitelist); err != nil {
		return false, fmt.Errorf("invalid whitelist: %v", err)
	}
	
	// 获取字段值
	value, exists := data[e.policy.WhitelistField]
	if !exists {
		return false, nil
	}
	
	ipStr := fmt.Sprintf("%v", value)
	
	for _, item := range whitelist {
		if !item.Enabled {
			continue
		}
		
		if e.matchCIDR(ipStr, item.CIDR) {
			return true, nil
		}
	}
	
	return false, nil
}

func (e *FilterEngine) matchCIDR(ipStr, cidr string) bool {
	// 如果是单个IP
	if !strings.Contains(cidr, "/") {
		return ipStr == cidr
	}
	
	// 解析CIDR
	_, ipNet, err := net.ParseCIDR(cidr)
	if err != nil {
		return false
	}
	
	// 解析IP
	ip := net.ParseIP(ipStr)
	if ip == nil {
		return false
	}
	
	return ipNet.Contains(ip)
}

func (e *FilterEngine) evaluateConditions(conditions []FilterCondition, data map[string]interface{}, logic string) bool {
	if len(conditions) == 0 {
		return true
	}
	
	results := make([]bool, len(conditions))
	for i, cond := range conditions {
		results[i] = e.evaluateCondition(cond, data)
	}
	
	if logic == "OR" {
		for _, r := range results {
			if r {
				return true
			}
		}
		return false
	}
	
	for _, r := range results {
		if !r {
			return false
		}
	}
	return true
}

func (e *FilterEngine) evaluateCondition(cond FilterCondition, data map[string]interface{}) bool {
	value, exists := data[cond.Field]
	if !exists {
		return cond.Operator == "not_exists"
	}
	
	strValue := fmt.Sprintf("%v", value)
	
	switch cond.Operator {
	case "equals", "==":
		return strValue == cond.Value
	case "not_equals", "!=":
		return strValue != cond.Value
	case "contains":
		return strings.Contains(strValue, cond.Value)
	case "not_contains":
		return !strings.Contains(strValue, cond.Value)
	case "in":
		values := strings.Split(cond.Value, ",")
		for _, v := range values {
			if strings.TrimSpace(v) == strValue {
				return true
			}
		}
		return false
	case "not_in":
		values := strings.Split(cond.Value, ",")
		for _, v := range values {
			if strings.TrimSpace(v) == strValue {
				return false
			}
		}
		return true
	case "starts_with":
		return strings.HasPrefix(strValue, cond.Value)
	case "ends_with":
		return strings.HasSuffix(strValue, cond.Value)
	case "regex", "=~":
		matched, _ := regexp.MatchString(cond.Value, strValue)
		return matched
	case "not_regex", "!~":
		matched, _ := regexp.MatchString(cond.Value, strValue)
		return !matched
	case "exists":
		return exists
	case "not_exists":
		return !exists
	case "gt", ">":
		return compareNumbers(strValue, cond.Value) > 0
	case "gte", ">=":
		return compareNumbers(strValue, cond.Value) >= 0
	case "lt", "<":
		return compareNumbers(strValue, cond.Value) < 0
	case "lte", "<=":
		return compareNumbers(strValue, cond.Value) <= 0
	default:
		return false
	}
}

func compareNumbers(a, b string) int {
	var aNum, bNum float64
	_, err1 := fmt.Sscanf(a, "%f", &aNum)
	_, err2 := fmt.Sscanf(b, "%f", &bNum)
	
	if err1 != nil || err2 != nil {
		return strings.Compare(a, b)
	}
	
	if aNum > bNum {
		return 1
	} else if aNum < bNum {
		return -1
	}
	return 0
}

func ProcessLogWithPolicies(log *SyslogLog, device *Device) (*FilterPolicy, map[string]interface{}, error) {
	var policies []FilterPolicy
	
	if device != nil && device.ID > 0 {
		policies = GetFilterPoliciesByDeviceID(device.ID)
		if len(policies) == 0 && device.GroupID > 0 {
			policies = GetFilterPoliciesByDeviceGroupID(device.GroupID)
		}
	}
	
	if len(policies) == 0 {
		policies = GetFilterPolicies()
	}
	
	for _, policy := range policies {
		if !policy.IsActive {
			continue
		}
		
		engine, err := NewFilterEngine(&policy)
		if err != nil {
			continue
		}
		
		matched, parsedData, err := engine.Match(log)
		if err != nil {
			continue
		}
		
		if matched {
			if policy.Action == "keep" {
				return &policy, parsedData, nil
			} else {
				return nil, nil, fmt.Errorf("discarded by policy: %s", policy.Name)
			}
		}
	}
	
	return nil, nil, nil
}

func ExtractKeyFields(data map[string]interface{}) string {
	keyFields := make(map[string]interface{})
	
	fieldNames := []string{
		"attackIp", "victimIp", "threatType", "attack_result", "result",
		"levelDesc", "description", "dealStatus", "threatSource",
		"timestamp", "localTimestamp", "machineName",
	}
	
	for _, name := range fieldNames {
		if value, exists := data[name]; exists {
			keyFields[name] = value
		}
	}
	
	if len(keyFields) == 0 {
		return ""
	}
	
	jsonBytes, _ := json.Marshal(keyFields)
	return string(jsonBytes)
}

func FormatAlertTime(data map[string]interface{}) string {
	if ts, ok := data["localTimestamp"]; ok {
		if milli, ok := ts.(float64); ok {
			if milli > 1e12 {
				return time.UnixMilli(int64(milli)).Format("2006-01-02 15:04:05")
			}
			return time.Unix(int64(milli), 0).Format("2006-01-02 15:04:05")
		}
	}
	
	if ts, ok := data["timestamp"]; ok {
		switch v := ts.(type) {
		case time.Time:
			return v.Format("2006-01-02 15:04:05")
		case string:
			return v
		}
	}
	
	return time.Now().Format("2006-01-02 15:04:05")
}
