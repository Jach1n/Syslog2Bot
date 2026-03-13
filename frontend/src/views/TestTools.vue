<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { SendTestSyslog, GetLocalIPs, GetConfig } from '../../wailsjs/go/main/App'

interface TestResult {
  success: boolean
  message: string
  sentCount: number
  failedCount: number
  errors: string[]
}

const loading = ref(false)
const sending = ref(false)
const localIPs = ref<string[]>([])
const listenPort = ref(5140)
const protocol = ref('udp')

const protocols = [
  { value: 'udp', label: 'UDP' },
  { value: 'tcp', label: 'TCP' }
]

const testForm = ref({
  host: '127.0.0.1',
  port: 5140,
  message: '',
  count: 1,
  intervalMs: 1000
})

const testResult = ref<TestResult | null>(null)

const sampleTemplates = [
  {
    name: '云锁 - 攻击成功',
    message: `<134>Mar 15 10:30:00 server01 {"event_type":"attack_success","attack_ip":"192.168.1.100","attack_type":"暴力破解","target_user":"admin","level":3,"description":"SSH暴力破解成功"}`
  },
  {
    name: '云锁 - 高危告警',
    message: `<134>Mar 15 10:30:00 server01 {"event_type":"high_risk","attack_ip":"10.0.0.50","threat_name":"WebShell检测","file_path":"/var/www/html/shell.php","level":4,"description":"发现WebShell后门"}`
  },
  {
    name: '云锁 - 异常登录',
    message: `<134>Mar 15 10:30:00 server01 {"event_type":"abnormal_login","login_ip":"203.0.113.50","login_user":"root","login_time":"2024-03-15 10:30:00","location":"美国","level":3,"description":"异地异常登录"}`
  },
  {
    name: '通用 - JSON格式',
    message: `{"timestamp":"2024-03-15T10:30:00Z","level":"error","source":"firewall","src_ip":"192.168.1.100","dst_ip":"10.0.0.1","action":"blocked","message":"可疑连接被阻止"}`
  },
  {
    name: '通用 - 键值对',
    message: `time=2024-03-15T10:30:00 src_ip=192.168.1.100 dst_ip=10.0.0.1 action=block reason="可疑连接" level=3`
  }
]

const quickActions = computed(() => [
  { label: '发送1条', count: 1 },
  { label: '发送5条', count: 5 },
  { label: '发送10条', count: 10 },
  { label: '发送50条', count: 50 },
  { label: '发送100条', count: 100 }
])

onMounted(async () => {
  await loadData()
})

