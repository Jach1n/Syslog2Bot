# Syslog2Bot - 开发者文档

## 设计理念

### 核心目标

构建一个轻量级、跨平台的 Syslog 日志处理与告警系统，专注于：

1. **简单部署** - 单一可执行文件，无需复杂依赖
2. **灵活解析** - 支持多种日志格式，可自定义解析规则
3. **精准告警** - 基于策略的筛选和告警，避免告警风暴
4. **易扩展** - 模块化设计，便于添加新设备支持
5. **现代化 UI** - iOS 风格界面，透明标题栏，流畅动画

### 架构原则

- **前后端分离** - Wails 框架实现 Go 后端 + Vue 前端
- **纯 Go 实现** - SQLite 驱动使用纯 Go，无需 CGO，便于跨平台编译
- **异步处理** - 日志接收与处理分离，使用通道缓冲
- **策略驱动** - 所有解析、筛选、告警逻辑通过配置策略实现

---

## 系统架构

```
┌─────────────────────────────────────────────────────────────────┐
│                        Syslog Alert                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │  Vue 3 UI   │◄──►│  Wails Go   │◄──►│   SQLite    │         │
│  │  (前端)     │    │  (后端API)  │    │  (数据存储)  │         │
│  └─────────────┘    └──────┬──────┘    └─────────────┘         │
│                            │                                     │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Syslog Service                        │   │
│  │  ┌──────────┐   ┌──────────┐   ┌──────────┐            │   │
│  │  │ UDP接收  │──►│ 日志解析 │──►│ 筛选过滤 │──► 告警推送 │   │
│  │  │ (5140)   │   │ (Parser) │   │ (Filter) │            │   │
│  │  └──────────┘   └──────────┘   └──────────┘            │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 模块划分

| 模块 | 文件 | 职责 |
|------|------|------|
| 入口 | `main.go` | 应用初始化、平台配置 |
| 应用 | `app.go` | 应用生命周期、服务管理 |
| API | `api.go` | 前端调用的 Go 方法绑定 |
| 数据库 | `database.go` | 数据库连接、CRUD 操作 |
| 模型 | `models.go` | 数据结构定义 |
| 解析 | `parser.go` | 日志解析引擎 |
| 筛选 | `filter.go` | 筛选条件匹配引擎 |
| Syslog | `syslog_service.go` | UDP 服务、消息处理 |
| 钉钉 | `dingtalk.go` | 钉钉机器人消息推送 |
| 平台 | `platform_*.go` | 平台特定配置 |

### UI 架构

应用采用现代化的桌面 UI 设计：

```
┌─────────────────────────────────────────────────────────────────┐
│  标题栏 (透明) - Syslog2Bot v1.3.2 — By 迷人安全    [ON/OFF]   │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌─────────────────────────────────────────────┐  │
│  │ 🔔 Syslog│  │                                             │  │
│  │   2Bot   │  │              主内容区域                      │  │
│  ├──────────┤  │                                             │  │
│  │ 系统状态 │  │     - Dashboard (统计卡片、日志列表)         │  │
│  │ 工作流程 │  │     - 设备管理、解析模板、筛选策略等         │  │
│  │ 日志查看 │  │                                             │  │
│  │ 设备管理 │  │                                             │  │
│  │ 日志解析 │  │                                             │  │
│  │ 筛选策略 │  │                                             │  │
│  │ 映射文档 │  │                                             │  │
│  │ 数据推送 │  │                                             │  │
│  │ 测试工具 │  │                                             │  │
│  │ 系统设置 │  │                                             │  │
│  ├──────────┤  │                                             │  │
│  │  ◀ ▶    │  │                                             │  │
│  └──────────┘  └─────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

**UI 特性**：
- **透明标题栏** - macOS 原生标题栏透明，内容延伸到标题栏下方
- **自定义窗口控制** - 标题栏居中显示应用标题，右侧放置服务开关
- **可折叠侧边栏** - 支持展开/折叠，折叠时仅显示图标
- **深色主题** - iOS 风格深色界面，护眼舒适
- **流畅动画** - 页面切换、菜单展开等均有平滑过渡动画

---

## 数据存储

### 数据库位置

数据库存储在用户主目录下，确保更新应用时不会丢失数据：

- **macOS/Linux**: `~/.syslog-alert/syslog.db`
- **Windows**: `%USERPROFILE%\.syslog-alert\syslog.db`

### 数据迁移

从旧版本迁移数据：

