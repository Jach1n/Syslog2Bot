<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  GetRobots, AddRobot, UpdateRobot, DeleteRobot, TestDingTalkWebhook,
  TestFeishuWebhook, TestWeworkWebhook, TestEmail, TestSyslogForward,
  GetOutputTemplates, AddOutputTemplate, UpdateOutputTemplate, DeleteOutputTemplate,
  GetFilterPolicies, GetDevices, GetParseTemplates,
  GetAlertRules, AddAlertRule, UpdateAlertRule, DeleteAlertRule, DeleteAlertRulesByRobotID
} from '../../wailsjs/go/main/App'
import { WebAPI } from '../api/web'

const isWeb = typeof window !== 'undefined' && !(window as any).go

const previewSampleData: Record<string, string> = {
  timestamp: '2026-03-04 15:30:00',
  attackIp: '192.168.1.100',
  victimIp: '10.0.0.1',
  innerIp: '10.0.0.25',
  threatType: '暴力破解',
  description: '检测到SSH暴力破解攻击',
  level: '高危',
  levelDesc: '高危',
  deviceName: '云锁服务器',
  deviceIP: '192.168.1.50',
  sourceIp: '192.168.1.100',
  attackIpAddress: '北京市',
  protectStatus: '已拦截',
  dealStatus: '未处理',
  resultText: '攻击失败',
  threatSource: '应用防护>请求类型控制',
  alertTime: '2026-03-04 15:30:00',
  'machine.ipv4': '10.0.0.24',
  'machine.nickname': '测试服务器',
  'action.text': '检测到可疑行为，已自动拦截',
  groupName: '异常访问',
  result: '拦截',
  threatTypeDesc: '暴力破解攻击'
}

interface Robot {
  id?: number
  name: string
  platform: string
  webhookUrl: string
  secret: string
  description: string
  isActive: boolean
  feishuWebhookUrl: string
  feishuSecret: string
  weworkWebhookUrl: string
  weworkKey: string
  smtpHost: string
  smtpPort: number
  smtpUsername: string
  smtpPassword: string
  smtpFrom: string
  smtpTo: string
  syslogHost: string
  syslogPort: number
  syslogProtocol: string
  syslogFormat: string
}

interface AlertRule {
  id?: number
  robotId: number
  filterPolicyId: number
  outputTemplateId: number
  outputFormat: string
  isActive: boolean
}

interface MessageTemplate {
  id?: number
  name: string
  platform: string
  description: string
  content: string
  fields: string
  deviceType: string
  isActive: boolean
}

const activeTab = ref('robots')

const loading = ref(false)
const robots = ref<Robot[]>([])
const templates = ref<MessageTemplate[]>([])
const filterPolicies = ref<any[]>([])
const devices = ref<any[]>([])
const parseTemplates = ref<any[]>([])
const selectedParseTemplateId = ref<number>(0)
const availableFields = ref<{source: string, display: string}[]>([])
const syslogSelectedFields = ref<string[]>([])

const robotDialogVisible = ref(false)
const robotDialogTitle = ref('添加推送')
const testLoading = ref(false)
const robotForm = ref<Robot>({
  name: '',
  platform: 'dingtalk',
  webhookUrl: '',
  secret: '',
  description: '',
  isActive: true,
  feishuWebhookUrl: '',
  feishuSecret: '',
  weworkWebhookUrl: '',
  weworkKey: '',
  smtpHost: '',
  smtpPort: 25,
  smtpUsername: '',
  smtpPassword: '',
  smtpFrom: '',
  smtpTo: '',
  syslogHost: '',
  syslogPort: 514,
  syslogProtocol: 'udp',
  syslogFormat: 'json'
})
const alertRules = ref<AlertRule[]>([])
const editingRobotId = ref<number>(0)
const robotRulesMap = ref<Map<number, AlertRule[]>>(new Map())

const templateDialogVisible = ref(false)
const templateDialogTitle = ref('添加推送消息模板')
const templateForm = ref<MessageTemplate>({
  name: '',
  platform: 'dingtalk',
  description: '',
  content: '',
  fields: '',
  deviceType: '',
  isActive: true
})

const stats = computed(() => ({
  robots: robots.value.filter(r => r.isActive).length,
  templates: templates.value.filter(t => t.isActive).length
}))

