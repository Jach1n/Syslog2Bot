package main

import (
	"encoding/json"
	"fmt"
	stdlog "log"
	"net"
	"regexp"
	"strconv"
	"strings"
	"sync"
	"time"
)

type SyslogService struct {
	udpConn      *net.UDPConn
	tcpListener  net.Listener
	running      bool
	port         int
	protocol     string
	logChan      chan SyslogMessage
	stopChan     chan struct{}
	alertCache   map[string]time.Time
	app          *App
	mu           sync.RWMutex
	alertMu      sync.RWMutex
	receiveCount int64
	lastCount    int64
	lastTime     time.Time
	lastRate     float64
	connCount    int
	traceMap     map[uint]*LogTraceInfo
	traceMu      sync.RWMutex
}

type SyslogMessage struct {
	SourceIP   string
	SourcePort int
	Message    string
	ReceivedAt time.Time
}

func NewSyslogService(app *App) *SyslogService {
	return &SyslogService{
		app:        app,
		logChan:    make(chan SyslogMessage, 1000),
		stopChan:   make(chan struct{}),
		alertCache: make(map[string]time.Time),
		traceMap:   make(map[uint]*LogTraceInfo),
	}
}

func (s *SyslogService) Start(port int, protocol string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if s.running {
		return fmt.Errorf("syslog service is already running")
	}

	s.port = port
	s.protocol = protocol

	if protocol == "tcp" {
		addr := &net.TCPAddr{
			Port: port,
			IP:   net.ParseIP("0.0.0.0"),
		}

		listener, err := net.ListenTCP("tcp", addr)
		if err != nil {
			return fmt.Errorf("failed to start TCP server on port %d: %v", port, err)
		}

		s.tcpListener = listener
		s.running = true

		go s.acceptTCPConnections()
	} else {
		addr := &net.UDPAddr{
			Port: port,
			IP:   net.ParseIP("0.0.0.0"),
		}

		conn, err := net.ListenUDP("udp", addr)
		if err != nil {
			return fmt.Errorf("failed to start UDP server on port %d: %v", port, err)
		}

		s.udpConn = conn
		s.running = true

		go s.receiveUDPMessages()
	}

	go s.processMessages()

	s.app.UpdateStats(GetLogCount(), int(GetDeviceCount()), true)

	return nil
}

func (s *SyslogService) acceptTCPConnections() {
	for {
		select {
		case <-s.stopChan:
			return
		default:
			s.tcpListener.(*net.TCPListener).SetDeadline(time.Now().Add(time.Second))
			conn, err := s.tcpListener.Accept()
			if err != nil {
				if netErr, ok := err.(net.Error); ok && netErr.Timeout() {
					continue
				}
				if s.running {
					continue
				}
				return
			}

			go s.handleTCPConnection(conn)
		}
	}
}

func (s *SyslogService) handleTCPConnection(conn net.Conn) {
	defer conn.Close()

	buf := make([]byte, 65535)
	remoteAddr := conn.RemoteAddr().(*net.TCPAddr)

	for {
		select {
		case <-s.stopChan:
			return
		default:
			conn.SetReadDeadline(time.Now().Add(time.Second * 5))
			n, err := conn.Read(buf)
			if err != nil {
				if netErr, ok := err.(net.Error); ok && netErr.Timeout() {
					continue
				}
				return
			}

			if n == 0 {
				continue
			}

			data := buf[:n]

			// 检查是否是 Octet Counting 格式 (RFC 6587)
			// 格式: <长度> <syslog消息>
			if len(data) > 0 && data[0] >= '0' && data[0] <= '9' {
				// 查找空格分隔符
				spaceIdx := -1
				for i, b := range data {
					if b == ' ' {
						spaceIdx = i
						break
					}
				}

				if spaceIdx > 0 {
					// 跳过长度前缀
					data = data[spaceIdx+1:]
				}
			}

			msg := SyslogMessage{
				SourceIP:   remoteAddr.IP.String(),
				SourcePort: remoteAddr.Port,
				Message:    string(data),
				ReceivedAt: time.Now(),
			}

			select {
			case s.logChan <- msg:
			default:
			}
		}
	}
}