```bash
# macOS/Linux
cp /path/to/old/data/syslog.db ~/.syslog-alert/syslog.db

# Windows
copy "C:\path\to\old\data\syslog.db" "%USERPROFILE%\.syslog-alert\syslog.db"
```

### 数据表结构

#### 核心配置表

| 表名 | 说明 | 主要字段 |
|------|------|----------|
| `devices` | 设备配置 | id, name, ip_address, parse_template_id, is_active |
| `device_groups` | 设备分组 | id, name, description |
| `field_mapping_docs` | 字段映射文档 | id, name, device_type, field_mappings |
| `parse_templates` | 解析模板 | id, name, parse_type, header_regex, field_mapping, value_transform |
| `filter_policies` | 筛选策略 | id, name, device_id, parse_template_id, conditions, dedup_enabled, dedup_window |
| `alert_policies` | 告警策略 | id, name, filter_policy_id, robot_id, output_template_id |
| `output_templates` | 输出模板 | id, name, content, device_type |
| `ding_talk_robots` | 钉钉机器人 | id, name, webhook_url, secret |

#### 日志相关表

| 表名 | 说明 | 主要字段 |
|------|------|----------|
| `syslog_logs` | 原始日志 | id, device_id, raw_message, filter_status, alert_status |
| `alert_records` | 告警记录 | id, log_id, robot_id, message, status |

### 配置查询命令

```bash
# 查看所有设备
sqlite3 ~/.syslog-alert/syslog.db "SELECT * FROM devices;"

# 查看解析模板
sqlite3 ~/.syslog-alert/syslog.db "SELECT id, name, parse_type, device_type FROM parse_templates;"

# 查看筛选策略
sqlite3 ~/.syslog-alert/syslog.db "SELECT id, name, device_id, conditions FROM filter_policies;"

# 查看告警策略
sqlite3 ~/.syslog-alert/syslog.db "SELECT id, name, filter_policy_id, robot_id FROM alert_policies;"

# 查看输出模板
sqlite3 ~/.syslog-alert/syslog.db "SELECT id, name, device_type FROM output_templates;"

# 查看最近日志
sqlite3 ~/.syslog-alert/syslog.db "SELECT id, device_name, filter_status, alert_status, received_at FROM syslog_logs ORDER BY id DESC LIMIT 10;"
```

### 配置关系图

```
设备(devices)
    │
    ├── parse_template_id ──► 解析模板(parse_templates)
    │                              │
    │                              ├── field_mapping: 字段映射
    │                              └── value_transform: 值转换
    │
    └── 筛选策略(filter_policies)
           │
           ├── device_id: 关联设备
           ├── parse_template_id: 解析模板
           └── conditions: 筛选条件
                  │
                  └── 告警策略(alert_policies)
                         │
                         ├── filter_policy_id: 关联筛选策略
                         ├── robot_id: 钉钉机器人
                         └── output_template_id: 输出模板
```

---

## 功能模块

### 1. 设备管理
- 设备信息配置（名称、IP地址）
- 设备分组管理
- 解析模板关联
- 设备状态监控

### 2. 映射文档库
- 存储设备 Syslog 字段映射文档
- 支持批量导入字段映射
- 按设备类型管理映射关系
- 支持嵌套字段结构（如天眼格式）

### 3. 解析模板
- 支持七种解析类型：`syslog_json`、`json`、`delimiter`、`keyvalue`、`regex`、`kv`、`smart_delimiter`
- 预设模板（云锁、天眼）一键配置
- 字段映射配置（支持拖拽排序）
- 值转换规则
- 实时预览解析效果
- 自动提取 Syslog 时间戳生成 `alertTime` 字段
- **智能分隔符解析**：
  - 支持根据告警类型自动选择子模板
  - 支持跳过 Syslog 头部（Header Regex 开关）
  - 支持自定义分隔符
  - 支持批量配置子模板字段位置
  - 支持子模板查看功能

### 4. 筛选策略
- 多条件组合筛选
- 支持 AND/OR 逻辑
- 丰富的操作符支持
- **告警去重功能**：
  - 可配置去重开关
  - 可配置去重时间窗口（默认60秒）
  - 去重依据：设备ID + 策略ID + 攻击IP + 威胁类型 + 事件描述

### 5. 告警策略
- 关联筛选策略
- 自定义输出模板
- 钉钉机器人推送
- 支持嵌套字段解析（如 `{{machine.ipv4}}`）