const previewHtml = computed(() => {
  if (!templateForm.value.content) {
    return '<div class="preview-empty">在左侧输入模板内容后，这里将显示预览效果</div>'
  }
  
  let content = templateForm.value.content
  
  for (const [key, value] of Object.entries(previewSampleData)) {
    const placeholder = `{{${key}}}`
    content = content.replace(new RegExp(placeholder.replace(/[{}.\[\]]/g, '\\$&'), 'g'), value)
  }
  
  content = content.replace(/\{\{[a-zA-Z0-9_.]+\}\}/g, '<span class="empty-field">[空]</span>')
  
  content = content
    .replace(/### (.*)/g, '<h3 class="msg-title">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
  
  return content
})

onMounted(async () => {
  await loadAll()
})

async function loadAll() {
  loading.value = true
  try {
    let robotsData, templatesData, filtersData, devicesData, parseTemplatesData
    if (isWeb) {
      [robotsData, templatesData, filtersData, devicesData, parseTemplatesData] = await Promise.all([
        WebAPI.GetRobots(),
        WebAPI.GetOutputTemplates(),
        WebAPI.GetFilterPolicies(),
        WebAPI.GetDevices(),
        WebAPI.GetParseTemplates()
      ])
    } else {
      [robotsData, templatesData, filtersData, devicesData, parseTemplatesData] = await Promise.all([
        GetRobots(),
        GetOutputTemplates(),
        GetFilterPolicies(),
        GetDevices(),
        GetParseTemplates()
      ])
    }
    robots.value = robotsData
    templates.value = templatesData
    filterPolicies.value = filtersData
    devices.value = devicesData
    parseTemplates.value = parseTemplatesData
    
    const rulesMap = new Map<number, AlertRule[]>()
    for (const robot of robotsData) {
      if (robot.id) {
        try {
          let rules
          if (isWeb) {
            rules = await WebAPI.GetAlertRules(robot.id)
          } else {
            rules = await GetAlertRules(robot.id)
          }
          rulesMap.set(robot.id, rules || [])
        } catch (e) {
          rulesMap.set(robot.id, [])
        }
      }
    }
    robotRulesMap.value = rulesMap
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

function handleAddRobot() {
  robotDialogTitle.value = '添加推送'
  robotForm.value = { name: '', platform: 'dingtalk', webhookUrl: '', secret: '', description: '', isActive: true, feishuWebhookUrl: '', feishuSecret: '', weworkWebhookUrl: '', weworkKey: '', smtpHost: '', smtpPort: 25, smtpUsername: '', smtpPassword: '', smtpFrom: '', smtpTo: '', syslogHost: '', syslogPort: 514, syslogProtocol: 'udp', syslogFormat: 'json' }
  alertRules.value = []
  editingRobotId.value = 0
  robotDialogVisible.value = true
}

async function handleEditRobot(row: Robot) {
  robotDialogTitle.value = '编辑推送'
  robotForm.value = { ...row }
  editingRobotId.value = row.id || 0
  
  let rules
  if (isWeb) {
    rules = await WebAPI.GetAlertRules(row.id!)
  } else {
    rules = await GetAlertRules(row.id!)
  }
  alertRules.value = rules || []
  
  robotDialogVisible.value = true
}

async function handleDeleteRobot(row: Robot) {
  try {
    await ElMessageBox.confirm('确定要删除该机器人吗？', '提示', { type: 'warning' })
    if (isWeb) {
      await WebAPI.DeleteRobot(row.id!)
    } else {
      await DeleteRobot(row.id!)
    }
    ElMessage.success('删除成功')
    loadAll()
  } catch (e: any) {
    if (e !== 'cancel') ElMessage.error('删除失败')
  }
}

async function handleSubmitRobot() {
  if (!robotForm.value.name) {
    ElMessage.warning('请填写名称')
    return
  }
  
  const platform = robotForm.value.platform || 'dingtalk'
  let hasRequired = false
  
  switch (platform) {
    case 'dingtalk':
      hasRequired = !!robotForm.value.webhookUrl
      break
    case 'feishu':
      hasRequired = !!robotForm.value.feishuWebhookUrl
      break
    case 'wework':
      hasRequired = !!robotForm.value.weworkWebhookUrl
      break
    case 'email':
      hasRequired = !!robotForm.value.smtpHost && !!robotForm.value.smtpFrom && !!robotForm.value.smtpTo
      break
    case 'syslog':
      hasRequired = !!robotForm.value.syslogHost && !!robotForm.value.syslogPort
      break
    default:
      hasRequired = !!robotForm.value.webhookUrl
  }
  
  if (!hasRequired) {
    ElMessage.warning('请填写必填项')
    return
  }
  
  try {
    let robotId = robotForm.value.id
    
    if (robotForm.value.id) {
      if (isWeb) {
        await WebAPI.UpdateRobot(robotForm.value)
        await WebAPI.DeleteAlertRulesByRobotID(robotForm.value.id)
      } else {
        await UpdateRobot(robotForm.value)
        await DeleteAlertRulesByRobotID(robotForm.value.id)
      }
    } else {
      let result
      if (isWeb) {
        result = await WebAPI.AddRobot(robotForm.value)
      } else {
        result = await AddRobot(robotForm.value)
      }
      robotId = result.id
    }
    
    for (const rule of alertRules.value) {
      if (rule.filterPolicyId) {
        if (isWeb) {
          await WebAPI.AddAlertRule({
            robotId: robotId,
            filterPolicyId: rule.filterPolicyId,
            outputTemplateId: rule.outputTemplateId || 0,
            outputFormat: rule.outputFormat || 'json',
            isActive: true
          })
        } else {
          await AddAlertRule({
            robotId: robotId,
            filterPolicyId: rule.filterPolicyId,
            outputTemplateId: rule.outputTemplateId || 0,
            outputFormat: rule.outputFormat || 'json',
            isActive: true
          })
        }
      }
    }
    
    ElMessage.success('保存成功')
    robotDialogVisible.value = false
    loadAll()
  } catch (e: any) {
    ElMessage.error('操作失败: ' + (e.message || '未知错误'))
  }
}

function addAlertRule() {
  alertRules.value.push({
    robotId: editingRobotId.value,
    filterPolicyId: 0,
    outputTemplateId: 0,
    outputFormat: 'json',
    isActive: true
  })
}

function removeAlertRule(index: number) {
  alertRules.value.splice(index, 1)
}

async function handleTestRobot() {
  const platform = robotForm.value.platform || 'dingtalk'
  testLoading.value = true
  
  try {
    let result = ''
    if (isWeb) {
      const response = await WebAPI.TestRobot(robotForm.value)
      if (response && typeof response === 'object' && (response as any).error) {
        throw new Error((response as any).error)
      }
      result = typeof response === 'string' ? response : (response as any).result || JSON.stringify(response)
    } else {
      switch (platform) {
        case 'dingtalk':
          if (!robotForm.value.webhookUrl) {
            ElMessage.warning('请先填写Webhook地址')
            return
          }
          result = await TestDingTalkWebhook(robotForm.value.webhookUrl, robotForm.value.secret)
          break
        case 'feishu':
          if (!robotForm.value.feishuWebhookUrl) {
            ElMessage.warning('请先填写Webhook地址')
            return
          }
          result = await TestFeishuWebhook(robotForm.value.feishuWebhookUrl, robotForm.value.feishuSecret)
          break
        case 'wework':
          if (!robotForm.value.weworkWebhookUrl) {
            ElMessage.warning('请先填写Webhook地址')
            return
          }
          result = await TestWeworkWebhook(robotForm.value.weworkWebhookUrl, robotForm.value.weworkKey)
          break
        case 'email':
          if (!robotForm.value.smtpHost || !robotForm.value.smtpFrom || !robotForm.value.smtpTo) {
            ElMessage.warning('请先填写邮箱配置')
            return
          }
          result = await TestEmail(robotForm.value.smtpHost, robotForm.value.smtpPort, robotForm.value.smtpUsername, robotForm.value.smtpPassword, robotForm.value.smtpFrom, robotForm.value.smtpTo)
          break
        case 'syslog':
          if (!robotForm.value.syslogHost || !robotForm.value.syslogPort) {
            ElMessage.warning('请先填写Syslog配置')
            return
          }
          result = await TestSyslogForward(robotForm.value.syslogHost, robotForm.value.syslogPort, robotForm.value.syslogProtocol, robotForm.value.syslogFormat)
          break
        default:
          if (!robotForm.value.webhookUrl) {
            ElMessage.warning('请先填写Webhook地址')
            return
          }
          result = await TestDingTalkWebhook(robotForm.value.webhookUrl, robotForm.value.secret)
      }
    }
    ElMessage.success(result)
  } catch (e: any) {
    ElMessage.error('测试失败: 网络连接错误')
  } finally {
    testLoading.value = false
  }
}

async function testRobotRow(row: Robot) {
  try {
    const platform = row.platform || 'dingtalk'
    let result = ''
    if (isWeb) {
      result = await WebAPI.TestRobot(row)
    } else {
      switch (platform) {
        case 'dingtalk':
          result = await TestDingTalkWebhook(row.webhookUrl, row.secret)
          break
        case 'feishu':
          result = await TestFeishuWebhook(row.feishuWebhookUrl, row.feishuSecret)
          break
        case 'wework':
          result = await TestWeworkWebhook(row.weworkWebhookUrl, row.weworkKey)
          break
        case 'email':
          result = await TestEmail(row.smtpHost, row.smtpPort, row.smtpUsername, row.smtpPassword, row.smtpFrom, row.smtpTo)
          break
        case 'syslog':
          result = await TestSyslogForward(row.syslogHost, row.syslogPort, row.syslogProtocol, row.syslogFormat)
          break
        default:
          result = await TestDingTalkWebhook(row.webhookUrl, row.secret)
      }
    }
    ElMessage.success(result)
  } catch (e: any) {
    ElMessage.error('测试失败: 网络连接错误')
  }
}

function toggleSyslogField(fieldName: string) {
  const index = syslogSelectedFields.value.indexOf(fieldName)
  if (index > -1) {
    syslogSelectedFields.value.splice(index, 1)
  } else {
    syslogSelectedFields.value.push(fieldName)
  }
}

function toggleAllSyslogFields() {
  if (syslogSelectedFields.value.length === availableFields.value.length) {
    syslogSelectedFields.value = []
  } else {
    syslogSelectedFields.value = availableFields.value.map(f => f.display)
  }
}

function handleAddTemplate() {
  templateDialogTitle.value = '添加推送消息模板'
  templateForm.value = { name: '', platform: 'dingtalk', description: '', content: '', fields: '', deviceType: '', isActive: true }
  selectedParseTemplateId.value = 0
  availableFields.value = []
  syslogSelectedFields.value = []
  templateDialogVisible.value = true
}

function handleEditTemplate(row: MessageTemplate) {
  templateDialogTitle.value = '编辑推送消息模板'
  templateForm.value = { ...row }
  selectedParseTemplateId.value = 0
  availableFields.value = []
  if (row.platform === 'syslog' && row.fields) {
    try {
      syslogSelectedFields.value = JSON.parse(row.fields)
    } catch {
      syslogSelectedFields.value = []
    }
  } else {
    syslogSelectedFields.value = []
  }
  templateDialogVisible.value = true
}

async function handleDeleteTemplate(row: MessageTemplate) {
  try {
    await ElMessageBox.confirm('确定要删除该消息模板吗？', '提示', { type: 'warning' })
    if (isWeb) {
      await WebAPI.DeleteOutputTemplate(row.id!)
    } else {
      await DeleteOutputTemplate(row.id!)
    }
    ElMessage.success('删除成功')
    loadAll()
  } catch (e: any) {
    if (e !== 'cancel') ElMessage.error('删除失败')
  }
}

async function handleSubmitTemplate() {
  if (!templateForm.value.name) {
    ElMessage.warning('请填写模板名称')
    return
  }
  if (templateForm.value.platform === 'syslog') {
    if (syslogSelectedFields.value.length === 0) {
      ElMessage.warning('请选择输出字段')
      return
    }
    templateForm.value.fields = JSON.stringify(syslogSelectedFields.value)
    templateForm.value.content = 'syslog'
  } else if (!templateForm.value.content) {
    ElMessage.warning('请填写模板内容')
    return
  }
  try {
    if (templateForm.value.id) {
      if (isWeb) {
        await WebAPI.UpdateOutputTemplate(templateForm.value)
      } else {
        await UpdateOutputTemplate(templateForm.value)
      }
      ElMessage.success('更新成功')
    } else {
      if (isWeb) {
        await WebAPI.AddOutputTemplate(templateForm.value)
      } else {
        await AddOutputTemplate(templateForm.value)
      }
      ElMessage.success('添加成功')
    }
    templateDialogVisible.value = false
    loadAll()
  } catch (e) {
    ElMessage.error('操作失败')
  }
}

function getFilterPolicyName(id: number): string {
  if (id === 0) return '全部'
  const policy = filterPolicies.value.find(p => p.id === id)
  return policy ? policy.name : '-'
}

function getRobotFilterPolicyNames(robotId: number | undefined): string {
  if (!robotId) return ''
  const rules = robotRulesMap.value.get(robotId) || []
  if (rules.length === 0) return ''
  const names = rules
    .map(rule => {
      const policy = filterPolicies.value.find(p => p.id === rule.filterPolicyId)
      return policy ? policy.name : ''
    })
    .filter(n => n)
  return [...new Set(names)].join(', ')
}

function getRobotName(id: number): string {
  const robot = robots.value.find(r => r.id === id)
  return robot ? robot.name : '-'
}

function getTemplateName(id: number): string {
  if (id === 0) return '默认模板'
  const template = templates.value.find(t => t.id === id)
  return template ? template.name : '-'
}

function getPlatformName(platform: string): string {
  const names: Record<string, string> = {
    'dingtalk': '钉钉',
    'feishu': '飞书',
    'wework': '企业微信',
    'email': '邮箱',
    'syslog': 'Syslog'
  }
  return names[platform] || '钉钉'
}

function getPlatformTagType(platform: string): string {
  const types: Record<string, string> = {
    'dingtalk': 'primary',
    'feishu': 'success',
    'wework': 'warning',
    'email': 'info',
    'syslog': ''
  }
  return types[platform] || 'primary'
}

function getFilterPolicyNames(ids: string): string {
  if (!ids) return ''
  try {
    const idArray = JSON.parse(ids)
    const names = idArray.map((id: number) => {
      const policy = filterPolicies.value.find(p => p.id === id)
      return policy ? policy.name : ''
    }).filter((n: string) => n)
    return names.join(', ')
  } catch {
    const policy = filterPolicies.value.find(p => p.id === parseInt(ids))
    return policy ? policy.name : ''
  }
}

watch(selectedParseTemplateId, (newVal) => {
  if (newVal) {
    const template = parseTemplates.value.find(t => t.id === newVal)
    if (template) {
      if (template.parseType === 'smart_delimiter') {
        const fields = [
          { source: 'alertType', display: '告警类型' },
          { source: 'alertName', display: '告警名称' },
          { source: 'attackIP', display: '攻击IP' },
          { source: 'victimIP', display: '受害IP' },
          { source: 'alertTime', display: '告警时间' },
          { source: 'severity', display: '威胁等级' },
          { source: 'attackResult', display: '攻击结果' }
        ]
        try {
          const config = JSON.parse(template.fieldMapping || '{}')
          if (config.subTemplates) {
            for (const type in config.subTemplates) {
              const subConfig = config.subTemplates[type]
              if (subConfig.customFields) {
                for (const cf of subConfig.customFields) {
                  if (cf.name && !fields.find(f => f.source === cf.name)) {
                    fields.push({ source: cf.name, display: cf.name })
                  }
                }
              }
            }
          }
        } catch {}
        availableFields.value = fields
      } else if (template.fieldMapping) {
        try {
          const mapping = JSON.parse(template.fieldMapping)
          availableFields.value = Object.entries(mapping).map(([source, display]) => ({
            source,
            display: String(display)
          }))
        } catch {
          availableFields.value = []
        }
      }
    } else {
      availableFields.value = []
    }
  } else {
    availableFields.value = []
  }
})

function insertField(field: {source: string, display: string}) {
  const textarea = document.querySelector('.template-content-textarea textarea') as HTMLTextAreaElement
  const fieldTag = `{{${field.source}}}`
  
  if (textarea) {
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = templateForm.value.content
    templateForm.value.content = text.substring(0, start) + fieldTag + text.substring(end)
    
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + fieldTag.length, start + fieldTag.length)
    }, 0)
  } else {
    templateForm.value.content += fieldTag
  }
}

