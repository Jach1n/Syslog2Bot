<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete, Right, ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import { 
  GetParseTemplates, 
  AddParseTemplate, 
  UpdateParseTemplate,
  DeleteParseTemplate,
  TestParseTemplate,
  GetFieldMappingDocByDeviceType,
  GetFieldMappingDocs,
  GetFieldMappingDocByName
} from '../../wailsjs/go/main/App'

interface ParseTemplate {
  id?: number
  name: string
  description: string
  parseType: string
  headerRegex: string
  fieldMapping: string
  valueTransform: string
  sampleLog: string
  deviceType: string
  isActive: boolean
}

interface FieldMappingItem {
  sourceField: string
  displayName: string
}

interface ValueTransformItem {
  field: string
  rules: { originalValue: string; displayValue: string }[]
}

interface SubTemplateConfig {
  alertNameField: number
  attackIPField: number
  victimIPField: number
  alertTimeField: number
  severityField: number
  attackResultField: number
  customFields?: { name: string; fieldIndex: number }[]
}

interface SmartDelimiterConfig {
  delimiter: string
  typeField: number
  skipHeader?: boolean
  headerRegex?: string
  subTemplates: Record<string, SubTemplateConfig>
}

const loading = ref(false)
const templates = ref<ParseTemplate[]>([])
const dialogVisible = ref(false)
const viewDialogVisible = ref(false)
const isEdit = ref(false)
const fieldMappingCache = ref<Record<string, string>>({})
const deviceTypes = ref<{value: string, label: string}[]>([])

const smartDelimiterConfig = ref<SmartDelimiterConfig>({
  delimiter: '|!',
  typeField: 0,
  subTemplates: {}
})

const subTemplateDialogVisible = ref(false)
const subTemplateViewMode = ref(false)
const currentSubTemplateType = ref('')
const currentSubTemplateConfig = ref<SubTemplateConfig>({
  alertNameField: -1,
  attackIPField: -1,
  victimIPField: -1,
  alertTimeField: -1,
  severityField: -1,
  attackResultField: -1
})
const subTemplateSampleLog = ref('')
const parsedFields = ref<string[]>([])

const formData = ref<ParseTemplate>({
  name: '',
  description: '',
  parseType: 'syslog_json',
  headerRegex: '',
  fieldMapping: '',
  valueTransform: '',
  sampleLog: '',
  deviceType: '',
  isActive: true
})

const viewData = ref<ParseTemplate | null>(null)
const viewParseResult = ref<{
  success: boolean
  error: string
  fields: string[]
  data: Record<string, any>
} | null>(null)
const viewTestLog = ref('')
const viewTesting = ref(false)

const parseTypes = [
  { value: 'syslog_json', label: 'Syslog + JSON', desc: 'Syslog头部 + JSON内容格式，需要配置头部正则来定位JSON起始位置' },
  { value: 'json', label: '纯JSON', desc: '纯JSON格式日志，直接解析整个日志为JSON' },
  { value: 'delimiter', label: '分隔符', desc: '使用分隔符解析字段，如天眼设备的|!分隔格式' },
  { value: 'smart_delimiter', label: '智能分隔符', desc: '根据告警类型自动选择字段映射，适用于多种告警类型的日志' },
  { value: 'keyvalue', label: '键值对分隔', desc: '使用分隔符分隔的键值对格式，如 key:value|!key2:value2' },
  { value: 'regex', label: '正则表达式', desc: '使用正则表达式提取字段，适用于非结构化日志' },
  { value: 'kv', label: '键值对', desc: 'key=value 格式，自动解析键值对' }
]

const presetTemplates = [
  { 
    value: 'yunsuo', 
    label: '云锁', 
    parseType: 'syslog_json',
    headerRegex: '<(?P<priority>\\d+)>(?P<timestamp>\\w+ \\d+ [\\d:]+) (?P<hostname>\\S+)[^{]*',
    fieldMapping: '{}',
    valueTransform: '{"result":{"0":"未拦截","1":"拦截"},"dealStatus":{"0":"未处理","1":"已处理(自动)","2":"已处理(手动)","3":"误报","4":"不关注","5":"处置失败","6":"处置中"}}',
    desc: '云锁安全设备 Syslog + JSON 格式，自动解析JSON内容'
  },
  { 
    value: 'tianyan', 
    label: '天眼', 
    parseType: 'smart_delimiter',
    headerRegex: '',
    fieldMapping: '{"delimiter":"|!","typeField":0,"skipHeader":true,"headerRegex":"","subTemplates":{"webids_alert":{"alertNameField":3,"attackIPField":6,"victimIPField":8,"alertTimeField":4,"severityField":10,"attackResultField":26},"ioc_alert":{"alertNameField":18,"attackIPField":6,"victimIPField":8,"alertTimeField":10,"severityField":12,"attackResultField":-1}}}',
    valueTransform: '{"severity":{"2":"低危","3":"低危","4":"中危","5":"中危","6":"高危","7":"高危","8":"危急","9":"危急","low":"低危","medium":"中危","high":"高危","critical":"危急"},"attackResult":{"0":"失败","1":"成功","2":"失陷","3":"失败"}}',
    desc: '天眼安全设备智能分隔符格式，支持webids_alert和ioc_alert'
  }
]

const parseResult = ref<{
  success: boolean
  error: string
  fields: string[]
  data: Record<string, any>
} | null>(null)

const fieldMappings = ref<FieldMappingItem[]>([])
const valueTransforms = ref<ValueTransformItem[]>([])

const allDiscoveredFields = ref<string[]>([])
const showAllFields = ref(false)

const availableFieldsForTransform = computed(() => {
  if (formData.value.parseType === 'smart_delimiter') {
    const fields = [
      { source: 'alertType', display: '告警类型' },
      { source: 'alertName', display: '告警名称' },
      { source: 'attackIP', display: '攻击IP' },
      { source: 'victimIP', display: '受害IP' },
      { source: 'alertTime', display: '告警时间' },
      { source: 'severity', display: '威胁等级' },
      { source: 'attackResult', display: '攻击结果' }
    ]
    for (const type in smartDelimiterConfig.value.subTemplates) {
      const config = smartDelimiterConfig.value.subTemplates[type]
      if (config.customFields) {
        for (const cf of config.customFields) {
          if (cf.name && !fields.find(f => f.source === cf.name)) {
            fields.push({ source: cf.name, display: cf.name })
          }
        }
      }
    }
    return fields
  }
  return fieldMappings.value
    .filter(m => m.sourceField && m.displayName)
    .map(m => ({ source: m.sourceField, display: m.displayName }))
})

const displayFields = computed(() => {
  if (showAllFields.value && allDiscoveredFields.value.length > 0) {
    return allDiscoveredFields.value
  }
  return fieldMappings.value.map(m => m.sourceField).filter(f => f)
})

onMounted(() => {
  loadTemplates()
  loadDeviceTypes()
})

async function loadDeviceTypes() {
  try {
    const docs = await GetFieldMappingDocs()
    deviceTypes.value = docs.map((d: any) => ({ value: d.name, label: d.name }))
  } catch (e) {
    console.error(e)
  }
}

watch(() => formData.value.deviceType, async (newVal) => {
  if (newVal) {
    try {
    const doc = await GetFieldMappingDocByName(newVal)
    if (doc && doc.fieldMappings) {
      fieldMappingCache.value = JSON.parse(doc.fieldMappings)
    }
  } catch (e) {
    fieldMappingCache.value = {}
  }
  } else {
    fieldMappingCache.value = {}
  }
})

