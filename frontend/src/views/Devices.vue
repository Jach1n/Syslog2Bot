<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  GetDevices, 
  AddDevice, 
  UpdateDevice, 
  DeleteDevice
} from '../../wailsjs/go/main/App'

interface Device {
  id?: number
  name: string
  ipAddress: string
  description: string
  groupName: string
  isActive: boolean
}

const loading = ref(false)
const devices = ref<Device[]>([])
const dialogVisible = ref(false)
const dialogTitle = ref('添加设备')
const formData = ref<Device>({
  name: '',
  ipAddress: '',
  description: '',
  groupName: 'default',
  isActive: true
})

onMounted(() => {
  loadDevices()
})

async function loadDevices() {
  loading.value = true
  try {
    devices.value = await GetDevices()
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

function handleAdd() {
  dialogTitle.value = '添加设备'
  formData.value = {
    name: '',
    ipAddress: '',
    description: '',
    groupName: 'default',
    isActive: true
  }
  dialogVisible.value = true
}

function handleEdit(row: Device) {
  dialogTitle.value = '编辑设备'
  formData.value = { ...row }
  dialogVisible.value = true
}

async function handleDelete(row: Device) {
  try {
    await ElMessageBox.confirm('确定要删除该设备吗？', '提示', {
      type: 'warning'
    })
    await DeleteDevice(row.id!)
    ElMessage.success('删除成功')
    loadDevices()
  } catch (e: any) {
    if (e !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

async function handleSubmit() {
  if (!formData.value.name || !formData.value.ipAddress) {
    ElMessage.warning('请填写必填项')
    return
  }
  
  try {
    if (formData.value.id) {
      await UpdateDevice(formData.value)
      ElMessage.success('更新成功')
    } else {
      await AddDevice(formData.value)
      ElMessage.success('添加成功')
    }
    dialogVisible.value = false
    loadDevices()
  } catch (e) {
    ElMessage.error('操作失败')
  }
}
</script>

<template>
  <div class="devices-view">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>设备列表</span>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            添加设备
          </el-button>
        </div>
      </template>
      
      <el-table :data="devices" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="设备名称" width="150" />
        <el-table-column prop="ipAddress" label="IP地址" width="140" />
        <el-table-column prop="groupName" label="分组" width="100">
          <template #default="{ row }">
            <el-tag size="small">{{ row.groupName || 'default' }}</el-tag>
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
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="设备名称" required>
          <el-input v-model="formData.name" placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="IP地址" required>
          <el-input v-model="formData.ipAddress" placeholder="请输入IP地址" />
        </el-form-item>
        <el-form-item label="分组">
          <el-input v-model="formData.groupName" placeholder="默认分组: default" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formData.description" type="textarea" :rows="3" placeholder="请输入描述" />
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
  </div>
</template>

<style lang="scss" scoped>
.devices-view {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
