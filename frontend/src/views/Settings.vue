<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { GetConfig, SaveConfig, CleanupLogs } from '../../wailsjs/go/main/App'
import { SystemConfig } from '../../wailsjs/go/models'

const loading = ref(false)
const saving = ref(false)
const config = ref<Partial<SystemConfig>>({
  listenPort: 5140,
  protocol: 'udp',
  logRetention: 30,
  maxLogSize: 1073741824,
  autoStart: false,
  minimizeToTray: true,
  alertEnabled: true,
  alertInterval: 60,
  unmatchedLogRetention: 7,
  unmatchedLogAlert: true,
  defaultFilterAction: 'keep',
  theme: 'dark',
  language: 'zh-CN'
})

onMounted(() => {
  loadConfig()
})

async function loadConfig() {
  loading.value = true
  try {
    const result = await GetConfig()
    config.value = result
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

async function handleSave() {
  saving.value = true
  try {
    await SaveConfig(config.value as SystemConfig)
    ElMessage.success('保存成功')
  } catch (e: any) {
    ElMessage.error('保存失败: ' + (e.message || e))
  } finally {
    saving.value = false
  }
}

async function handleCleanup() {
  try {
    await CleanupLogs(config.value.logRetention || 30)
    ElMessage.success('清理完成')
  } catch (e) {
    ElMessage.error('清理失败')
  }
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' MB'
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
}
</script>

<template>
  <div class="settings-view">
    <el-card shadow="hover" v-loading="loading">
      <template #header>
        <span>系统设置</span>
      </template>
      
      <el-form :model="config" label-width="120px" style="max-width: 600px;">
        <el-divider content-position="left">网络设置</el-divider>
        
        <el-form-item label="监听端口">
          <el-input-number v-model="config.listenPort" :min="1" :max="65535" />
          <span class="form-tip">Syslog服务监听端口，默认514</span>
        </el-form-item>
        
        <el-form-item label="协议类型">
          <el-select v-model="config.protocol" style="width: 150px">
            <el-option label="UDP" value="udp" />
            <el-option label="TCP" value="tcp" />
          </el-select>
          <span class="form-tip">Syslog协议类型</span>
        </el-form-item>
        
        <el-divider content-position="left">日志设置</el-divider>
        
        <el-form-item label="日志保留天数">
          <el-input-number v-model="config.logRetention" :min="1" :max="365" />
          <span class="form-tip">超过此天数的日志将被自动清理</span>
        </el-form-item>
        
        <el-form-item label="最大日志大小">
          <el-slider v-model="config.maxLogSize" :min="107374182" :max="10737418240" :format-tooltip="formatSize" />
          <span class="form-tip">当前: {{ formatSize(config.maxLogSize || 0) }}</span>
        </el-form-item>
        
        <el-form-item>
          <el-button type="warning" @click="handleCleanup">立即清理过期日志</el-button>
        </el-form-item>
        
        <el-divider content-position="left">告警设置</el-divider>
        
        <el-form-item label="启用告警">
          <el-switch v-model="config.alertEnabled" />
        </el-form-item>
        
        <el-form-item label="告警间隔">
          <el-input-number v-model="config.alertInterval" :min="10" :max="3600" />
          <span class="form-tip">同一设备的告警间隔时间（秒）</span>
        </el-form-item>
        
        <el-divider content-position="left">界面设置</el-divider>
        
        <el-form-item label="主题">
          <el-radio-group v-model="config.theme">
            <el-radio value="dark">深色</el-radio>
            <el-radio value="light">浅色</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="语言">
          <el-select v-model="config.language" style="width: 150px">
            <el-option label="简体中文" value="zh-CN" />
            <el-option label="English" value="en-US" />
          </el-select>
        </el-form-item>
        
        <el-divider content-position="left">其他设置</el-divider>
        
        <el-form-item label="数据库位置">
          <div class="data-dir-display">
            <el-tooltip :content="config.dataDir" placement="top">
              <span class="data-dir-path">{{ config.dataDir }}</span>
            </el-tooltip>
          </div>
        </el-form-item>
        
        <el-form-item label="开机自启">
          <el-switch v-model="config.autoStart" />
        </el-form-item>
        
        <el-form-item label="最小化到托盘">
          <el-switch v-model="config.minimizeToTray" />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" :loading="saving" @click="handleSave">保存设置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    
    <el-card shadow="hover" class="about-card">
      <template #header>
        <span>关于</span>
      </template>
      <div class="about-content">
        <h3>Syslog2Bot</h3>
        <p>版本: 1.3.2</p>
        <p>功能: Syslog日志接收、解析过滤、钉钉告警推送、测试工具</p>
        <p>技术栈: Go + Wails + Vue3 + Element Plus + SQLite</p>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.settings-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  .form-tip {
    margin-left: 10px;
    color: var(--el-text-color-secondary);
    font-size: 12px;
  }
  
  .data-dir-display {
    display: flex;
    align-items: center;
    
    .data-dir-path {
      font-size: 13px;
      color: var(--el-text-color-secondary);
      max-width: 400px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  
  .about-card {
    .about-content {
      h3 {
        margin: 0 0 15px 0;
        color: var(--el-text-color-primary);
      }
      p {
        margin: 8px 0;
        color: var(--el-text-color-secondary);
        font-size: 14px;
      }
    }
  }
}
</style>
