<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { ElMessage } from 'element-plus'
import Sidebar from '@/components/Sidebar.vue'
import { WindowMinimise, WindowMaximise, WindowClose } from '../wailsjs/go/main/App'

const appStore = useAppStore()
const isCollapse = ref(false)

onMounted(async () => {
  await appStore.initApp()
})

async function handleServiceChange(running: boolean) {
  try {
    if (running) {
      await appStore.startService(appStore.listenPort)
      ElMessage.success('Syslog服务启动成功')
    } else {
      await appStore.stopService()
      ElMessage.success('Syslog服务已停止')
    }
  } catch (error: any) {
    ElMessage.error('操作失败: ' + (error.message || error))
    await appStore.refreshStats()
  }
}
</script>

<template>
  <div class="app-container">
    <div class="titlebar-row" style="--wails-draggable: drag">
      <div class="titlebar-title">Syslog2Bot v1.3.2 — By 迷人安全</div>
      <div class="titlebar-actions" style="--wails-draggable: no-drag">
        <el-switch 
          :model-value="appStore.serviceRunning"
          @change="handleServiceChange"
          active-text="ON"
          inactive-text="OFF"
          inline-prompt
          class="service-switch"
        />
      </div>
      <div class="window-controls" style="--wails-draggable: no-drag">
        <div class="control-btn minimize" @click="WindowMinimise">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect y="5" width="12" height="2" fill="currentColor"/>
          </svg>
        </div>
        <div class="control-btn maximize" @click="WindowMaximise">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect x="1" y="1" width="10" height="10" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
        </div>
        <div class="control-btn close" @click="WindowClose">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="app-main">
      <Sidebar :is-collapse="isCollapse" @toggle="isCollapse = !isCollapse" />
      <main class="main-content">
        <div class="content-wrapper">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="scss">
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--bg-primary);
  border-radius: 10px;
  overflow: hidden;
}

.titlebar-row{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-color);
  padding-right: 20px;
  padding-left: 80px;
  position: relative;
  
  .titlebar-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .titlebar-actions {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 12px;
    
    .service-switch {
      --el-switch-on-color: var(--accent-color);
      --el-switch-off-color: var(--text-muted);
      height: 22px;
      
      :deep(.el-switch__core) {
        min-width: 50px;
        height: 22px;
        border-radius: 11px;
        padding: 0 6px;
      }
      
      :deep(.el-switch__inner) {
        font-size: 11px;
        font-weight: 500;
      }
      
      :deep(.el-switch__action) {
        width: 16px;
        height: 16px;
        border-radius: 8px;
      }
    }
  }
  
  .window-controls {
    display: flex;
    align-items: center;
    margin-left: 12px;
    
    .control-btn {
      width: 46px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-secondary);
      transition: background-color 0.15s;
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      &.close:hover {
        background-color: #e81123;
        color: white;
      }
    }
  }
}

.app-main {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: var(--bg-primary);
}

.content-wrapper {
  flex: 1;
  padding: 20px;
  overflow: auto;
  background-color: var(--bg-primary);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
