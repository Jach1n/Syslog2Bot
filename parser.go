package main

import (
	"encoding/json"
	"fmt"
	"regexp"
	"strconv"
	"strings"
	"time"
)

type LogParser struct {
	template *ParseTemplate
	regex    *regexp.Regexp
}

func NewLogParser(template *ParseTemplate) (*LogParser, error) {
	parser := &LogParser{
		template: template,
	}

	if template.HeaderRegex != "" {
		re, err := regexp.Compile(template.HeaderRegex)
		if err != nil {
			return nil, fmt.Errorf("invalid header regex: %v", err)
		}
		parser.regex = re
	}

	return parser, nil
}

func (p *LogParser) Parse(rawLog string) (map[string]interface{}, error) {
	switch p.template.ParseType {
	case "syslog_json":
		return p.parseSyslogJSON(rawLog)
	case "json":
		return p.parseJSON(rawLog)
	case "regex":
		return p.parseRegex(rawLog)
	case "kv":
		return p.parseKeyValue(rawLog)
	case "delimiter":
		return p.parseDelimiter(rawLog)
	case "keyvalue":
		return p.parseKeyValueDelimiter(rawLog)
	case "smart_delimiter":
		return p.parseSmartDelimiter(rawLog)
	default:
		return p.parseSyslogJSON(rawLog)
	}
}

func (p *LogParser) parseSyslogJSON(rawLog string) (map[string]interface{}, error) {
	result := make(map[string]interface{})

	var jsonStart int
	if p.regex != nil {
		matches := p.regex.FindStringSubmatch(rawLog)
		if matches == nil {
			return nil, fmt.Errorf("log does not match header pattern")
		}

		subexpNames := p.regex.SubexpNames()
		for i, name := range subexpNames {
			if name != "" && i < len(matches) {
				result[name] = matches[i]
			}
		}

		loc := p.regex.FindStringIndex(rawLog)
		if loc != nil {
			jsonStart = loc[1]
		}
	} else {
		syslogTimeRegex := regexp.MustCompile(`^<\d+>(\w{3}\s+\d{1,2}\s+[\d:]+)`)
		if matches := syslogTimeRegex.FindStringSubmatch(rawLog); matches != nil {
			result["timestamp"] = matches[1]
		}
		jsonStart = strings.Index(rawLog, "{")
	}

	jsonStr := rawLog
	if jsonStart > 0 && jsonStart < len(rawLog) {
		jsonStr = strings.TrimSpace(rawLog[jsonStart:])
	}

	jsonStr = extractJSON(jsonStr)

	var jsonData map[string]interface{}
	if err := json.Unmarshal([]byte(jsonStr), &jsonData); err != nil {
		fixedJsonStr := fixMalformedJSON(jsonStr)
		if fixedErr := json.Unmarshal([]byte(fixedJsonStr), &jsonData); fixedErr != nil {
			return nil, fmt.Errorf("failed to parse JSON: %v", err)
		}
	}

	flattenJSON(jsonData, "", result)

	if ts, ok := result["timestamp"].(string); ok && ts != "" {
		result["alertTime"] = convertSyslogTimestamp(ts)
	}

	if p.template.FieldMapping != "" {
		result = p.applyFieldMapping(result)
	}

	if p.template.ValueTransform != "" {
		result = p.applyValueTransform(result)
	}

	return result, nil
}

