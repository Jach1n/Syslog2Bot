import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAppStore } from '@/stores/app'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { title: '系统状态' }
  },
  {
    path: '/workflow',
    name: 'Workflow',
    component: () => import('@/views/Workflow.vue'),
    meta: { title: '操作指引' }
  },
  {
    path: '/logs',
    name: 'Logs',
    component: () => import('@/views/Logs.vue'),
    meta: { title: '日志查看' }
  },
  {
    path: '/devices',
    name: 'Devices',
    component: () => import('@/views/Devices.vue'),
    meta: { title: '设备管理' }
  },
  {
    path: '/log-parser',
    name: 'LogParser',
    component: () => import('@/views/LogParser.vue'),
    meta: { title: '日志解析' }
  },
  {
    path: '/field-mapping-docs',
    name: 'FieldMappingDocs',
    component: () => import('@/views/FieldMappingDocs.vue'),
    meta: { title: '映射文档' }
  },
  {
    path: '/filter-policies',
    name: 'FilterPolicies',
    component: () => import('@/views/FilterPolicies.vue'),
    meta: { title: '筛选策略' }
  },
  {
    path: '/robots',
    name: 'Robots',
    component: () => import('@/views/Robots.vue'),
    meta: { title: '数据推送' }
  },
  {
    path: '/test-tools',
    name: 'TestTools',
    component: () => import('@/views/TestTools.vue'),
    meta: { title: '测试工具' }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
    meta: { title: '系统设置' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  document.title = `${to.meta.title || 'Syslog Alert'} - Syslog Alert`
  
  const appStore = useAppStore()
  appStore.setPageTitle(to.meta.title as string || '系统状态')
  
  next()
})

export default router
