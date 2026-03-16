package main

import (
	"fmt"
	"net"
	"os"
	"regexp"
	"runtime"
	"time"
)

func (a *App) GetDevices() []Device {
	return GetDevices()
}

func (a *App) GetDevice(id uint) (*Device, error) {
	return GetDeviceByID(id)
}

func (a *App) AddDevice(device Device) error {
	return CreateDevice(&device)
}

func (a *App) UpdateDevice(device Device) error {
	return UpdateDevice(&device)
}

func (a *App) DeleteDevice(id uint) error {
	return DeleteDevice(id)
}

func (a *App) GetDeviceGroups() []DeviceGroup {
	return GetDeviceGroups()
}

func (a *App) GetDeviceGroup(id uint) (*DeviceGroup, error) {
	return GetDeviceGroupByID(id)
}

func (a *App) AddDeviceGroup(group DeviceGroup) error {
	return CreateDeviceGroup(&group)
}

func (a *App) UpdateDeviceGroup(group DeviceGroup) error {
	return UpdateDeviceGroup(&group)
}

func (a *App) DeleteDeviceGroup(id uint) error {
	return DeleteDeviceGroup(id)
}

func (a *App) GetParseTemplates() []ParseTemplate {
	return GetParseTemplates()
}

func (a *App) GetParseTemplate(id uint) (*ParseTemplate, error) {
	return GetParseTemplateByID(id)
}

func (a *App) AddParseTemplate(template ParseTemplate) error {
	return CreateParseTemplate(&template)
}

func (a *App) UpdateParseTemplate(template ParseTemplate) error {
	return UpdateParseTemplate(&template)
}

func (a *App) DeleteParseTemplate(id uint) error {
	return DeleteParseTemplate(id)
}

func (a *App) GetOutputTemplates() []OutputTemplate {
	return GetOutputTemplates()
}

func (a *App) GetOutputTemplate(id uint) (*OutputTemplate, error) {
	return GetOutputTemplateByID(id)
}

func (a *App) AddOutputTemplate(template OutputTemplate) error {
	return CreateOutputTemplate(&template)
}

func (a *App) UpdateOutputTemplate(template OutputTemplate) error {
	return UpdateOutputTemplate(&template)
}

func (a *App) DeleteOutputTemplate(id uint) error {
	return DeleteOutputTemplate(id)
}

func (a *App) GetFilterPolicies() []FilterPolicy {
	return GetFilterPolicies()
}

func (a *App) GetFilterPolicy(id uint) (*FilterPolicy, error) {
	return GetFilterPolicyByID(id)
}

func (a *App) AddFilterPolicy(policy FilterPolicy) error {
	return CreateFilterPolicy(&policy)
}

func (a *App) UpdateFilterPolicy(policy FilterPolicy) error {
	return UpdateFilterPolicy(&policy)
}

func (a *App) DeleteFilterPolicy(id uint) error {
	return DeleteFilterPolicy(id)
}

func (a *App) GetAlertPolicies() []AlertPolicy {
	return GetAlertPolicies()
}

func (a *App) GetAlertPolicy(id uint) (*AlertPolicy, error) {
	return GetAlertPolicyByID(id)
}

func (a *App) AddAlertPolicy(policy AlertPolicy) error {
	return CreateAlertPolicy(&policy)
}

func (a *App) UpdateAlertPolicy(policy AlertPolicy) error {
	return UpdateAlertPolicy(&policy)
}

func (a *App) DeleteAlertPolicy(id uint) error {
	return DeleteAlertPolicy(id)
}

func (a *App) GetTemplates() []Template {
	return GetTemplates()
}

func (a *App) GetTemplate(id uint) (*Template, error) {
	return GetTemplateByID(id)
}

func (a *App) AddTemplate(template Template) error {
	return CreateTemplate(&template)
}

func (a *App) UpdateTemplate(template Template) error {
	return UpdateTemplate(&template)
}

func (a *App) DeleteTemplate(id uint) error {
	return DeleteTemplate(id)
}

