package main

import (
	"context"
	"fmt"
	"net"
	"runtime"
	"strings"
	"sync"
	"time"

	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	ctx        context.Context
	syslogSvc  *SyslogService
	stats      SystemStats
	statsMutex sync.RWMutex
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
}

func NewApp() *App {
	return &App{
		stats: SystemStats{
			ListenPort: 5140,
		},
	}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	GetDB()
	a.syslogSvc = NewSyslogService(a)
	a.stats.StartTime = time.Now().Format("2006-01-02 15:04:05")
}

func (a *App) GetSystemStats() SystemStats {
	a.statsMutex.RLock()
	defer a.statsMutex.RUnlock()

	var m runtime.MemStats
	runtime.ReadMemStats(&m)

	a.stats.MemoryUsage = m.Alloc / 1024 / 1024

	return a.stats
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
	return "1.0.0"
}

func (a *App) GetPlatformInfo() string {
	return fmt.Sprintf("%s/%s", "windows", "amd64")
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
