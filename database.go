package main

import (
	"os"
	"path/filepath"
	"sync"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var (
	db   *gorm.DB
	once sync.Once
)

func getDataDir() string {
	// 优先使用环境变量中指定的路径（方便开发和测试）
	if envDataDir := os.Getenv("SYSLG_ALERT_DATA_DIR"); envDataDir != "" {
		return envDataDir
	}

	// 优先检查旧路径是否存在数据库（保持向后兼容）
	homeDir, err := os.UserHomeDir()
	if err == nil {
		oldPath := filepath.Join(homeDir, ".syslog-alert")
		if _, err := os.Stat(filepath.Join(oldPath, "syslog.db")); err == nil {
			return oldPath
		}
	}

	// 使用 exe 同目录的 data 文件夹
	exePath, err := os.Executable()
	if err == nil {
		return filepath.Join(filepath.Dir(exePath), "data")
	}

	// 备用方案
	if homeDir, err := os.UserHomeDir(); err == nil {
		return filepath.Join(homeDir, ".syslog-alert")
	}

	return "./data"
}

func GetDB() *gorm.DB {
	once.Do(func() {
		var err error
		dataDir := getDataDir()
		if err := os.MkdirAll(dataDir, 0755); err != nil {
			panic("Failed to create data directory: " + err.Error())
		}

		dbPath := filepath.Join(dataDir, "syslog.db")
		db, err = gorm.Open(sqlite.Open(dbPath+"?_journal_mode=WAL&_busy_timeout=5000&_sync=NORMAL"), &gorm.Config{
			Logger: logger.Default.LogMode(logger.Silent),
		})
		if err != nil {
			panic("Failed to connect database: " + err.Error())
		}

		sqlDB, err := db.DB()
		if err != nil {
			panic("Failed to get database connection: " + err.Error())
		}
		sqlDB.SetMaxOpenConns(1)
		sqlDB.SetMaxIdleConns(1)

		autoMigrate()
	})
	return db
}

func autoMigrate() {
	db.Exec("DROP INDEX IF EXISTS idx_field_mapping_docs_device_type")

	err := db.AutoMigrate(
		&DeviceGroup{},
		&Device{},
		&ParseTemplate{},
		&OutputTemplate{},
		&FilterPolicy{},
		&AlertPolicy{},
		&SyslogLog{},
		&Template{},
		&DingTalkRobot{},
		&AlertRecord{},
		&SystemConfig{},
		&FieldMappingDoc{},
	)
	if err != nil {
		panic("Failed to migrate database: " + err.Error())
	}

	initDefaultConfig()
	initDefaultTemplates()
	initDefaultFieldMappingDocs()
	initDefaultFilterPolicies()
}

func initDefaultConfig() {
	var config SystemConfig
	result := db.First(&config)
	if result.Error == gorm.ErrRecordNotFound {
		db.Create(&SystemConfig{
			ListenPort:            5140,
			LogRetention:          7,
			MaxLogSize:            524288000,
			AutoStart:             false,
			MinimizeToTray:        true,
			AlertEnabled:          true,
			AlertInterval:         60,
			UnmatchedLogRetention: 7,
			UnmatchedLogAlert:     true,
			DefaultFilterAction:   "keep",
			Theme:                 "dark",
			Language:              "zh-CN",
		})
	}
}

func initDefaultTemplates() {
	// 云锁解析模板 - 使用macApp中的配置
	var yunsuoCount int64
	db.Model(&ParseTemplate{}).Where("name = ?", "云锁-告警模板").Count(&yunsuoCount)
	if yunsuoCount == 0 {
		db.Create(&ParseTemplate{
			Name:           "云锁-告警模板",
			Description:    "解析云锁安全设备的syslog告警日志",
			ParseType:      "syslog_json",
			HeaderRegex:    `<(?P<priority>\d+)>(?P<timestamp>\w+ \d+ [\d:]+) (?P<hostname>\S+)[^{]*`,
			FieldMapping:   `{"alertTime":"告警时间","description":"事件描述","levelDesc":"威胁等级","threatType":"威胁类型","attackIp":"攻击IP","innerIp":"受害IP","machine.nickname":"系统名称","threatSource":"威胁来源","groupName":"分组名称","action.text":"告警详情","result":"防护状态","dealStatus":"处理状态"}`,
			ValueTransform: `{"result":{"0":"拦截","1":"未拦截"},"dealStatus":{"0":"未处理","1":"已处理（自动）","2":"已处理（手动）","3":"误报","4":"不关注","5":"处置失败","6":"处置中"}}`,
			DeviceType:     "云锁",
			IsActive:       true,
		})
	}

	// 天眼解析模板 - 使用macApp中的配置
	var tianyanCount int64
	db.Model(&ParseTemplate{}).Where("name = ?", "天眼-组合解析").Count(&tianyanCount)
	if tianyanCount == 0 {
		db.Create(&ParseTemplate{
			Name:           "天眼-组合解析",
			Description:    "解析天眼安全设备的告警日志，支持webids_alert、ips_alert和ioc_alert",
			ParseType:      "smart_delimiter",
			HeaderRegex:    "",
			FieldMapping:   `{"delimiter":"|!","typeField":0,"skipHeader":true,"headerRegex":"","subTemplates":{"webids_alert":{"alertNameField":3,"attackIPField":6,"victimIPField":8,"alertTimeField":4,"severityField":10,"attackResultField":26},"ips_alert":{"alertNameField":3,"attackIPField":6,"victimIPField":8,"alertTimeField":4,"severityField":10,"attackResultField":24},"ioc_alert":{"alertNameField":18,"attackIPField":6,"victimIPField":8,"alertTimeField":10,"severityField":12,"attackResultField":-1}}}`,
			ValueTransform: `{"severity":{"2":"低危","4":"中危","6":"高危","8":"危急"},"attackResult":{"0":"失败","1":"成功","2":"失陷","3":"失败"}}`,
			DeviceType:     "天眼",
			IsActive:       true,
		})
	}

	// 云锁输出模板 - 检查是否已存在
	var yunsuoOutputCount int64
	db.Model(&OutputTemplate{}).Where("device_type = ?", "云锁").Count(&yunsuoOutputCount)
	if yunsuoOutputCount == 0 {
		// 云锁输出模板
		db.Create(&OutputTemplate{
			Name:        "云锁-安全告警模板",
			Description: "云锁安全设备告警消息模板",
			Content: `### 🚨 云锁安全告警

**告警时间**: {{alertTime}}

**事件描述**: {{description}}

**威胁等级**: {{levelDesc}}

**威胁类型**: {{threatType}}

**攻击IP**: {{attackIp}}

**受害IP**: {{innerIp}}

**系统名称**: {{machine.nickname}}

**威胁来源**: {{threatSource}}

**分组名称**: {{groupName}}

**告警详情**: {{action.text}}

**防护状态**: {{result}}

**处理状态**: {{dealStatus}}`,
			Fields:     "alertTime,description,levelDesc,threatType,attackIp,innerIp,machine.nickname,threatSource,groupName,action.text,result,dealStatus",
			DeviceType: "云锁",
			IsActive:   true,
		})
	}

	// 天眼输出模板 - 检查是否已存在
	var tianyanOutputCount int64
	db.Model(&OutputTemplate{}).Where("device_type = ?", "天眼").Count(&tianyanOutputCount)
	if tianyanOutputCount == 0 {
		// 天眼输出模板
		db.Create(&OutputTemplate{
			Name:        "天眼-安全告警模板",
			Description: "天眼安全设备告警消息模板",
			Content: `### 🚨 天眼安全告警

**告警时间**: {{alertTime}}

**告警名称**: {{alertName}}

**攻击IP**: {{attackIP}}

**受害IP**: {{victimIP}}

**威胁等级**: {{severity}}

**攻击结果**: {{attackResult}}`,
			Fields:     "alertTime,alertName,attackIP,victimIP,severity,attackResult",
			DeviceType: "天眼",
			IsActive:   true,
		})
	}

	var count int64
	db.Model(&DeviceGroup{}).Count(&count)
	if count == 0 {
		db.Create(&DeviceGroup{
			Name:        "默认分组",
			Description: "默认设备分组",
			Color:       "#409eff",
			SortOrder:   0,
		})
	}
}

func initDefaultFieldMappingDocs() {
	// 云锁字段映射 - 检查是否已存在
	var yunsuoDocCount int64
	db.Model(&FieldMappingDoc{}).Where("device_type = ?", "云锁").Count(&yunsuoDocCount)
	if yunsuoDocCount == 0 {
		yunsuoMappings := `{
  "priority": "优先级",
  "timestamp": "时间戳",
  "hostname": "主机名",
  "accuracy": "告警精准度",
  "attackIp": "攻击者IP",
  "attackIpAddress": "攻击IP归属",
  "attackIpFlag": "攻击IP标记",
  "bannedStatus": "禁用状态",
  "categoryName": "分类名称",
  "categoryUuid": "分类UUID",
  "day": "日期",
  "dealStatus": "处理状态",
  "dealSuggestion": "处理建议",
  "dealTime": "处理时间",
  "description": "事件描述",
  "direction": "网络方向",
  "eventId": "事件ID",
  "eventUuid": "事件UUID",
  "groupName": "分组名称",
  "innerIp": "内网IP",
  "ip": "IP地址",
  "ipAddress": "IP归属",
  "levelDesc": "威胁等级",
  "localTimestamp": "本地时间",
  "loginUser": "登录用户",
  "logo": "产品标识",
  "machineUuid": "服务器UUID",
  "outerIp": "外网IP",
  "phase": "攻击阶段",
  "phaseDesc": "攻击阶段描述",
  "primarySource": "风险来源",
  "processingMethod": "处置类型",
  "result": "防护状态",
  "risk": "风险级别",
  "ruleDesc": "规则描述",
  "ruleId": "规则ID",
  "ruleName": "规则名称",
  "score": "风险评分",
  "serviceId": "服务ID",
  "source": "来源",
  "secondarySource": "二级来源",
  "sourceDesc": "来源描述",
  "standardTimestamp": "标准时间",
  "threatSource": "威胁来源",
  "threatType": "威胁类型",
  "typeName": "类型名称",
  "ucrc": "日志唯一值",
  "victimIpFlag": "受害IP标记",
  "action.text": "告警详情",
  "action.html": "告警HTML",
  "sourceIpAddress.city": "城市",
  "sourceIpAddress.country": "国家",
  "sourceIpAddress.ip": "来源IP",
  "sourceIpAddress.region": "省份",
  "sourceIpAddress.type": "网络类型",
  "machine.extranetIp": "外网IP",
  "machine.intranetIp": "内网IP",
  "machine.ipv4": "IPv4",
  "machine.ipv6": "IPv6",
  "machine.machineName": "服务器名称",
  "machine.onlineStatus": "在线状态",
  "machine.operatingSystem": "操作系统",
  "machine.osType": "系统类型",
  "machine.installTime": "安装时间",
  "machine.uuid": "服务器UUID",
  "subject.process": "进程名",
  "subject.user": "用户",
  "subject.pid": "进程ID",
  "subject.path": "进程路径",
  "subject.webPagePhysicalPath": "Web路径",
  "subject.procHash": "进程Hash",
  "object.ip": "目标IP",
  "object.port": "目标端口",
  "object.domain": "域名",
  "object.url": "URL",
  "object.path": "路径",
  "object.process": "进程",
  "object.cmdline": "命令行",
  "http.method": "请求方法",
  "http.url": "请求URL",
  "http.host": "目标主机",
  "http.userAgent": "UserAgent",
  "http.cookie": "Cookie",
  "http.referer": "Referer",
  "http.queryString": "查询参数"
}`
		db.Create(&FieldMappingDoc{
			Name:          "云锁字段映射",
			DeviceType:    "云锁",
			Description:   "云锁安全设备Syslog日志字段映射文档",
			FieldMappings: yunsuoMappings,
			IsActive:      true,
		})

		// 天眼字段映射
		tianyanMappings := `{
  "alertType": "告警类型",
  "alertName": "告警名称",
  "attackIP": "攻击IP",
  "victimIP": "受害IP",
  "alertTime": "告警时间",
  "severity": "威胁等级",
  "attackResult": "攻击结果",
  "srcIp": "源IP",
  "dstIp": "目标IP",
  "srcPort": "源端口",
  "dstPort": "目标端口",
  "protocol": "协议",
  "appProtocol": "应用协议",
  "url": "请求URL",
  "userAgent": "UserAgent",
  "method": "请求方法",
  "cookie": "Cookie",
  "referer": "Referer",
  "statusCode": "响应码",
  "responseSize": "响应大小",
  "requestSize": "请求大小",
  "country": "攻击IP归属国家",
  "city": "攻击IP归属城市",
  "isp": "攻击IP运营商",
  "latitude": "纬度",
  "longitude": "经度",
  "detail": "告警详情",
  "ruleName": "规则名称",
  "ruleId": "规则ID",
  "signatureId": "签名ID",
  "generatorId": "生成器ID",
  "classificationId": "分类ID",
  "priority": "优先级",
  "revision": "修订版本",
  "timestamp": "时间戳",
  "hostname": "设备主机名",
  "deviceIp": "设备IP",
  "deviceName": "设备名称",
  "sensorId": "传感器ID",
  "sensorName": "传感器名称"
}`
		db.Create(&FieldMappingDoc{
			Name:          "天眼字段映射",
			DeviceType:    "天眼",
			Description:   "天眼安全设备Syslog日志字段映射文档",
			FieldMappings: tianyanMappings,
			IsActive:      true,
		})
	}

	// 天眼字段映射 - 检查是否已存在
	var tianyanDocCount int64
	db.Model(&FieldMappingDoc{}).Where("device_type = ?", "天眼").Count(&tianyanDocCount)
	if tianyanDocCount == 0 {
		// 天眼字段映射
		tianyanMappings := `{
  "alertType": "告警类型",
  "alertName": "告警名称",
  "attackIP": "攻击IP",
  "victimIP": "受害IP",
  "alertTime": "告警时间",
  "severity": "威胁等级",
  "attackResult": "攻击结果",
  "srcIp": "源IP",
  "dstIp": "目标IP",
  "srcPort": "源端口",
  "dstPort": "目标端口",
  "protocol": "协议",
  "appProtocol": "应用协议",
  "url": "请求URL",
  "userAgent": "UserAgent",
  "method": "请求方法",
  "cookie": "Cookie",
  "referer": "Referer",
  "statusCode": "响应码",
  "responseSize": "响应大小",
  "requestSize": "请求大小",
  "country": "攻击IP归属国家",
  "city": "攻击IP归属城市",
  "isp": "攻击IP运营商",
  "latitude": "纬度",
  "longitude": "经度",
  "detail": "告警详情",
  "ruleName": "规则名称",
  "ruleId": "规则ID",
  "signatureId": "签名ID",
  "generatorId": "生成器ID",
  "classificationId": "分类ID",
  "priority": "优先级",
  "revision": "修订版本",
  "timestamp": "时间戳",
  "hostname": "设备主机名",
  "deviceIp": "设备IP",
  "deviceName": "设备名称",
  "sensorId": "传感器ID",
  "sensorName": "传感器名称"
}`
		db.Create(&FieldMappingDoc{
			Name:          "天眼字段映射",
			DeviceType:    "天眼",
			Description:   "天眼安全设备Syslog日志字段映射文档",
			FieldMappings: tianyanMappings,
			IsActive:      true,
		})
	}
}

func initDefaultFilterPolicies() {
	// 云锁筛选策略 - 使用macApp中的配置
	var yunsuoPolicyCount int64
	db.Model(&FilterPolicy{}).Where("name = ?", "云锁-高危告警通知").Count(&yunsuoPolicyCount)
	if yunsuoPolicyCount == 0 {
		var yunsuoTemplate ParseTemplate
		db.Where("name = ?", "云锁-告警模板").First(&yunsuoTemplate)

		if yunsuoTemplate.ID > 0 {
			db.Create(&FilterPolicy{
				Name:            "云锁-高危告警通知",
				Description:     "筛选云锁高危级别告警",
				DeviceID:        0,
				DeviceGroupID:   0,
				ParseTemplateID: yunsuoTemplate.ID,
				Conditions:      `[{"field":"levelDesc","operator":"equals","value":"高危"}]`,
				ConditionLogic:  "AND",
				Action:          "keep",
				Priority:        20,
				IsActive:        true,
			})
		}
	}

	// 天眼筛选策略 - 使用macApp中的配置
	var tianyanPolicyCount int64
	db.Model(&FilterPolicy{}).Where("name = ?", "天眼-高危告警").Count(&tianyanPolicyCount)
	if tianyanPolicyCount == 0 {
		var tianyanTemplate ParseTemplate
		db.Where("name = ?", "天眼-组合解析").First(&tianyanTemplate)

		if tianyanTemplate.ID > 0 {
			db.Create(&FilterPolicy{
				Name:            "天眼-高危告警",
				Description:     "筛选天眼高危级别告警(高危,危急)",
				DeviceID:        0,
				DeviceGroupID:   0,
				ParseTemplateID: tianyanTemplate.ID,
				Conditions:      `[{"field":"severity","operator":"in","value":"高危,危急"}]`,
				ConditionLogic:  "AND",
				Action:          "keep",
				Priority:        20,
				IsActive:        true,
			})
		}
	}
}

func GetSystemConfig() SystemConfig {
	var config SystemConfig
	db.First(&config)
	if config.DataDir == "" {
		config.DataDir = getDataDir()
	}
	return config
}

func UpdateSystemConfig(config SystemConfig) error {
	return db.Save(&config).Error
}

func CreateDeviceGroup(group *DeviceGroup) error {
	return db.Create(group).Error
}

func GetDeviceGroups() []DeviceGroup {
	var groups []DeviceGroup
	db.Order("sort_order ASC").Find(&groups)
	return groups
}

func GetDeviceGroupByID(id uint) (*DeviceGroup, error) {
	var group DeviceGroup
	err := db.First(&group, id).Error
	return &group, err
}

func UpdateDeviceGroup(group *DeviceGroup) error {
	return db.Save(group).Error
}

func DeleteDeviceGroup(id uint) error {
	return db.Delete(&DeviceGroup{}, id).Error
}

func CreateDevice(device *Device) error {
	return db.Create(device).Error
}

func GetDevices() []Device {
	var devices []Device
	db.Find(&devices)
	return devices
}

func GetDeviceByID(id uint) (*Device, error) {
	var device Device
	err := db.First(&device, id).Error
	return &device, err
}

func GetDeviceByIP(ip string) (*Device, error) {
	var device Device
	err := db.Where("ip_address = ?", ip).First(&device).Error
	return &device, err
}

func UpdateDevice(device *Device) error {
	return db.Save(device).Error
}

func DeleteDevice(id uint) error {
	return db.Delete(&Device{}, id).Error
}

func CreateParseTemplate(template *ParseTemplate) error {
	return db.Create(template).Error
}

func GetParseTemplates() []ParseTemplate {
	var templates []ParseTemplate
	db.Find(&templates)
	return templates
}

func GetParseTemplateByID(id uint) (*ParseTemplate, error) {
	var template ParseTemplate
	err := db.First(&template, id).Error
	return &template, err
}

func UpdateParseTemplate(template *ParseTemplate) error {
	return db.Save(template).Error
}

func DeleteParseTemplate(id uint) error {
	return db.Delete(&ParseTemplate{}, id).Error
}

func CreateOutputTemplate(template *OutputTemplate) error {
	return db.Create(template).Error
}

func GetOutputTemplates() []OutputTemplate {
	var templates []OutputTemplate
	db.Find(&templates)
	return templates
}

func GetOutputTemplateByID(id uint) (*OutputTemplate, error) {
	var template OutputTemplate
	err := db.First(&template, id).Error
	return &template, err
}

func UpdateOutputTemplate(template *OutputTemplate) error {
	return db.Save(template).Error
}

func DeleteOutputTemplate(id uint) error {
	return db.Delete(&OutputTemplate{}, id).Error
}

func CreateFilterPolicy(policy *FilterPolicy) error {
	return db.Create(policy).Error
}

func GetFilterPolicies() []FilterPolicy {
	var policies []FilterPolicy
	db.Order("priority DESC").Find(&policies)
	return policies
}

func GetFilterPoliciesByDeviceID(deviceID uint) []FilterPolicy {
	var policies []FilterPolicy
	db.Where("device_id = ? OR device_id = 0", deviceID).Order("priority DESC").Find(&policies)
	return policies
}

func GetFilterPoliciesByDeviceGroupID(groupID uint) []FilterPolicy {
	var policies []FilterPolicy
	db.Where("device_group_id = ? OR device_group_id = 0", groupID).Order("priority DESC").Find(&policies)
	return policies
}

func GetFilterPolicyByID(id uint) (*FilterPolicy, error) {
	var policy FilterPolicy
	err := db.First(&policy, id).Error
	return &policy, err
}

func UpdateFilterPolicy(policy *FilterPolicy) error {
	return db.Save(policy).Error
}

func DeleteFilterPolicy(id uint) error {
	return db.Delete(&FilterPolicy{}, id).Error
}

func CreateAlertPolicy(policy *AlertPolicy) error {
	return db.Create(policy).Error
}

func GetAlertPolicies() []AlertPolicy {
	var policies []AlertPolicy
	db.Find(&policies)
	return policies
}

func GetAlertPolicyByID(id uint) (*AlertPolicy, error) {
	var policy AlertPolicy
	err := db.First(&policy, id).Error
	return &policy, err
}

func UpdateAlertPolicy(policy *AlertPolicy) error {
	return db.Save(policy).Error
}

func DeleteAlertPolicy(id uint) error {
	return db.Delete(&AlertPolicy{}, id).Error
}

func CreateLog(log *SyslogLog) error {
	return db.Create(log).Error
}

func GetLogs(page, pageSize int, deviceID *int, startTime, endTime, keyword string) ([]SyslogLog, int64) {
	var logs []SyslogLog
	var total int64

	query := db.Model(&SyslogLog{})

	if deviceID != nil && *deviceID > 0 {
		query = query.Where("device_id = ?", *deviceID)
	}
	if startTime != "" {
		query = query.Where("received_at >= ?", startTime)
	}
	if endTime != "" {
		query = query.Where("received_at <= ?", endTime)
	}
	if keyword != "" {
		searchPattern := "%" + keyword + "%"
		query = query.Where("raw_message LIKE ? OR parsed_fields LIKE ?", searchPattern, searchPattern)
	}

	query.Count(&total)
	query.Order("received_at DESC").Offset((page - 1) * pageSize).Limit(pageSize).Find(&logs)

	return logs, total
}

func GetUnmatchedLogsCount() int64 {
	var count int64
	db.Model(&SyslogLog{}).Where("filter_status = ?", "unmatched").Count(&count)
	return count
}

func CreateTemplate(template *Template) error {
	return db.Create(template).Error
}

func GetTemplates() []Template {
	var templates []Template
	db.Find(&templates)
	return templates
}

func GetTemplateByID(id uint) (*Template, error) {
	var template Template
	err := db.First(&template, id).Error
	return &template, err
}

func UpdateTemplate(template *Template) error {
	return db.Save(template).Error
}

func DeleteTemplate(id uint) error {
	return db.Delete(&Template{}, id).Error
}

func CreateRobot(robot *DingTalkRobot) error {
	return db.Create(robot).Error
}

func GetRobots() []DingTalkRobot {
	var robots []DingTalkRobot
	db.Find(&robots)
	return robots
}

func GetRobotByID(id uint) (*DingTalkRobot, error) {
	var robot DingTalkRobot
	err := db.First(&robot, id).Error
	return &robot, err
}

func UpdateRobot(robot *DingTalkRobot) error {
	return db.Save(robot).Error
}

func DeleteRobot(id uint) error {
	return db.Delete(&DingTalkRobot{}, id).Error
}

func CreateAlertRecord(record *AlertRecord) error {
	return db.Create(record).Error
}

func GetAlertRecords(page, pageSize int) ([]AlertRecord, int64) {
	var records []AlertRecord
	var total int64

	db.Model(&AlertRecord{}).Count(&total)
	db.Order("sent_at DESC").Offset((page - 1) * pageSize).Limit(pageSize).Find(&records)

	return records, total
}

func GetLogCount() int64 {
	var count int64
	db.Model(&SyslogLog{}).Count(&count)
	return count
}

func GetDeviceCount() int64 {
	var count int64
	db.Model(&Device{}).Count(&count)
	return count
}

func GetMatchedLogCount() int64 {
	var count int64
	db.Model(&SyslogLog{}).Where("filter_status = ?", "matched").Count(&count)
	return count
}

func GetAlertCount() int64 {
	var count int64
	db.Model(&AlertRecord{}).Where("status = ?", "sent").Count(&count)
	return count
}

func CleanupOldLogs(days int) error {
	return db.Where("received_at < datetime('now', '-' || ? || ' days')", days).Delete(&SyslogLog{}).Error
}

func CleanupUnmatchedLogs(days int) error {
	return db.Where("filter_status = ? AND received_at < datetime('now', '-' || ? || ' days')", "unmatched", days).Delete(&SyslogLog{}).Error
}

func GetActiveAlertPolicies() []AlertPolicy {
	var policies []AlertPolicy
	db.Where("is_active = ?", true).Find(&policies)
	return policies
}

func GetAlertPoliciesByFilterPolicyID(filterPolicyID uint) []AlertPolicy {
	var policies []AlertPolicy
	db.Where("filter_policy_id = ? AND is_active = ?", filterPolicyID, true).Find(&policies)
	return policies
}

func UpdateLogFilterStatus(logID uint, status string, policyID uint) error {
	return db.Model(&SyslogLog{}).Where("id = ?", logID).Updates(map[string]interface{}{
		"filter_status":     status,
		"matched_policy_id": policyID,
	}).Error
}

func DeleteLog(logID uint) error {
	return db.Delete(&SyslogLog{}, logID).Error
}

func UpdateLogAlertStatus(logID uint, status string, policyID uint) error {
	return db.Model(&SyslogLog{}).Where("id = ?", logID).Updates(map[string]interface{}{
		"alert_status":    status,
		"alert_policy_id": policyID,
	}).Error
}

func UpdateLogParsedFields(logID uint, parsedData, parsedFields string) error {
	return db.Model(&SyslogLog{}).Where("id = ?", logID).Updates(map[string]interface{}{
		"parsed_data":   parsedData,
		"parsed_fields": parsedFields,
	}).Error
}

func CreateFieldMappingDoc(doc *FieldMappingDoc) error {
	return db.Create(doc).Error
}

func GetFieldMappingDocs() []FieldMappingDoc {
	var docs []FieldMappingDoc
	db.Order("device_type ASC").Find(&docs)
	return docs
}

func GetFieldMappingDocByID(id uint) (*FieldMappingDoc, error) {
	var doc FieldMappingDoc
	err := db.First(&doc, id).Error
	return &doc, err
}

func GetFieldMappingDocByDeviceType(deviceType string) (*FieldMappingDoc, error) {
	var doc FieldMappingDoc
	err := db.Where("device_type = ?", deviceType).First(&doc).Error
	return &doc, err
}

func GetFieldMappingDocByName(name string) (*FieldMappingDoc, error) {
	var doc FieldMappingDoc
	err := db.Where("name = ?", name).First(&doc).Error
	return &doc, err
}

func UpdateFieldMappingDoc(doc *FieldMappingDoc) error {
	return db.Save(doc).Error
}

func DeleteFieldMappingDoc(id uint) error {
	return db.Delete(&FieldMappingDoc{}, id).Error
}