---

## 特殊功能说明

### 告警去重

在筛选策略中可配置告警去重功能，避免短时间内重复推送相同告警：

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| dedupEnabled | 是否启用去重 | true |
| dedupWindow | 去重时间窗口（秒） | 60 |

**去重逻辑**：
- 生成告警唯一键：`设备ID|策略ID|攻击IP|威胁类型|事件描述`
- 在时间窗口内，相同键的告警只推送一次
- 超过时间窗口后，重新计数

### Syslog 时间戳自动转换

对于 Syslog 格式的日志，系统会自动提取头部时间戳并转换：

```
原始日志：<14>Mar 09 14:30:31 hostname -: {...}

解析结果：
- timestamp: "Mar 09 14:30:31" (原始格式)
- alertTime: "2026-03-09 14:30:31" (转换后的完整时间)
```

### 嵌套字段解析

输出模板支持嵌套字段，使用 `.` 符号访问：

```markdown
**IPv4**: {{machine.ipv4}}
**系统名称**: {{machine.nickname}}
**告警详情**: {{action.text}}
```

### JSON 解析容错

解析器会自动处理以下问题：
- 日志末尾多余字符（如 `...}aa`）
- JSON 格式不完整
- 特殊字符转义

---

## 工作流程

### 数据流向

```
安全设备 ──(UDP 5140)──► Syslog Service
                              │
                              ▼
                        ┌──────────┐
                        │ 日志接收  │
                        └────┬─────┘
                             │
                             ▼
                        ┌──────────┐
                        │ 设备识别  │ ← 根据 Source IP 匹配设备
                        └────┬─────┘
                             │
                             ▼
                        ┌──────────┐
                        │ 日志解析  │ ← 应用解析模板
                        └────┬─────┘
                             │
                             ▼
                        ┌──────────┐
                        │ 策略筛选  │ ← 匹配筛选策略
                        └────┬─────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
         [匹配成功]     [匹配失败]     [无策略]
              │              │              │
              ▼              ▼              ▼
        ┌──────────┐   标记未匹配     保留原始日志
        │ 告警推送  │
        └──────────┘
              │
              ▼
        钉钉机器人
```

---

## 解析模板配置

### 解析类型

#### 1. syslog_json
适用于 Syslog 格式头部 + JSON 内容的日志（云锁等设备）

```
示例日志：
<134>Mar 15 10:30:00 hostname -: {"attackIp":"192.168.1.100","threatType":"暴力破解"}

配置：
- headerRegex: <(?P<priority>\d+)>(?P<timestamp>\w+ \d+ [\d:]+) (?P<hostname>\S+)[^{]*
- 字段映射会自动提取 JSON 内容
```

#### 2. json
适用于纯 JSON 格式日志

```json
{"attackIp":"192.168.1.100","threatType":"暴力破解","level":3}
```

#### 3. delimiter（分隔符）
适用于使用固定分隔符的日志（天眼等设备）

```
示例日志：
<142>Mar  5 14:41:44 hostname SyslogWriter[123]: webids_alert|!serialno|!rule_id|!...

配置：
- headerRegex: <(?P<priority>\d+)>(?P<timestamp>\w+\s+\d+\s+[\d:]+) (?P<hostname>\S+) (?P<program>\S+): (?P<alert_type>\w+)\|!
- fieldMapping: {
    "delimiter": "|!",
    "type_field": "alert_type",
    "type_mapping": {
      "webids_alert": ["alert_type", "serialno", "rule_id", ...],
      "ips_alert": ["alert_type", "serialno", "rule_id", ...]
    }
  }
```

#### 4. keyvalue（键值对分隔）
适用于分隔符分隔的键值对格式

```
示例日志：
updatetime:2022-12-29 15:44:28|!level:3|!serialno:214585853|!note:测试日志

配置：
- fieldMapping: {"delimiter": "|!", "kv_separator": ":"}
```

#### 5. regex
适用于非结构化日志

```
示例日志：
Attack from 192.168.1.100, type=暴力破解, level=3

配置：
- headerRegex: Attack from (?P<attackIp>[\d.]+), type=(?P<threatType>\S+), level=(?P<level>\d+)
```

#### 6. kv
适用于键值对格式

```
示例日志：
attackIp=192.168.1.100 threatType="暴力破解" level=3
```

#### 7. smart_delimiter（智能分隔符）
适用于同一设备有多种告警类型的日志（天眼等设备），根据告警类型自动选择子模板解析。