async function loadTemplates() {
  loading.value = true
  try {
    templates.value = await GetParseTemplates()
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

function resetForm() {
  formData.value = {
    name: '',
    description: '',
    parseType: 'syslog_json',
    headerRegex: '',
    fieldMapping: '',
    valueTransform: '',
    sampleLog: '',
    deviceType: '',
    isActive: true
  }
  fieldMappings.value = []
  valueTransforms.value = []
  parseResult.value = null
  allDiscoveredFields.value = []
}

function handleAdd() {
  isEdit.value = false
  resetForm()
  dialogVisible.value = true
}

async function handleView(row: ParseTemplate) {
  viewData.value = { ...row }
  viewParseResult.value = null
  viewTestLog.value = row.sampleLog || ''
  
  if (viewTestLog.value) {
    await runViewParseTest()
  }
  
  viewDialogVisible.value = true
}

async function runViewParseTest() {
  if (!viewTestLog.value || !viewData.value) {
    viewParseResult.value = null
    return
  }
  
  viewTesting.value = true
  try {
    const result = await TestParseTemplate({
      parseType: viewData.value.parseType,
      headerRegex: viewData.value.headerRegex,
      fieldMapping: viewData.value.fieldMapping,
      valueTransform: viewData.value.valueTransform,
      sampleLog: viewTestLog.value
    })
    viewParseResult.value = result
  } catch (e) {
    viewParseResult.value = {
      success: false,
      error: '解析失败',
      fields: [],
      data: {}
    }
  } finally {
    viewTesting.value = false
  }
}

function handleEdit(row: ParseTemplate) {
  isEdit.value = true
  showAllFields.value = false
  parseResult.value = null
  allDiscoveredFields.value = []
  
  // 重置智能分隔符配置
  smartDelimiterConfig.value = {
    delimiter: '|!',
    typeField: 0,
    skipHeader: false,
    headerRegex: '',
    subTemplates: {}
  }
  
  if (row.parseType === 'smart_delimiter' && row.fieldMapping) {
    try {
      const config = JSON.parse(row.fieldMapping)
      smartDelimiterConfig.value = {
        delimiter: config.delimiter || '|!',
        typeField: config.typeField || 0,
        skipHeader: config.skipHeader || false,
        headerRegex: config.headerRegex || '',
        subTemplates: config.subTemplates || {}
      }
    } catch {
      // 解析失败使用默认值
    }
  } else if (row.fieldMapping) {
    try {
      const mapping = JSON.parse(row.fieldMapping)
      fieldMappings.value = Object.entries(mapping).map(([sourceField, displayName]) => ({
        sourceField,
        displayName: String(displayName)
      }))
    } catch {
      fieldMappings.value = []
    }
  } else {
    fieldMappings.value = []
  }
  
  if (row.valueTransform) {
    try {
      const transform = JSON.parse(row.valueTransform)
      valueTransforms.value = Object.entries(transform).map(([field, rules]) => ({
        field,
        rules: Object.entries(rules as Record<string, string>).map(([originalValue, displayValue]) => ({
          originalValue,
          displayValue
        }))
      }))
    } catch {
      valueTransforms.value = []
    }
  } else {
    valueTransforms.value = []
  }
  
  formData.value = { ...row }
  
  dialogVisible.value = true
}

async function handleDelete(row: ParseTemplate) {
  try {
    await ElMessageBox.confirm('确定要删除该解析模板吗？', '提示', { type: 'warning' })
    await DeleteParseTemplate(row.id!)
    ElMessage.success('删除成功')
    loadTemplates()
  } catch (e: any) {
    if (e !== 'cancel') ElMessage.error('删除失败')
  }
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(() => [formData.value.sampleLog, formData.value.parseType, formData.value.headerRegex], () => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => runParseTest(isEdit.value), 300)
}, { deep: true })

async function runParseTest(preserveMappings: boolean = false) {
  if (!formData.value.sampleLog) {
    parseResult.value = null
    return
  }
  
  try {
    let fieldMapping = buildFieldMappingJson()
    
    // 如果是智能分隔符类型，使用智能分隔符配置
    if (formData.value.parseType === 'smart_delimiter') {
      fieldMapping = JSON.stringify(smartDelimiterConfig.value)
    }
    
    const result = await TestParseTemplate({
      parseType: formData.value.parseType,
      headerRegex: formData.value.headerRegex,
      fieldMapping: fieldMapping,
      valueTransform: buildValueTransformJson(),
      sampleLog: formData.value.sampleLog
    })
    parseResult.value = result
    
    if (result.success && result.fields.length > 0) {
      allDiscoveredFields.value = result.fields
      
      if (!preserveMappings && formData.value.parseType !== 'smart_delimiter') {
        const existingSources = new Set(fieldMappings.value.map(m => m.sourceField))
        for (const field of result.fields) {
          if (!existingSources.has(field)) {
            const displayName = fieldMappingCache.value[field] || field
            fieldMappings.value.push({
              sourceField: field,
              displayName: displayName
            })
          }
        }
      }
    }
  } catch (e) {
    console.error(e)
    parseResult.value = {
      success: false,
      error: '测试失败',
      fields: [],
      data: {}
    }
  }
}

function addFieldMapping() {
  fieldMappings.value.push({
    sourceField: '',
    displayName: ''
  })
}

function removeFieldMapping(index: number) {
  fieldMappings.value.splice(index, 1)
}

function moveFieldMapping(index: number, direction: number) {
  const newIndex = index + direction
  if (newIndex < 0 || newIndex >= fieldMappings.value.length) return
  
  const temp = fieldMappings.value[index]
  fieldMappings.value[index] = fieldMappings.value[newIndex]
  fieldMappings.value[newIndex] = temp
}

function autoFillDisplayName(index: number) {
  const mapping = fieldMappings.value[index]
  if (mapping.sourceField && !mapping.displayName) {
    if (fieldMappingCache.value[mapping.sourceField]) {
      mapping.displayName = fieldMappingCache.value[mapping.sourceField]
    } else {
      mapping.displayName = mapping.sourceField
    }
  }
}

function applyMappingDoc() {
  for (const mapping of fieldMappings.value) {
    if (mapping.sourceField && fieldMappingCache.value[mapping.sourceField]) {
      mapping.displayName = fieldMappingCache.value[mapping.sourceField]
    }
  }
  ElMessage.success('已应用映射文档')
}

function addValueTransform() {
  valueTransforms.value.push({
    field: '',
    rules: [{ originalValue: '', displayValue: '' }]
  })
}

function removeValueTransform(index: number) {
  valueTransforms.value.splice(index, 1)
}

function addTransformRule(index: number) {
  valueTransforms.value[index].rules.push({
    originalValue: '',
    displayValue: ''
  })
}

function removeTransformRule(transformIndex: number, ruleIndex: number) {
  valueTransforms.value[transformIndex].rules.splice(ruleIndex, 1)
}

function buildFieldMappingJson(): string {
  const mapping: Record<string, string> = {}
  for (const item of fieldMappings.value) {
    if (item.sourceField && item.displayName) {
      mapping[item.sourceField] = item.displayName
    }
  }
  return JSON.stringify(mapping)
}

function buildValueTransformJson(): string {
  const transform: Record<string, Record<string, string>> = {}
  for (const item of valueTransforms.value) {
    if (item.field && item.rules.length > 0) {
      const rules: Record<string, string> = {}
      for (const rule of item.rules) {
        if (rule.originalValue && rule.displayValue) {
          rules[rule.originalValue] = rule.displayValue
        }
      }
      if (Object.keys(rules).length > 0) {
        transform[item.field] = rules
      }
    }
  }
  return JSON.stringify(transform)
}

function addSubTemplate() {
  ElMessageBox.prompt('请输入告警类型名称', '添加子模板', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^[a-zA-Z0-9_]+$/,
    inputErrorMessage: '只能输入字母、数字和下划线'
  }).then(({ value }) => {
    if (smartDelimiterConfig.value.subTemplates[value]) {
      ElMessage.warning('该告警类型已存在')
      return
    }
    currentSubTemplateType.value = value
    currentSubTemplateConfig.value = {
      alertNameField: -1,
      attackIPField: -1,
      victimIPField: -1,
      alertTimeField: -1,
      severityField: -1,
      attackResultField: -1
    }
    subTemplateSampleLog.value = ''
    parsedFields.value = []
    subTemplateDialogVisible.value = true
  })
}

