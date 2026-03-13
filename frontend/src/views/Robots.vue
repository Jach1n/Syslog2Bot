<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  GetRobots, AddRobot, UpdateRobot, DeleteRobot, TestDingTalkWebhook,
  GetOutputTemplates, AddOutputTemplate, UpdateOutputTemplate, DeleteOutputTemplate,
  GetAlertPolicies, AddAlertPolicy, UpdateAlertPolicy, DeleteAlertPolicy,
  GetFilterPolicies, GetDevices, GetParseTemplates
} from '../../wailsjs/go/main/App'

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
  webhookUrl: string
  secret: string
  description: string
  isActive: boolean
}

interface MessageTemplate {
  id?: number
  name: string
  description: string
  content: string
  fields: string
  deviceType: string
  isActive: boolean
}

interface AlertPolicy {
  id?: number
  name: string
  description: string
  filterPolicyId: number
  robotId: number
  outputTemplateId: number
  isActive: boolean
}

const activeTab = ref('robots')

const loading = ref(false)
const robots = ref<Robot[]>([])
const templates = ref<MessageTemplate[]>([])
const policies = ref<AlertPolicy[]>([])
const filterPolicies = ref<any[]>([])
const devices = ref<any[]>([])
const parseTemplates = ref<any[]>([])
const selectedParseTemplateId = ref<number>(0)
const availableFields = ref<{source: string, display: string}[]>([])

const robotDialogVisible = ref(false)
const robotDialogTitle = ref('添加机器人')
const testLoading = ref(false)
const robotForm = ref<Robot>({
  name: '',
  webhookUrl: '',
  secret: '',
  description: '',
  isActive: true
})

const templateDialogVisible = ref(false)
const templateDialogTitle = ref('添加消息模板')
const templateForm = ref<MessageTemplate>({
  name: '',
  description: '',
  content: '',
  fields: '',
  deviceType: '',
  isActive: true
})

const policyDialogVisible = ref(false)
const policyDialogTitle = ref('添加告警策略')
const policyForm = ref<AlertPolicy>({
  name: '',
  description: '',
  filterPolicyId: 0,
  robotId: 0,
  outputTemplateId: 0,
  isActive: true
})

