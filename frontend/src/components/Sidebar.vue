<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Bell, Expand, Fold } from '@element-plus/icons-vue'

interface Props {
  isCollapse: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['toggle'])

const route = useRoute()
const router = useRouter()

const menuItems = [
  { path: '/dashboard', icon: 'Monitor', title: '系统状态', divider: true },
  { path: '/workflow', icon: 'Share', title: '操作指引', divider: true },
  { path: '/logs', icon: 'Document', title: '日志查看', divider: true },
  { path: '/devices', icon: 'Cpu', title: '设备管理', divider: true },
  { path: '/log-parser', icon: 'Collection', title: '日志解析', divider: true },
  { path: '/filter-policies', icon: 'Filter', title: '筛选策略', divider: true },
  { path: '/field-mapping-docs', icon: 'Notebook', title: '映射文档', divider: true },
  { path: '/robots', icon: 'ChatDotRound', title: '数据推送', divider: true },
  { path: '/test-tools', icon: 'Position', title: '测试工具', divider: true },
  { path: '/settings', icon: 'Setting', title: '系统设置' }
]

const activeMenu = computed(() => route.path)

function handleSelect(path: string) {
  router.push(path)
}
</script>

<template>
  <aside class="sidebar" :class="{ collapsed: isCollapse }">
    <div class="sidebar-logo">
      <el-icon class="logo-icon"><Bell /></el-icon>
      <span v-show="!isCollapse" class="logo-text">Syslog2Bot</span>
    </div>
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :collapse-transition="false"
      background-color="transparent"
      text-color="var(--text-secondary)"
      active-text-color="var(--accent-color)"
      @select="handleSelect"
    >
      <template v-for="(item, index) in menuItems" :key="item.path">
        <el-menu-item :index="item.path">
          <el-icon><component :is="item.icon" /></el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
        <li v-if="item.divider" class="menu-divider"></li>
      </template>
    </el-menu>
    
    <div class="sidebar-footer">
      <div class="toggle-btn" @click="emit('toggle')">
        <el-icon :size="18">
          <Expand v-if="isCollapse" />
          <Fold v-else />
        </el-icon>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 220px;
  height: 100%;
  background: var(--sidebar-bg);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  border-right: 1px solid var(--border-color);
  
  &.collapsed {
    width: 64px;
    
    .sidebar-logo {
      justify-content: center;
      padding: 0;
    }
    
    .menu-divider {
      margin: 1px 16px;
    }
  }
  
  .sidebar-logo {
    height: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 16px;
    border-bottom: 1px solid var(--border-color);
    
    .logo-icon {
      font-size: 22px;
      color: var(--accent-color);
      flex-shrink: 0;
    }
    
    .logo-text {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
      white-space: nowrap;
    }
  }
  
  :deep(.el-menu) {
    flex: 1;
    border-right: none;
    padding: 8px 0;
    overflow-y: auto;
    background-color: transparent;
    
    .el-menu-item {
      height: 44px;
      line-height: 44px;
      border-radius: 10px;
      color: var(--text-secondary);
      margin: 2px 10px;
      transition: all 0.2s;
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.03) !important;
        color: var(--text-primary);
      }
      
      &.is-active {
        background: rgba(10, 132, 255, 0.1) !important;
        color: var(--accent-color) !important;
        
        .el-icon {
          color: var(--accent-color);
        }
      }
      
      .el-icon {
        font-size: 18px;
        color: var(--text-secondary);
      }
    }
    
    &.el-menu--collapse {
      width: 100%;
      
      .el-menu-item {
        margin: 1px 0;
        width: 100%;
        box-sizing: border-box;
        justify-content: center;
      }
    }
  }
  
  .menu-divider {
    height: 1px;
    background-color: var(--border-color);
    margin: 4px 16px;
  }
  
  .sidebar-footer {
    padding: 12px;
    border-top: 1px solid var(--border-color);
    
    .toggle-btn {
      width: 100%;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 6px;
      transition: background-color 0.2s;
      color: var(--text-secondary);
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.03);
      }
    }
  }
}
</style>
