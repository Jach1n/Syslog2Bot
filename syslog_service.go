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

	s.app.UpdateStats(GetLogCount(), int(GetDeviceCount()), true)

	config := GetSystemConfig()
	stdlog.Printf("[DEBUG] AlertEnabled: %v, LogID: %d", config.AlertEnabled, syslogLog.ID)
	if config.AlertEnabled {
		s.processLogWithPolicies(syslogLog, device)
	}
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

	for i := range policies {
		policy := &policies[i]
		stdlog.Printf("[DEBUG] Checking policy: ID=%d, Name=%s, IsActive=%v, DeviceID=%d, DeviceGroupID=%d, ParseTemplateID=%d",
			policy.ID, policy.Name, policy.IsActive, policy.DeviceID, policy.DeviceGroupID, policy.ParseTemplateID)

		if !policy.IsActive {
			stdlog.Printf("[DEBUG] Policy %s is not active, skipping", policy.Name)
			continue
		}

		if policy.DeviceID > 0 && (device == nil || policy.DeviceID != device.ID) {
			stdlog.Printf("[DEBUG] Policy %s DeviceID mismatch, skipping", policy.Name)
			continue
		}

		if policy.DeviceGroupID > 0 && (device == nil || policy.DeviceGroupID != device.GroupID) {
			stdlog.Printf("[DEBUG] Policy %s DeviceGroupID mismatch, skipping", policy.Name)
			continue
		}

		var parser *LogParser
		if policy.ParseTemplateID > 0 {
			template, err := GetParseTemplateByID(policy.ParseTemplateID)
			if err == nil {
				parser, _ = NewLogParser(template)
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
				continue
			}
			stdlog.Printf("[DEBUG] Parsed data: %+v", data)
		} else {
			data = s.parseSyslogToMap(syslogLog.RawMessage)
			stdlog.Printf("[DEBUG] Using syslog map: %+v", data)
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

		if matchedPolicy.Action == "keep" {
			s.sendAlertWithPolicy(syslogLog, device, matchedPolicy, parsedData)
		} else if matchedPolicy.Action == "discard" {
			DeleteLog(syslogLog.ID)
		}
	} else {
		syslogLog.FilterStatus = "unmatched"
		UpdateLogFilterStatus(syslogLog.ID, "unmatched", 0)
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
	alertPolicies := GetAlertPoliciesByFilterPolicyID(filterPolicy.ID)

	for _, alertPolicy := range alertPolicies {
		if !alertPolicy.IsActive {
			continue
		}

		robot, err := GetRobotByID(alertPolicy.RobotID)
		if err != nil {
			continue
		}

		if !robot.IsActive {
			continue
		}

		alertKey := s.generateAlertKey(log, filterPolicy, parsedData)
		if filterPolicy.DedupEnabled && s.isDuplicateAlert(alertKey, filterPolicy.DedupWindow) {
			continue
		}

		var outputTemplate *OutputTemplate
		if alertPolicy.OutputTemplateID > 0 {
			outputTemplate, _ = GetOutputTemplateByID(alertPolicy.OutputTemplateID)
		}

		var message string
		if outputTemplate != nil {
			message = s.renderOutputTemplate(outputTemplate, parsedData, device, log)
		} else {
			message = s.defaultAlertMessage(log, device)
		}

		err = SendDingTalkMessage(robot.WebhookURL, robot.Secret, message)

		record := &AlertRecord{
			LogID:         log.ID,
			RobotID:       robot.ID,
			AlertPolicyID: alertPolicy.ID,
			DeviceName:    log.DeviceName,
			Message:       message,
			SentAt:        time.Now(),
		}

		if err != nil {
			record.Status = "failed"
			record.ErrorMsg = err.Error()
			log.AlertStatus = "failed"
		} else {
			record.Status = "sent"
			log.AlertStatus = "sent"
			s.markAlertSent(alertKey)
		}

		CreateAlertRecord(record)
		UpdateLogAlertStatus(log.ID, log.AlertStatus, alertPolicy.ID)
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