func (s *SyslogService) receiveUDPMessages() {
	buf := make([]byte, 65535)

	for {
		select {
		case <-s.stopChan:
			return
		default:
			s.udpConn.SetReadDeadline(time.Now().Add(time.Second))
			n, remoteAddr, err := s.udpConn.ReadFromUDP(buf)
			if err != nil {
				if netErr, ok := err.(net.Error); ok && netErr.Timeout() {
					continue
				}
				if s.running {
					continue
				}
				return
			}

			msg := SyslogMessage{
				SourceIP:   remoteAddr.IP.String(),
				SourcePort: remoteAddr.Port,
				Message:    string(buf[:n]),
				ReceivedAt: time.Now(),
			}

			select {
			case s.logChan <- msg:
			default:
			}
		}
	}
}

func (s *SyslogService) Stop() error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if !s.running {
		return nil
	}

	s.running = false
	close(s.stopChan)

	if s.udpConn != nil {
		s.udpConn.Close()
	}
	if s.tcpListener != nil {
		s.tcpListener.Close()
	}

	s.app.UpdateStats(GetLogCount(), int(GetDeviceCount()), false)

	return nil
}

func (s *SyslogService) processMessages() {
	for {
		select {
		case <-s.stopChan:
			return
		case msg := <-s.logChan:
			s.handleMessage(msg)
		}
	}
}

func (s *SyslogService) handleMessage(msg SyslogMessage) {
	device, _ := GetDeviceByIP(msg.SourceIP)

	deviceName := "Unknown"
	deviceID := uint(0)
	if device != nil {
		deviceName = device.Name
		deviceID = device.ID
	}

	priority, facility, severity := parsePriority(msg.Message)

	isForwarded := s.checkForwardedMark(msg.Message)

	syslogLog := &SyslogLog{
		DeviceID:     deviceID,
		DeviceName:   deviceName,
		SourceIP:     msg.SourceIP,
		RawMessage:   msg.Message,
		Priority:     strconv.Itoa(priority),
		Facility:     facility,
		Severity:     severity,
		Timestamp:    msg.ReceivedAt,
		ReceivedAt:   msg.ReceivedAt,
		FilterStatus: "pending",
		AlertStatus:  "none",
	}

	CreateLog(syslogLog)
	s.incrementReceiveCount()
	s.createTrace(syslogLog.ID, msg.SourceIP, msg.Message)

	s.app.UpdateStats(GetLogCount(), int(GetDeviceCount()), true)

	config := GetSystemConfig()
	stdlog.Printf("[DEBUG] AlertEnabled: %v, LogID: %d, IsForwarded: %v", config.AlertEnabled, syslogLog.ID, isForwarded)
	if config.AlertEnabled && !isForwarded {
		s.processLogWithPolicies(syslogLog, device)
	}
}

func (s *SyslogService) checkForwardedMark(msg string) bool {
	if strings.Contains(msg, `"forwarded":true`) {
		return true
	}
	if strings.Contains(msg, "[FORWARDED]") {
		return true
	}
	return false
}

func parsePriority(msg string) (int, int, int) {
	if len(msg) == 0 || msg[0] != '<' {
		return 0, 0, 0
	}

	end := strings.Index(msg, ">")
	if end == -1 {
		return 0, 0, 0
	}

	priority, err := strconv.Atoi(msg[1:end])
	if err != nil {
		return 0, 0, 0
	}

	facility := priority / 8
	severity := priority % 8

	return priority, facility, severity
}