func (p *LogParser) parseSmartDelimiter(rawLog string) (map[string]interface{}, error) {
	result := make(map[string]interface{})

	var config struct {
		Delimiter    string                       `json:"delimiter"`
		TypeField    int                          `json:"typeField"`
		SkipHeader   bool                         `json:"skipHeader"`
		HeaderRegex  string                       `json:"headerRegex"`
		SubTemplates map[string]SubTemplateConfig `json:"subTemplates"`
	}

	if p.template.FieldMapping != "" {
		if err := json.Unmarshal([]byte(p.template.FieldMapping), &config); err != nil {
			return nil, fmt.Errorf("invalid smart delimiter config: %v", err)
		}
	}

	if config.Delimiter == "" {
		config.Delimiter = "|!"
	}
	if config.TypeField == 0 {
		config.TypeField = 0
	}

	content := rawLog

	if config.SkipHeader {
		headerRegex := config.HeaderRegex
		if headerRegex == "" {
			headerRegex = `<(?P<priority>[0-9]+)>(?P<timestamp>[A-Za-z]+[ ]+[0-9]+ [0-9:]+) (?P<hostname>[^ ]+) (?P<program>[^:]+):`
		}
		re, err := regexp.Compile(headerRegex)
		if err == nil {
			matches := re.FindStringSubmatch(rawLog)
			if matches != nil {
				subexpNames := re.SubexpNames()
				for i, name := range subexpNames {
					if name != "" && i < len(matches) {
						result[name] = matches[i]
					}
				}
				loc := re.FindStringIndex(rawLog)
				if loc != nil && loc[1] < len(rawLog) {
					content = strings.TrimSpace(rawLog[loc[1]:])
				}
			}
		}
	} else if p.regex != nil {
		matches := p.regex.FindStringSubmatch(rawLog)
		if matches == nil {
			return nil, fmt.Errorf("log does not match header pattern")
		}

		subexpNames := p.regex.SubexpNames()
		for i, name := range subexpNames {
			if name != "" && i < len(matches) {
				result[name] = matches[i]
			}
		}

		loc := p.regex.FindStringIndex(rawLog)
		if loc != nil && loc[1] < len(rawLog) {
			content = strings.TrimSpace(rawLog[loc[1]:])
		}
	}

	values := strings.Split(content, config.Delimiter)

	if len(values) <= config.TypeField {
		return nil, fmt.Errorf("log does not have enough fields")
	}

	alertType := values[config.TypeField]
	result["alertType"] = alertType

	for i, v := range values {
		result[fmt.Sprintf("field_%d", i)] = v
	}

	if subConfig, ok := config.SubTemplates[alertType]; ok {
		if subConfig.AlertNameField >= 0 && subConfig.AlertNameField < len(values) {
			result["alertName"] = values[subConfig.AlertNameField]
		}
		if subConfig.AttackIPField >= 0 && subConfig.AttackIPField < len(values) {
			result["attackIP"] = values[subConfig.AttackIPField]
		}
		if subConfig.VictimIPField >= 0 && subConfig.VictimIPField < len(values) {
			result["victimIP"] = values[subConfig.VictimIPField]
		}
		if subConfig.AlertTimeField >= 0 && subConfig.AlertTimeField < len(values) {
			result["alertTime"] = values[subConfig.AlertTimeField]
		}
		if subConfig.SeverityField >= 0 && subConfig.SeverityField < len(values) {
			result["severity"] = values[subConfig.SeverityField]
		}
		if subConfig.AttackResultField >= 0 && subConfig.AttackResultField < len(values) {
			result["attackResult"] = values[subConfig.AttackResultField]
		}
		// 处理自定义字段
		for _, cf := range subConfig.CustomFields {
			if cf.FieldIndex >= 0 && cf.FieldIndex < len(values) && cf.Name != "" {
				result[cf.Name] = values[cf.FieldIndex]
			}
		}
	}

	// IOC告警默认攻击结果为"失陷"
	if alertType == "ioc_alert" {
		if _, exists := result["attackResult"]; !exists {
			result["attackResult"] = "失陷"
		}
	}

	if p.template.ValueTransform != "" {
		result = p.applyValueTransform(result)
	}

	return result, nil
}

type SubTemplateConfig struct {
	AlertNameField    int                 `json:"alertNameField"`
	AttackIPField     int                 `json:"attackIPField"`
	VictimIPField     int                 `json:"victimIPField"`
	AlertTimeField    int                 `json:"alertTimeField"`
	SeverityField     int                 `json:"severityField"`
	AttackResultField int                 `json:"attackResultField"`
	CustomFields      []CustomFieldConfig `json:"customFields,omitempty"`
}

type CustomFieldConfig struct {
	Name       string `json:"name"`
	FieldIndex int    `json:"fieldIndex"`
}

