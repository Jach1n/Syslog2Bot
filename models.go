package main

import (
	"time"

	"gorm.io/gorm"
)

type DeviceGroup struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	Name        string         `json:"name" gorm:"size:100;not null;unique"`
	Description string         `json:"description" gorm:"size:500"`
	Color       string         `json:"color" gorm:"size:20;default:'#409eff'"`
	SortOrder   int            `json:"sortOrder" gorm:"default:0"`
	CreatedAt   time.Time      `json:"createdAt"`
	UpdatedAt   time.Time      `json:"updatedAt"`
	DeletedAt   gorm.DeletedAt `json:"-" gorm:"index"`
}

type Device struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	Name        string         `json:"name" gorm:"size:100;not null"`
	IPAddress   string         `json:"ipAddress" gorm:"size:50;not null;uniqueIndex"`
	GroupID     uint           `json:"groupId" gorm:"index"`
	GroupName   string         `json:"groupName" gorm:"size:50;default:'default'"`
	Description string         `json:"description" gorm:"size:500"`
	IsActive    bool           `json:"isActive" gorm:"default:true"`
	CreatedAt   time.Time      `json:"createdAt"`
	UpdatedAt   time.Time      `json:"updatedAt"`
	DeletedAt   gorm.DeletedAt `json:"-" gorm:"index"`
}

type ParseTemplate struct {
	ID           uint           `json:"id" gorm:"primaryKey"`
	Name         string         `json:"name" gorm:"size:100;not null"`
	Description  string         `json:"description" gorm:"size:500"`
	ParseType    string         `json:"parseType" gorm:"size:20;default:'json'"` // json, regex, kv, syslog_json, smart_delimiter
	HeaderRegex  string         `json:"headerRegex" gorm:"type:text"`
	FieldMapping string         `json:"fieldMapping" gorm:"type:text"` // JSON格式字段映射
	ValueTransform string       `json:"valueTransform" gorm:"type:text"` // 值转换规则
	SampleLog    string         `json:"sampleLog" gorm:"type:text"`
	DeviceType   string         `json:"deviceType" gorm:"size:50"` // 云锁、防火墙等
	Delimiter    string         `json:"delimiter" gorm:"size:50"` // 分隔符（智能分隔符模式）
	TypeField    int            `json:"typeField" gorm:"default:0"` // 告警类型识别字段位置（智能分隔符模式）
	SubTemplates string         `json:"subTemplates" gorm:"type:text"` // 子模板配置（JSON格式）
	IsActive     bool           `json:"isActive" gorm:"default:true"`
	CreatedAt    time.Time      `json:"createdAt"`
	UpdatedAt    time.Time      `json:"updatedAt"`
	DeletedAt    gorm.DeletedAt `json:"-" gorm:"index"`
}

type OutputTemplate struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	Name        string         `json:"name" gorm:"size:100;not null"`
	Description string         `json:"description" gorm:"size:500"`
	Content     string         `json:"content" gorm:"type:text;not null"` // 模板内容，支持变量替换
	Fields      string         `json:"fields" gorm:"type:text"` // 可用字段列表
	DeviceType  string         `json:"deviceType" gorm:"size:50"`
	IsActive    bool           `json:"isActive" gorm:"default:true"`
	CreatedAt   time.Time      `json:"createdAt"`
	UpdatedAt   time.Time      `json:"updatedAt"`
	DeletedAt   gorm.DeletedAt `json:"-" gorm:"index"`
}

type FilterPolicy struct {
	ID             uint           `json:"id" gorm:"primaryKey"`
	Name           string         `json:"name" gorm:"size:100;not null"`
	Description    string         `json:"description" gorm:"size:500"`
	DeviceID       uint           `json:"deviceId" gorm:"index"` // 关联设备，0表示全部
	DeviceGroupID  uint           `json:"deviceGroupId" gorm:"index"` // 关联设备组，0表示全部
	ParseTemplateID uint          `json:"parseTemplateId" gorm:"index"`
	Conditions     string         `json:"conditions" gorm:"type:text"` // JSON格式筛选条件
	ConditionLogic string         `json:"conditionLogic" gorm:"size:10;default:'AND'"` // AND/OR
	Action         string         `json:"action" gorm:"size:20;default:'keep'"` // keep/discard
	Priority       int            `json:"priority" gorm:"default:0"`
	IsActive       bool           `json:"isActive" gorm:"default:true"`
	DedupEnabled   bool           `json:"dedupEnabled" gorm:"default:true"` // 告警去重开关
	DedupWindow    int            `json:"dedupWindow" gorm:"default:60"` // 去重时间窗口（秒）
	DropUnmatched  bool           `json:"dropUnmatched" gorm:"default:false"` // 未匹配策略的日志是否丢弃
	CreatedAt      time.Time      `json:"createdAt"`
	UpdatedAt      time.Time      `json:"updatedAt"`
	DeletedAt      gorm.DeletedAt `json:"-" gorm:"index"`
}

type AlertPolicy struct {
	ID               uint           `json:"id" gorm:"primaryKey"`
	Name             string         `json:"name" gorm:"size:100;not null"`
	Description      string         `json:"description" gorm:"size:500"`
	FilterPolicyID   uint           `json:"filterPolicyId" gorm:"index"` // 关联筛选策略
	RobotID          uint           `json:"robotId" gorm:"index"` // 钉钉机器人
	OutputTemplateID uint           `json:"outputTemplateId" gorm:"index"` // 输出模板
	DeviceID         uint           `json:"deviceId" gorm:"index"` // 关联设备
	DeviceGroupID    uint           `json:"deviceGroupId" gorm:"index"` // 关联设备组
	IsActive         bool           `json:"isActive" gorm:"default:true"`
	CreatedAt        time.Time      `json:"createdAt"`
	UpdatedAt        time.Time      `json:"updatedAt"`
	DeletedAt        gorm.DeletedAt `json:"-" gorm:"index"`
}

