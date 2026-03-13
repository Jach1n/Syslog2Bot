# Windows 版本编译与运行指南

## 概述

本文档说明如何编译 Windows 版本的 Syslog2Bot，以及在 Windows 环境下运行所需的组件和环境。

---

## 一、编译 Windows 版本

### 1. 编译环境要求

在 macOS 上交叉编译 Windows 版本，需要安装：

```bash
# 安装 MinGW-w64 交叉编译工具链
brew install mingw-w64
```

### 2. 编译命令

```bash
# 在项目根目录执行
wails build --platform windows/amd64

# 或者编译 Windows ARM64 版本
wails build --platform windows/arm64
```

### 3. 编译输出

编译完成后，输出文件位于：
- `build/windows/Syslog2Bot.exe`

---

## 二、Windows 运行环境要求

### 1. 必需组件

| 组件 | 说明 | 是否需要预先安装 |
|------|------|------------------|
| **WebView2 运行时** | Wails 应用依赖 WebView2 渲染界面 | **需要**（Windows 10/11 通常已内置） |
| Go 运行时 | 不需要 | 应用已静态编译 |
| SQLite 驱动 | 不需要 | 使用纯 Go 实现，无需 CGO |
| 其他依赖库 | 不需要 | 单一可执行文件 |

### 2. WebView2 运行时

**检查是否已安装**：
- Windows 11 和 Windows 10 (1803+) 通常已内置 WebView2
- 打开"设置 → 应用 → 安装的应用"，搜索 "WebView"

**如果未安装**：
- 下载地址：https://developer.microsoft.com/en-us/microsoft-edge/webview2/
- 选择 "Evergreen Bootstrapper" 下载安装

---

## 三、数据库自动创建

### 1. 数据库位置

应用首次运行时，会自动创建数据库文件：

```
Windows: %USERPROFILE%\.syslog-alert\syslog.db
```

即：`C:\Users\<用户名>\.syslog-alert\syslog.db`

### 2. 自动创建逻辑

代码位置：`database.go`

```go
func getDataDir() string {
    homeDir, err := os.UserHomeDir()
    if err != nil {
        exePath, _ := os.Executable()
        return filepath.Join(filepath.Dir(exePath), "data")
    }
    return filepath.Join(homeDir, ".syslog-alert")
}
```

**创建流程**：
1. 获取用户主目录
2. 创建 `.syslog-alert` 文件夹（如果不存在）
3. 创建 `syslog.db` 数据库文件
4. 自动执行数据表迁移

### 3. 数据持久化

- 数据库文件存储在用户目录，与应用程序位置分离
- 更新应用程序不会影响已有数据
- 卸载应用后数据仍保留

---

## 四、部署步骤

### 方式一：直接部署

1. 将 `Syslog2Bot.exe` 复制到目标机器
2. 确保已安装 WebView2 运行时
3. 双击运行 `Syslog2Bot.exe`

### 方式二：打包分发

建议创建安装包，包含 WebView2 运行时：

```
Syslog2Bot-Setup/
├── Syslog2Bot.exe
├── WebView2Installer.exe (可选)
└── README.txt
```

---

## 五、常见问题

### Q1: 运行时提示缺少 WebView2

**解决方案**：
1. 下载并安装 WebView2 运行时
2. 或在应用中内置 WebView2 引导安装

### Q2: 数据库创建失败

**可能原因**：
- 用户目录权限不足
- 磁盘空间不足

**解决方案**：
- 以管理员身份运行
- 检查磁盘空间

### Q3: 端口被占用

默认监听 UDP 5140 端口，如果被占用：
- 在应用设置中修改监听端口
- 检查防火墙设置

---

## 六、技术优势

### 纯 Go SQLite 驱动

项目使用 `github.com/glebarez/sqlite` 而非传统的 `github.com/mattn/go-sqlite3`：

| 特性 | glebarez/sqlite | mattn/go-sqlite3 |
|------|-----------------|------------------|
| CGO 依赖 | ❌ 不需要 | ✅ 需要 |
| 跨平台编译 | ✅ 简单 | ❌ 复杂 |
| 运行时依赖 | ❌ 无 | ✅ 需要 C 运行时 |
| 性能 | 略低 | 略高 |

**优势**：
- 无需安装 C 编译器
- 无需额外的运行时库
- 交叉编译简单

---

## 七、执行计划

1. ✅ 分析项目构建配置
2. ✅ 确认数据库自动创建逻辑
3. ✅ 编写 Windows 编译与运行指南
4. ⏳ 执行 Windows 版本编译（待用户确认）
5. ⏳ 更新开发文档（待用户确认）