func (a *App) GetRobots() []DingTalkRobot {
	return GetRobots()
}

func (a *App) GetRobot(id uint) (*DingTalkRobot, error) {
	return GetRobotByID(id)
}

func (a *App) AddRobot(robot DingTalkRobot) error {
	return CreateRobot(&robot)
}

func (a *App) UpdateRobot(robot DingTalkRobot) error {
	return UpdateRobot(&robot)
}

func (a *App) DeleteRobot(id uint) error {
	return DeleteRobot(id)
}

type LogQueryParams struct {
	Page      int    `json:"page"`
	PageSize  int    `json:"pageSize"`
	DeviceID  int    `json:"deviceId"`
	StartTime string `json:"startTime"`
	EndTime   string `json:"endTime"`
	Keyword   string `json:"keyword"`
}

type LogQueryResult struct {
	Logs  []SyslogLog `json:"logs"`
	Total int64       `json:"total"`
}

func (a *App) GetLogs(params LogQueryParams) LogQueryResult {
	var deviceID *int
	if params.DeviceID > 0 {
		deviceID = &params.DeviceID
	}
	logs, total := GetLogs(params.Page, params.PageSize, deviceID, params.StartTime, params.EndTime, params.Keyword)
	return LogQueryResult{
		Logs:  logs,
		Total: total,
	}
}

func (a *App) GetFieldMappingDocs() []FieldMappingDoc {
	return GetFieldMappingDocs()
}

func (a *App) GetFieldMappingDoc(id uint) (*FieldMappingDoc, error) {
	return GetFieldMappingDocByID(id)
}

func (a *App) GetFieldMappingDocByDeviceType(deviceType string) (*FieldMappingDoc, error) {
	return GetFieldMappingDocByDeviceType(deviceType)
}

func (a *App) GetFieldMappingDocByName(name string) (*FieldMappingDoc, error) {
	return GetFieldMappingDocByName(name)
}

func (a *App) AddFieldMappingDoc(doc FieldMappingDoc) error {
	return CreateFieldMappingDoc(&doc)
}

func (a *App) UpdateFieldMappingDoc(doc FieldMappingDoc) error {
	return UpdateFieldMappingDoc(&doc)
}

func (a *App) DeleteFieldMappingDoc(id uint) error {
	return DeleteFieldMappingDoc(id)
}

func (a *App) GetConfig() SystemConfig {
	return GetSystemConfig()
}

func (a *App) SaveConfig(config SystemConfig) error {
	return UpdateSystemConfig(config)
}

func (a *App) GetAlertRecords(page, pageSize int) ([]AlertRecord, int64) {
	return GetAlertRecords(page, pageSize)
}

func (a *App) TestRegex(pattern, testString string) map[string]interface{} {
	result := make(map[string]interface{})

	result["pattern"] = pattern
	result["testString"] = testString
	result["timestamp"] = time.Now().Format("2006-01-02 15:04:05")

	re, err := regexp.Compile(pattern)
	if err != nil {
		result["matched"] = false
		result["error"] = err.Error()
		return result
	}

	matches := re.FindAllString(testString, -1)
	result["matched"] = len(matches) > 0
	result["matches"] = matches

	groups := make(map[string]string)
	submatches := re.FindAllStringSubmatch(testString, -1)
	if len(submatches) > 0 {
		subexpNames := re.SubexpNames()
		for i, name := range subexpNames {
			if name != "" && i < len(submatches[0]) {
				groups[name] = submatches[0][i]
			}
		}
	}
	result["groups"] = groups

	if len(matches) > 0 {
		loc := re.FindStringIndex(testString)
		if loc != nil {
			result["position"] = map[string]int{
				"start": loc[0],
				"end":   loc[1],
			}
		}
	}

	return result
}

func (a *App) ExportTemplates(ids []uint) ([]Template, error) {
	var templates []Template
	for _, id := range ids {
		template, err := GetTemplateByID(id)
		if err != nil {
			continue
		}
		templates = append(templates, *template)
	}
	return templates, nil
}