function insertAllFields() {
  if (availableFields.value.length === 0) return
  
  let content = '### 🚨 安全告警\n\n'
  for (const field of availableFields.value) {
    content += `**${field.display}**: {{${field.source}}}\n`
  }
  templateForm.value.content = content
}
</script>

<template>
  <div class="robots-view">
    <el-card shadow="hover" class="main-card">
      <div class="tabs-container">
        <div class="tabs-header">
          <el-tabs v-model="activeTab">
            <el-tab-pane name="robots">
              <template #label>
                <span class="tab-label">
                  <el-icon><Monitor /></el-icon>
                  推送配置
                </span>
              </template>
            </el-tab-pane>
            <el-tab-pane name="templates">
              <template #label>
                <span class="tab-label">
                  <el-icon><Document /></el-icon>
                  推送消息模板
                </span>
              </template>
            </el-tab-pane>
          </el-tabs>
          <div class="tabs-actions">
            <el-button v-if="activeTab === 'robots'" type="primary" size="small" @click="handleAddRobot">
              <el-icon><Plus /></el-icon>
              添加推送
            </el-button>
            <el-button v-if="activeTab === 'templates'" type="primary" size="small" @click="handleAddTemplate">
              <el-icon><Plus /></el-icon>
              添加模板
            </el-button>
          </div>
        </div>
        
        <div class="tab-content">
        <el-table v-if="activeTab === 'robots'" :data="robots" v-loading="loading" stripe class="robots-table">
          <el-table-column prop="name" label="名称" width="120" />
          <el-table-column label="推送平台" width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="getPlatformTagType(row.platform)" size="small">
                {{ getPlatformName(row.platform) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="关联策略" width="140" show-overflow-tooltip>
            <template #default="{ row }">
              <span v-if="getRobotFilterPolicyNames(row.id)">{{ getRobotFilterPolicyNames(row.id) }}</span>
              <span v-else style="color: #999">未关联</span>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="描述" min-width="150" show-overflow-tooltip />
          <el-table-column label="状态" width="80" align="center">
            <template #default="{ row }">
              <el-tag :type="row.isActive ? 'success' : 'danger'" size="small">
                {{ row.isActive ? '启用' : '禁用' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220" align="center">
            <template #default="{ row }">
              <div style="display: flex; flex-direction: row; justify-content: center; gap: 4px;">
                <el-button type="success" link size="small" @click="testRobotRow(row)" :disabled="!row.isActive">测试</el-button>
                <el-button type="primary" link size="small" @click="handleEditRobot(row)">编辑</el-button>
                <el-button type="danger" link size="small" @click="handleDeleteRobot(row)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        
        <el-table v-if="activeTab === 'templates'" :data="templates" v-loading="loading" stripe>
          <el-table-column prop="name" label="模板名称" width="180" />
          <el-table-column label="推送平台" width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="getPlatformTagType(row.platform)" size="small">
                {{ getPlatformName(row.platform) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="描述" show-overflow-tooltip />
          <el-table-column label="状态" width="80" align="center">
            <template #default="{ row }">
              <el-tag :type="row.isActive ? 'success' : 'danger'" size="small">
                {{ row.isActive ? '启用' : '禁用' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="{ row }">
              <el-button type="primary" link size="small" @click="handleEditTemplate(row)">编辑</el-button>
              <el-button type="danger" link size="small" @click="handleDeleteTemplate(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    </el-card>

    <el-dialog v-model="robotDialogVisible" :title="robotDialogTitle" width="600px">
      <el-form :model="robotForm" label-width="110px">
        <el-form-item label="名称" required>
          <el-input v-model="robotForm.name" placeholder="请输入推送配置名称" />
        </el-form-item>
        <el-form-item label="推送平台" required>
          <el-select v-model="robotForm.platform" placeholder="选择推送平台" style="width: 100%">
            <el-option label="钉钉" value="dingtalk" />
            <el-option label="飞书" value="feishu" />
            <el-option label="企业微信" value="wework" />
            <el-option label="邮箱" value="email" />
            <el-option label="Syslog" value="syslog" />
          </el-select>
        </el-form-item>
        
        <template v-if="robotForm.platform === 'dingtalk'">
          <el-form-item label="Webhook" required>
            <el-input v-model="robotForm.webhookUrl" placeholder="钉钉机器人Webhook地址" />
          </el-form-item>
          <el-form-item label="加签密钥">
            <el-input v-model="robotForm.secret" placeholder="选填，加签密钥" />
          </el-form-item>
        </template>
        
        <template v-if="robotForm.platform === 'feishu'">
          <el-form-item label="Webhook" required>
            <el-input v-model="robotForm.feishuWebhookUrl" placeholder="飞书机器人Webhook地址" />
          </el-form-item>
          <el-form-item label="加签密钥">
            <el-input v-model="robotForm.feishuSecret" placeholder="选填，加签密钥" />
          </el-form-item>
        </template>
        
        <template v-if="robotForm.platform === 'wework'">
          <el-form-item label="Webhook" required>
            <el-input v-model="robotForm.weworkWebhookUrl" placeholder="企业微信机器人Webhook地址" />
          </el-form-item>
          <el-form-item label="Key">
            <el-input v-model="robotForm.weworkKey" placeholder="企业微信机器人Key" />
          </el-form-item>
        </template>
        
        <template v-if="robotForm.platform === 'email'">
          <el-form-item label="SMTP服务器" required>
            <el-row :gutter="10">
              <el-col :span="14">
                <el-input v-model="robotForm.smtpHost" placeholder="如：smtp.qq.com" />
              </el-col>
              <el-col :span="10">
                <el-input-number v-model="robotForm.smtpPort" :min="1" :max="65535" style="width: 100%" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="robotForm.smtpUsername" placeholder="邮箱用户名" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="robotForm.smtpPassword" type="password" placeholder="邮箱密码或授权码" />
          </el-form-item>
          <el-form-item label="发件人" required>
            <el-input v-model="robotForm.smtpFrom" placeholder="发件人邮箱地址" />
          </el-form-item>
          <el-form-item label="收件人" required>
            <el-input v-model="robotForm.smtpTo" placeholder="多个收件人用逗号分隔" />
          </el-form-item>
        </template>
        
        <template v-if="robotForm.platform === 'syslog'">
          <el-form-item label="目标地址" required>
            <el-row :gutter="10">
              <el-col :span="14">
                <el-input v-model="robotForm.syslogHost" placeholder="如： 192.168.1.100" />
              </el-col>
              <el-col :span="10">
                <el-input-number v-model="robotForm.syslogPort" :min="1" :max="65535" style="width: 100%" placeholder="端口" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="协议" required>
          <el-radio-group v-model="robotForm.syslogProtocol">
            <el-radio value="udp">UDP</el-radio>
            <el-radio value="tcp">TCP</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>
        
        <el-form-item label="描述">
          <el-input v-model="robotForm.description" type="textarea" :rows="2" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="robotForm.isActive" />
        </el-form-item>
        
        <el-divider content-position="left">告警规则</el-divider>
        
        <div class="alert-rules-container">
          <div v-for="(rule, index) in alertRules" :key="index" class="alert-rule-item">
            <el-card shadow="never">
              <div class="rule-header">
                <span>规则 {{ index + 1 }}</span>
                <el-button type="danger" size="small" @click="removeAlertRule(index)">删除</el-button>
              </div>
              <el-form-item label="筛选策略">
                <el-select v-model="rule.filterPolicyId" placeholder="选择筛选策略" style="width: 100%">
                  <el-option 
                    v-for="filter in filterPolicies" 
                    :key="filter.id" 
                    :label="filter.name" 
                    :value="filter.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="消息模板">
                <el-select v-model="rule.outputTemplateId" placeholder="选择消息模板" style="width: 100%">
                  <el-option :value="0" label="默认模板" />
                  <el-option 
                    v-for="template in templates" 
                    :key="template.id" 
                    :label="template.name" 
                    :value="template.id"
                  >
                    <span>{{ template.name }}</span>
                    <el-tag :type="getPlatformTagType(template.platform)" size="small" style="margin-left: 8px">
                      {{ getPlatformName(template.platform) }}
                    </el-tag>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="robotForm.platform === 'syslog'" label="输出格式">
                <el-radio-group v-model="rule.outputFormat">
                  <el-radio value="json">JSON</el-radio>
                  <el-radio value="rfc3164">RFC 3164</el-radio>
                  <el-radio value="rfc5424">RFC 5424</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-card>
          </div>
          
          <el-button type="primary" plain @click="addAlertRule" style="width: 100%">
            <el-icon><Plus /></el-icon>
            添加规则
          </el-button>
        </div>
      </el-form>
      <template #footer>
        <el-button @click="robotDialogVisible = false">取消</el-button>
        <el-button :loading="testLoading" @click="handleTestRobot">测试</el-button>
        <el-button type="primary" @click="handleSubmitRobot">确定</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="templateDialogVisible" :title="templateDialogTitle" width="900px">
      <div class="template-dialog-content">
        <div class="template-main-row">
          <div class="template-form-panel">
            <el-form :model="templateForm" label-width="80px">
              <el-form-item label="模板名称" required>
                <el-input v-model="templateForm.name" placeholder="请输入模板名称" />
              </el-form-item>
              <el-form-item label="推送平台" required>
                <el-select v-model="templateForm.platform" placeholder="选择推送平台" style="width: 100%">
                  <el-option label="钉钉" value="dingtalk" />
                  <el-option label="飞书" value="feishu" />
                  <el-option label="企业微信" value="wework" />
                  <el-option label="邮箱" value="email" />
                  <el-option label="Syslog" value="syslog" />
                </el-select>
              </el-form-item>
              <el-form-item v-if="templateForm.platform === 'syslog'" label="说明">
                <div class="syslog-tip">
                  <el-icon><InfoFilled /></el-icon>
                  <span>请在右侧字段选择器中选择要输出的字段，勾选后保存即可</span>
                </div>
                <div v-if="syslogSelectedFields.length > 0" class="selected-fields-preview">
                  <span class="preview-label">已选字段：</span>
                  <el-tag v-for="f in syslogSelectedFields" :key="f" size="small" style="margin: 2px;">{{ f }}</el-tag>
                </div>
              </el-form-item>
              <el-form-item v-if="templateForm.platform !== 'syslog'" label="模板内容" required>
                <div class="template-content-tips">
                  <span class="tip-text">使用 <span v-pre>{{字段名}}</span> 插入变量，换行请直接按 Enter 键</span>
                </div>
                <el-input 
                  v-model="templateForm.content" 
                  type="textarea" 
                  :rows="8" 
                  placeholder="### 🚨 安全告警

**告警时间**: {{timestamp}}
**攻击IP**: {{attackIp}}
**威胁类型**: {{threatType}}" 
                  class="template-content-textarea"
                />
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="templateForm.description" type="textarea" :rows="2" placeholder="请输入描述" />
              </el-form-item>
              <el-form-item label="状态">
                <el-switch v-model="templateForm.isActive" />
              </el-form-item>
            </el-form>
          </div>
          
          <div class="template-fields-panel">
            <div class="fields-panel-header">
              <el-icon><Collection /></el-icon>
              字段选择器
            </div>
            <div class="fields-panel-content">
              <el-select 
                v-model="selectedParseTemplateId" 
                placeholder="选择解析模板" 
                size="small"
                style="width: 100%; margin-bottom: 8px;"
                clearable
              >
                <el-option 
                  v-for="t in parseTemplates" 
                  :key="t.id" 
                  :label="t.name" 
                  :value="t.id"
                />
              </el-select>
              
              <div v-if="availableFields.length > 0" class="fields-list">
                <el-button 
                  v-if="templateForm.platform !== 'syslog'" 
                  type="primary" 
                  size="small" 
                  style="width: 100%; margin-bottom: 8px;" 
                  @click="insertAllFields"
                >
                  <el-icon><DocumentCopy /></el-icon>
                  插入全部字段
                </el-button>
                <el-button 
                  v-else 
                  type="primary" 
                  size="small" 
                  style="width: 100%; margin-bottom: 8px;" 
                  @click="toggleAllSyslogFields"
                >
                  <el-icon><Check /></el-icon>
                  {{ syslogSelectedFields.length === availableFields.length ? '取消全选' : '全选' }}
                </el-button>
                <div class="field-items">
                  <div 
                    v-for="field in availableFields" 
                    :key="field.source"
                    :class="['field-item', { 'field-selected': templateForm.platform === 'syslog' && syslogSelectedFields.includes(field.display) }]"
                    @click="templateForm.platform === 'syslog' ? toggleSyslogField(field.display) : insertField(field)"
                  >
                    <el-icon v-if="templateForm.platform === 'syslog' && syslogSelectedFields.includes(field.display)" class="field-check"><Check /></el-icon>
                    <span class="field-display">{{ field.display }}</span>
                    <span class="field-source">{{ field.source }}</span>
                  </div>
                </div>
              </div>
              
              <div v-else class="fields-empty">
                <p>选择解析模板后显示字段</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="template-preview-row">
          <div class="preview-header">
            <el-icon><View /></el-icon>
            实时预览
          </div>
          <div class="preview-content">
            <div class="dingtalk-message" v-html="previewHtml"></div>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button @click="templateDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmitTemplate">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.robots-view {
  .main-card {
    background: var(--bg-card);
    border-radius: 12px;
    border: 1px solid var(--border-color);

    .tabs-container {
      padding: 0;

      .tabs-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--border-color);
        padding: 0 20px 0 20px;

        :deep(.el-tabs__header) {
          margin-bottom: 0;
          border-bottom: none;
        }

        :deep(.el-tabs__nav-wrap::after) {
          display: none;
        }

        :deep(.el-tabs__item) {
          height: 42px;
          line-height: 42px;
          font-size: 14px;

          .tab-label {
            display: flex;
            align-items: center;
            gap: 6px;
          }
        }
      }

      .tabs-actions {
        padding-right: 0;
      }
    }

    .tab-content {
      padding: 16px 20px;
    }

    :deep(.el-table) {
      .el-table__header th {
        background: var(--bg-table-header) !important;
      }
      .el-table__body td {
        background: var(--bg-table-row) !important;
      }
      .el-table__row:hover>td {
        background: var(--bg-table-row-hover) !important;
      }
      td:last-child {
        background: var(--bg-table-row) !important;
      }
      th:last-child {
        background: var(--bg-table-header) !important;
      }
    }

    :deep(.robots-table) {
      width: 100% !important;
      .操作列 {
        background: var(--bg-table-row) !important;
      }
    }
  }

  .template-dialog-content {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .template-main-row {
      display: flex;
      gap: 16px;

      .template-form-panel {
        flex: 1;
        min-width: 0;
      }

      .template-fields-panel {
        width: 220px;
        flex-shrink: 0;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        background: var(--bg-secondary);

        .fields-panel-header {
          padding: 10px 12px;
          border-bottom: 1px solid var(--border-color);
          font-weight: 600;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-hover);
          border-radius: 8px 8px 0 0;
        }

        .fields-panel-content {
          flex: 1;
          padding: 10px;
          overflow-y: auto;
          max-height: 280px;
        }
      }
    }

    .template-preview-row {
      border: 1px solid var(--border-color);
      border-radius: 8px;
      background: var(--bg-secondary);

      .preview-header {
        padding: 10px 12px;
        border-bottom: 1px solid var(--border-color);
        font-weight: 600;
        font-size: 13px;
        display: flex;
        align-items: center;
        gap: 6px;
        background: var(--bg-hover);
        border-radius: 8px 8px 0 0;
      }

      .preview-content {
        padding: 12px;
        max-height: 150px;
        overflow-y: auto;
      }

      .dingtalk-message {
        font-size: 13px;
        line-height: 1.7;
        color: var(--text-primary);
        
        .msg-title {
          color: var(--text-primary);
          margin: 0 0 10px;
          font-size: 15px;
        }
        
        strong {
          color: var(--text-primary);
        }
        
        .empty-field {
          color: var(--text-muted);
          font-size: 12px;
        }
      }
      
      .preview-empty {
        color: var(--text-muted);
        text-align: center;
        padding: 20px;
        font-size: 13px;
      }
    }
  }
  
  .fields-list {
    .field-items {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }

    .field-item {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      background: var(--bg-hover);
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.2s;

      &:hover {
        background: var(--bg-active);
        color: var(--accent-color);
      }

      .field-display {
        font-weight: 500;
      }

      .field-source {
        color: var(--text-secondary);
        font-family: monospace;
        font-size: 11px;
      }
    }
  }

  .fields-empty {
    text-align: center;
    padding: 20px 10px;
    color: var(--text-muted);
    font-size: 12px;
  }

  .syslog-fields-selector {
    width: 100%;
    
    .syslog-fields-checkbox {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
      
      .el-checkbox {
        margin-right: 0;
      }
    }
    
    .selected-fields-preview {
      margin-top: 12px;
      padding: 8px;
      background: var(--bg-hover);
      border-radius: 6px;
      
      .preview-label {
        font-size: 12px;
        color: var(--text-secondary);
        margin-right: 8px;
      }
    }
  }

  .syslog-tip {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: var(--bg-hover);
    border-radius: 6px;
    color: var(--text-secondary);
    font-size: 13px;
  }

  .field-selected {
    background: var(--accent-color) !important;
    color: white !important;
    
    .field-source {
      color: rgba(255, 255, 255, 0.7) !important;
    }
  }

  .field-check {
    margin-right: 4px;
  }

  .template-content-tips {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
    padding: 6px 10px;
    background: var(--bg-hover);
    border-radius: 4px;

    .tip-text {
      color: var(--text-secondary);
      font-size: 12px;
    }
  }

  .alert-rules-container {
    max-height: 300px;
    overflow-y: auto;
    padding: 8px 0;

    .alert-rule-item {
      margin-bottom: 12px;

      .el-card {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
      }

      .rule-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        font-weight: 500;
        color: var(--text-primary);
      }
    }
  }
}
</style>