func extractJSON(str string) string {
	str = strings.TrimSpace(str)
	if len(str) == 0 {
		return str
	}

	if str[0] != '{' && str[0] != '[' {
		return str
	}

	depth := 0
	inString := false
	escape := false

	for i, c := range str {
		if escape {
			escape = false
			continue
		}

		switch c {
		case '\\':
			if inString {
				escape = true
			}
		case '"':
			inString = !inString
		case '{', '[':
			if !inString {
				depth++
			}
		case '}', ']':
			if !inString {
				depth--
				if depth == 0 {
					return str[:i+1]
				}
			}
		}
	}

	return str
}

func fixMalformedJSON(jsonStr string) string {
	result := jsonStr

	for {
		idx := strings.Index(result, `"fullTree":"`)
		if idx == -1 {
			break
		}

		valueStart := idx + len(`"fullTree":"`)

		if valueStart >= len(result) || result[valueStart] != '[' {
			break
		}

		depth := 0
		valueEnd := -1

		for i := valueStart; i < len(result); i++ {
			c := result[i]
			if c == '[' {
				depth++
			} else if c == ']' {
				depth--
				if depth == 0 {
					// Found matching ], check if followed by " (possibly with \n before)
					// Pattern could be: ]" or ]\n"
					if i+1 < len(result) && result[i+1] == '"' {
						valueEnd = i + 2
						break
					}
					// Check for ]\n" pattern
					if i+2 < len(result) && result[i+1] == '\\' && result[i+2] == 'n' && i+3 < len(result) && result[i+3] == '"' {
						valueEnd = i + 4
						break
					}
				}
			}
		}

		if valueEnd == -1 {
			break
		}

		before := result[:idx]
		after := result[valueEnd:]

		if len(before) > 0 && before[len(before)-1] == ',' {
			before = before[:len(before)-1]
		} else if len(after) > 0 && after[0] == ',' {
			after = after[1:]
		}

		result = before + after
	}

	return result
}

func flattenJSON(data map[string]interface{}, prefix string, result map[string]interface{}) {
	for k, v := range data {
		key := k
		if prefix != "" {
			key = prefix + "." + k
		}

		switch val := v.(type) {
		case map[string]interface{}:
			flattenJSON(val, key, result)
		default:
			result[key] = v
		}
	}
}

func (p *LogParser) parseJSON(rawLog string) (map[string]interface{}, error) {
	result := make(map[string]interface{})

	var jsonData map[string]interface{}
	if err := json.Unmarshal([]byte(rawLog), &jsonData); err != nil {
		return nil, fmt.Errorf("failed to parse JSON: %v", err)
	}

	flattenJSON(jsonData, "", result)

	if p.template.FieldMapping != "" {
		result = p.applyFieldMapping(result)
	}

	if p.template.ValueTransform != "" {
		result = p.applyValueTransform(result)
	}

	return result, nil
}

func (p *LogParser) parseRegex(rawLog string) (map[string]interface{}, error) {
	if p.regex == nil {
		return nil, fmt.Errorf("no regex pattern configured")
	}

	matches := p.regex.FindStringSubmatch(rawLog)
	if matches == nil {
		return nil, fmt.Errorf("log does not match pattern")
	}

	result := make(map[string]interface{})
	subexpNames := p.regex.SubexpNames()
	for i, name := range subexpNames {
		if name != "" && i < len(matches) {
			result[name] = matches[i]
		}
	}

	if p.template.ValueTransform != "" {
		result = p.applyValueTransform(result)
	}

	return result, nil
}

func (p *LogParser) parseKeyValue(rawLog string) (map[string]interface{}, error) {
	result := make(map[string]interface{})

	pairs := strings.Fields(rawLog)
	for _, pair := range pairs {
		parts := strings.SplitN(pair, "=", 2)
		if len(parts) == 2 {
			key := strings.TrimSpace(parts[0])
			value := strings.TrimSpace(parts[1])
			value = strings.Trim(value, `"`)
			result[key] = value
		}
	}

	if p.template.ValueTransform != "" {
		result = p.applyValueTransform(result)
	}

	return result, nil
}