function editSubTemplate(type: string) {
  currentSubTemplateType.value = type
  const config = smartDelimiterConfig.value.subTemplates[type]
  currentSubTemplateConfig.value = JSON.parse(JSON.stringify(config))
  if (currentSubTemplateConfig.value.severityField === undefined) {
    currentSubTemplateConfig.value.severityField = -1
  }
  if (currentSubTemplateConfig.value.attackResultField === undefined) {
    currentSubTemplateConfig.value.attackResultField = -1
  }
  subTemplateSampleLog.value = ''
  parsedFields.value = []
  subTemplateViewMode.value = false
  subTemplateDialogVisible.value = true
}

function viewSubTemplate(type: string) {
  currentSubTemplateType.value = type
  const config = smartDelimiterConfig.value.subTemplates[type]
  currentSubTemplateConfig.value = JSON.parse(JSON.stringify(config))
  if (currentSubTemplateConfig.value.severityField === undefined) {
    currentSubTemplateConfig.value.severityField = -1
  }
  if (currentSubTemplateConfig.value.attackResultField === undefined) {
    currentSubTemplateConfig.value.attackResultField = -1
  }
  subTemplateSampleLog.value = ''
  parsedFields.value = []
  subTemplateViewMode.value = true
  subTemplateDialogVisible.value = true
}

function removeSubTemplate(type: string) {
  ElMessageBox.confirm('确定要删除该子模板吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    delete smartDelimiterConfig.value.subTemplates[type]
    ElMessage.success('删除成功')
  })
}

function parseSubTemplateLog() {
  if (!subTemplateSampleLog.value.trim()) {
    ElMessage.warning('请输入日志示例')
    return
  }
  
  const delimiter = smartDelimiterConfig.value.delimiter || '|!'
  const content = subTemplateSampleLog.value
  
  const regexMatch = formData.value.headerRegex ? 
    new RegExp(formData.value.headerRegex).exec(content) : null
  
  let logContent = content
  if (regexMatch && regexMatch.index + regexMatch[0].length < content.length) {
    logContent = content.substring(regexMatch.index + regexMatch[0].length).trim()
  }
  
  parsedFields.value = logContent.split(delimiter)
  ElMessage.success(`解析成功，共 ${parsedFields.value.length} 个字段`)
}

function addCustomField() {
  if (!currentSubTemplateConfig.value.customFields) {
    currentSubTemplateConfig.value.customFields = []
  }
  currentSubTemplateConfig.value.customFields.push({
    name: '',
    fieldIndex: -1
  })
}

function removeCustomField(index: number) {
  if (currentSubTemplateConfig.value.customFields) {
    currentSubTemplateConfig.value.customFields.splice(index, 1)
  }
}

function saveSubTemplate() {
  smartDelimiterConfig.value.subTemplates[currentSubTemplateType.value] = JSON.parse(JSON.stringify(currentSubTemplateConfig.value))
  subTemplateDialogVisible.value = false
  ElMessage.success('子模板保存成功')
}

function applyToAllSubTemplates() {
  const types = Object.keys(smartDelimiterConfig.value.subTemplates)
  if (types.length <= 1) {
    ElMessage.warning('没有其他子模板')
    return
  }
  
  ElMessageBox.confirm(
    `确定要将当前字段配置应用到所有 ${types.length - 1} 个其他子模板吗？`,
    '批量应用',
    { type: 'warning' }
  ).then(() => {
    const currentConfig = {
      alertNameField: currentSubTemplateConfig.value.alertNameField,
      attackIPField: currentSubTemplateConfig.value.attackIPField,
      victimIPField: currentSubTemplateConfig.value.victimIPField,
      alertTimeField: currentSubTemplateConfig.value.alertTimeField,
      severityField: currentSubTemplateConfig.value.severityField,
      attackResultField: currentSubTemplateConfig.value.attackResultField
    }
    
    for (const type of types) {
      if (type !== currentSubTemplateType.value) {
        smartDelimiterConfig.value.subTemplates[type] = {
          ...currentConfig,
          customFields: smartDelimiterConfig.value.subTemplates[type].customFields || []
        }
      }
    }
    ElMessage.success('已应用到所有子模板')
  })
}

async function handleSubmit() {
  if (!formData.value.name) {
    ElMessage.warning('请填写模板名称')
    return
  }
  
  if (formData.value.parseType === 'syslog_json' && !formData.value.headerRegex) {
    ElMessage.warning('Syslog+JSON 类型必须配置头部正则')
    return
  }
  
  formData.value.fieldMapping = buildFieldMappingJson()
  formData.value.valueTransform = buildValueTransformJson()
  
  // 如果是智能分隔符类型
  if (formData.value.parseType === 'smart_delimiter') {
    formData.value.fieldMapping = JSON.stringify(smartDelimiterConfig.value)
  }
  
  try {
    if (formData.value.id) {
      await UpdateParseTemplate(formData.value)
      ElMessage.success('更新成功')
    } else {
      await AddParseTemplate(formData.value)
      ElMessage.success('添加成功')
    }
    dialogVisible.value = false
    loadTemplates()
  } catch (e) {
    ElMessage.error('操作失败')
  }
}

function getParseTypeLabel(type: string): string {
  return parseTypes.find(t => t.value === type)?.label || type
}

function formatDate(dateStr: string) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleString('zh-CN')
}

const defaultHeaderRegex = '<(?P<priority>\\d+)>(?P<timestamp>\\w+ \\d+ [\\d:]+) (?P<hostname>\\S+)[^{]*'

const headerRegexPresets = [
  { 
    value: 'yunsuo', 
    label: '云锁', 
    regex: '<(?P<priority>\\d+)>(?P<timestamp>\\w+ \\d+ [\\d:]+) (?P<hostname>\\S+)[^{]*',
    desc: '云锁安全设备 Syslog + JSON 格式'
  },
  { 
    value: 'tianyan', 
    label: '天眼', 
    regex: '<(?P<priority>\\d+)>(?P<timestamp>\\w+\\s+\\d+\\s+[\\d:]+) (?P<hostname>\\S+) (?P<program>\\S+): (?P<alert_type>\\w+)\\|!',
    desc: '天眼安全设备 Syslog + 分隔符格式'
  },
  { 
    value: 'standard', 
    label: '标准Syslog', 
    regex: '<(?P<priority>\\d+)>(?P<timestamp>\\w+ \\d+ [\\d:]+) (?P<hostname>\\S+)[^{]*',
    desc: '标准 Syslog 头部正则，适用于大多数设备'
  }
]

function useDefaultRegex() {
  formData.value.headerRegex = defaultHeaderRegex
}

function applyHeaderRegexPreset(value: string) {
  const preset = headerRegexPresets.find(p => p.value === value)
  if (preset) {
    formData.value.headerRegex = preset.regex
    ElMessage.success(`已应用 ${preset.label} 正则模板`)
  }
}

function applyPresetTemplate(value: string) {
  const preset = presetTemplates.find(p => p.value === value)
  if (preset) {
    formData.value.parseType = preset.parseType
    formData.value.headerRegex = preset.headerRegex
    formData.value.fieldMapping = preset.fieldMapping
    formData.value.valueTransform = preset.valueTransform
    ElMessage.success(`已应用 ${preset.label} 预设模板，解析类型已设置为 ${preset.parseType === 'delimiter' ? '分隔符' : 'Syslog + JSON'}`)
  }
}
</script>