func (s *SyslogService) processLogWithPolicies(syslogLog *SyslogLog, device *Device) {
	policies := GetFilterPolicies()
	stdlog.Printf("[DEBUG] processLogWithPolicies: LogID=%d, PoliciesCount=%d", syslogLog.ID, len(policies))

	var matchedPolicy *FilterPolicy
	var parsedData map[string]interface{}
	var hasActivePolicy bool
	var hasAnyPolicy bool

	for i := range policies {
		hasAnyPolicy = true
		policy := &policies[i]
		stdlog.Printf("[DEBUG] Checking policy: ID=%d, Name=%s, IsActive=%v, DeviceID=%d, DeviceGroupID=%d, ParseTemplateID=%d",
			policy.ID, policy.Name, policy.IsActive, policy.DeviceID, policy.DeviceGroupID, policy.ParseTemplateID)

		if !policy.IsActive {
			stdlog.Printf("[DEBUG] Policy %s is not active, skipping", policy.Name)
			continue
		}

		hasActivePolicy = true

		if policy.DeviceID > 0 && (device == nil || policy.DeviceID != device.ID) {
			stdlog.Printf("[DEBUG] Policy %s DeviceID mismatch, skipping", policy.Name)
			continue
		}

		if policy.DeviceGroupID > 0 && (device == nil || policy.DeviceGroupID != device.GroupID) {
			stdlog.Printf("[DEBUG] Policy %s DeviceGroupID mismatch, skipping", policy.Name)
			continue
		}

		var parser *LogParser
		var templateName string
		if policy.ParseTemplateID > 0 {
			template, err := GetParseTemplateByID(policy.ParseTemplateID)
			if err == nil {
				parser, _ = NewLogParser(template)
				templateName = template.Name
				stdlog.Printf("[DEBUG] Created parser for template: %s, type: %s", template.Name, template.ParseType)
			} else {
				stdlog.Printf("[DEBUG] Failed to get parse template: %v", err)
			}
		}

		var data map[string]interface{}
		var err error

		if parser != nil {
			data, err = parser.Parse(syslogLog.RawMessage)
			if err != nil {
				stdlog.Printf("[DEBUG] Parse failed: %v", err)
				s.updateTraceParse(syslogLog.ID, "failed", templateName, "", err.Error())
				continue
			}
			stdlog.Printf("[DEBUG] Parsed data: %+v", data)
			s.updateTraceParse(syslogLog.ID, "success", templateName, fmt.Sprintf("%+v", data), "")
		} else {
			data = s.parseSyslogToMap(syslogLog.RawMessage)
			stdlog.Printf("[DEBUG] Using syslog map: %+v", data)
			s.updateTraceParse(syslogLog.ID, "success", "syslog", fmt.Sprintf("%+v", data), "")
		}

		stdlog.Printf("[DEBUG] Checking conditions: %s", policy.Conditions)
		if s.matchConditions(data, policy) {
			matchedPolicy = policy
			parsedData = data
			stdlog.Printf("[DEBUG] Policy %s matched!", policy.Name)
			break
		} else {
			stdlog.Printf("[DEBUG] Policy %s did not match", policy.Name)
		}
	}

	if matchedPolicy != nil {
		syslogLog.FilterStatus = "matched"
		syslogLog.MatchedPolicyID = matchedPolicy.ID

		if parsedData != nil {
			parsedBytes, _ := json.Marshal(parsedData)
			syslogLog.ParsedData = string(parsedBytes)
			syslogLog.ParsedFields = ExtractKeyFields(parsedData)
		}

		UpdateLogFilterStatus(syslogLog.ID, "matched", matchedPolicy.ID)
		if syslogLog.ParsedData != "" {
			UpdateLogParsedFields(syslogLog.ID, syslogLog.ParsedData, syslogLog.ParsedFields)
		}

		s.updateTraceFilter(syslogLog.ID, "matched", true, matchedPolicy.Name, matchedPolicy.Conditions, "keep")

		if matchedPolicy.Action == "keep" {
			s.updateTraceAlert(syslogLog.ID, "pending")
			s.sendAlertWithPolicy(syslogLog, device, matchedPolicy, parsedData)
		} else if matchedPolicy.Action == "discard" {
			s.updateTraceFilter(syslogLog.ID, "matched", true, matchedPolicy.Name, matchedPolicy.Conditions, "discard")
			DeleteLog(syslogLog.ID)
		}
	} else {
		syslogLog.FilterStatus = "unmatched"
		UpdateLogFilterStatus(syslogLog.ID, "unmatched", 0)

		if !hasAnyPolicy || !hasActivePolicy {
			stdlog.Printf("[DEBUG] No active policy found")
			s.updateTraceFilter(syslogLog.ID, "disabled", false, "", "", "no active policy")
		} else {
			stdlog.Printf("[DEBUG] No policy matched")
			s.updateTraceFilter(syslogLog.ID, "unmatched", true, "", "", "no policy matched")
		}
	}
}