func (p *LogParser) applyFieldMapping(data map[string]interface{}) map[string]interface{} {
	var mapping map[string]map[string]interface{}
	if err := json.Unmarshal([]byte(p.template.FieldMapping), &mapping); err != nil {
		var simpleMapping map[string]string
		if err2 := json.Unmarshal([]byte(p.template.FieldMapping), &simpleMapping); err2 != nil {
			return data
		}

		result := make(map[string]interface{})
		for k, v := range data {
			result[k] = v
		}

		for oldField, newField := range simpleMapping {
			// Since flattenJSON already flattens nested fields (e.g., "machine.nickname"),
			// we can directly look up the key in the flattened data
			if v, exists := data[oldField]; exists {
				result[newField] = v
			}
		}

		return result
	}

	result := make(map[string]interface{})

	for targetField, sourceConfig := range mapping {
		source, ok := sourceConfig["source"].(string)
		if !ok {
			continue
		}

		switch source {
		case "header":
			if group, ok := sourceConfig["group"].(float64); ok {
				groupIndex := int(group)
				if p.regex != nil && groupIndex > 0 && groupIndex <= len(p.regex.SubexpNames()) {
					name := p.regex.SubexpNames()[groupIndex]
					if val, exists := data[name]; exists {
						result[targetField] = val
					}
				}
			}
		case "json":
			path, ok := sourceConfig["path"].(string)
			if !ok {
				continue
			}
			value := getNestedValue(data, path)
			if value != nil {
				result[targetField] = value
			}
		default:
			if val, exists := data[source]; exists {
				result[targetField] = val
			}
		}
	}

	for k, v := range data {
		if _, exists := result[k]; !exists {
			result[k] = v
		}
	}

	return result
}

func (p *LogParser) applyValueTransform(data map[string]interface{}) map[string]interface{} {
	var transforms map[string]map[string]string
	if err := json.Unmarshal([]byte(p.template.ValueTransform), &transforms); err != nil {
		return data
	}

	for field, transformMap := range transforms {
		if value, exists := data[field]; exists {
			strValue := fmt.Sprintf("%v", value)
			data[field+"Raw"] = strValue
			if newValue, ok := transformMap[strValue]; ok {
				data[field] = newValue
			}
		}
	}

	if alertTimeVal, exists := data["alertTime"]; exists {
		if strVal, ok := alertTimeVal.(string); ok {
			if ts, err := strconv.ParseInt(strVal, 10, 64); err == nil {
				data["alertTimeRaw"] = strVal
				if ts > 10000000000 {
					ts = ts / 1000
				}
				data["alertTime"] = time.Unix(ts, 0).Format("2006-01-02 15:04:05")
			}
		}
	}

	return data
}

func getNestedValue(data map[string]interface{}, path string) interface{} {
	parts := strings.Split(path, ".")
	var current interface{} = data

	for _, part := range parts {
		switch v := current.(type) {
		case map[string]interface{}:
			if val, exists := v[part]; exists {
				current = val
			} else {
				return nil
			}
		default:
			return nil
		}
	}

	return current
}

func ParseTimestamp(ts interface{}) time.Time {
	switch v := ts.(type) {
	case float64:
		if v > 1e12 {
			return time.UnixMilli(int64(v))
		}
		return time.Unix(int64(v), 0)
	case string:
		layouts := []string{
			"2006-01-02 15:04:05",
			"2006-01-02T15:04:05Z",
			"2006-01-02T15:04:05.999Z",
			"Jan 02 15:04:05",
			time.RFC3339,
		}
		for _, layout := range layouts {
			if t, err := time.Parse(layout, v); err == nil {
				if layout == "Jan 02 15:04:05" {
					t = t.AddDate(time.Now().Year(), 0, 0)
				}
				return t
			}
		}
		if milli, err := strconv.ParseInt(v, 10, 64); err == nil {
			if milli > 1e12 {
				return time.UnixMilli(milli)
			}
			return time.Unix(milli, 0)
		}
	}
	return time.Now()
}