func (a *App) ImportTemplates(templates []Template) error {
	for _, template := range templates {
		template.ID = 0
		template.CreatedAt = time.Now()
		template.UpdatedAt = time.Now()
		if err := CreateTemplate(&template); err != nil {
			return err
		}
	}
	return nil
}

func (a *App) GetDashboardStats() map[string]interface{} {
	stats := make(map[string]interface{})

	stats["totalLogs"] = GetLogCount()
	stats["deviceCount"] = GetDeviceCount()
	stats["matchedLogs"] = GetMatchedLogCount()
	stats["alertCount"] = GetAlertCount()
	stats["unmatchedLogs"] = GetUnmatchedLogsCount()
	stats["serviceRunning"] = a.syslogSvc != nil && a.syslogSvc.IsRunning()
	stats["listenPort"] = 0
	if a.syslogSvc != nil {
		stats["listenPort"] = a.syslogSvc.GetPort()
	}

	var robotCount int64
	GetDB().Model(&DingTalkRobot{}).Where("is_active = ?", true).Count(&robotCount)
	stats["activeRobots"] = robotCount

	var filterPolicyCount int64
	GetDB().Model(&FilterPolicy{}).Where("is_active = ?", true).Count(&filterPolicyCount)
	stats["activeFilterPolicies"] = filterPolicyCount

	var alertPolicyCount int64
	GetDB().Model(&AlertPolicy{}).Where("is_active = ?", true).Count(&alertPolicyCount)
	stats["activeAlertPolicies"] = alertPolicyCount

	var parseTemplateCount int64
	GetDB().Model(&ParseTemplate{}).Count(&parseTemplateCount)
	stats["parseTemplateCount"] = parseTemplateCount

	var m runtime.MemStats
	runtime.ReadMemStats(&m)
	stats["memoryUsage"] = m.Alloc / 1024 / 1024
	stats["goroutineCount"] = runtime.NumGoroutine()
	stats["cpuUsage"] = a.getCPUUsage()
	stats["receiveRate"] = a.getReceiveRate()
	stats["connections"] = a.getConnections()

	dbPath := getDatabasePath()
	if info, err := os.Stat(dbPath); err == nil {
		stats["databaseSize"] = info.Size()
	} else {
		stats["databaseSize"] = 0
	}

	stats["activeDevices"] = a.getActiveDevices()

	return stats
}

func (a *App) getActiveDevices() int64 {
	var count int64
	oneHourAgo := time.Now().Add(-1 * time.Hour)
	GetDB().Model(&SyslogLog{}).Where("received_at > ?", oneHourAgo).Distinct("source_ip").Count(&count)
	return count
}

func (a *App) getCPUUsage() float64 {
	var cpuUsage float64
	
	var m runtime.MemStats
	runtime.ReadMemStats(&m)
	
	totalTime := time.Since(a.startTime).Seconds()
	if totalTime > 0 {
		cpuTime := float64(m.Sys) / 1e9
		cpuUsage = (cpuTime / totalTime) * 100
		if cpuUsage > 100 {
			cpuUsage = 100
		}
	}
	
	return cpuUsage
}

func (a *App) getReceiveRate() float64 {
	if a.syslogSvc != nil {
		return a.syslogSvc.GetReceiveRate()
	}
	return 0.0
}

func (a *App) getConnections() int {
	if a.syslogSvc != nil {
		return a.syslogSvc.GetConnections()
	}
	return 0
}

func (a *App) CleanupLogs(days int) error {
	return CleanupOldLogs(days)
}

func (a *App) GetUnmatchedLogsCount() int64 {
	return GetUnmatchedLogsCount()
}

func (a *App) CleanupUnmatchedLogs(days int) error {
	return CleanupUnmatchedLogs(days)
}

type ParseTestRequest struct {
	ParseType      string `json:"parseType"`
	HeaderRegex    string `json:"headerRegex"`
	FieldMapping   string `json:"fieldMapping"`
	ValueTransform string `json:"valueTransform"`
	SampleLog      string `json:"sampleLog"`
}

