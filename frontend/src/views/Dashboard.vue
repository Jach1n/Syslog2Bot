<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { ElMessage } from 'element-plus'
import { GetLocalIP, GetDashboardStats } from '../../wailsjs/go/main/App'

const appStore = useAppStore()

const localIP = ref('')
const port = ref(5140)
const protocol = ref('udp')
let refreshTimer: number | null = null

const protocols = [
  { value: 'udp', label: 'UDP' },
  { value: 'tcp', label: 'TCP' }
]

const systemStats = ref({
  totalLogs: 0,
  deviceCount: 0,
  matchedLogs: 0,
  alertCount: 0,
  parseTemplateCount: 0,
  activeFilterPolicies: 0,
  activeAlertPolicies: 0,
  activeRobots: 0,
  memoryUsage: 0,
  cpuUsage: 0,
  goroutineCount: 0,
  connections: 0,
  receiveRate: 0,
  databaseSize: 0,
  activeDevices: 0
})

const receiveRateHistory = ref<number[]>([])
const memoryHistory = ref<number[]>([])
const maxHistoryPoints = 60

onMounted(async () => {
  await appStore.refreshStats()
  try {
    localIP.value = await GetLocalIP()
  } catch (e) {
    localIP.value = '127.0.0.1'
  }
  port.value = appStore.listenPort
  protocol.value = appStore.protocol || 'udp'
  
  await loadSystemStats()
  
  refreshTimer = window.setInterval(() => {
    appStore.refreshStats()
    loadSystemStats()
  }, 5000)
})

onUnmounted(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
  }
})

async function loadSystemStats() {
  try {
    const stats = await GetDashboardStats()
    systemStats.value = {
      totalLogs: stats.totalLogs || 0,
      deviceCount: stats.deviceCount || 0,
      matchedLogs: stats.matchedLogs || 0,
      alertCount: stats.alertCount || 0,
      parseTemplateCount: stats.parseTemplateCount || 0,
      activeFilterPolicies: stats.activeFilterPolicies || 0,
      activeAlertPolicies: stats.activeAlertPolicies || 0,
      activeRobots: stats.activeRobots || 0,
      memoryUsage: stats.memoryUsage || 0,
      cpuUsage: stats.cpuUsage || 0,
      goroutineCount: stats.goroutineCount || 0,
      connections: stats.connections || 0,
      receiveRate: stats.receiveRate || 0,
      databaseSize: stats.databaseSize || 0,
      activeDevices: stats.activeDevices || 0
    }
    
    receiveRateHistory.value.push(stats.receiveRate || 0)
    if (receiveRateHistory.value.length > maxHistoryPoints) {
      receiveRateHistory.value.shift()
    }
    
    memoryHistory.value.push(stats.memoryUsage || 0)
    if (memoryHistory.value.length > maxHistoryPoints) {
      memoryHistory.value.shift()
    }
  } catch (e) {
    console.error(e)
  }
}

async function handleStart() {
  try {
    await appStore.startService(port.value, protocol.value)
    ElMessage.success('Syslog服务启动成功')
  } catch (error: any) {
    ElMessage.error('启动失败: ' + (error.message || error))
  }
}

async function handleStop() {
  try {
    await appStore.stopService()
    ElMessage.success('Syslog服务已停止')
  } catch (error: any) {
    ElMessage.error('停止失败: ' + (error.message || error))
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function formatSize(bytes: number): string {
  return formatBytes(bytes)
}

function formatUptime(seconds: number): string {
  if (seconds < 60) return `${Math.floor(seconds)}秒`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}分钟`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}小时${Math.floor((seconds % 3600) / 60)}分`
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  return `${days}天${hours}小时`
}

function getSmoothPath(data: number[]): string {
  if (data.length < 2) return ''
  const maxVal = Math.max(...data, 1)
  const points = data.map((v, i) => ({
    x: i * (100 / (maxHistoryPoints - 1)),
    y: 40 - (v / maxVal) * 35
  }))
  
  let path = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const cpx = (prev.x + curr.x) / 2
    path += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`
  }
  path += ` L ${points[points.length - 1].x} 40 L ${points[0].x} 40 Z`
  return path
}

function getSmoothLinePath(data: number[]): string {
  if (data.length < 2) return ''
  const maxVal = Math.max(...data, 1)
  const points = data.map((v, i) => ({
    x: i * (100 / (maxHistoryPoints - 1)),
    y: 40 - (v / maxVal) * 35
  }))
  
  let path = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const cpx = (prev.x + curr.x) / 2
    path += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`
  }
  return path
}
</script>