func convertSyslogTimestamp(ts string) string {
	layouts := []string{
		"Jan _2 15:04:05",
		"Jan 02 15:04:05",
	}

	for _, layout := range layouts {
		if t, err := time.Parse(layout, ts); err == nil {
			now := time.Now()
			t = t.AddDate(now.Year(), 0, 0)
			return t.Format("2006-01-02 15:04:05")
		}
	}

	return ts
}

func (p *LogParser) parseDelimiter(rawLog string) (map[string]interface{}, error) {
	result := make(map[string]interface{})

	var config struct {
		Delimiter   string              `json:"delimiter"`
		Fields      []string            `json:"fields"`
		TypeField   string              `json:"type_field"`
		TypeMapping map[string][]string `json:"type_mapping"`
	}

	var simpleMapping map[string]string

	if p.template.FieldMapping != "" {
		if err := json.Unmarshal([]byte(p.template.FieldMapping), &config); err != nil {
			if err2 := json.Unmarshal([]byte(p.template.FieldMapping), &simpleMapping); err2 != nil {
				return nil, fmt.Errorf("invalid delimiter config: %v", err)
			}
		}
	}

	if config.Delimiter == "" {
		config.Delimiter = "|!"
	}

	content := rawLog

	if p.regex != nil {
		matches := p.regex.FindStringSubmatch(rawLog)
		if matches == nil {
			return nil, fmt.Errorf("log does not match header pattern")
		}

		subexpNames := p.regex.SubexpNames()
		for i, name := range subexpNames {
			if name != "" && i < len(matches) {
				result[name] = matches[i]
			}
		}

		loc := p.regex.FindStringIndex(rawLog)
		if loc != nil && loc[1] < len(rawLog) {
			content = strings.TrimSpace(rawLog[loc[1]:])
		}
	}

	values := strings.Split(content, config.Delimiter)

	if config.TypeField != "" && len(values) > 0 {
		alertType := values[0]
		result[config.TypeField] = alertType

		if fields, ok := config.TypeMapping[alertType]; ok {
			for i, field := range fields {
				if i < len(values) {
					result[field] = values[i]
				}
			}
		} else if len(config.Fields) > 0 {
			for i, field := range config.Fields {
				if i < len(values) {
					result[field] = values[i]
				}
			}
		} else {
			for i, v := range values {
				result[fmt.Sprintf("field_%d", i)] = v
			}
		}
	} else if len(config.Fields) > 0 {
		for i, field := range config.Fields {
			if i < len(values) {
				result[field] = values[i]
			}
		}
	} else {
		for i, v := range values {
			result[fmt.Sprintf("field_%d", i)] = v
		}
	}

	if len(simpleMapping) > 0 {
		for oldField, newField := range simpleMapping {
			var value interface{}
			if strings.Contains(oldField, ".") {
				value = getNestedValue(result, oldField)
			} else {
				if v, exists := result[oldField]; exists {
					value = v
				}
			}
			if value != nil {
				result[newField] = value
			}
		}
	}

	if p.template.ValueTransform != "" {
		result = p.applyValueTransform(result)
	}

	return result, nil
}

func (p *LogParser) parseKeyValueDelimiter(rawLog string) (map[string]interface{}, error) {
	result := make(map[string]interface{})

	var config struct {
		Delimiter   string `json:"delimiter"`
		KVSeparator string `json:"kv_separator"`
	}

	if p.template.FieldMapping != "" {
		if err := json.Unmarshal([]byte(p.template.FieldMapping), &config); err != nil {
			return nil, fmt.Errorf("invalid keyvalue config: %v", err)
		}
	}

	if config.Delimiter == "" {
		config.Delimiter = "|!"
	}
	if config.KVSeparator == "" {
		config.KVSeparator = ":"
	}

	pairs := strings.Split(rawLog, config.Delimiter)
	for _, pair := range pairs {
		idx := strings.Index(pair, config.KVSeparator)
		if idx > 0 {
			key := strings.TrimSpace(pair[:idx])
			value := strings.TrimSpace(pair[idx+1:])
			result[key] = value
		}
	}

	if p.template.ValueTransform != "" {
		result = p.applyValueTransform(result)
	}

	return result, nil
}