const stats = computed(() => ({
  robots: robots.value.filter(r => r.isActive).length,
  templates: templates.value.filter(t => t.isActive).length,
  policies: policies.value.filter(p => p.isActive).length
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
    const [robotsData, templatesData, policiesData, filtersData, devicesData, parseTemplatesData] = await Promise.all([
      GetRobots(),
      GetOutputTemplates(),
      GetAlertPolicies(),
      GetFilterPolicies(),
      GetDevices(),
      GetParseTemplates()
    ])
    robots.value = robotsData
    templates.value = templatesData
    policies.value = policiesData
    filterPolicies.value = filtersData
    devices.value = devicesData
    parseTemplates.value = parseTemplatesData
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

function handleAddRobot() {
  robotDialogTitle.value = '添加机器人'
  robotForm.value = { name: '', webhookUrl: '', secret: '', description: '', isActive: true }
  robotDialogVisible.value = true
}

function handleEditRobot(row: Robot) {
  robotDialogTitle.value = '编辑机器人'
  robotForm.value = { ...row }
  robotDialogVisible.value = true
}

async function handleDeleteRobot(row: Robot) {
  try {
    await ElMessageBox.confirm('确定要删除该机器人吗？', '提示', { type: 'warning' })
    await DeleteRobot(row.id!)
    ElMessage.success('删除成功')
    loadAll()
  } catch (e: any) {
    if (e !== 'cancel') ElMessage.error('删除失败')
  }
}

async function handleSubmitRobot() {
  if (!robotForm.value.name || !robotForm.value.webhookUrl) {
    ElMessage.warning('请填写必填项')
    return
  }
  try {
    if (robotForm.value.id) {
      await UpdateRobot(robotForm.value)
      ElMessage.success('更新成功')
    } else {
      await AddRobot(robotForm.value)
      ElMessage.success('添加成功')
    }
    robotDialogVisible.value = false
    loadAll()
  } catch (e) {
    ElMessage.error('操作失败')
  }
}

async function handleTestRobot() {
  if (!robotForm.value.webhookUrl) {
    ElMessage.warning('请先填写Webhook地址')
    return
  }
  testLoading.value = true
  try {
    const result = await TestDingTalkWebhook(robotForm.value.webhookUrl, robotForm.value.secret)
    ElMessage.success(result)
  } catch (e: any) {
    ElMessage.error('测试失败: ' + (e.message || e))
  } finally {
    testLoading.value = false
  }
}

async function testRobotRow(row: Robot) {
  try {
    const result = await TestDingTalkWebhook(row.webhookUrl, row.secret)
    ElMessage.success(result)
  } catch (e: any) {
    ElMessage.error('测试失败: ' + (e.message || e))
  }
}

function handleAddTemplate() {
  templateDialogTitle.value = '添加消息模板'
  templateForm.value = { name: '', description: '', content: '', fields: '', deviceType: '', isActive: true }
  selectedParseTemplateId.value = 0
  availableFields.value = []
  templateDialogVisible.value = true
}

function handleEditTemplate(row: MessageTemplate) {
  templateDialogTitle.value = '编辑消息模板'
  templateForm.value = { ...row }
  selectedParseTemplateId.value = 0
  availableFields.value = []
  templateDialogVisible.value = true
}

async function handleDeleteTemplate(row: MessageTemplate) {
  try {
    await ElMessageBox.confirm('确定要删除该消息模板吗？', '提示', { type: 'warning' })
    await DeleteOutputTemplate(row.id!)
    ElMessage.success('删除成功')
    loadAll()
  } catch (e: any) {
    if (e !== 'cancel') ElMessage.error('删除失败')
  }
}

async function handleSubmitTemplate() {
  if (!templateForm.value.name || !templateForm.value.content) {
    ElMessage.warning('请填写必填项')
    return
  }
  try {
    if (templateForm.value.id) {
      await UpdateOutputTemplate(templateForm.value)
      ElMessage.success('更新成功')
    } else {
      await AddOutputTemplate(templateForm.value)
      ElMessage.success('添加成功')
    }
    templateDialogVisible.value = false
    loadAll()
  } catch (e) {
    ElMessage.error('操作失败')
  }
}

function handleAddPolicy() {
  policyDialogTitle.value = '添加告警策略'
  policyForm.value = { name: '', description: '', filterPolicyId: 0, robotId: 0, outputTemplateId: 0, isActive: true }
  policyDialogVisible.value = true
}

function handleEditPolicy(row: AlertPolicy) {
  policyDialogTitle.value = '编辑告警策略'
  policyForm.value = { ...row }
  policyDialogVisible.value = true
}

async function handleDeletePolicy(row: AlertPolicy) {
  try {
    await ElMessageBox.confirm('确定要删除该告警策略吗？', '提示', { type: 'warning' })
    await DeleteAlertPolicy(row.id!)
    ElMessage.success('删除成功')
    loadAll()
  } catch (e: any) {
    if (e !== 'cancel') ElMessage.error('删除失败')
  }
}

async function handleSubmitPolicy() {
  if (!policyForm.value.name) {
    ElMessage.warning('请填写策略名称')
    return
  }
  if (!policyForm.value.robotId) {
    ElMessage.warning('请选择机器人')
    return
  }
  try {
    if (policyForm.value.id) {
      await UpdateAlertPolicy(policyForm.value)
      ElMessage.success('更新成功')
    } else {
      await AddAlertPolicy(policyForm.value)
      ElMessage.success('添加成功')
    }
    policyDialogVisible.value = false
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

function getRobotName(id: number): string {
  const robot = robots.value.find(r => r.id === id)
  return robot ? robot.name : '-'
}

function getTemplateName(id: number): string {
  if (id === 0) return '默认模板'
  const template = templates.value.find(t => t.id === id)
  return template ? template.name : '-'
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
                  <el-icon><ChatDotRound /></el-icon>
                  机器人配置
                </span>
              </template>
            </el-tab-pane>
            <el-tab-pane name="templates">
              <template #label>
                <span class="tab-label">
                  <el-icon><Document /></el-icon>
                  钉消息模板
                </span>
              </template>
            </el-tab-pane>
            <el-tab-pane name="policies">
              <template #label>
                <span class="tab-label">
                  <el-icon><Bell /></el-icon>
                  告警推送
                </span>
              </template>
            </el-tab-pane>
          </el-tabs>
          <div class="tabs-actions">
            <el-button v-if="activeTab === 'robots'" type="primary" size="small" @click="handleAddRobot">
              <el-icon><Plus /></el-icon>
              添加机器人
            </el-button>
            <el-button v-if="activeTab === 'templates'" type="primary" size="small" @click="handleAddTemplate">
              <el-icon><Plus /></el-icon>
              添加模板
            </el-button>
            <el-button v-if="activeTab === 'policies'" type="primary" size="small" @click="handleAddPolicy">
              <el-icon><Plus /></el-icon>
              添加策略
            </el-button>
          </div>
        </div>
        
        <div class="tab-content">
        <el-table v-if="activeTab === 'robots'" :data="robots" v-loading="loading" stripe>
          <el-table-column prop="name" label="名称" width="150" />
          <el-table-column prop="webhookUrl" label="Webhook地址" show-overflow-tooltip />
          <el-table-column label="密钥" width="100" align="center">
            <template #default="{ row }">
              <el-tag v-if="row.secret" type="warning" size="small">已配置</el-tag>
              <el-tag v-else type="info" size="small">未配置</el-tag>
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
          <el-table-column label="操作" width="180" fixed="right">
            <template #default="{ row }">
              <el-button type="success" link size="small" @click="testRobotRow(row)">测试</el-button>
              <el-button type="primary" link size="small" @click="handleEditRobot(row)">编辑</el-button>
              <el-button type="danger" link size="small" @click="handleDeleteRobot(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        
        <el-table v-if="activeTab === 'templates'" :data="templates" v-loading="loading" stripe>
          <el-table-column prop="name" label="模板名称" width="180" />
          <el-table-column prop="deviceType" label="设备类型" width="120" />
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
        
        <el-table v-if="activeTab === 'policies'" :data="policies" v-loading="loading" stripe>
          <el-table-column prop="name" label="策略名称" width="180" show-overflow-tooltip />
          <el-table-column label="筛选策略" width="150" show-overflow-tooltip>
            <template #default="{ row }">
              {{ getFilterPolicyName(row.filterPolicyId) }}
            </template>
          </el-table-column>
          <el-table-column label="机器人" width="150" show-overflow-tooltip>
            <template #default="{ row }">
              {{ getRobotName(row.robotId) }}
            </template>
          </el-table-column>
          <el-table-column label="消息模板" width="150" show-overflow-tooltip>
            <template #default="{ row }">
              {{ getTemplateName(row.outputTemplateId) }}
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
              <el-button type="primary" link size="small" @click="handleEditPolicy(row)">编辑</el-button>
              <el-button type="danger" link size="small" @click="handleDeletePolicy(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    </el-card>

    <el-dialog v-model="robotDialogVisible" :title="robotDialogTitle" width="500px">
      <el-form :model="robotForm" label-width="90px">
        <el-form-item label="名称" required>
          <el-input v-model="robotForm.name" placeholder="请输入机器人名称" />
        </el-form-item>
        <el-form-item label="Webhook" required>
          <el-input v-model="robotForm.webhookUrl" placeholder="钉钉机器人Webhook地址" />
        </el-form-item>
        <el-form-item label="加签密钥">
          <el-input v-model="robotForm.secret" placeholder="选填，加签密钥" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="robotForm.description" type="textarea" :rows="2" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="robotForm.isActive" />
        </el-form-item>
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
            <el-form :model="templateForm" label-width="80px" size="small">
              <el-form-item label="模板名称" required>
                <el-input v-model="templateForm.name" placeholder="请输入模板名称" />
              </el-form-item>
              <el-form-item label="设备类型">
                <el-input v-model="templateForm.deviceType" placeholder="如：云锁、安全设备等" />
              </el-form-item>
              <el-form-item label="模板内容" required>
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
                <el-button type="primary" size="small" style="width: 100%; margin-bottom: 8px;" @click="insertAllFields">
                  <el-icon><DocumentCopy /></el-icon>
                  插入全部字段
                </el-button>
                <div class="field-items">
                  <div 
                    v-for="field in availableFields" 
                    :key="field.source"
                    class="field-item"
                    @click="insertField(field)"
                  >
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

    <el-dialog v-model="policyDialogVisible" :title="policyDialogTitle" width="550px">
      <el-form :model="policyForm" label-width="90px">
        <el-form-item label="策略名称" required>
          <el-input v-model="policyForm.name" placeholder="请输入策略名称" />
        </el-form-item>
        <el-form-item label="筛选策略">
          <el-select v-model="policyForm.filterPolicyId" placeholder="选择筛选策略" style="width: 100%" clearable>
            <el-option :value="0" label="全部筛选策略" />
            <el-option v-for="p in filterPolicies" :key="p.id" :label="p.name" :value="p.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="机器人" required>
          <el-select v-model="policyForm.robotId" placeholder="选择机器人" style="width: 100%">
            <el-option v-for="r in robots" :key="r.id" :label="r.name" :value="r.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="消息模板">
          <el-select v-model="policyForm.outputTemplateId" placeholder="选择消息模板" style="width: 100%" clearable>
            <el-option :value="0" label="默认模板" />
            <el-option v-for="t in templates" :key="t.id" :label="t.name" :value="t.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="policyForm.description" type="textarea" :rows="2" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="policyForm.isActive" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="policyDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmitPolicy">确定</el-button>
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
        border-bottom: 1px solid var(--el-border-color-lighter);
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
        border: 1px solid var(--el-border-color-lighter);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        background: var(--el-fill-color-blank);

        .fields-panel-header {
          padding: 10px 12px;
          border-bottom: 1px solid var(--el-border-color-lighter);
          font-weight: 600;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--el-fill-color-light);
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
      border: 1px solid var(--el-border-color-lighter);
      border-radius: 8px;
      background: var(--el-fill-color-blank);

      .preview-header {
        padding: 10px 12px;
        border-bottom: 1px solid var(--el-border-color-lighter);
        font-weight: 600;
        font-size: 13px;
        display: flex;
        align-items: center;
        gap: 6px;
        background: var(--el-fill-color-light);
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
      background: var(--el-fill-color-light);
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.2s;

      &:hover {
        background: var(--el-color-primary-light-9);
        color: var(--el-color-primary);
      }

      .field-display {
        font-weight: 500;
      }

      .field-source {
        color: var(--el-text-color-secondary);
        font-family: monospace;
        font-size: 11px;
      }
    }
  }

  .fields-empty {
    text-align: center;
    padding: 20px 10px;
    color: var(--el-text-color-placeholder);
    font-size: 12px;
  }

  .template-content-tips {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
    padding: 6px 10px;
    background: var(--el-fill-color-light);
    border-radius: 4px;

    .tip-text {
      color: var(--el-text-color-secondary);
      font-size: 12px;
    }
  }
}
</style>
