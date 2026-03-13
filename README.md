# Syslog2Bot - 安全设备告警推送系统

一款跨平台的 Syslog 日志接收与告警推送系统，支持解析多种安全设备日志并推送到钉钉机器人。

## 功能特性

- **Syslog 日志接收** - UDP 5140 端口接收日志
- **映射文档库** - 管理设备字段映射文档，支持批量导入
- **日志解析** - 支持多种解析方式，预设模板一键配置
- **筛选策略** - 灵活的日志过滤规则，支持多值匹配
- **告警推送** - 钉钉机器人消息推送
- **消息模板** - 自定义告警消息格式
- **深色/浅色主题** - iOS 风格界面
- **现代化 UI** - 透明标题栏、自定义窗口控制、流畅动画

## 技术栈

| 组件 | 技术 |
|------|------|
| 后端 | Go + Wails v2 |
| 前端 | Vue 3 + TypeScript + Element Plus |
| 数据库 | SQLite (纯 Go 实现) |
| 桌面框架 | Wails |

## 系统要求

### Windows
- Windows 10/11 (64位)
- WebView2 运行时 (Windows 10+ 通常已内置)

### macOS
- macOS 10.15 (Catalina) 或更高版本
- Intel 或 Apple Silicon (M1/M2/M3)

## 安装使用

### Windows

1. 下载 `Syslog2Bot.exe`
2. 双击运行即可

### macOS

1. 下载 `Syslog2Bot.app`
2. 首次运行：右键 → 打开 → 仍要打开

## 从源码构建

### 环境准备

**Windows:**
```bash
# 安装 Go
winget install GoLang.Go

# 安装 Node.js
winget install OpenJS.NodeJS.LTS

# 安装 Wails
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

**macOS:**
```bash
# 安装依赖
brew install go node

# 安装 Wails
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

### 编译

```bash
# 克隆仓库
git clone https://github.com/Jach1n/syslog-alert.git
cd syslog-alert

# Windows
wails build

# macOS
wails build -platform darwin/universal
```

## 使用说明

### 1. 配置设备

1. 进入「设备管理」模块
2. 添加安全设备信息（名称、IP地址）
3. 可选：选择解析模板关联设备

### 2. 配置映射文档（可选）

1. 进入「映射文档库」模块
2. 添加设备的 Syslog 字段映射文档
3. 支持批量导入字段映射关系
4. 解析模板可引用映射文档自动填充字段名称

### 3. 配置解析模板

1. 进入「日志解析」模块
2. 选择预设模板（云锁/天眼），一键配置
3. 或手动配置解析参数：
   - **Syslog + JSON** - 云锁等设备，Syslog头部 + JSON内容
   - **纯JSON** - 纯 JSON 格式日志
   - **分隔符** - 天眼等设备，使用 `|!` 分隔
   - **键值对分隔** - `key:value|!key2:value2` 格式
   - **正则表达式** - 非结构化日志
   - **键值对** - `key=value` 格式
4. 使用实时预览测试解析效果

### 4. 配置筛选策略

1. 进入「筛选策略」模块
2. 添加筛选规则，设置匹配条件和动作
3. 支持多条件组合匹配（AND/OR）
4. 支持的操作符：
   - 比较操作：`==`、`!=`、`>`、`>=`、`<`、`<=`
   - 字符串操作：`contains`、`not_contains`、`starts_with`、`ends_with`
   - 列表操作：`in`、`not_in`（多值匹配，用逗号分隔）
   - 正则匹配：`regex`
   - 存在检查：`exists`、`not_exists`

### 5. 配置告警推送

1. 进入「机器人配置」添加钉钉机器人
2. 创建输出模板定义告警消息格式
3. 添加告警策略，关联筛选策略、机器人和消息模板

### 6. 启动服务

1. 在「系统状态」页面启动 Syslog 服务
2. 配置安全设备发送 Syslog 到本机 5140 端口

## 支持的设备

| 设备类型 | 解析方式 | 预设模板 | 状态 |
|----------|----------|----------|------|
| 云锁安全 | syslog_json | ✅ 云锁 | ✅ 已支持 |
| 天眼安全 | delimiter | ✅ 天眼 | ✅ 已支持 |
| 椒图安全 | syslog_json | - | ✅ 已支持 |
| 其他设备 | regex/json | - | 🔧 可自定义 |

## 预设模板使用

### 云锁预设

选择"云锁"预设模板，自动配置：
- 解析类型：Syslog + JSON
- 头部正则：匹配 Syslog 头部
- 值转换：防护状态、处理状态自动转换

### 天眼预设

选择"天眼"预设模板，自动配置：
- 解析类型：分隔符
- 头部正则：匹配 Syslog 头部并提取告警类型
- 字段映射：根据告警类型自动映射字段名称
  - `webids_alert`：网页漏洞利用告警
  - `webshell_alert`：webshell上传告警
  - `ips_alert`：网络攻击告警
  - `ioc_alert`：威胁情报告警
- 值转换：威胁等级、攻击结果自动转换

## 数据存储

数据库存储在用户主目录下，更新应用不会丢失数据：

- **macOS/Linux**: `~/.syslog-alert/syslog.db`
- **Windows**: `%USERPROFILE%\.syslog-alert\syslog.db`

## 项目结构

```
syslog-alert/
├── main.go              # 主入口
├── app.go               # 应用逻辑
├── database.go          # 数据库操作
├── models.go            # 数据模型
├── parser.go            # 日志解析
├── filter.go            # 日志过滤
├── dingtalk.go          # 钉钉推送
├── syslog_service.go    # Syslog 服务
├── platform_windows.go  # Windows 平台配置
├── platform_darwin.go   # macOS 平台配置
├── frontend/            # 前端代码
│   └── src/
│       ├── views/       # 页面组件
│       │   ├── Dashboard.vue        # 系统状态
│       │   ├── Devices.vue          # 设备管理
│       │   ├── FieldMappingDocs.vue # 映射文档库
│       │   ├── ParseTemplates.vue   # 解析模板
│       │   ├── FilterPolicies.vue   # 筛选策略
│       │   ├── Robots.vue           # 机器人配置
│       │   ├── Logs.vue             # 日志查看
│       │   └── Settings.vue         # 系统设置
│       ├── components/  # 通用组件
│       ├── stores/      # 状态管理
│       └── router/      # 路由配置
└── build/               # 构建输出
```

## 开发计划

- [x] 映射文档库管理
- [x] 多值筛选（in/not_in）
- [x] 嵌套 JSON 字段扁平化
- [x] 天眼设备支持
- [x] 预设解析模板
- [x] 数据库持久化存储
- [ ] 支持更多安全设备
- [ ] 企业微信机器人支持
- [ ] 飞书机器人支持
- [ ] 邮件告警支持
- [ ] 日志统计分析
- [ ] 告警聚合功能

## 文档

- [用户手册](README.md) - 安装和使用指南
- [开发者文档](DEVELOPMENT.md) - 架构设计、API 参考和扩展开发

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