async function loadData() {
  loading.value = true
  try {
    const [ips, config] = await Promise.all([
      GetLocalIPs(),
      GetConfig()
    ])
    localIPs.value = ips
    if (config && config.listenPort) {
      listenPort.value = config.listenPort
      testForm.value.port = config.listenPort
    }
    if (config && config.protocol) {
      protocol.value = config.protocol
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

function applySample(sample: typeof sampleTemplates[0]) {
  testForm.value.message = sample.message
}

async function handleSend() {
  if (!testForm.value.message.trim()) {
    ElMessage.warning('请输入测试日志内容')
    return
  }

  sending.value = true
  testResult.value = null

  try {
    const result = await SendTestSyslog({
      host: testForm.value.host,
      port: testForm.value.port,
      protocol: protocol.value,
      message: testForm.value.message,
      count: testForm.value.count,
      intervalMs: testForm.value.intervalMs
    })
    testResult.value = result

    if (result.success) {
      ElMessage.success(result.message)
    } else {
      ElMessage.warning(result.message)
    }
  } catch (e: any) {
    ElMessage.error('发送失败: ' + (e.message || e))
  } finally {
    sending.value = false
  }
}

async function quickSend(count: number) {
  if (!testForm.value.message.trim()) {
    ElMessage.warning('请输入测试日志内容')
    return
  }

  testForm.value.count = count
  await handleSend()
}

function clearResult() {
  testResult.value = null
}
</script>

<template>
  <div class="test-tools-view">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card shadow="hover" v-loading="loading">
          <template #header>
            <div class="card-header">
              <span>发送配置</span>
            </div>
          </template>

          <el-form :model="testForm" label-width="100px">
            <el-form-item label="目标地址">
              <div class="address-inputs">
                <el-input v-model="testForm.host" placeholder="默认 127.0.0.1" style="width: 200px;">
                  <template #prepend>IP</template>
                </el-input>
                <el-input v-model="testForm.port" placeholder="5140" style="width: 140px;">
                  <template #prepend>端口</template>
                </el-input>
              </div>
              <div class="form-tip">
                本机IP: 
                <el-tag v-for="ip in localIPs" :key="ip" size="small" style="margin-right: 5px; cursor: pointer;" @click="testForm.host = ip">
                  {{ ip }}
                </el-tag>
              </div>
            </el-form-item>

            <el-form-item label="测试日志">
              <el-input
                v-model="testForm.message"
                type="textarea"
                :rows="6"
                placeholder="输入要发送的 Syslog 测试数据..."
              />
            </el-form-item>

            <el-form-item label="发送次数">
              <el-input-number v-model="testForm.count" :min="1" :max="1000" />
              <span class="form-tip">连续发送多少条日志</span>
            </el-form-item>

            <el-form-item label="发送间隔">
              <el-input-number v-model="testForm.intervalMs" :min="0" :max="60000" :step="100" />
              <span class="form-tip">每条日志之间的间隔时间（毫秒）</span>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" :loading="sending" @click="handleSend">
                <el-icon><Position /></el-icon>
                发送测试数据
              </el-button>
              <el-button-group style="margin-left: 10px;">
                <el-button 
                  v-for="action in quickActions" 
                  :key="action.count"
                  size="small"
                  @click="quickSend(action.count)"
                  :loading="sending"
                >
                  {{ action.label }}
                </el-button>
              </el-button-group>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card shadow="hover" v-if="testResult" class="result-card">
          <div class="result-compact">
            <div class="result-status">
              <el-icon :size="18" :color="testResult.success ? '#67c23a' : '#e6a23c'">
                <component :is="testResult.success ? 'CircleCheckFilled' : 'WarningFilled'" />
              </el-icon>
              <span :class="['status-text', testResult.success ? 'success' : 'warning']">{{ testResult.message }}</span>
            </div>
            <div class="result-stats">
              <span class="stat-item">
                <span class="stat-label">成功</span>
                <span class="stat-value success">{{ testResult.sentCount }}</span>
              </span>
              <span class="stat-divider">|</span>
              <span class="stat-item">
                <span class="stat-label">失败</span>
                <span class="stat-value" :class="{ error: testResult.failedCount > 0 }">{{ testResult.failedCount }}</span>
              </span>
            </div>
            <el-button type="text" size="small" @click="clearResult">
              <el-icon><Close /></el-icon>
            </el-button>
          </div>
          <div v-if="testResult.errors.length > 0" class="error-list-compact">
            <el-collapse>
              <el-collapse-item title="错误详情">
                <div v-for="(err, idx) in testResult.errors" :key="idx" class="error-item">{{ err }}</div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="hover" class="tips-card">
          <template #header>
            <span>使用说明</span>
          </template>

          <div class="tips-content">
            <p><strong>1. 配置目标地址</strong></p>
            <p>默认发送到本机的 Syslog 服务端口，也可以发送到其他主机。</p>

            <p><strong>2. 输入测试日志</strong></p>
            <p>手动输入要发送的 Syslog 测试数据。</p>

            <p><strong>3. 设置发送参数</strong></p>
            <p>发送次数：连续发送多少条相同的日志</p>
            <p>发送间隔：每条日志之间的时间间隔</p>

            <p><strong>4. 查看结果</strong></p>
            <p>发送完成后，可在「日志查看」页面查看接收到的日志，验证解析规则是否正确。</p>

            <el-alert
              type="info"
              :closable="false"
              style="margin-top: 15px;"
            >
              <template #title>
                提示：确保 Syslog 服务已启动
              </template>
            </el-alert>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.test-tools-view {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .form-tip {
    margin-left: 10px;
    color: var(--text-secondary);
    font-size: 12px;
  }

  .result-card {
    margin-top: 15px;

    :deep(.el-card__body) {
      padding: 12px 16px;
    }

    .result-compact {
      display: flex;
      align-items: center;
      gap: 16px;

      .result-status {
        display: flex;
        align-items: center;
        gap: 6px;

        .status-text {
          font-size: 14px;
          font-weight: 500;

          &.success {
            color: #67c23a;
          }

          &.warning {
            color: #e6a23c;
          }
        }
      }

      .result-stats {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-left: auto;

        .stat-item {
          display: flex;
          align-items: center;
          gap: 4px;

          .stat-label {
            font-size: 12px;
            color: var(--el-text-color-secondary);
          }

          .stat-value {
            font-size: 14px;
            font-weight: 600;

            &.success {
              color: #67c23a;
            }

            &.error {
              color: #f56c6c;
            }
          }
        }

        .stat-divider {
          color: var(--el-border-color);
        }
      }
    }

    .error-list-compact {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid var(--el-border-color-lighter);

      .error-item {
        font-size: 12px;
        color: #f56c6c;
        padding: 4px 0;
      }
    }
  }

  .sample-list {
    .sample-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px;
      margin-bottom: 8px;
      background: var(--bg-secondary);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: var(--accent-color);
        color: white;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .tips-card {
    margin-top: 20px;

    .tips-content {
      p {
        margin: 8px 0;
        color: var(--text-secondary);
        font-size: 13px;
        line-height: 1.6;

        &:first-child {
          margin-top: 0;
        }

        strong {
          color: var(--text-primary);
        }
      }
    }
  }
}
</style>
