package main

import (
	"context"
	"fmt"
	"net"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"sync"
	"time"

	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	ctx         context.Context
	syslogSvc   *SyslogService
	stats       SystemStats
	statsMutex  sync.RWMutex
	startTime   time.Time
}

type SystemStats struct {
	TotalLogs      int64   `json:"totalLogs"`
	DeviceCount    int     `json:"deviceCount"`
	ServiceRunning bool    `json:"serviceRunning"`
	ListenPort     int     `json:"listenPort"`
	StartTime      string  `json:"startTime"`
	MemoryUsage    uint64  `json:"memoryUsage"`
	CPUUsage       float64 `json:"cpuUsage"`
	Connections    int     `json:"connections"`
	ReceiveRate    float64 `json:"receiveRate"`
	Protocol       string  `json:"protocol"`
	DatabaseSize   int64   `json:"databaseSize"`
}

func NewApp() *App {
	return &App{
		stats: SystemStats{
			ListenPort: 5140,
		},
		startTime: time.Now(),
	}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	GetDB()
	a.syslogSvc = NewSyslogService(a)
	a.stats.StartTime = time.Now().Format("2006-01-02 15:04:05")
	go a.startLogCleanupTask()
}

func (a *App) startLogCleanupTask() {
	ticker := time.NewTicker(1 * time.Hour)
	defer ticker.Stop()

	for range ticker.C {
		a.cleanupLogsIfNeeded()
	}
}

func (a *App) cleanupLogsIfNeeded() {
	db := GetDB()
	var config SystemConfig
	if err := db.First(&config).Error; err != nil {
		return
	}

	var logCount int64
	db.Model(&SyslogLog{}).Count(&logCount)

	if logCount > 100000 {
		cutoff := time.Now().AddDate(0, 0, -config.LogRetention)
		db.Where("received_at < ?", cutoff).Delete(&SyslogLog{})
		db.Exec("VACUUM")
	}

	var alertCount int64
	db.Model(&AlertRecord{}).Count(&alertCount)

	if alertCount > 50000 {
		cutoff := time.Now().AddDate(0, 0, -7)
		db.Where("created_at < ?", cutoff).Delete(&AlertRecord{})
		db.Exec("VACUUM")
	}
}

func (a *App) GetSystemStats() SystemStats {
	a.statsMutex.RLock()
	defer a.statsMutex.RUnlock()

	var m runtime.MemStats
	runtime.ReadMemStats(&m)

	a.stats.MemoryUsage = m.Alloc / 1024 / 1024

	dbPath := getDatabasePath()
	if info, err := os.Stat(dbPath); err == nil {
		a.stats.DatabaseSize = info.Size()
	}

	return a.stats
}

func getDatabasePath() string {
	dataDir := getDataDir()
	return filepath.Join(dataDir, "syslog.db")
}

func (a *App) UpdateStats(logs int64, devices int, running bool) {
	a.statsMutex.Lock()
	defer a.statsMutex.Unlock()
	a.stats.TotalLogs = logs
	a.stats.DeviceCount = devices
	a.stats.ServiceRunning = running
}

func (a *App) StartSyslogService(port int, protocol string) error {
	if a.syslogSvc == nil {
		a.syslogSvc = NewSyslogService(a)
	}
	a.stats.ListenPort = port
	return a.syslogSvc.Start(port, protocol)
}

func (a *App) StopSyslogService() error {
	if a.syslogSvc != nil {
		return a.syslogSvc.Stop()
	}
	return nil
}

func (a *App) GetLocalIP() string {
	conn, err := net.Dial("udp", "8.8.8.8:80")
	if err != nil {
		return "127.0.0.1"
	}
	defer conn.Close()
	localAddr := conn.LocalAddr().(*net.UDPAddr)
	return localAddr.IP.String()
}

func (a *App) FormatSyslogMessage(msg string) map[string]string {
	result := make(map[string]string)

	parts := strings.SplitN(msg, " ", 6)
	if len(parts) >= 5 {
		result["priority"] = parts[0]
		result["timestamp"] = parts[1]
		result["hostname"] = parts[2]
		result["app"] = parts[3]
		result["pid"] = parts[4]
		if len(parts) > 5 {
			result["message"] = parts[5]
		}
	}
	result["raw"] = msg
	return result
}

func (a *App) TestDingTalkWebhook(webhookURL, secret string) (string, error) {
	return SendDingTalkTestMessage(webhookURL, secret)
}

func (a *App) GetAppVersion() string {
	return "1.3.3"
}

func (a *App) GetPlatformInfo() string {
	return fmt.Sprintf("%s/%s", runtime.GOOS, runtime.GOARCH)
}

func (a *App) WindowMinimise() {
	wailsRuntime.WindowMinimise(a.ctx)
}

func (a *App) WindowMaximise() {
	wailsRuntime.WindowMaximise(a.ctx)
}

func (a *App) WindowClose() {
	wailsRuntime.Quit(a.ctx)
}