func (s *SyslogService) parseSyslogToMap(msg string) map[string]interface{} {
	result := make(map[string]interface{})

	if len(msg) == 0 {
		return result
	}

	start := strings.Index(msg, ">")
	if start == -1 {
		result["message"] = msg
		return result
	}

	content := msg[start+1:]
	result["message"] = content

	jsonStart := strings.Index(content, "{")
	if jsonStart != -1 {
		jsonStr := content[jsonStart:]
		var jsonData map[string]interface{}
		if err := json.Unmarshal([]byte(jsonStr), &jsonData); err == nil {
			for k, v := range jsonData {
				result[k] = v
			}
		}
	}

	return result
}

func (s *SyslogService) matchConditions(data map[string]interface{}, policy *FilterPolicy) bool {
	if policy.Conditions == "" {
		return true
	}

	var conditions []FilterCondition
	if err := json.Unmarshal([]byte(policy.Conditions), &conditions); err != nil {
		return false
	}

	if len(conditions) == 0 {
		return true
	}

	results := make([]bool, len(conditions))
	for i, cond := range conditions {
		results[i] = s.evaluateCondition(cond, data)
	}

	if policy.ConditionLogic == "OR" {
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

func (s *SyslogService) evaluateCondition(cond FilterCondition, data map[string]interface{}) bool {
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
	case "starts_with":
		return strings.HasPrefix(strValue, cond.Value)
	case "ends_with":
		return strings.HasSuffix(strValue, cond.Value)
	case "regex", "=~":
		matched, _ := regexpMatch(cond.Value, strValue)
		return matched
	case "exists":
		return exists
	case "not_exists":
		return !exists
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
	default:
		return false
	}
}

func regexpMatch(pattern, str string) (bool, error) {
	return strings.Contains(str, pattern), nil
}

func (s *SyslogService) sendAlertWithPolicy(log *SyslogLog, device *Device, filterPolicy *FilterPolicy, parsedData map[string]interface{}) {
	stdlog.Printf("[DEBUG] sendAlertWithPolicy called - LogID: %d, FilterPolicyID: %d, FilterPolicyName: %s", log.ID, filterPolicy.ID, filterPolicy.Name)

	rules := GetAlertRulesByFilterPolicyID(filterPolicy.ID)
	stdlog.Printf("[DEBUG] Found %d alert rules for filter policy %d", len(rules), filterPolicy.ID)

	for _, rule := range rules {
		robot, err := GetRobotByID(rule.RobotID)
		if err != nil {
			stdlog.Printf("[DEBUG] Robot not found for rule %d: %v", rule.ID, err)
			continue
		}

		stdlog.Printf("[DEBUG] Processing robot: %s (ID: %d, Platform: %s)", robot.Name, robot.ID, robot.Platform)

		if !robot.IsActive || !rule.IsActive {
			stdlog.Printf("[DEBUG] Robot %s or rule is not active, skipping", robot.Name)
			continue
		}

		platform := robot.Platform
		if platform == "" {
			platform = "dingtalk"
		}

		alertKey := s.generateAlertKey(log, filterPolicy, parsedData)
		if filterPolicy.DedupEnabled && s.isDuplicateAlert(alertKey, filterPolicy.DedupWindow) {
			stdlog.Printf("[DEBUG] Duplicate alert for robot %s, skipping", robot.Name)
			continue
		}

		var message string
		var outputTemplate *OutputTemplate

		stdlog.Printf("[DEBUG] rule.OutputTemplateID: %d", rule.OutputTemplateID)
		if rule.OutputTemplateID > 0 {
			outputTemplate, _ = GetOutputTemplateByID(rule.OutputTemplateID)
			if outputTemplate != nil {
				stdlog.Printf("[DEBUG] Got outputTemplate by ID: name=%s, platform=%s, fields=%s", outputTemplate.Name, outputTemplate.Platform, outputTemplate.Fields)
			} else {
				stdlog.Printf("[DEBUG] outputTemplate not found for ID: %d", rule.OutputTemplateID)
			}
		}

		if outputTemplate == nil || (outputTemplate.Platform != platform && platform != "syslog") {
			outputTemplate, _ = GetOutputTemplateByPlatform(platform)
			if outputTemplate != nil {
				stdlog.Printf("[DEBUG] Got outputTemplate by platform: name=%s, platform=%s, fields=%s", outputTemplate.Name, outputTemplate.Platform, outputTemplate.Fields)
			} else {
				stdlog.Printf("[DEBUG] No outputTemplate found for platform: %s", platform)
			}
		}

		if outputTemplate != nil && platform != "syslog" {
			message = s.renderOutputTemplate(outputTemplate, parsedData, device, log)
			stdlog.Printf("[DEBUG] Using template %s (platform: %s) for robot %s", outputTemplate.Name, outputTemplate.Platform, robot.Name)
		} else if platform != "syslog" {
			message = s.defaultAlertMessage(log, device)
			stdlog.Printf("[DEBUG] No template found for platform %s, using default", platform)
		}

		stdlog.Printf("[DEBUG] Sending to platform: %s", platform)

		var sendErr error
		switch platform {
		case "dingtalk":
			sendErr = SendDingTalkMessage(robot.WebhookURL, robot.Secret, message)
		case "feishu":
			stdlog.Printf("[DEBUG] Sending to Feishu - WebhookURL: %s", robot.FeishuWebhookURL)
			sendErr = SendFeishuMessage(robot.FeishuWebhookURL, robot.FeishuSecret, message)
		case "wework":
			sendErr = SendWeworkMessage(robot.WeworkWebhookURL, robot.WeworkKey, message)
		case "email":
			sendErr = SendEmailMessage(robot.SMTPHost, robot.SMTPPort, robot.SMTPUsername, robot.SMTPPassword, robot.SMTPFrom, robot.SMTPTo, "【Syslog告警】安全告警通知", message)
		case "syslog":
			outputFormat := rule.OutputFormat
			if outputFormat == "" {
				outputFormat = robot.SyslogFormat
			}

			var selectedFields []string
			stdlog.Printf("[DEBUG] outputTemplate: %+v", outputTemplate)
			if outputTemplate != nil && outputTemplate.Fields != "" {
				stdlog.Printf("[DEBUG] outputTemplate.Fields: %s", outputTemplate.Fields)
				if err := json.Unmarshal([]byte(outputTemplate.Fields), &selectedFields); err != nil {
					stdlog.Printf("[DEBUG] Failed to parse template fields: %v", err)
				} else {
					stdlog.Printf("[DEBUG] selectedFields: %v", selectedFields)
				}
			} else {
				stdlog.Printf("[DEBUG] No outputTemplate or Fields is empty")
			}

			var fieldMapping string
			var fieldNameMapping map[string]string
			var valueTransform string
			if filterPolicy.ParseTemplateID > 0 {
				template, err := GetParseTemplateByID(filterPolicy.ParseTemplateID)
				if err == nil && template != nil {
					valueTransform = template.ValueTransform
					if template.ParseType == "smart_delimiter" {
						if template.SubTemplates != "" {
							var config struct {
								SubTemplates map[string]SubTemplateConfig `json:"subTemplates"`
							}
							if err := json.Unmarshal([]byte(template.SubTemplates), &config); err == nil {
								if alertType, ok := parsedData["alertType"].(string); ok {
									if subTemplate, ok := config.SubTemplates[alertType]; ok {
										fieldNameMapping = make(map[string]string)
										if subTemplate.AlertNameField >= 0 {
											fieldNameMapping[fmt.Sprintf("field_%d", subTemplate.AlertNameField)] = "告警名称"
										}
										if subTemplate.AttackIPField >= 0 {
											fieldNameMapping[fmt.Sprintf("field_%d", subTemplate.AttackIPField)] = "攻击IP"
										}
										if subTemplate.VictimIPField >= 0 {
											fieldNameMapping[fmt.Sprintf("field_%d", subTemplate.VictimIPField)] = "受害IP"
										}
										if subTemplate.AlertTimeField >= 0 {
											fieldNameMapping[fmt.Sprintf("field_%d", subTemplate.AlertTimeField)] = "告警时间"
										}
										if subTemplate.SeverityField >= 0 {
											fieldNameMapping[fmt.Sprintf("field_%d", subTemplate.SeverityField)] = "威胁等级"
										}
										if subTemplate.AttackResultField >= 0 {
											fieldNameMapping[fmt.Sprintf("field_%d", subTemplate.AttackResultField)] = "攻击结果"
										}
									}
								}
							}
						}
					} else {
						fieldMapping = template.FieldMapping
					}
				}
			}

			sendErr = SendSyslogForward(robot.SyslogHost, robot.SyslogPort, robot.SyslogProtocol, outputFormat, message, parsedData, log, fieldMapping, fieldNameMapping, selectedFields, valueTransform)
		default:
			sendErr = SendDingTalkMessage(robot.WebhookURL, robot.Secret, message)
		}

		record := &AlertRecord{
			LogID:      log.ID,
			RobotID:    robot.ID,
			DeviceName: log.DeviceName,
			Message:    message,
			SentAt:     time.Now(),
		}

		if sendErr != nil {
			record.Status = "failed"
			record.ErrorMsg = sendErr.Error()
			log.AlertStatus = "failed"
			stdlog.Printf("[DEBUG] Failed to send to %s: %v", robot.Name, sendErr)
		} else {
			record.Status = "sent"
			log.AlertStatus = "sent"
			s.markAlertSent(alertKey)
			stdlog.Printf("[DEBUG] Successfully sent to %s", robot.Name)
		}

		CreateAlertRecord(record)
		UpdateLogAlertStatus(log.ID, log.AlertStatus, 0)

		alertRecord := AlertTraceInfo{
			RobotID:   robot.ID,
			RobotName: robot.Name,
			Platform:  platform,
			Status:    record.Status,
			ErrorMsg:  record.ErrorMsg,
			SentAt:    record.SentAt,
		}
		s.addTraceAlertRecord(log.ID, alertRecord)
		if record.Status == "sent" {
			s.updateTraceAlert(log.ID, "sent")
		} else {
			s.updateTraceAlert(log.ID, "failed")
		}
	}
}

func (s *SyslogService) generateAlertKey(log *SyslogLog, filterPolicy *FilterPolicy, parsedData map[string]interface{}) string {
	keyFields := []string{}

	keyFields = append(keyFields, fmt.Sprintf("device:%d", log.DeviceID))
	keyFields = append(keyFields, fmt.Sprintf("policy:%d", filterPolicy.ID))

	if attackIp, ok := parsedData["attackIp"]; ok {
		keyFields = append(keyFields, fmt.Sprintf("attackIp:%v", attackIp))
	}
	if threatType, ok := parsedData["threatType"]; ok {
		keyFields = append(keyFields, fmt.Sprintf("threatType:%v", threatType))
	}
	if description, ok := parsedData["description"]; ok {
		keyFields = append(keyFields, fmt.Sprintf("desc:%v", description))
	}

	return strings.Join(keyFields, "|")
}

func (s *SyslogService) isDuplicateAlert(key string, windowSeconds int) bool {
	s.alertMu.RLock()
	defer s.alertMu.RUnlock()

	if windowSeconds <= 0 {
		windowSeconds = 60
	}

	if lastSent, exists := s.alertCache[key]; exists {
		if time.Since(lastSent) < time.Duration(windowSeconds)*time.Second {
			return true
		}
	}
	return false
}

func (s *SyslogService) markAlertSent(key string) {
	s.alertMu.Lock()
	defer s.alertMu.Unlock()

	s.alertCache[key] = time.Now()

	if len(s.alertCache) > 10000 {
		cutoff := time.Now().Add(-5 * time.Minute)
		for k, v := range s.alertCache {
			if v.Before(cutoff) {
				delete(s.alertCache, k)
			}
		}
	}
}

func (s *SyslogService) renderOutputTemplate(template *OutputTemplate, data map[string]interface{}, device *Device, log *SyslogLog) string {
	if data == nil {
		data = make(map[string]interface{})
	}

	if device != nil {
		data["deviceName"] = device.Name
		data["deviceIP"] = device.IPAddress
	}

	data["rawMessage"] = log.RawMessage
	data["receivedAt"] = log.ReceivedAt.Format("2006-01-02 15:04:05")

	if ts, ok := data["localTimestamp"]; ok {
		if milli, ok := ts.(float64); ok && milli > 1e12 {
			data["timestamp"] = time.UnixMilli(int64(milli)).Format("2006-01-02 15:04:05")
			data["alertTime"] = data["timestamp"]
		}
	}

	if _, ok := data["timestamp"]; !ok {
		data["timestamp"] = log.ReceivedAt.Format("2006-01-02 15:04:05")
	}

	if _, ok := data["alertTime"]; !ok {
		data["alertTime"] = data["timestamp"]
	}

	content := template.Content

	re := regexp.MustCompile(`\{\{([a-zA-Z0-9_.]+)\}\}`)
	content = re.ReplaceAllStringFunc(content, func(match string) string {
		fieldName := strings.Trim(match, "{}")

		// First try to find the value in the flattened data
		if value, exists := data[fieldName]; exists {
			return fmt.Sprintf("%v", value)
		}

		// If not found, try to find the value in the original nested data
		value := getNestedValue(data, fieldName)
		if value == nil {
			return ""
		}

		return fmt.Sprintf("%v", value)
	})

	return content
}

func formatDealStatus(status int) string {
	switch status {
	case 0:
		return "未处理"
	case 1:
		return "已处理"
	case 2:
		return "忽略"
	default:
		return "未知"
	}
}

func (s *SyslogService) defaultAlertMessage(log *SyslogLog, device *Device) string {
	deviceName := "Unknown"
	if device != nil {
		deviceName = device.Name
	}

	return fmt.Sprintf("### 🚨 安全告警\n\n"+
		"**设备名称**: %s\n\n"+
		"**来源IP**: %s\n\n"+
		"**告警时间**: %s\n\n"+
		"**告警内容**: %s",
		deviceName,
		log.SourceIP,
		log.ReceivedAt.Format("2006-01-02 15:04:05"),
		log.RawMessage,
	)
}

func (s *SyslogService) IsRunning() bool {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.running
}

func (s *SyslogService) GetPort() int {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.port
}

func (s *SyslogService) GetReceiveCount() int64 {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.receiveCount
}

func (s *SyslogService) GetReceiveRate() float64 {
	s.mu.RLock()
	defer s.mu.RUnlock()

	now := time.Now()
	if s.lastTime.IsZero() {
		s.lastTime = now
		s.lastCount = s.receiveCount
		return 0
	}

	elapsed := now.Sub(s.lastTime).Seconds()
	if elapsed < 5 {
		if s.lastRate > 0 {
			return s.lastRate
		}
		return 0
	}

	rate := float64(s.receiveCount-s.lastCount) / elapsed
	s.lastTime = now
	s.lastCount = s.receiveCount
	s.lastRate = rate

	return rate
}

func (s *SyslogService) GetConnections() int {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.connCount
}

func (s *SyslogService) incrementReceiveCount() {
	s.mu.Lock()
	s.receiveCount++
	s.mu.Unlock()
}

func (s *SyslogService) GetTraceInfo(logID uint) *LogTraceInfo {
	s.traceMu.RLock()
	if trace, ok := s.traceMap[logID]; ok {
		s.traceMu.RUnlock()
		return trace
	}
	s.traceMu.RUnlock()

	var log SyslogLog
	if err := GetDB().First(&log, logID).Error; err != nil {
		return nil
	}

	trace := &LogTraceInfo{
		LogID:         log.ID,
		ReceivedAt:    log.ReceivedAt,
		SourceIP:      log.SourceIP,
		RawMessage:    log.RawMessage,
		ReceiveStatus: "success",
		ParseStatus:   "success",
		ParsedData:    log.ParsedData,
		FilterStatus:  log.FilterStatus,
		AlertStatus:   log.AlertStatus,
	}

	if log.MatchedPolicyID > 0 {
		var policy FilterPolicy
		if err := GetDB().First(&policy, log.MatchedPolicyID).Error; err == nil {
			trace.MatchedPolicy = policy.Name
			trace.FilterEnabled = true
		}
	}

	var alertRecords []AlertRecord
	GetDB().Where("log_id = ?", logID).Find(&alertRecords)
	for _, record := range alertRecords {
		var robot DingTalkRobot
		robotName := ""
		platform := ""
		if err := GetDB().First(&robot, record.RobotID).Error; err == nil {
			robotName = robot.Name
			platform = robot.Platform
		}
		trace.AlertRecords = append(trace.AlertRecords, AlertTraceInfo{
			RobotID:   record.RobotID,
			RobotName: robotName,
			Platform:  platform,
			Status:    record.Status,
			ErrorMsg:  record.ErrorMsg,
			SentAt:    record.SentAt,
		})
	}

	return trace
}

func (s *SyslogService) createTrace(logID uint, sourceIP, rawMessage string) {
	s.traceMu.Lock()
	defer s.traceMu.Unlock()
	s.traceMap[logID] = &LogTraceInfo{
		LogID:         logID,
		ReceivedAt:    time.Now(),
		SourceIP:      sourceIP,
		RawMessage:    rawMessage,
		ReceiveStatus: "success",
	}
}

func (s *SyslogService) updateTraceParse(logID uint, status, templateName, parsedData, parseError string) {
	s.traceMu.Lock()
	defer s.traceMu.Unlock()
	if trace, ok := s.traceMap[logID]; ok {
		trace.ParseStatus = status
		trace.ParseTemplate = templateName
		trace.ParsedData = parsedData
		trace.ParseError = parseError
	}
}

func (s *SyslogService) updateTraceFilter(logID uint, status string, filterEnabled bool, matchedPolicy, filterConditions, filterResult string) {
	s.traceMu.Lock()
	defer s.traceMu.Unlock()
	if trace, ok := s.traceMap[logID]; ok {
		trace.FilterStatus = status
		trace.FilterEnabled = filterEnabled
		trace.MatchedPolicy = matchedPolicy
		trace.FilterConditions = filterConditions
		trace.FilterResult = filterResult
	}
}

func (s *SyslogService) updateTraceAlert(logID uint, status string) {
	s.traceMu.Lock()
	defer s.traceMu.Unlock()
	if trace, ok := s.traceMap[logID]; ok {
		trace.AlertStatus = status
	}
}

func (s *SyslogService) addTraceAlertRecord(logID uint, record AlertTraceInfo) {
	s.traceMu.Lock()
	defer s.traceMu.Unlock()
	if trace, ok := s.traceMap[logID]; ok {
		trace.AlertRecords = append(trace.AlertRecords, record)
	}
}

func (s *SyslogService) clearOldTraces(maxAge time.Duration) {
	s.traceMu.Lock()
	defer s.traceMu.Unlock()
	cutoff := time.Now().Add(-maxAge)
	for logID, trace := range s.traceMap {
		if trace.ReceivedAt.Before(cutoff) {
			delete(s.traceMap, logID)
		}
	}
}