```
示例日志：
<142>Mar  5 16:28:31 hostname SyslogWriter[123]: webids_alert|!serialno|!rule_id|!rule_name|!...

配置：
- delimiter: 分隔符（默认 "|!"）
- typeField: 告警类型字段位置（默认 0）
- skipHeader: 是否跳过 Syslog 头部（true/false）
- headerRegex: 自定义头部正则（可选，默认匹配标准 Syslog 头部）
- subTemplates: 子模板配置
  {
    "webids_alert": {
      "alertNameField": 3,
      "attackIPField": 6,
      "victimIPField": 8,
      "alertTimeField": 4,
      "severityField": 10,
      "attackResultField": 26
    },
    "ioc_alert": {
      "alertNameField": 18,
      "attackIPField": 6,
      "victimIPField": 8,
      "alertTimeField": 10,
      "severityField": 12,
      "attackResultField": -1
    }
  }
```

**智能分隔符特性**：
- **自动识别告警类型**：根据指定位置的字段值选择对应的子模板
- **跳过 Syslog 头部**：开启后自动跳过 `<142>Mar  5 16:28:31 hostname program:` 格式的头部
- **毫秒级时间戳支持**：自动识别并转换毫秒级 Unix 时间戳
- **值转换**：支持对 severity、attackResult 等字段进行值转换

### 预设模板

系统提供预设模板，一键配置解析参数：

| 预设模板 | 解析类型 | 适用设备 |
|---------|---------|---------|
| 云锁 | syslog_json | 云锁安全设备 |
| 天眼 | delimiter | 天眼安全设备 |

### 字段映射

#### 简单格式（云锁）
```json
{
  "attackIp": "攻击者IP",
  "threatType": "威胁类型",
  "level": "威胁等级"
}
```

#### 嵌套格式（天眼）
```json
{
  "delimiter": "|!",
  "type_field": "alert_type",
  "type_mapping": {
    "webids_alert": ["alert_type", "serialno", "rule_id", "rule_name", "write_date", "vuln_type", "sip", "sport", "dip", "dport", "severity", ...],
    "ips_alert": ["alert_type", "serialno", "rule_id", ...]
  }
}
```

### 值转换

```json
{
  "severity": {
    "2": "低危",
    "3": "低危",
    "4": "中危",
    "5": "中危",
    "6": "高危",
    "7": "高危",
    "8": "危急",
    "9": "危急",
    "low": "低危",
    "medium": "中危",
    "high": "高危",
    "critical": "危急"
  },
  "attackResult": {
    "0": "失败",
    "1": "成功",
    "2": "失陷",
    "3": "失败"
  }
}
```

**值转换特性**：
- 支持数字和字符串类型的值
- 支持同一字段多种格式的转换（如 severity 同时支持数字和英文）
- 自动保留原始值到 `{字段名}Raw` 字段

---

## 筛选条件

### 条件格式

```json
[
  {"field": "threatType", "operator": "contains", "value": "暴力破解"},
  {"field": "level", "operator": ">=", "value": "3"}
]
```

### 支持的操作符

| 操作符 | 说明 | 示例 |
|--------|------|------|
| `==`, `equals` | 等于 | `{"field": "status", "operator": "==", "value": "success"}` |
| `!=`, `not_equals` | 不等于 | `{"field": "status", "operator": "!=", "value": "normal"}` |
| `contains` | 包含 | `{"field": "message", "operator": "contains", "value": "error"}` |
| `not_contains` | 不包含 | `{"field": "message", "operator": "not_contains", "value": "debug"}` |
| `starts_with` | 开头匹配 | `{"field": "ip", "operator": "starts_with", "value": "192.168"}` |
| `ends_with` | 结尾匹配 | `{"field": "file", "operator": "ends_with", "value": ".exe"}` |
| `regex`, `=~` | 正则匹配 | `{"field": "email", "operator": "regex", "value": "^[\\w.-]+@.*"}` |
| `>`, `gt` | 大于 | `{"field": "count", "operator": ">", "value": "100"}` |
| `>=`, `gte` | 大于等于 | `{"field": "level", "operator": ">=", "value": "3"}` |
| `<`, `lt` | 小于 | `{"field": "count", "operator": "<", "value": "10"}` |
| `<=`, `lte` | 小于等于 | `{"field": "level", "operator": "<=", "value": "2"}` |
| `in` | 在列表中 | `{"field": "severity", "operator": "in", "value": "高危,危急"}` |
| `not_in` | 不在列表中 | `{"field": "status", "operator": "not_in", "value": "normal,debug"}` |
| `exists` | 字段存在 | `{"field": "error", "operator": "exists", "value": ""}` |
| `not_exists` | 字段不存在 | `{"field": "error", "operator": "not_exists", "value": ""}` |

