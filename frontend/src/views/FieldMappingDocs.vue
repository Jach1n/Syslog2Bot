<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  GetFieldMappingDocs, 
  AddFieldMappingDoc, 
  UpdateFieldMappingDoc, 
  DeleteFieldMappingDoc 
} from '../../wailsjs/go/main/App'

interface FieldMappingItem {
  field: string
  displayName: string
  isEditing?: boolean
}

interface FieldMappingDoc {
  id?: number
  name: string
  deviceType: string
  description: string
  fieldMappings: string
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

const loading = ref(false)
const docs = ref<FieldMappingDoc[]>([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const batchImportVisible = ref(false)
const batchImportText = ref('')

const formData = ref<FieldMappingDoc>({
  name: '',
  deviceType: '',
  description: '',
  fieldMappings: '',
  isActive: true
})

const newField = ref('')
const newDisplayName = ref('')
const editingField = ref<FieldMappingItem | null>(null)
const editFieldInput = ref('')
const editDisplayNameInput = ref('')

const parsedMappings = computed(() => {
  if (!formData.value.fieldMappings) return []
  try {
    const obj = JSON.parse(formData.value.fieldMappings)
    // 检查是否是嵌套结构（天眼格式）
    if (obj.fields && typeof obj.fields === 'object') {
      // 天眼格式：提取 fields 中的字段
      const fields = obj.fields
      return Object.entries(fields).map(([field, info]) => ({
        field,
        displayName: typeof info === 'object' && info.name ? info.name : String(info)
      }))
    }
    // 简单格式（云锁格式）
    return Object.entries(obj).map(([field, displayName]) => ({
      field,
      displayName: String(displayName)
    }))
  } catch {
    return []
  }
})

onMounted(() => {
  loadDocs()
})

async function loadDocs() {
  loading.value = true
  try {
    docs.value = await GetFieldMappingDocs()
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

function handleAdd() {
  isEdit.value = false
  formData.value = {
    name: '',
    deviceType: '',
    description: '',
    fieldMappings: '{}',
    isActive: true
  }
  dialogVisible.value = true
}

function handleEdit(row: FieldMappingDoc) {
  isEdit.value = true
  formData.value = { ...row }
  dialogVisible.value = true
}

async function handleDelete(row: FieldMappingDoc) {
  try {
    await ElMessageBox.confirm('确定要删除该映射文档吗？', '提示', { type: 'warning' })
    await DeleteFieldMappingDoc(row.id!)
    ElMessage.success('删除成功')
    loadDocs()
  } catch (e: any) {
    if (e !== 'cancel') ElMessage.error('删除失败')
  }
}

function addMapping() {
  if (!newField.value || !newDisplayName.value) {
    ElMessage.warning('请填写字段名和显示名称')
    return
  }
  
  let mappings: Record<string, string> = {}
  try {
    mappings = JSON.parse(formData.value.fieldMappings || '{}')
  } catch {
    mappings = {}
  }
  
  mappings[newField.value] = newDisplayName.value
  formData.value.fieldMappings = JSON.stringify(mappings, null, 2)
  
  newField.value = ''
  newDisplayName.value = ''
}

function startEdit(item: FieldMappingItem) {
  editingField.value = item
  editFieldInput.value = item.field
  editDisplayNameInput.value = item.displayName
}

function cancelEdit() {
  editingField.value = null
  editFieldInput.value = ''
  editDisplayNameInput.value = ''
}

function saveEdit(item: FieldMappingItem) {
  if (!editFieldInput.value || !editDisplayNameInput.value) {
    ElMessage.warning('字段名和显示名称不能为空')
    return
  }
  
  let mappings: Record<string, string> = {}
  try {
    mappings = JSON.parse(formData.value.fieldMappings || '{}')
  } catch {
    mappings = {}
  }
  
  if (editFieldInput.value !== item.field) {
    delete mappings[item.field]
  }
  mappings[editFieldInput.value] = editDisplayNameInput.value
  formData.value.fieldMappings = JSON.stringify(mappings, null, 2)
  
  editingField.value = null
}

function removeMapping(field: string) {
  let mappings: Record<string, string> = {}
  try {
    mappings = JSON.parse(formData.value.fieldMappings || '{}')
  } catch {
    return
  }
  
  delete mappings[field]
  formData.value.fieldMappings = JSON.stringify(mappings, null, 2)
}

function openBatchImport() {
  batchImportText.value = ''
  batchImportVisible.value = true
}

function doBatchImport() {
  if (!batchImportText.value.trim()) {
    ElMessage.warning('请输入要导入的内容')
    return
  }
  
  let mappings: Record<string, string> = {}
  try {
    mappings = JSON.parse(formData.value.fieldMappings || '{}')
  } catch {
    mappings = {}
  }
  
  let importCount = 0
  
  try {
    const jsonContent = JSON.parse(batchImportText.value)
    if (typeof jsonContent === 'object') {
      Object.assign(mappings, jsonContent)
      importCount = Object.keys(jsonContent).length
    }
  } catch {
    const lines = batchImportText.value.split('\n')
    for (const line of lines) {
      const trimmedLine = line.trim()
      if (!trimmedLine || trimmedLine.startsWith('#')) continue
      
      const separatorIndex = trimmedLine.indexOf(':')
      if (separatorIndex === -1) continue
      
      const field = trimmedLine.substring(0, separatorIndex).trim()
      const displayName = trimmedLine.substring(separatorIndex + 1).trim()
      
      if (field && displayName) {
        mappings[field] = displayName
        importCount++
      }
    }
  }
  
  if (importCount === 0) {
    ElMessage.warning('未解析到有效的字段映射，请检查格式')
    return
  }
  
  formData.value.fieldMappings = JSON.stringify(mappings, null, 2)
  batchImportVisible.value = false
  ElMessage.success(`成功导入 ${importCount} 个字段映射`)
}

async function handleSubmit() {
  if (!formData.value.name) {
    ElMessage.warning('请填写文档名称')
    return
  }
  if (!formData.value.deviceType) {
    ElMessage.warning('请填写设备类型')
    return
  }
  
  try {
    if (isEdit.value) {
      await UpdateFieldMappingDoc(formData.value)
      ElMessage.success('更新成功')
    } else {
      await AddFieldMappingDoc(formData.value)
      ElMessage.success('添加成功')
    }
    dialogVisible.value = false
    loadDocs()
  } catch (e) {
    ElMessage.error('操作失败')
  }
}

function formatDate(dateStr: string) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleString('zh-CN')
}

function getFieldCount(fieldMappings: string): number {
  if (!fieldMappings) return 0
  try {
    const obj = JSON.parse(fieldMappings)
    // 检查是否是嵌套结构（天眼格式）
    if (obj.fields && typeof obj.fields === 'object') {
      return Object.keys(obj.fields).length
    }
    // 简单格式（云锁格式）
    return Object.keys(obj).length
  } catch {
    return 0
  }
}
</script>

<template>
  <div class="field-mapping-docs-view">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>映射文档库</span>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            添加文档
          </el-button>
        </div>
      </template>
      
      <el-table :data="docs" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="文档名称" width="180" />
        <el-table-column prop="deviceType" label="设备类型" width="120">
          <template #default="{ row }">
            <el-tag type="info" size="small">{{ row.deviceType }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" show-overflow-tooltip />
        <el-table-column label="字段数量" width="100">
          <template #default="{ row }">
            <el-tag size="small">
              {{ getFieldCount(row.fieldMappings) }} 个
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.isActive ? 'success' : 'danger'" size="small">
              {{ row.isActive ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" width="160">
          <template #default="{ row }">
            {{ formatDate(row.updatedAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog 
      v-model="dialogVisible" 
      :title="isEdit ? '编辑映射文档' : '添加映射文档'" 
      width="800px"
      :close-on-click-modal="false"
    >
      <el-form :model="formData" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文档名称" required>
              <el-input v-model="formData.name" placeholder="请输入文档名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备类型" required>
              <el-input v-model="formData.deviceType" placeholder="如：云锁、防火墙等" />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="描述">
          <el-input v-model="formData.description" type="textarea" :rows="2" placeholder="请输入描述" />
        </el-form-item>
        
        <el-form-item label="字段映射">
          <div class="mapping-editor">
            <div class="add-mapping">
              <el-input v-model="newField" placeholder="原始字段名" style="width: 200px" @keyup.enter="addMapping" />
              <el-icon class="arrow-icon"><Right /></el-icon>
              <el-input v-model="newDisplayName" placeholder="显示名称" style="width: 200px" @keyup.enter="addMapping" />
              <el-button type="primary" size="small" @click="addMapping">添加</el-button>
              <el-button type="success" size="small" @click="openBatchImport">
                <el-icon><Upload /></el-icon>
                批量导入
              </el-button>
            </div>
            
            <div class="mapping-list" v-if="parsedMappings.length > 0">
              <div class="mapping-header">
                <span>原始字段</span>
                <span>显示名称</span>
                <span>操作</span>
              </div>
              <div v-for="item in parsedMappings" :key="item.field" class="mapping-item">
                <template v-if="editingField === item">
                  <el-input v-model="editFieldInput" size="small" style="flex: 1; margin-right: 8px" />
                  <el-input v-model="editDisplayNameInput" size="small" style="flex: 1; margin-right: 8px" />
                  <div class="edit-actions">
                    <el-button type="success" size="small" @click="saveEdit(item)">
                      <el-icon><Check /></el-icon>
                    </el-button>
                    <el-button size="small" @click="cancelEdit">
                      <el-icon><Close /></el-icon>
                    </el-button>
                  </div>
                </template>
                <template v-else>
                  <span class="field-name">{{ item.field }}</span>
                  <span class="display-name">{{ item.displayName }}</span>
                  <div class="item-actions">
                    <el-button type="primary" link size="small" @click="startEdit(item)">
                      <el-icon><Edit /></el-icon>
                    </el-button>
                    <el-button type="danger" link size="small" @click="removeMapping(item.field)">
                      <el-icon><Delete /></el-icon>
                    </el-button>
                  </div>
                </template>
              </div>
            </div>
            
            <div class="empty-hint" v-else>
              <el-icon><Warning /></el-icon>
              暂无字段映射，请添加或批量导入
            </div>
          </div>
        </el-form-item>
        
        <el-form-item label="状态">
          <el-switch v-model="formData.isActive" active-text="启用" inactive-text="禁用" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>

    <el-dialog 
      v-model="batchImportVisible" 
      title="批量导入字段映射" 
      width="600px"
    >
      <div class="batch-import-tips">
        <p>支持两种格式：</p>
        <p><strong>JSON 格式：</strong></p>
        <pre>{"attackIp": "攻击者IP", "levelDesc": "威胁等级"}</pre>
        <p><strong>键值对格式（每行一个）：</strong></p>
        <pre>attackIp:攻击者IP
levelDesc:威胁等级
description:事件描述</pre>
      </div>
      <el-input
        v-model="batchImportText"
        type="textarea"
        :rows="10"
        placeholder="请粘贴要导入的字段映射内容"
      />
      <template #footer>
        <el-button @click="batchImportVisible = false">取消</el-button>
        <el-button type="primary" @click="doBatchImport">导入</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.field-mapping-docs-view {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .mapping-editor {
    width: 100%;
    
    .add-mapping {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
      
      .arrow-icon {
        color: var(--el-text-color-secondary);
      }
    }
    
    .mapping-list {
      border: 1px solid var(--el-border-color-lighter);
      border-radius: 6px;
      max-height: 300px;
      overflow-y: auto;
      
      .mapping-header {
        display: flex;
        justify-content: space-between;
        padding: 10px 16px;
        background: var(--el-fill-color-light);
        font-weight: 500;
        font-size: 13px;
        
        span {
          flex: 1;
        }
        
        span:last-child {
          width: 80px;
          flex: none;
        }
      }
      
      .mapping-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 16px;
        border-bottom: 1px solid var(--el-border-color-lighter);
        
        &:last-child {
          border-bottom: none;
        }
        
        .field-name {
          flex: 1;
          font-family: monospace;
          color: var(--el-color-primary);
        }
        
        .display-name {
          flex: 1;
        }
        
        .item-actions {
          width: 80px;
          display: flex;
          gap: 4px;
        }
        
        .edit-actions {
          width: 80px;
          display: flex;
          gap: 4px;
        }
      }
    }
    
    .empty-hint {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 40px;
      color: var(--el-text-color-placeholder);
      background: var(--el-fill-color-light);
      border-radius: 6px;
    }
  }
  
  .batch-import-tips {
    margin-bottom: 16px;
    padding: 12px 16px;
    background: var(--el-fill-color-light);
    border-radius: 6px;
    font-size: 13px;
    
    p {
      margin: 0 0 8px 0;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    pre {
      margin: 4px 0;
      padding: 8px 12px;
      background: var(--el-bg-color);
      border-radius: 4px;
      font-size: 12px;
      overflow-x: auto;
    }
  }
}
</style>