<template>
  <div class="dashboard">
    <div class="top-row">
      <div class="service-control">
        <div class="control-card">
          <div class="card-header">
            <span>Syslog 服务控制</span>
            <el-tag :type="appStore.serviceRunning ? 'success' : 'danger'" size="small">
              {{ appStore.serviceRunning ? '运行中' : '已停止' }}
            </el-tag>
          </div>
          
          <div class="control-content">
            <div class="info-row">
              <div class="info-item">
                <span class="label">监听地址:</span>
                <span class="value">{{ localIP || '127.0.0.1' }}</span>
              </div>
              <div class="info-item">
                <span class="label">监听端口:</span>
                <span class="value">{{ port }}</span>
              </div>
              <div class="info-item">
                <span class="label">协议类型:</span>
                <span class="value">{{ protocol.toUpperCase() }}</span>
              </div>
            </div>
            
            <div class="button-row">
              <el-button type="primary" :disabled="appStore.serviceRunning" @click="handleStart">
                <el-icon><VideoPlay /></el-icon>
                启动服务
              </el-button>
              <el-button type="danger" :disabled="!appStore.serviceRunning" @click="handleStop">
                <el-icon><VideoPause /></el-icon>
                停止服务
              </el-button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="stats-panel">
        <div class="panel-header">系统状态</div>
        <div class="stats-grid">
          <div class="stat-item">
            <el-icon class="stat-icon" :size="28"><Document /></el-icon>
            <div class="stat-info">
              <div class="stat-value">{{ systemStats.totalLogs }}</div>
              <div class="stat-title">日志总数</div>
            </div>
          </div>
          
          <div class="stat-item">
            <el-icon class="stat-icon" :size="28"><Check /></el-icon>
            <div class="stat-info">
              <div class="stat-value">{{ systemStats.matchedLogs }}</div>
              <div class="stat-title">匹配日志</div>
            </div>
          </div>
          
          <div class="stat-item">
            <el-icon class="stat-icon" :size="28"><Bell /></el-icon>
            <div class="stat-info">
              <div class="stat-value">{{ systemStats.alertCount }}</div>
              <div class="stat-title">告警次数</div>
            </div>
          </div>
          
          <div class="stat-item">
            <el-icon class="stat-icon" :size="28"><Monitor /></el-icon>
            <div class="stat-info">
              <div class="stat-value">{{ systemStats.deviceCount }}</div>
              <div class="stat-title">设备数量</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="system-resources">
      <div class="resource-card">
        <div class="card-header">资源使用情况</div>
        <div class="resource-grid">
          <div class="resource-item">
            <div class="resource-header">
              <el-icon><Cpu /></el-icon>
              <span>内存使用</span>
            </div>
            <div class="resource-value">{{ systemStats.memoryUsage }} MB</div>
            <div class="resource-bar">
              <div class="bar-fill" :style="{ width: Math.min(systemStats.memoryUsage / 500 * 100, 100) + '%' }"></div>
            </div>
          </div>
          
          <div class="resource-item">
            <div class="resource-header">
              <el-icon><TrendCharts /></el-icon>
              <span>CPU使用率</span>
            </div>
            <div class="resource-value">{{ systemStats.cpuUsage.toFixed(1) }}%</div>
            <div class="resource-bar">
              <div class="bar-fill" :style="{ width: Math.min(systemStats.cpuUsage, 100) + '%' }"></div>
            </div>
          </div>
          
          <div class="resource-item">
            <div class="resource-header">
              <el-icon><DataLine /></el-icon>
              <span>Goroutines</span>
            </div>
            <div class="resource-value">{{ systemStats.goroutineCount }}</div>
            <div class="resource-bar">
              <div class="bar-fill" :style="{ width: Math.min(systemStats.goroutineCount / 100 * 100, 100) + '%' }"></div>
            </div>
          </div>
          
          <div class="resource-item">
            <div class="resource-header">
              <el-icon><TrendCharts /></el-icon>
              <span>处理速率</span>
            </div>
            <div class="resource-value">{{ systemStats.receiveRate.toFixed(1) }}/秒</div>
            <div class="resource-bar">
              <div class="bar-fill" :style="{ width: Math.min(systemStats.receiveRate / 100 * 100, 100) + '%' }"></div>
            </div>
          </div>
          
          <div class="resource-item">
            <div class="resource-header">
              <el-icon><DataLine /></el-icon>
              <span>数据库大小</span>
            </div>
            <div class="resource-value">{{ formatSize(systemStats.databaseSize) }}</div>
            <div class="resource-bar">
              <div class="bar-fill" :style="{ width: Math.min(systemStats.databaseSize / 524288000 * 100, 100) + '%' }"></div>
            </div>
          </div>
          
          <div class="resource-item">
            <div class="resource-header">
              <el-icon><Connection /></el-icon>
              <span>活跃服务器</span>
            </div>
            <div class="resource-value">{{ systemStats.activeDevices }} 台</div>
            <div class="resource-bar">
              <div class="bar-fill" :style="{ width: Math.min(systemStats.activeDevices / 50 * 100, 100) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  padding: 4px;
  
  .top-row {
    display: flex;
    gap: 20px;
    margin-bottom: 24px;
    align-items: stretch;
    
    .service-control {
      flex: 0 0 280px;
      display: flex;
      
      .control-card {
        width: 100%;
        background: var(--el-bg-color);
        border-radius: 12px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
        border: 1px solid var(--el-border-color-lighter);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 18px;
          border-bottom: 1px solid var(--el-border-color-lighter);
          font-weight: 500;
          font-size: 14px;
          flex-shrink: 0;
        }
        
        .control-content {
          padding: 20px 18px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          
          .info-row {
            display: flex;
            flex-direction: column;
            gap: 14px;
            margin-bottom: 24px;
            
            .info-item {
              display: flex;
              align-items: center;
              padding: 8px 0;
              
              .label {
                width: 75px;
                color: var(--el-text-color-secondary);
                font-size: 13px;
              }
              
              .value {
                font-size: 14px;
                font-weight: 500;
              }
            }
          }
          
          .button-row {
            display: flex;
            gap: 12px;
          }
        }
      }
    }
    
    .stats-panel {
      flex: 1;
      background: var(--el-bg-color);
      border-radius: 12px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
      border: 1px solid var(--el-border-color-lighter);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      
      .panel-header {
        padding: 14px 18px;
        border-bottom: 1px solid var(--el-border-color-lighter);
        font-weight: 500;
        font-size: 14px;
      }
      
      .stats-grid {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 1px;
        background: var(--el-border-color-lighter);
        
        .stat-item {
          background: var(--el-bg-color);
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s;
          
          &:hover {
            background: var(--el-fill-color-light);
          }
          
          .stat-icon {
            color: #a0cfff;
          }
          
          .stat-info {
            text-align: center;
            
            .stat-value {
              font-size: 22px;
              font-weight: 600;
              color: var(--el-text-color-primary);
              line-height: 1.2;
            }
            
            .stat-title {
              font-size: 12px;
              color: var(--el-text-color-secondary);
              margin-top: 2px;
            }
          }
        }
      }
    }
  }
  
  .system-resources {
    .resource-card {
      background: var(--el-bg-color);
      border-radius: 12px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
      border: 1px solid var(--el-border-color-lighter);
      overflow: hidden;
      
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 18px;
        border-bottom: 1px solid var(--el-border-color-lighter);
        font-weight: 500;
        font-size: 14px;
      }
    }
    
    .resource-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 16px;
      padding: 16px;
      
      .resource-item {
        padding: 24px;
        background: var(--el-fill-color-lighter);
        border-radius: 10px;
        text-align: center;
        transition: all 0.3s ease;
        
        &:hover {
          background: var(--el-fill-color);
          transform: translateY(-2px);
        }
        
        .resource-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 13px;
          color: var(--el-text-color-secondary);
          margin-bottom: 12px;
        }
        
        .resource-value {
          font-size: 24px;
          font-weight: 600;
          color: var(--el-text-color-primary);
          margin-bottom: 12px;
        }
        
        .resource-bar {
          height: 6px;
          background: var(--el-fill-color);
          border-radius: 3px;
          overflow: hidden;
          
          .bar-fill {
            height: 100%;
            background: linear-gradient(90deg, #409eff, #67c23a);
            border-radius: 3px;
            transition: width 0.3s ease;
          }
        }
        
        &.chart-item {
          padding: 24px;
          background: var(--el-fill-color-lighter);
          border-radius: 10px;
          text-align: center;
          transition: all 0.3s ease;
          
          &:hover {
            background: var(--el-fill-color);
            transform: translateY(-2px);
          }
          
          .resource-header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            font-size: 13px;
            color: var(--el-text-color-secondary);
            margin-bottom: 12px;
          }
          
          .mini-chart {
            height: 60px;
            margin-top: 12px;
            background: linear-gradient(180deg, rgba(64, 158, 255, 0.05) 0%, transparent 100%);
            border-radius: 6px;
            padding: 6px;
            
            svg {
              width: 100%;
              height: 100%;
              
              polyline {
                filter: drop-shadow(0 0 3px currentColor);
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 1100px) {
  .dashboard {
    .top-row {
      flex-direction: column;
      
      .service-control {
        flex: none;
        width: 100%;
        
        .control-card {
          max-width: 100%;
        }
      }
      
      .stats-panel .stats-grid {
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: 1fr;
        
        .stat-item {
          flex-direction: row;
          gap: 16px;
        }
      }
    }
    
    .system-resources .resource-grid {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
    }
  }
}

@media (max-width: 900px) {
  .dashboard {
    .top-row .stats-panel .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      
      .stat-item {
        flex-direction: column;
        gap: 12px;
      }
    }
    
    .system-resources .resource-grid {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
    }
  }
}

@media (max-width: 600px) {
  .dashboard {
    .top-row .stats-panel .stats-grid {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, 1fr);
    }
    
    .system-resources .resource-grid {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(6, 1fr);
    }
  }
}
</style>