**注意**：
- `in` 操作符检查字段值是否在指定的逗号分隔列表中
- `contains` 操作符检查字段值是否包含指定字符串（不是检查是否在列表中）

---

## 输出模板

### 模板语法

使用 `{{字段名}}` 插入变量，支持嵌套字段：

```markdown
### 🚨 安全告警

**告警时间**: {{alertTime}}
**设备名称**: {{deviceName}}
**来源IP**: {{sourceIp}}
**威胁类型**: {{threatType}}
**攻击者IP**: {{attackIp}}
**IPv4**: {{machine.ipv4}}
**系统名称**: {{machine.nickname}}
**告警详情**: {{action.text}}
```

### 内置变量

| 变量 | 说明 |
|------|------|
| `deviceName` | 设备名称 |
| `deviceIP` | 设备 IP |
| `sourceIp` | 日志来源 IP |
| `rawMessage` | 原始日志内容 |
| `receivedAt` | 接收时间 |
| `timestamp` | 日志时间戳（原始格式，来自 Syslog 头部） |
| `alertTime` | 告警时间（转换后的完整时间格式） |
| `alertTimeRaw` | 告警时间（原始值） |
| `priority` | Syslog 优先级 |
| `hostname` | 主机名 |
| `program` | 程序名 |
| `alertType` | 告警类型（如 webids_alert、ioc_alert） |

### 告警时间自动转换

系统会自动识别并转换 `alertTime` 字段：

1. **秒级 Unix 时间戳**：`1773279539` → `2026-01-01 00:00:00`
2. **毫秒级 Unix 时间戳**：`1773123652000` → `2026-01-01 00:00:00`
3. **字符串格式**：保持原样

转换后的格式为 `YYYY-MM-DD HH:mm:ss`

### 嵌套字段

对于 JSON 日志中的嵌套对象，使用 `.` 符号访问：

```json
{
  "machine": {
    "ipv4": "10.0.0.24",
    "nickname": "测试服务器"
  },
  "action": {
    "text": "检测到可疑行为"
  }
}
```

模板中使用：
- `{{machine.ipv4}}` → `10.0.0.24`
- `{{machine.nickname}}` → `测试服务器`
- `{{action.text}}` → `检测到可疑行为`

---

## 支持的设备

| 设备类型 | 解析方式 | 预设模板 | 状态 |
|----------|----------|----------|------|
| 云锁安全 | syslog_json | ✅ 云锁 | ✅ 已支持 |
| 天眼安全 | smart_delimiter | ✅ 天眼-组合解析 | ✅ 已支持 |
| 椒图安全 | syslog_json | - | ✅ 已支持 |
| 其他设备 | regex/json | - | 🔧 可自定义 |

**天眼设备支持**：
- webids_alert：网页漏洞利用告警
- ioc_alert：威胁情报告警
- ips_alert：入侵防御告警
- webshell_alert：Webshell告警

---

## 扩展开发

### UI 定制

#### 标题栏配置

标题栏配置位于 `platform_darwin.go`：

```go
func applyPlatformOptions(appOptions *options.App) {
    appOptions.Mac = &mac.Options{
        TitleBar: &mac.TitleBar{
            TitlebarAppearsTransparent: true,  // 标题栏透明
            HideTitleBar:              false,  // 不隐藏标题栏
            FullSizeContent:           true,   // 内容延伸到标题栏
            HideTitle:                 true,   // 隐藏系统标题
        },
        WindowIsTranslucent: false,
    }
}
```

#### 主题颜色

主题颜色定义在 `frontend/src/assets/main.scss`：

```scss
:root {
  --bg-primary: #0d0d12;        // 主背景色
  --bg-secondary: #16161d;      // 次背景色
  --bg-card: #1a1a24;           // 卡片背景色
  --accent-color: #0a84ff;      // 强调色（iOS 蓝）
  --text-primary: #ffffff;      // 主文字色
  --text-secondary: #c8c8ce;    // 次文字色
  --border-color: rgba(255, 255, 255, 0.08);  // 边框色
}
```

#### 侧边栏配置