<template>
  <div class="parse-templates-view">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>解析模板</span>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            添加模板
          </el-button>
        </div>
      </template>
      
      <el-table :data="templates" v-loading="loading" stripe>
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="name" label="模板名称" width="180" />
        <el-table-column prop="parseType" label="解析类型" width="120">
          <template #default="{ row }">
            <el-tag type="info" size="small">{{ getParseTypeLabel(row.parseType) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" show-overflow-tooltip />
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.isActive ? 'success' : 'danger'" size="small">
              {{ row.isActive ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="info" link size="small" @click="handleView(row)">查看</el-button>
            <el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 查看对话框 -->
    <el-dialog 
      v-model="viewDialogVisible" 
      title="查看模板" 
      width="90%"
      top="3vh"
      modal-class="view-template-dialog-modal"
    >
      <div class="view-dialog-content" v-if="viewData">
        <div class="view-config-panel">
          <div class="view-section">
            <h4>基本信息</h4>
            <div class="view-info-grid">
              <div class="view-info-item">
                <span class="label">模板名称</span>
                <span class="value">{{ viewData.name }}</span>
              </div>
              <div class="view-info-item">
                <span class="label">设备类型</span>
                <span class="value">
                  <el-tag v-if="viewData.deviceType" size="small">{{ viewData.deviceType }}</el-tag>
                  <span v-else>-</span>
                </span>
              </div>
              <div class="view-info-item">
                <span class="label">解析类型</span>
                <span class="value">{{ getParseTypeLabel(viewData.parseType) }}</span>
              </div>
              <div class="view-info-item">
                <span class="label">状态</span>
                <span class="value">
                  <el-tag :type="viewData.isActive ? 'success' : 'danger'" size="small">
                    {{ viewData.isActive ? '启用' : '禁用' }}
                  </el-tag>
                </span>
              </div>
            </div>
          </div>
          
          <div class="view-section" v-if="viewData.headerRegex">
            <h4>头部正则</h4>
            <div class="view-code-block">
              <code>{{ viewData.headerRegex }}</code>
            </div>
          </div>
          
          <div class="view-section" v-if="viewData.description">
            <h4>描述</h4>
            <p class="view-description">{{ viewData.description }}</p>
          </div>
          
          <div class="view-section" v-if="viewData.fieldMapping">
            <h4>字段映射 ({{ Object.keys(JSON.parse(viewData.fieldMapping)).length }} 个)</h4>
            <div class="view-mappings-list">
              <div 
                v-for="(displayName, sourceField) in JSON.parse(viewData.fieldMapping)" 
                :key="sourceField"
                class="view-mapping-item"
              >
                <span class="source">{{ sourceField }}</span>
                <el-icon><Right /></el-icon>
                <span class="display">{{ displayName }}</span>
              </div>
            </div>
          </div>
          
          <div class="view-section" v-if="viewData.valueTransform">
            <h4>值转换规则</h4>
            <div class="view-transform-list">
              <div 
                v-for="(rules, field) in JSON.parse(viewData.valueTransform)" 
                :key="field"
                class="view-transform-item"
              >
                <div class="transform-field-name">{{ field }}</div>
                <div class="transform-rules-list">
                  <div v-for="(displayVal, originalVal) in rules" :key="originalVal" class="transform-rule">
                    <span class="original">{{ originalVal }}</span>
                    <el-icon><Right /></el-icon>
                    <span class="display">{{ displayVal }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="view-section">
            <h4>测试日志</h4>
            <el-input 
              v-model="viewTestLog" 
              type="textarea" 
              :rows="4" 
              placeholder="输入测试日志内容，点击测试按钮查看解析效果"
            />
            <div style="margin-top: 10px;">
              <el-button type="primary" :loading="viewTesting" @click="runViewParseTest">
                <el-icon><Position /></el-icon>
                测试解析
              </el-button>
            </div>
          </div>
          
          <div class="view-section" v-if="viewData.sampleLog">
            <h4>示例日志</h4>
            <pre class="view-sample-log">{{ viewData.sampleLog }}</pre>
          </div>
        </div>
        
        <div class="view-preview-panel">
          <div class="preview-header">
            <el-icon><View /></el-icon>
            解析效果预览
          </div>
          <div class="preview-content">
            <div v-if="!viewParseResult" class="preview-empty">
              <el-icon :size="48"><Document /></el-icon>
              <p>无示例日志<br>无法预览解析效果</p>
            </div>
            
            <div v-else-if="viewParseResult.success" class="preview-success">
              <div class="preview-section" v-if="viewData?.fieldMapping">
                <h4>映射后字段 ({{ Object.keys(JSON.parse(viewData.fieldMapping)).length }} 个)</h4>
                <div class="mapped-data">
                  <div 
                    v-for="(displayName, sourceField) in JSON.parse(viewData.fieldMapping)" 
                    :key="sourceField"
                    class="data-item"
                  >
                    <span class="data-key">{{ displayName }}</span>
                    <span class="data-value">{{ viewParseResult.data[sourceField] || '-' }}</span>
                  </div>
                </div>
              </div>
              <div class="preview-section" v-else>
                <h4>解析成功 - {{ viewParseResult.fields.length }} 个字段</h4>
                <div class="parsed-data">
                  <div v-for="key in Object.keys(viewParseResult.data)" :key="key" class="data-item">
                    <span class="data-key">{{ key }}</span>
                    <span class="data-value">{{ viewParseResult.data[key] }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-else class="preview-error">
              <el-icon :size="48"><CircleClose /></el-icon>
              <p>{{ viewParseResult.error }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <template #footer>
        <el-button @click="viewDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="viewDialogVisible = false; handleEdit(viewData!)">编辑</el-button>
      </template>
    </el-dialog>

    <!-- 添加/编辑对话框 -->
    <el-dialog 
      v-model="dialogVisible" 
      :title="isEdit ? '编辑模板' : '添加模板'" 
      width="95%" 
      top="2vh"
      :close-on-click-modal="false"
      modal-class="template-dialog-modal"
    >
      <div class="dialog-content">
        <div class="main-content">
          <div class="config-panel">
            <el-form :model="formData" label-width="100px" class="config-form">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="模板名称" required>
                    <el-input v-model="formData.name" placeholder="请输入模板名称" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="映射文档">
                    <el-select 
                      v-model="formData.deviceType" 
                      placeholder="选择映射文档" 
                      clearable 
                      filterable
                      style="width: 100%"
                    >
                      <el-option 
                        v-for="dt in deviceTypes" 
                        :key="dt.value" 
                        :label="dt.label" 
                        :value="dt.value" 
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              
              <el-form-item label="预设模板">
                <el-select 
                  placeholder="选择预设模板，自动填充配置" 
                  clearable
                  style="width: 100%"
                  @change="applyPresetTemplate"
                >
                  <el-option 
                    v-for="preset in presetTemplates" 
                    :key="preset.value" 
                    :label="preset.label" 
                    :value="preset.value"
                  >
                    <div class="preset-option">
                      <span class="preset-label">{{ preset.label }}</span>
                      <span class="preset-desc">{{ preset.desc }}</span>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="解析类型">
                <el-radio-group v-model="formData.parseType">
                  <el-radio-button 
                    v-for="t in parseTypes" 
                    :key="t.value" 
                    :value="t.value"
                  >
                    {{ t.label }}
                  </el-radio-button>
                </el-radio-group>
                <div class="parse-type-desc">
                  {{ parseTypes.find(t => t.value === formData.parseType)?.desc }}
                </div>
              </el-form-item>
              
              <el-form-item label="头部正则" v-if="formData.parseType === 'syslog_json'" required>
                <div class="regex-header">
                  <el-input 
                    v-model="formData.headerRegex" 
                    placeholder="必填：正则表达式，用于匹配Syslog头部并定位JSON起始位置"
                    style="flex: 1"
                    :class="{ 'is-required-field': !formData.headerRegex }"
                  />
                  <el-select 
                    placeholder="选择模板" 
                    style="width: 120px"
                    @change="applyHeaderRegexPreset"
                  >
                    <el-option 
                      v-for="preset in headerRegexPresets" 
                      :key="preset.value" 
                      :label="preset.label" 
                      :value="preset.value"
                    >
                      <div class="preset-option">
                        <span>{{ preset.label }}</span>
                        <span class="preset-desc">{{ preset.desc }}</span>
                      </div>
                    </el-option>
                  </el-select>
                </div>
                <div class="regex-help">
                  <el-alert type="warning" :closable="false" show-icon v-if="!formData.headerRegex">
                    <template #title>
                      <span class="required-warning">⚠️ 头部正则为必填项！请输入正则表达式或从右侧选择预设模板。</span>
                    </template>
                  </el-alert>
                  <el-alert type="info" :closable="false" show-icon v-else>
                    <template #title>
                      <div class="help-content">
                        <p>头部正则用于匹配 Syslog 日志的头部信息，定位 JSON 内容的起始位置。</p>
                      </div>
                    </template>
                  </el-alert>
                </div>
              </el-form-item>
              
              <el-form-item label="示例日志" required>
                <el-input 
                  v-model="formData.sampleLog" 
                  type="textarea" 
                  :rows="4" 
                  placeholder="粘贴一条真实的日志样本，用于测试解析效果"
                />
              </el-form-item>
              
              <!-- 智能分隔符配置 -->
              <template v-if="formData.parseType === 'smart_delimiter'">
                <el-divider content-position="left">智能分隔符配置</el-divider>
                
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="分隔符">
                      <el-input v-model="smartDelimiterConfig.delimiter" placeholder="默认 |!" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="类型字段位置">
                      <el-input-number v-model="smartDelimiterConfig.typeField" :min="0" :max="100" />
                    </el-form-item>
                  </el-col>
                </el-row>
                
                <el-form-item label="跳过头部">
                  <div style="display: flex; align-items: center; gap: 15px;">
                    <el-switch v-model="smartDelimiterConfig.skipHeader" />
                    <span class="text-gray-500 text-sm">开启后将跳过Syslog头部（如 &lt;142&gt;Mar 12 09:39:00 hostname program:）</span>
                  </div>
                  <div v-if="smartDelimiterConfig.skipHeader" style="margin-top: 10px;">
                    <el-input 
                      v-model="smartDelimiterConfig.headerRegex" 
                      placeholder="默认正则：匹配标准Syslog头部"
                    >
                      <template #prepend>头部正则</template>
                    </el-input>
                    <div class="text-gray-400 text-xs mt-1">
                      默认正则会提取 priority、timestamp、hostname、program 字段
                    </div>
                  </div>
                </el-form-item>
                
                <el-form-item label="子模板配置">
                  <div class="sub-template-list">
                    <div 
                      v-for="(config, type) in smartDelimiterConfig.subTemplates" 
                      :key="type"
                      class="sub-template-item"
                    >
                      <div class="sub-template-header">
                        <span class="type-name">{{ type }}</span>
                        <div class="sub-template-actions">
                          <el-button type="info" size="small" @click="viewSubTemplate(type)">查看</el-button>
                          <el-button type="primary" size="small" @click="editSubTemplate(type)">配置</el-button>
                          <el-button type="danger" size="small" @click="removeSubTemplate(type)">删除</el-button>
                        </div>
                      </div>
                      <div class="sub-template-summary">
                        告警名称: field_{{ config.alertNameField }} | 
                        攻击IP: field_{{ config.attackIPField }} | 
                        受害IP: field_{{ config.victimIPField }} | 
                        告警时间: field_{{ config.alertTimeField }} |
                        威胁等级: field_{{ config.severityField ?? -1 }} |
                        攻击结果: field_{{ config.attackResultField ?? -1 }}
                      </div>
                    </div>
                    
                    <el-button type="primary" plain @click="addSubTemplate" style="width: 100%; margin-top: 10px;">
                      + 添加子模板
                    </el-button>
                  </div>
                </el-form-item>
              </template>
              
              <template v-if="formData.parseType !== 'smart_delimiter'">
              <el-divider content-position="left">字段映射配置</el-divider>
              
              <div class="mapping-section">
                <div class="mapping-header">
                  <span>字段映射 ({{ fieldMappings.length }} 个字段)</span>
                  <div class="mapping-actions">
                    <el-checkbox v-model="showAllFields" v-if="allDiscoveredFields.length > 0" style="margin-right: 10px;">
                      显示所有字段
                    </el-checkbox>
                    <el-button 
                      v-if="formData.deviceType && Object.keys(fieldMappingCache).length > 0" 
                      type="success" 
                      size="small" 
                      @click="applyMappingDoc"
                    >
                      应用映射文档
                    </el-button>
                    <el-button type="primary" size="small" @click="addFieldMapping">
                      添加字段
                    </el-button>
                  </div>
                </div>
                
                <div class="mapping-list">
                  <div v-for="(mapping, index) in fieldMappings" :key="index" class="mapping-item">
                    <div class="mapping-order">
                      <el-button 
                        type="default" 
                        circle 
                        size="small" 
                        :disabled="index === 0"
                        @click="moveFieldMapping(index, -1)"
                      >
                        <el-icon><ArrowUp /></el-icon>
                      </el-button>
                      <el-button 
                        type="default" 
                        circle 
                        size="small" 
                        :disabled="index === fieldMappings.length - 1"
                        @click="moveFieldMapping(index, 1)"
                      >
                        <el-icon><ArrowDown /></el-icon>
                      </el-button>
                    </div>
                    <el-select 
                      v-model="mapping.sourceField" 
                      placeholder="原始字段"
                      filterable
                      allow-create
                      @change="autoFillDisplayName(index)"
                      style="width: 200px"
                    >
                      <el-option 
                        v-for="field in (showAllFields ? allDiscoveredFields : displayFields)" 
                        :key="field" 
                        :label="field" 
                        :value="field"
                      />
                    </el-select>
                    <el-icon class="arrow-icon"><Right /></el-icon>
                    <el-input v-model="mapping.displayName" placeholder="显示名称" />
                    <el-button type="danger" circle size="small" @click="removeFieldMapping(index)">
                      <el-icon><Delete /></el-icon>
                    </el-button>
                  </div>
                  
                  <div v-if="fieldMappings.length === 0" class="empty-hint">
                    <el-icon><Warning /></el-icon>
                    粘贴示例日志后将自动识别字段，或点击"添加字段"手动添加
                  </div>
                </div>
              </div>
              </template>
              
              <el-divider content-position="left">值转换配置（可选）</el-divider>
              
              <div class="transform-section">
                <div class="mapping-header">
                  <span>值转换</span>
                  <el-button type="primary" size="small" @click="addValueTransform">
                    添加转换
                  </el-button>
                </div>
                
                <div class="transform-list" v-if="valueTransforms.length > 0">
                  <div v-for="(transform, tIndex) in valueTransforms" :key="tIndex" class="transform-item">
                    <div class="transform-field">
                      <el-select v-model="transform.field" placeholder="选择字段">
                        <el-option 
                          v-for="f in availableFieldsForTransform" 
                          :key="f.source" 
                          :label="`${f.display} (${f.source})`" 
                          :value="f.source"
                        />
                      </el-select>
                      <el-button type="primary" link size="small" @click="addTransformRule(tIndex)">
                        添加规则
                      </el-button>
                      <el-button type="danger" link size="small" @click="removeValueTransform(tIndex)">
                        删除
                      </el-button>
                    </div>
                    
                    <div class="transform-rules">
                      <div v-for="(rule, rIndex) in transform.rules" :key="rIndex" class="rule-item">
                        <el-input v-model="rule.originalValue" placeholder="原始值" />
                        <el-icon class="arrow-icon"><Right /></el-icon>
                        <el-input v-model="rule.displayValue" placeholder="显示值" />
                        <el-button type="danger" link size="small" @click="removeTransformRule(tIndex, rIndex)">
                          删除
                        </el-button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div v-else class="empty-hint light">
                  值转换可将字段值转换为更友好的显示文本，如 0→拦截, 1→未拦截
                </div>
              </div>
              
              <el-form-item label="描述">
                <el-input v-model="formData.description" type="textarea" :rows="2" placeholder="请输入描述" />
              </el-form-item>
              <el-form-item label="状态">
                <el-switch v-model="formData.isActive" active-text="启用" inactive-text="禁用" />
              </el-form-item>
            </el-form>
          </div>

          <div class="preview-panel">
            <div class="preview-header">
              <el-icon><View /></el-icon>
              实时预览
            </div>
            <div class="preview-content">
              <div v-if="!parseResult && fieldMappings.length === 0" class="preview-empty">
                <el-icon :size="48"><Document /></el-icon>
                <p>粘贴示例日志或添加字段映射后<br>将在此显示解析结果</p>
              </div>
              
              <div v-else-if="parseResult && parseResult.success" class="preview-success">
                <div class="preview-section">
                  <h4>解析成功 - 发现 {{ parseResult.fields.length }} 个字段</h4>
                  <div class="parsed-data">
                    <div v-for="key in Object.keys(parseResult.data)" :key="key" class="data-item">
                      <span class="data-key">{{ key }}</span>
                      <span class="data-value">{{ parseResult.data[key] }}</span>
                    </div>
                  </div>
                </div>
                
                <div class="preview-section" v-if="fieldMappings.length > 0">
                  <h4>映射后字段 ({{ fieldMappings.length }} 个)</h4>
                  <div class="mapped-data">
                    <div v-for="mapping in fieldMappings.filter(m => m.sourceField && m.displayName)" :key="mapping.sourceField" class="data-item">
                      <span class="data-key">{{ mapping.displayName }}</span>
                      <span class="data-value">{{ parseResult.data[mapping.sourceField] || '-' }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-else-if="parseResult && !parseResult.success" class="preview-error">
                <el-icon :size="48"><CircleClose /></el-icon>
                <p>{{ parseResult.error }}</p>
                <el-alert 
                  v-if="parseResult.error.includes('JSON') && formData.parseType === 'syslog_json' && !formData.headerRegex"
                  type="warning"
                  :closable="false"
                  class="error-tips"
                >
                  提示：Syslog+JSON 类型需要配置头部正则来定位 JSON 起始位置，请点击"使用默认"按钮。
                </el-alert>
              </div>
              
              <div v-else-if="fieldMappings.length > 0" class="preview-success">
                <div class="preview-section">
                  <h4>字段映射预览 ({{ fieldMappings.length }} 个字段)</h4>
                  <div class="mapped-data">
                    <div v-for="mapping in fieldMappings.filter(m => m.sourceField && m.displayName)" :key="mapping.sourceField" class="data-item">
                      <span class="data-key">{{ mapping.displayName }}</span>
                      <span class="data-value preview-placeholder">{{ mapping.sourceField }}</span>
                    </div>
                  </div>
                </div>
                
                <div class="preview-section" v-if="valueTransforms.length > 0">
                  <h4>值转换预览</h4>
                  <div class="transform-preview">
                    <div v-for="transform in valueTransforms" :key="transform.field" class="transform-item">
                      <div class="transform-field">{{ transform.field }}</div>
                      <div class="transform-rules">
                        <span v-for="(rule, idx) in transform.rules" :key="idx" class="rule-tag">
                          {{ rule.originalValue }} → {{ rule.displayValue }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">保存</el-button>
        </div>
      </template>
    </el-dialog>
    
    <!-- 子模板配置弹窗 -->
    <el-dialog 
      v-model="subTemplateDialogVisible" 
      :title="subTemplateViewMode ? `查看 ${currentSubTemplateType} 子模板` : `配置 ${currentSubTemplateType} 子模板`"
      width="700px"
      class="sub-template-dialog"
    >
      <div class="sub-template-config">
        <!-- 查看模式 -->
        <div v-if="subTemplateViewMode" class="view-mode">
          <el-alert type="info" :closable="false" style="margin-bottom: 20px;">
            <template #title>
              当前子模板字段配置
            </template>
          </el-alert>
          
          <el-descriptions :column="2" border>
            <el-descriptions-item label="告警名称">
              <el-tag v-if="currentSubTemplateConfig.alertNameField >= 0" type="success">
                field_{{ currentSubTemplateConfig.alertNameField }}
              </el-tag>
              <el-tag v-else type="info">未配置</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="攻击IP">
              <el-tag v-if="currentSubTemplateConfig.attackIPField >= 0" type="success">
                field_{{ currentSubTemplateConfig.attackIPField }}
              </el-tag>
              <el-tag v-else type="info">未配置</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="受害IP">
              <el-tag v-if="currentSubTemplateConfig.victimIPField >= 0" type="success">
                field_{{ currentSubTemplateConfig.victimIPField }}
              </el-tag>
              <el-tag v-else type="info">未配置</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="告警时间">
              <el-tag v-if="currentSubTemplateConfig.alertTimeField >= 0" type="success">
                field_{{ currentSubTemplateConfig.alertTimeField }}
              </el-tag>
              <el-tag v-else type="info">未配置</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="威胁等级">
              <el-tag v-if="currentSubTemplateConfig.severityField >= 0" type="success">
                field_{{ currentSubTemplateConfig.severityField }}
              </el-tag>
              <el-tag v-else type="info">未配置</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="攻击结果">
              <el-tag v-if="currentSubTemplateType === 'ioc_alert'" type="warning">
                自动设置（失陷）
              </el-tag>
              <el-tag v-else-if="currentSubTemplateConfig.attackResultField >= 0" type="success">
                field_{{ currentSubTemplateConfig.attackResultField }}
              </el-tag>
              <el-tag v-else type="info">未配置</el-tag>
            </el-descriptions-item>
          </el-descriptions>
          
          <div v-if="currentSubTemplateConfig.customFields && currentSubTemplateConfig.customFields.length > 0" style="margin-top: 20px;">
            <el-divider content-position="left">自定义字段</el-divider>
            <el-descriptions :column="2" border>
              <el-descriptions-item 
                v-for="(cf, idx) in currentSubTemplateConfig.customFields" 
                :key="idx"
                :label="cf.name"
              >
                <el-tag v-if="cf.fieldIndex >= 0" type="success">
                  field_{{ cf.fieldIndex }}
                </el-tag>
                <el-tag v-else type="info">未配置</el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </div>
          
          <el-alert 
            v-if="currentSubTemplateType === 'ioc_alert'" 
            type="warning" 
            :closable="false" 
            style="margin-top: 20px;"
          >
            <template #title>
              提示：IOC告警会自动设置攻击结果为"失陷"，无需手动配置攻击结果字段
            </template>
          </el-alert>
        </div>
        
        <!-- 配置模式 -->
        <template v-else>
        <el-form label-width="100px">
          <el-form-item label="日志示例">
            <el-input 
              v-model="subTemplateSampleLog" 
              type="textarea" 
              :rows="3" 
              placeholder="粘贴该类型的日志示例"
            />
          </el-form-item>
          <el-button type="primary" size="small" @click="parseSubTemplateLog" style="margin-bottom: 15px;">
            解析字段
          </el-button>
          
          <div v-if="parsedFields.length > 0" class="field-preview">
            <el-alert type="info" :closable="false" style="margin-bottom: 15px;">
              <template #title>
                共解析出 {{ parsedFields.length }} 个字段，请选择对应的字段位置
              </template>
            </el-alert>
            
            <el-row :gutter="15">
              <el-col :span="12">
                <el-form-item label="告警名称">
                  <template #label>
                    告警名称 <el-tag type="info" size="small">→ alertName</el-tag>
                  </template>
                  <el-select v-model="currentSubTemplateConfig.alertNameField" placeholder="选择字段" style="width: 100%">
                    <el-option 
                      v-for="(field, index) in parsedFields" 
                      :key="index" 
                      :label="`field_${index}: ${field.substring(0, 30)}${field.length > 30 ? '...' : ''}`"
                      :value="index"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="攻击IP">
                  <template #label>
                    攻击IP <el-tag type="info" size="small">→ attackIP</el-tag>
                  </template>
                  <el-select v-model="currentSubTemplateConfig.attackIPField" placeholder="选择字段" style="width: 100%">
                    <el-option 
                      v-for="(field, index) in parsedFields" 
                      :key="index" 
                      :label="`field_${index}: ${field.substring(0, 30)}${field.length > 30 ? '...' : ''}`"
                      :value="index"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row :gutter="15">
              <el-col :span="12">
                <el-form-item label="受害IP">
                  <template #label>
                    受害IP <el-tag type="info" size="small">→ victimIP</el-tag>
                  </template>
                  <el-select v-model="currentSubTemplateConfig.victimIPField" placeholder="选择字段" style="width: 100%">
                    <el-option 
                      v-for="(field, index) in parsedFields" 
                      :key="index" 
                      :label="`field_${index}: ${field.substring(0, 30)}${field.length > 30 ? '...' : ''}`"
                      :value="index"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="告警时间">
                  <template #label>
                    告警时间 <el-tag type="info" size="small">→ alertTime</el-tag>
                  </template>
                  <el-select v-model="currentSubTemplateConfig.alertTimeField" placeholder="选择字段" style="width: 100%">
                    <el-option 
                      v-for="(field, index) in parsedFields" 
                      :key="index" 
                      :label="`field_${index}: ${field.substring(0, 30)}${field.length > 30 ? '...' : ''}`"
                      :value="index"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row :gutter="15">
              <el-col :span="12">
                <el-form-item label="威胁等级">
                  <template #label>
                    威胁等级 <el-tag type="info" size="small">→ severity</el-tag>
                  </template>
                  <el-select v-model="currentSubTemplateConfig.severityField" placeholder="选择字段" style="width: 100%">
                    <el-option 
                      v-for="(field, index) in parsedFields" 
                      :key="index" 
                      :label="`field_${index}: ${field.substring(0, 30)}${field.length > 30 ? '...' : ''}`"
                      :value="index"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="攻击结果">
                  <template #label>
                    攻击结果 <el-tag type="info" size="small">→ attackResult</el-tag>
                  </template>
                  <el-select 
                    v-model="currentSubTemplateConfig.attackResultField" 
                    :placeholder="currentSubTemplateType === 'ioc_alert' ? 'IOC告警自动设置' : '选择字段'" 
                    style="width: 100%"
                    :disabled="currentSubTemplateType === 'ioc_alert'"
                  >
                    <el-option 
                      v-for="(field, index) in parsedFields" 
                      :key="index" 
                      :label="`field_${index}: ${field.substring(0, 30)}${field.length > 30 ? '...' : ''}`"
                      :value="index"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-alert 
              v-if="currentSubTemplateType === 'ioc_alert'" 
              type="warning" 
              :closable="false" 
              style="margin-bottom: 15px;"
            >
              <template #title>
                提示：IOC告警会自动设置攻击结果为"失陷"，此处无需配置
              </template>
            </el-alert>
            
            <!-- 自定义字段 -->
            <el-divider content-position="left" style="margin: 15px 0;">自定义字段（可选）</el-divider>
            
            <div v-if="currentSubTemplateConfig.customFields && currentSubTemplateConfig.customFields.length > 0" class="custom-fields-list">
              <el-row v-for="(cf, cfIndex) in currentSubTemplateConfig.customFields" :key="cfIndex" :gutter="15" style="margin-bottom: 10px;">
                <el-col :span="10">
                  <el-input v-model="cf.name" placeholder="字段名称（如 threatType）" />
                </el-col>
                <el-col :span="12">
                  <el-select v-model="cf.fieldIndex" placeholder="选择字段位置" style="width: 100%">
                    <el-option 
                      v-for="(field, index) in parsedFields" 
                      :key="index" 
                      :label="`field_${index}: ${field.substring(0, 30)}${field.length > 30 ? '...' : ''}`"
                      :value="index"
                    />
                  </el-select>
                </el-col>
                <el-col :span="2">
                  <el-button type="danger" :icon="Delete" circle @click="removeCustomField(cfIndex)" />
                </el-col>
              </el-row>
            </div>
            
            <el-button type="primary" plain size="small" @click="addCustomField" style="margin-top: 5px;">
              + 添加自定义字段
            </el-button>
          </div>
        </el-form>
        </template>
      </div>
      
      <template #footer>
        <div v-if="subTemplateViewMode" style="display: flex; justify-content: flex-end; width: 100%;">
          <el-button @click="subTemplateDialogVisible = false">关闭</el-button>
        </div>
        <div v-else style="display: flex; justify-content: space-between; width: 100%;">
          <el-button type="warning" @click="applyToAllSubTemplates">
            应用到所有子模板
          </el-button>
          <div>
            <el-button @click="subTemplateDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="saveSubTemplate">保存</el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.parse-templates-view {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

<style lang="scss">
.template-dialog-modal {
  .el-dialog {
    .el-dialog__body {
      padding: 0 !important;
    }
    
    .dialog-content {
      height: 75vh;
      display: flex;
      flex-direction: column;
    }
    
    .main-content {
      flex: 1;
      display: flex !important;
      flex-direction: row !important;
      overflow: hidden;
      min-height: 0;
    }
    
    .config-panel {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      min-width: 0;
    }
    
    .preview-panel {
      width: 400px;
      min-width: 400px;
      border-left: 1px solid var(--el-border-color-lighter);
      display: flex;
      flex-direction: column;
      background: var(--el-fill-color-light);
      flex-shrink: 0;
    }
    
    .preview-header {
      padding: 14px 16px;
      border-bottom: 1px solid var(--el-border-color-lighter);
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--el-bg-color);
      flex-shrink: 0;
    }
    
    .preview-content {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
    }
    
    .preview-empty {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--el-text-color-placeholder);
      text-align: center;
      
      p {
        margin-top: 16px;
        line-height: 1.6;
      }
    }
    
    .preview-success {
      .preview-section {
        margin-bottom: 20px;
        
        h4 {
          margin-bottom: 12px;
          color: var(--el-text-color-regular);
          font-size: 13px;
        }
      }
      
      .parsed-data, .mapped-data {
        background: var(--el-bg-color);
        border-radius: 6px;
        padding: 12px;
      }
      
      .data-item {
        display: flex;
        padding: 6px 0;
        border-bottom: 1px dashed var(--el-border-color-lighter);
        
        &:last-child {
          border-bottom: none;
        }
      }
      
      .data-key {
        width: 120px;
        font-weight: 500;
        color: var(--el-color-primary);
        flex-shrink: 0;
      }
      
      .data-value {
        flex: 1;
        word-break: break-all;
        
        &.preview-placeholder {
          color: var(--el-text-color-secondary);
          font-style: italic;
        }
      }
      
      .transform-preview {
        background: var(--el-bg-color);
        border-radius: 6px;
        padding: 12px;
        
        .transform-item {
          padding: 8px 0;
          border-bottom: 1px dashed var(--el-border-color-lighter);
          
          &:last-child {
            border-bottom: none;
          }
          
          .transform-field {
            font-weight: 500;
            color: var(--el-color-primary);
            margin-bottom: 6px;
          }
          
          .transform-rules {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            
            .rule-tag {
              background: var(--el-fill-color-light);
              padding: 2px 8px;
              border-radius: 4px;
              font-size: 12px;
            }
          }
        }
      }
    }
    
    .preview-error {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--el-color-danger);
      text-align: center;
      
      p {
        margin-top: 12px;
        word-break: break-all;
      }
      
      .error-tips {
        margin-top: 16px;
        width: 100%;
      }
    }
    
    .config-form {
      .parse-type-desc {
        margin-top: 8px;
        font-size: 12px;
        color: var(--el-text-color-secondary);
      }
      
      .regex-header {
        display: flex;
        gap: 12px;
        align-items: flex-start;
        
        .el-input {
          flex: 1;
        }
      }
      
      .regex-help {
        margin-top: 12px;
        
        .required-warning {
          color: var(--el-color-warning);
          font-weight: 500;
        }
        
        .help-content {
          font-size: 12px;
          line-height: 1.8;
          
          p {
            margin: 0;
          }
        }
      }
      
      .is-required-field {
        :deep(.el-input__wrapper) {
          border-color: var(--el-color-warning);
        }
      }
    }
    
    .mapping-section, .transform-section {
      margin-bottom: 24px;
    }
    
    .mapping-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      font-weight: 500;
    }
    
    .mapping-actions {
      display: flex;
      gap: 8px;
    }
    
    .mapping-list, .transform-list {
      background: var(--el-fill-color-light);
      border-radius: 8px;
      padding: 16px;
    }
    
    .mapping-item {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .mapping-order {
        display: flex;
        flex-direction: row;
        gap: 4px;
        
        .el-button {
          width: 24px;
          height: 24px;
          padding: 0;
        }
      }
      
      .el-input {
        flex: 1;
      }
      
      .arrow-icon {
        color: var(--el-text-color-secondary);
      }
    }
    
    .empty-hint {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 20px;
      color: var(--el-text-color-secondary);
      
      &.light {
        color: var(--el-text-color-placeholder);
        font-size: 13px;
      }
    }
    
    .transform-item {
      background: var(--el-bg-color);
      border-radius: 6px;
      padding: 12px;
      margin-bottom: 12px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    .transform-field {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      
      .el-select {
        flex: 1;
      }
    }
    
    .transform-rules {
      padding-left: 12px;
      border-left: 2px solid var(--el-border-color-lighter);
    }
    
    .rule-item {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
      
      .el-input {
        width: 120px;
      }
      
      .arrow-icon {
        color: var(--el-text-color-secondary);
      }
    }
    
    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
  }
}

.view-sample-log {
  margin: 0;
  padding: 12px;
  background: var(--el-fill-color-light);
  border-radius: 6px;
  font-size: 12px;
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 200px;
  overflow-y: auto;
}

.view-template-dialog-modal {
  .el-dialog {
    .el-dialog__body {
      padding: 0 !important;
    }
  }
  
  .view-dialog-content {
    height: 75vh;
    display: flex;
    overflow: hidden;
  }
  
  .view-config-panel {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    min-width: 0;
  }
  
  .view-preview-panel {
    width: 400px;
    min-width: 400px;
    border-left: 1px solid var(--el-border-color-lighter);
    display: flex;
    flex-direction: column;
    background: var(--el-fill-color-light);
    flex-shrink: 0;
    
    .preview-header {
      padding: 14px 16px;
      border-bottom: 1px solid var(--el-border-color-lighter);
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--el-bg-color);
      flex-shrink: 0;
    }
    
    .preview-content {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
    }
    
    .preview-empty {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--el-text-color-placeholder);
      text-align: center;
      
      p {
        margin-top: 16px;
        line-height: 1.6;
      }
    }
    
    .preview-success {
      .preview-section {
        h4 {
          margin-bottom: 12px;
          color: var(--el-text-color-regular);
          font-size: 13px;
        }
      }
      
      .parsed-data {
        background: var(--el-bg-color);
        border-radius: 6px;
        padding: 12px;
        max-height: calc(75vh - 100px);
        overflow-y: auto;
      }
      
      .data-item {
        display: flex;
        padding: 6px 0;
        border-bottom: 1px dashed var(--el-border-color-lighter);
        
        &:last-child {
          border-bottom: none;
        }
      }
      
      .data-key {
        width: 140px;
        font-weight: 500;
        color: var(--el-color-primary);
        flex-shrink: 0;
        word-break: break-all;
      }
      
      .data-value {
        flex: 1;
        word-break: break-all;
      }
    }
    
    .preview-error {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--el-color-danger);
      text-align: center;
      
      p {
        margin-top: 12px;
        word-break: break-all;
      }
    }
  }
  
  .view-section {
    margin-bottom: 20px;
    
    h4 {
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--el-border-color-lighter);
      font-size: 14px;
      font-weight: 600;
      color: var(--el-text-color-primary);
    }
  }
  
  .view-info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .view-info-item {
    display: flex;
    align-items: center;
    gap: 8px;
    
    .label {
      color: var(--el-text-color-secondary);
      min-width: 70px;
    }
    
    .value {
      font-weight: 500;
    }
  }
  
  .view-code-block {
    background: var(--el-fill-color-light);
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
    
    code {
      font-family: monospace;
      font-size: 12px;
      word-break: break-all;
    }
  }
  
  .view-description {
    margin: 0;
    color: var(--el-text-color-regular);
    line-height: 1.6;
  }
  
  .view-mappings-list {
    background: var(--el-fill-color-light);
    border-radius: 6px;
    padding: 12px;
    max-height: 300px;
    overflow-y: auto;
  }
  
  .view-mapping-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 0;
    border-bottom: 1px dashed var(--el-border-color-lighter);
    
    &:last-child {
      border-bottom: none;
    }
    
    .source {
      color: var(--el-text-color-secondary);
      font-family: monospace;
      font-size: 12px;
    }
    
    .display {
      color: var(--el-color-primary);
      font-weight: 500;
    }
    
    .el-icon {
      color: var(--el-text-color-placeholder);
    }
  }
  
  .view-transform-list {
    background: var(--el-fill-color-light);
    border-radius: 6px;
    padding: 12px;
  }
  
  .view-transform-item {
    margin-bottom: 12px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .transform-field-name {
    font-weight: 500;
    margin-bottom: 8px;
    color: var(--el-color-primary);
  }
  
  .transform-rules-list {
    padding-left: 12px;
    border-left: 2px solid var(--el-border-color-lighter);
  }
  
  .transform-rule {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
    
    .original {
      color: var(--el-text-color-secondary);
      font-family: monospace;
    }
    
    .display {
      color: var(--el-text-color-regular);
    }
    
    .el-icon {
      color: var(--el-text-color-placeholder);
    }
  }
  
  .view-sample-log {
    margin: 0;
    padding: 12px;
    background: var(--el-fill-color-light);
    border-radius: 6px;
    font-size: 12px;
    white-space: pre-wrap;
    word-break: break-all;
    max-height: 200px;
    overflow-y: auto;
  }
}

.sub-template-list {
  .sub-template-item {
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 10px;
    background: var(--bg-secondary);
    
    .sub-template-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      
      .type-name {
        font-weight: 600;
        color: var(--accent-color);
        font-size: 14px;
      }
      
      .sub-template-actions {
        display: flex;
        gap: 8px;
      }
    }
    
    .sub-template-summary {
      font-size: 12px;
      color: var(--text-secondary);
      line-height: 1.6;
    }
  }
}

.sub-template-dialog {
  .sub-template-config {
    .field-preview {
      margin-top: 15px;
    }
  }
}
</style>
