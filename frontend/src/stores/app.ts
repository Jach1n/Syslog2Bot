import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  StartSyslogService,
  StopSyslogService,
  GetDashboardStats,
  GetConfig,
  GetSystemStats
} from '../../wailsjs/go/main/App'

export interface SystemStats {
  totalLogs: number
  deviceCount: number
  serviceRunning: boolean
  listenPort: number
  startTime: string
  memoryUsage: number
  cpuUsage: number
  connections: number
  receiveRate: number
}

export const useAppStore = defineStore('app', () => {
  const currentPageTitle = ref('系统状态')
  const serviceRunning = ref(false)
  const stats = ref<SystemStats>({
    totalLogs: 0,
    deviceCount: 0,
    serviceRunning: false,
    listenPort: 5140,
    startTime: '',
    memoryUsage: 0,
    cpuUsage: 0,
    connections: 0,
    receiveRate: 0
  })
  const listenPort = ref(5140)
  const protocol = ref('udp')
  const loading = ref(false)

  const formattedStats = computed(() => stats.value)

  async function initApp() {
    try {
      const config = await GetConfig()
      listenPort.value = config.listenPort
      protocol.value = config.protocol || 'udp'
      
      await refreshStats()
    } catch (error) {
      console.error('Failed to init app:', error)
    }
  }

  async function refreshStats() {
    try {
      const dashboardStats = await GetDashboardStats()
      stats.value = {
        totalLogs: dashboardStats.totalLogs || 0,
        deviceCount: dashboardStats.deviceCount || 0,
        serviceRunning: dashboardStats.serviceRunning || false,
        listenPort: dashboardStats.listenPort || 5140,
        startTime: '',
        memoryUsage: 0,
        cpuUsage: 0,
        connections: 0,
        receiveRate: 0
      }
      serviceRunning.value = dashboardStats.serviceRunning || false
      
      const sysStats = await GetSystemStats()
      stats.value.memoryUsage = sysStats.memoryUsage || 0
      stats.value.cpuUsage = sysStats.cpuUsage || 0
      stats.value.connections = sysStats.connections || 0
      stats.value.receiveRate = sysStats.receiveRate || 0
    } catch (error) {
      console.error('Failed to refresh stats:', error)
    }
  }

  async function startService(port: number, proto: string) {
    loading.value = true
    try {
      await StartSyslogService(port, proto)
      serviceRunning.value = true
      listenPort.value = port
      protocol.value = proto
      await refreshStats()
    } catch (error) {
      console.error('Failed to start service:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function stopService() {
    loading.value = true
    try {
      await StopSyslogService()
      serviceRunning.value = false
      await refreshStats()
    } catch (error) {
      console.error('Failed to stop service:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  function setPageTitle(title: string) {
    currentPageTitle.value = title
  }

  return {
    currentPageTitle,
    serviceRunning,
    stats,
    listenPort,
    protocol,
    loading,
    formattedStats,
    initApp,
    refreshStats,
    startService,
    stopService,
    setPageTitle
  }
})