type SyslogLog struct {
	ID             uint      `json:"id" gorm:"primaryKey"`
	DeviceID       uint      `json:"deviceId" gorm:"index"`
	DeviceName     string    `json:"deviceName" gorm:"size:100;index"`
	SourceIP       string    `json:"sourceIp" gorm:"size:50;index"`
	RawMessage     string    `json:"rawMessage" gorm:"type:text"`
	ParsedData     string    `json:"parsedData" gorm:"type:text"` // JSON格式解析后的数据
	ParsedFields   string    `json:"parsedFields" gorm:"type:text"` // 提取的关键字段JSON
	FilterStatus   string    `json:"filterStatus" gorm:"size:20;default:'pending'"` // pending/matched/unmatched
	MatchedPolicyID uint     `json:"matchedPolicyId" gorm:"index"` // 匹配的筛选策略ID
	AlertStatus    string    `json:"alertStatus" gorm:"size:20;default:'none'"` // none/pending/sent/failed
	AlertPolicyID  uint      `json:"alertPolicyId" gorm:"index"`
	Priority       string    `json:"priority" gorm:"size:10"`
	Facility       int       `json:"facility"`
	Severity       int       `json:"severity"`
	Timestamp      time.Time `json:"timestamp" gorm:"index"`
	ReceivedAt     time.Time `json:"receivedAt" gorm:"index"`
	IsProcessed    bool      `json:"isProcessed" gorm:"default:false"`
	IsAlerted      bool      `json:"isAlerted" gorm:"default:false"`
}

type Template struct {
	ID           uint           `json:"id" gorm:"primaryKey"`
	Name         string         `json:"name" gorm:"size:100;not null"`
	Description  string         `json:"description" gorm:"size:500"`
	RuleRegex    string         `json:"ruleRegex" gorm:"type:text"`
	OutputFormat string         `json:"outputFormat" gorm:"type:text"`
	ExampleInput string         `json:"exampleInput" gorm:"type:text"`
	ExampleOutput string        `json:"exampleOutput" gorm:"type:text"`
	DeviceType   string         `json:"deviceType" gorm:"size:50"`
	IsActive     bool           `json:"isActive" gorm:"default:true"`
	CreatedAt    time.Time      `json:"createdAt"`
	UpdatedAt    time.Time      `json:"updatedAt"`
	DeletedAt    gorm.DeletedAt `json:"-" gorm:"index"`
}

type DingTalkRobot struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	Name        string         `json:"name" gorm:"size:100;not null"`
	WebhookURL  string         `json:"webhookUrl" gorm:"size:500;not null"`
	Secret      string         `json:"secret" gorm:"size:200"`
	Description string         `json:"description" gorm:"size:500"`
	IsActive    bool           `json:"isActive" gorm:"default:true"`
	CreatedAt   time.Time      `json:"createdAt"`
	UpdatedAt   time.Time      `json:"updatedAt"`
	DeletedAt   gorm.DeletedAt `json:"-" gorm:"index"`
}

type AlertRecord struct {
	ID            uint      `json:"id" gorm:"primaryKey"`
	LogID         uint      `json:"logId" gorm:"index"`
	RobotID       uint      `json:"robotId" gorm:"index"`
	AlertPolicyID uint      `json:"alertPolicyId" gorm:"index"`
	DeviceName    string    `json:"deviceName" gorm:"size:100"`
	Message       string    `json:"message" gorm:"type:text"`
	Status        string    `json:"status" gorm:"size:20"`
	ErrorMsg      string    `json:"errorMsg" gorm:"type:text"`
	SentAt        time.Time `json:"sentAt" gorm:"index"`
}

type SystemConfig struct {
	ID                    uint   `json:"id" gorm:"primaryKey"`
	ListenPort            int    `json:"listenPort" gorm:"default:5140"`
	Protocol              string `json:"protocol" gorm:"size:10;default:'udp'"` // udp or tcp
	LogRetention          int    `json:"logRetention" gorm:"default:7"`
	MaxLogSize            int64  `json:"maxLogSize" gorm:"default:524288000"`
	AutoStart             bool   `json:"autoStart" gorm:"default:false"`
	MinimizeToTray        bool   `json:"minimizeToTray" gorm:"default:true"`
	AlertEnabled          bool   `json:"alertEnabled" gorm:"default:true"`
	AlertInterval         int    `json:"alertInterval" gorm:"default:60"`
	UnmatchedLogRetention int    `json:"unmatchedLogRetention" gorm:"default:7"`
	UnmatchedLogAlert     bool   `json:"unmatchedLogAlert" gorm:"default:true"`
	DefaultFilterAction   string `json:"defaultFilterAction" gorm:"size:20;default:'keep'"`
	Theme                 string `json:"theme" gorm:"size:20;default:'dark'"`
	Language              string `json:"language" gorm:"size:10;default:'zh-CN'"`
	DataDir               string `json:"dataDir" gorm:"size:500"`
}

type FieldMappingDoc struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	Name        string         `json:"name" gorm:"size:100;not null"`
	DeviceType  string         `json:"deviceType" gorm:"size:50;not null;index"`
	Description string         `json:"description" gorm:"type:text"`
	FieldMappings string       `json:"fieldMappings" gorm:"type:text"`
	IsActive    bool           `json:"isActive" gorm:"default:true"`
	CreatedAt   time.Time      `json:"createdAt"`
	UpdatedAt   time.Time      `json:"updatedAt"`
	DeletedAt   gorm.DeletedAt `json:"-" gorm:"index"`
}