type ParseTestResult struct {
	Success bool                   `json:"success"`
	Error   string                 `json:"error"`
	Fields  []string               `json:"fields"`
	Data    map[string]interface{} `json:"data"`
}

func (a *App) TestParseTemplate(req ParseTestRequest) ParseTestResult {
	result := ParseTestResult{
		Success: false,
		Fields:  []string{},
		Data:    make(map[string]interface{}),
	}

	if req.SampleLog == "" {
		result.Error = "请输入示例日志"
		return result
	}

	template := &ParseTemplate{
		ParseType:      req.ParseType,
		HeaderRegex:    req.HeaderRegex,
		FieldMapping:   req.FieldMapping,
		ValueTransform: req.ValueTransform,
	}

	parser, err := NewLogParser(template)
	if err != nil {
		result.Error = "解析器初始化失败: " + err.Error()
		return result
	}

	data, err := parser.Parse(req.SampleLog)
	if err != nil {
		result.Error = "解析失败: " + err.Error()
		return result
	}

	result.Success = true
	result.Data = data

	fieldSet := make(map[string]bool)
	for k := range data {
		fieldSet[k] = true
	}
	for k := range fieldSet {
		result.Fields = append(result.Fields, k)
	}

	return result
}

type PresetTemplate struct {
	ID             string `json:"id"`
	Name           string `json:"name"`
	DeviceType     string `json:"deviceType"`
	Description    string `json:"description"`
	ParseType      string `json:"parseType"`
	HeaderRegex    string `json:"headerRegex"`
	FieldMapping   string `json:"fieldMapping"`
	ValueTransform string `json:"valueTransform"`
	SampleLog      string `json:"sampleLog"`
}

func (a *App) GetPresetTemplates() []PresetTemplate {
	return []PresetTemplate{
		{
			ID:          "yunsuo-attack-success",
			Name:        "云锁 - 攻击成功告警",
			DeviceType:  "云锁",
			Description: "云锁服务器安全软件攻击成功事件告警",
			ParseType:   "syslog_json",
			HeaderRegex: `<(?P<priority>\d+)>(?P<timestamp>\w+ \d+ [\d:]+) (?P<hostname>\S+)`,
			SampleLog:   `<134>Mar 15 10:30:00 server01 {"event_type":"attack_success","attack_ip":"192.168.1.100","attack_type":"暴力破解","target_user":"admin","level":3,"description":"SSH暴力破解成功"}`,
		},
		{
			ID:          "yunsuo-high-risk",
			Name:        "云锁 - 高危告警",
			DeviceType:  "云锁",
			Description: "云锁高危安全事件告警",
			ParseType:   "syslog_json",
			HeaderRegex: `<(?P<priority>\d+)>(?P<timestamp>\w+ \d+ [\d:]+) (?P<hostname>\S+)`,
			SampleLog:   `<134>Mar 15 10:30:00 server01 {"event_type":"high_risk","attack_ip":"10.0.0.50","threat_name":"WebShell检测","file_path":"/var/www/html/shell.php","level":4,"description":"发现WebShell后门"}`,
		},
		{
			ID:          "yunsuo-abnormal-login",
			Name:        "云锁 - 异常登录",
			DeviceType:  "云锁",
			Description: "云锁异常登录检测告警",
			ParseType:   "syslog_json",
			HeaderRegex: `<(?P<priority>\d+)>(?P<timestamp>\w+ \d+ [\d:]+) (?P<hostname>\S+)`,
			SampleLog:   `<134>Mar 15 10:30:00 server01 {"event_type":"abnormal_login","login_ip":"203.0.113.50","login_user":"root","login_time":"2024-03-15 10:30:00","location":"美国","level":3,"description":"异地异常登录"}`,
		},
		{
			ID:          "generic-json",
			Name:        "通用 - JSON格式",
			DeviceType:  "通用",
			Description: "适用于纯JSON格式的日志",
			ParseType:   "json",
			SampleLog:   `{"timestamp":"2024-03-15T10:30:00Z","level":"error","source":"firewall","src_ip":"192.168.1.100","dst_ip":"10.0.0.1","action":"blocked","message":"可疑连接被阻止"}`,
		},
		{
			ID:          "generic-syslog-json",
			Name:        "通用 - Syslog + JSON",
			DeviceType:  "通用",
			Description: "适用于Syslog头部+JSON内容的日志格式",
			ParseType:   "syslog_json",
			HeaderRegex: `<(?P<priority>\d+)>(?P<timestamp>\w+ \d+ [\d:]+) (?P<hostname>\S+)`,
			SampleLog:   `<134>Mar 15 10:30:00 myhost {"type":"alert","severity":"high","source_ip":"192.168.1.50","message":"检测到异常流量"}`,
		},
		{
			ID:          "generic-kv",
			Name:        "通用 - 键值对格式",
			DeviceType:  "通用",
			Description: "适用于键值对格式的日志，如 key=value key2=value2",
			ParseType:   "kv",
			SampleLog:   `time=2024-03-15T10:30:00 src_ip=192.168.1.100 dst_ip=10.0.0.1 action=block reason="可疑连接" level=3`,
		},
	}
}

