<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { GetDashboardStats } from '../../wailsjs/go/main/App'

const router = useRouter()

const stats = ref({
  totalLogs: 0,
  deviceCount: 0,
  matchedLogs: 0,
  alertCount: 0,
  unmatchedLogs: 0,
  serviceRunning: false,
  listenPort: 5140,
  activeRobots: 0,
  activeFilterPolicies: 0,
  activeAlertPolicies: 0,
  parseTemplateCount: 0
})

let refreshTimer: number | null = null

onMounted(async () => {
  await refreshStats()
  refreshTimer = window.setInterval(refreshStats, 5000)
})

onUnmounted(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
  }
})

async function refreshStats() {
  try {
    const result = await GetDashboardStats()
    stats.value = result
  } catch (e) {
    console.error(e)
  }
}

function navigateTo(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="workflow-view">
    <div class="workflow-diagram">
      <div class="flow-container">
        <div class="flow-main">
          <div class="flow-node syslog" @click="navigateTo('/dashboard')">
            <div class="node-icon">
              <el-icon :size="32"><Monitor /></el-icon>
            </div>
            <div class="node-label">Syslog服务器</div>
            <div class="node-desc">UDP/TCP 监听服务</div>
          </div>
          
          <div class="flow-arrow">
            <div class="arrow-line"></div>
            <el-icon :size="20"><Right /></el-icon>
          </div>
          
          <div class="flow-node receive" :class="{ active: stats.serviceRunning }" @click="navigateTo('/dashboard')">
            <div class="node-icon">
              <el-icon :size="32"><Download /></el-icon>
            </div>
            <div class="node-label">日志接收</div>
            <div class="node-desc">实时接收日志数据</div>
          </div>
          
          <div class="flow-arrow">
            <div class="arrow-line"></div>
            <el-icon :size="20"><Right /></el-icon>
          </div>
          
          <div class="flow-node parse" @click="navigateTo('/log-parser')">
            <div class="node-icon">
              <el-icon :size="32"><Collection /></el-icon>
            </div>
            <div class="node-label">日志解析</div>
            <div class="node-desc">正则/JSON解析</div>
          </div>
          
          <div class="flow-arrow">
            <div class="arrow-line"></div>
            <el-icon :size="20"><Right /></el-icon>
          </div>
          
          <div class="flow-node filter" @click="navigateTo('/filter-policies')">
            <div class="node-icon">
              <el-icon :size="32"><Filter /></el-icon>
            </div>
            <div class="node-label">筛选策略</div>
            <div class="node-desc">过滤匹配规则</div>
          </div>
          
          <div class="flow-arrow">
            <div class="arrow-line"></div>
            <el-icon :size="20"><Right /></el-icon>
          </div>
          
          <div class="flow-node robot" @click="navigateTo('/robots')">
            <div class="node-icon">
              <el-icon :size="32"><ChatDotRound /></el-icon>
            </div>
            <div class="node-label">消息推送</div>
            <div class="node-desc">钉钉告警通知</div>
          </div>
        </div>
        
        <div class="flow-details">
          <div class="detail-item">
            <div class="detail-line"></div>
            <div class="detail-card" @click="navigateTo('/devices')">
              <div class="detail-title">配置设备信息</div>
              <div class="detail-desc">添加安全设备IP，识别日志来源</div>
            </div>
          </div>
          
          <div class="detail-item">
            <div class="detail-line"></div>
            <div class="detail-card" @click="navigateTo('/logs')">
              <div class="detail-title">查看日志状态</div>
              <div class="detail-desc">实时监控日志接收情况</div>
            </div>
          </div>
          
          <div class="detail-item">
            <div class="detail-line"></div>
            <div class="detail-card" @click="navigateTo('/log-parser')">
              <div class="detail-title">解析逻辑</div>
              <div class="detail-desc">匹配 → 提取字段 → 不匹配则丢弃</div>
            </div>
          </div>
          
          <div class="detail-item">
            <div class="detail-line"></div>
            <div class="detail-card" @click="navigateTo('/filter-policies')">
              <div class="detail-title">筛选规则</div>
              <div class="detail-desc">匹配条件 → 保留/丢弃 → 触发告警</div>
            </div>
          </div>
          
          <div class="detail-item">
            <div class="detail-line"></div>
            <div class="detail-card" @click="navigateTo('/robots')">
              <div class="detail-title">推送配置</div>
              <div class="detail-desc">机器人Webhook + 消息模板</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="workflow-details">
      <div class="detail-card quick-guide-card">
        <div class="card-title">快速指南</div>
        <el-steps :active="0" direction="vertical">
          <el-step title="添加设备" description="在设备管理中添加安全设备IP，便于识别日志来源" />
          <el-step title="配置解析模板" description="在日志解析中创建解析规则，提取日志关键字段" />
          <el-step title="设置筛选策略" description="配置过滤条件，筛选需要关注的日志" />
          <el-step title="配置钉钉推送" description="添加钉钉机器人Webhook，创建消息模板和告警策略" />
          <el-step title="启动服务" description="设置监听端口并启动Syslog服务接收日志" />
        </el-steps>
      </div>
      
      <div class="detail-card">
        <div class="card-title">待处理事项</div>
        <div class="todo-list">
          <div v-if="stats.unmatchedLogs > 0" class="todo-item warning" @click="navigateTo('/logs')">
            <el-icon><Warning /></el-icon>
            <span>有 {{ stats.unmatchedLogs }} 条日志未匹配解析规则</span>
          </div>
          <div v-if="!stats.serviceRunning" class="todo-item info" @click="navigateTo('/dashboard')">
            <el-icon><InfoFilled /></el-icon>
            <span>Syslog服务未启动</span>
          </div>
          <div v-if="stats.activeRobots === 0" class="todo-item warning" @click="navigateTo('/robots')">
            <el-icon><Warning /></el-icon>
            <span>未配置钉钉机器人</span>
          </div>
          <div v-if="stats.activeFilterPolicies === 0" class="todo-item warning" @click="navigateTo('/filter-policies')">
            <el-icon><Warning /></el-icon>
            <span>未启用任何筛选策略</span>
          </div>
          <div v-if="stats.activeAlertPolicies === 0" class="todo-item warning" @click="navigateTo('/robots')">
            <el-icon><Warning /></el-icon>
            <span>未启用任何告警策略</span>
          </div>
          <div v-if="stats.serviceRunning && stats.activeRobots > 0 && stats.activeFilterPolicies > 0 && stats.activeAlertPolicies > 0" class="todo-item success">
            <el-icon><CircleCheck /></el-icon>
            <span>所有配置正常，系统运行中</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.workflow-view {
  .workflow-header {
    margin-bottom: 20px;
    
    h2 {
      margin: 0 0 6px 0;
      color: var(--text-primary);
      font-size: 20px;
      font-weight: 600;
    }
    
    p {
      margin: 0;
      color: var(--text-secondary);
      font-size: 14px;
    }
  }
  
  .workflow-diagram {
    margin-bottom: 20px;
    
    .flow-container {
      background: var(--bg-card);
      border-radius: 16px;
      border: 1px solid var(--border-color);
      padding: 24px;
      
      .flow-main {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        gap: 0;
        margin-bottom: 24px;
        
        .flow-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px 20px;
          cursor: pointer;
          transition: all 0.3s;
          border-radius: 12px;
          min-width: 100px;
          
          &:hover {
            background: var(--bg-hover);
            
            .node-icon {
              transform: scale(1.08);
            }
          }
          
          .node-icon {
            width: 60px;
            height: 60px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--bg-secondary);
            border: 2px solid var(--border-color);
            transition: all 0.3s;
          }
          
          .node-label {
            margin-top: 10px;
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
          }
          
          .node-desc {
            margin-top: 4px;
            font-size: 12px;
            color: var(--text-secondary);
          }
          
          &.syslog .node-icon {
            border-color: #409eff;
            color: #409eff;
            background: rgba(64, 158, 255, 0.1);
          }
          
          &.receive .node-icon {
            border-color: var(--border-color);
            color: var(--text-secondary);
            
            &.active {
              border-color: #67c23a;
              color: #67c23a;
              background: rgba(103, 194, 58, 0.1);
            }
          }
          
          &.parse .node-icon {
            border-color: #af52de;
            color: #af52de;
            background: rgba(175, 82, 222, 0.1);
          }
          
          &.filter .node-icon {
            border-color: #e6a23c;
            color: #e6a23c;
            background: rgba(230, 162, 60, 0.1);
          }
          
          &.robot .node-icon {
            border-color: #f56c6c;
            color: #f56c6c;
            background: rgba(245, 108, 108, 0.1);
          }
        }
        
        .flow-arrow {
          display: flex;
          align-items: center;
          padding: 0 8px;
          margin-top: 30px;
          color: var(--text-muted);
          
          .arrow-line {
            width: 20px;
            height: 2px;
            background: var(--border-color);
          }
        }
      }
      
      .flow-details {
        display: flex;
        justify-content: center;
        gap: 0;
        padding-top: 8px;
        
        .detail-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 136px;
          padding: 0 20px;
          
          .detail-line {
            width: 2px;
            height: 16px;
            background: linear-gradient(to bottom, var(--border-color), transparent);
          }
          
          .detail-card {
            padding: 10px 14px;
            background: var(--bg-secondary);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
            max-width: 130px;
            
            &:hover {
              background: var(--bg-hover);
              transform: translateY(-2px);
            }
            
            .detail-title {
              font-size: 12px;
              font-weight: 600;
              color: var(--text-primary);
              margin-bottom: 4px;
            }
            
            .detail-desc {
              font-size: 11px;
              color: var(--text-secondary);
              line-height: 1.4;
            }
          }
        }
      }
    }
  }
  
  .workflow-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    
    .detail-card {
      background: var(--bg-card);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      padding: 20px;
      overflow: hidden;
      
      .card-title {
        font-size: 15px;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--border-color);
      }
    }
    
    .quick-guide-card {
      max-height: 500px;
      overflow-y: auto;
      
      :deep(.el-steps) {
        .el-step__title {
          font-size: 14px;
          line-height: 1.4;
        }
        
        .el-step__description {
          font-size: 12px;
          line-height: 1.5;
          padding-right: 10px;
          word-break: break-all;
        }
        
        .el-step__main {
          padding-right: 0;
        }
      }
    }
  }
  
  .todo-list {
    .todo-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      border-radius: 10px;
      margin-bottom: 10px;
      cursor: pointer;
      font-size: 14px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      &.warning {
        background: rgba(230, 162, 60, 0.1);
        color: #e6a23c;
      }
      
      &.info {
        background: rgba(64, 158, 255, 0.1);
        color: #409eff;
      }
      
      &.success {
        background: rgba(103, 194, 58, 0.1);
        color: #67c23a;
        cursor: default;
      }
    }
  }
}

@media (max-width: 1200px) {
  .workflow-view {
    .workflow-stats {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .workflow-details {
      grid-template-columns: 1fr;
    }
    
    .workflow-diagram .flow-container {
      .flow-main {
        flex-wrap: wrap;
        gap: 10px;
        
        .flow-arrow {
          display: none;
        }
      }
      
      .flow-details {
        flex-wrap: wrap;
        gap: 10px;
        
        .detail-item {
          .detail-line {
            display: none;
          }
        }
      }
    }
  }
}
</style>