侧边栏组件位于 `frontend/src/components/Sidebar.vue`：

- 支持展开/折叠状态
- 菜单项配置在 `menuItems` 数组
- 图标使用 Element Plus Icons

### 添加新设备支持

1. 在「映射文档库」中添加设备字段映射文档
2. 创建设备特定的解析模板（可添加预设模板）
3. 配置字段映射和值转换
4. 创建筛选策略和告警策略

### 添加预设模板

在 `frontend/src/views/ParseTemplates.vue` 中添加预设：

```typescript
const presetTemplates = [
  { 
    value: 'new_device', 
    label: '新设备', 
    parseType: 'syslog_json',
    headerRegex: '正则表达式',
    fieldMapping: '字段映射JSON',
    valueTransform: '值转换JSON',
    desc: '设备描述'
  }
]
```

### 添加新的推送渠道

1. 在 `models.go` 中添加机器人模型
2. 创建推送方法文件（如 `wechat.go`）
3. 在 `api.go` 中添加管理 API
4. 前端添加配置界面

### 添加新的解析类型

1. 在 `parser.go` 中添加解析方法
2. 在 `Parse()` 方法中添加分支
3. 更新前端解析类型选项

---

## 调试技巧

### 启用开发模式

```bash
wails dev
```

### 查看日志

- 前端：浏览器开发者工具 Console
- 后端：终端输出

### 测试正则表达式

使用内置 API：

```go
TestParseTemplate(request ParseTestRequest) ParseTestResult
```

### 数据库查看

```bash
# macOS/Linux
sqlite3 ~/.syslog-alert/syslog.db

# Windows
sqlite3 "%USERPROFILE%\.syslog-alert\syslog.db"

# 常用命令
.tables
.schema syslog_logs
SELECT * FROM syslog_logs ORDER BY received_at DESC LIMIT 10;
```

---

## 常见问题排查

### 1. 日志不推送告警

**排查步骤**：

1. **检查日志状态**
   ```sql
   SELECT id, filter_status, matched_policy_id, parsed_data 
   FROM syslog_logs ORDER BY id DESC LIMIT 1;
   ```
   - `filter_status = "pending"`：告警处理未执行，检查服务是否启动、告警是否启用
   - `filter_status = "unmatched"`：筛选条件未匹配，检查筛选策略配置
   - `filter_status = "matched"`：已匹配，检查告警策略和机器人配置

2. **检查解析是否成功**
   - `parsed_data` 是否有内容
   - 如果为空，检查解析模板配置

3. **检查筛选条件**
   - 使用 `in` 操作符检查字段值是否在列表中
   - 使用 `contains` 操作符检查字段值是否包含字符串

### 2. 智能分隔符解析失败

**常见原因**：

1. **子模板键名不匹配**
   - 日志中的告警类型是 `webids_alert`，但子模板键名配置为 `webids`
   - 确保子模板键名与日志中的告警类型完全一致

2. **字段位置配置错误**
   - 检查字段位置是否正确（从 0 开始计数）
   - 使用测试功能验证解析结果

3. **未开启跳过头部**
   - 如果日志包含 Syslog 头部（如 `<142>Mar  5 16:28:31 hostname program:`），需要开启"跳过头部"

### 3. 告警时间显示错误

**常见原因**：

1. **字段位置错误**
   - 检查 `alertTimeField` 配置是否正确

2. **时间戳格式问题**
   - 系统支持秒级和毫秒级 Unix 时间戳自动转换
   - 如果时间显示为 `58158-01-19`，说明时间戳是毫秒级的，需要更新代码

### 4. 值转换不生效

**排查步骤**：

1. 检查 `value_transform` 配置是否正确
2. 确保字段名与配置中的键名一致
3. 确保值类型匹配（数字需要用字符串形式配置）

---

## 调试技巧

### 启用开发模式

```bash
wails dev
```

### 查看日志

- 前端：浏览器开发者工具 Console
- 后端：终端输出

### 测试正则表达式

使用内置 API：

```go
TestParseTemplate(request ParseTestRequest) ParseTestResult
```

### 数据库查看

```bash
# macOS/Linux
sqlite3 ~/.syslog-alert/syslog.db

# Windows
sqlite3 "%USERPROFILE%\.syslog-alert\syslog.db"

# 常用命令
.tables
.schema syslog_logs
SELECT * FROM syslog_logs ORDER BY received_at DESC LIMIT 10;
```