type TestSyslogRequest struct {
	Host       string `json:"host"`
	Port       int    `json:"port"`
	Protocol   string `json:"protocol"`
	Message    string `json:"message"`
	Count      int    `json:"count"`
	IntervalMs int    `json:"intervalMs"`
}

type TestSyslogResult struct {
	Success     bool     `json:"success"`
	Message     string   `json:"message"`
	SentCount   int      `json:"sentCount"`
	FailedCount int      `json:"failedCount"`
	Errors      []string `json:"errors"`
}

func (a *App) SendTestSyslog(req TestSyslogRequest) TestSyslogResult {
	result := TestSyslogResult{
		Success:     true,
		Errors:      []string{},
		SentCount:   0,
		FailedCount: 0,
	}

	if req.Host == "" {
		req.Host = "127.0.0.1"
	}
	if req.Port == 0 {
		req.Port = 5140
	}
	if req.Protocol == "" {
		req.Protocol = "udp"
	}
	if req.Count <= 0 {
		req.Count = 1
	}
	if req.IntervalMs < 0 {
		req.IntervalMs = 0
	}

	addr := fmt.Sprintf("%s:%d", req.Host, req.Port)

	var conn net.Conn
	var err error

	if req.Protocol == "tcp" {
		conn, err = net.Dial("tcp", addr)
	} else {
		conn, err = net.Dial("udp", addr)
	}

	if err != nil {
		result.Success = false
		result.Message = fmt.Sprintf("连接失败: %v", err)
		return result
	}
	defer conn.Close()

	for i := 0; i < req.Count; i++ {
		_, err := conn.Write([]byte(req.Message))
		if err != nil {
			result.FailedCount++
			result.Errors = append(result.Errors, fmt.Sprintf("第%d条发送失败: %v", i+1, err))
		} else {
			result.SentCount++
		}

		if req.IntervalMs > 0 && i < req.Count-1 {
			time.Sleep(time.Duration(req.IntervalMs) * time.Millisecond)
		}
	}

	if result.FailedCount > 0 {
		result.Success = false
		result.Message = fmt.Sprintf("发送完成，成功%d条，失败%d条", result.SentCount, result.FailedCount)
	} else {
		result.Message = fmt.Sprintf("成功发送%d条测试日志", result.SentCount)
	}

	return result
}

func (a *App) GetLocalIPs() []string {
	var ips []string

	addrs, err := net.InterfaceAddrs()
	if err != nil {
		return []string{"127.0.0.1"}
	}

	for _, addr := range addrs {
		if ipnet, ok := addr.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
				ips = append(ips, ipnet.IP.String())
			}
		}
	}

	if len(ips) == 0 {
		ips = append(ips, "127.0.0.1")
	}

	return ips
}
