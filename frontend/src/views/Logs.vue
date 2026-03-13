<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import { 
  GetLogs, 
  GetDevices 
} from '../../wailsjs/go/main/App'

interface LogItem {
  id: number
  deviceName: string
  sourceIp: string
  rawMessage: string
  parsedData: string
  parsedFields: string
  priority: string
  severity: number
  receivedAt: string
  isAlerted: boolean
  filterStatus: string
}

const loading = ref(false)
const logs = ref<LogItem[]>([])
const total = ref(0)
const dialogVisible = ref(false)
const currentLog = ref<LogItem | null>(null)

const queryParams = reactive({
  page: 1,
  pageSize: 20,
  deviceId: undefined as number | undefined,
  startTime: '',
  endTime: '',
  keyword: ''
})

const devices = ref<any[]>([])

onMounted(async () => {
  await loadDevices()
  await loadLogs()
})

async function loadDevices() {
  try {
    devices.value = await GetDevices()
  } catch (e) {
    console.error(e)
  }
}

async function loadLogs() {
  loading.value = true
  try {
    const result = await GetLogs({
      ...queryParams,
      deviceId: queryParams.deviceId || 0
    })
    logs.value = result.logs || []
    total.value = result.total || 0
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  queryParams.page = 1
  loadLogs()
}

function handleReset() {
  queryParams.page = 1
  queryParams.deviceId = undefined
  queryParams.startTime = ''
  queryParams.endTime = ''
  queryParams.keyword = ''
  loadLogs()
}

function handlePageChange(page: number) {
  queryParams.page = page
  loadLogs()
}

function handleSizeChange(size: number) {
  queryParams.pageSize = size
  queryParams.page = 1
  loadLogs()
}

function viewLogDetail(log: LogItem) {
  currentLog.value = log
  dialogVisible.value = true
}

function getSeverityTag(severity: number) {
  const map: Record<number, { type: string; text: string }> = {
    0: { type: 'danger', text: '紧急' },
    1: { type: 'danger', text: '告警' },
    2: { type: 'danger', text: '严重' },
    3: { type: 'warning', text: '错误' },
    4: { type: 'warning', text: '警告' },
    5: { type: 'info', text: '通知' },
    6: { type: '', text: '信息' },
    7: { type: 'success', text: '调试' }
  }
  return map[severity] || { type: '', text: '未知' }
}

function getLevelTag(level: string): { type: string; text: string } {
  const levelMap: Record<string, { type: string; text: string }> = {
    '危急': { type: 'danger', text: '危急' },
    '高危': { type: 'danger', text: '高危' },
    '中危': { type: 'warning', text: '中危' },
    '低危': { type: 'info', text: '低危' },
    '信息': { type: '', text: '信息' },
    '严重': { type: 'danger', text: '严重' }
  }
  return levelMap[level] || { type: '', text: level }
}

function getLevelDesc(log: LogItem): { type: string; text: string } {
  if (log.parsedFields) {
    try {
      const fields = JSON.parse(log.parsedFields)
      if (fields.severity) {
        return getLevelTag(fields.severity)
      }
      if (fields.levelDesc) {
        return getLevelTag(fields.levelDesc)
      }
    } catch (e) {
      console.error(e)
    }
  }
  return { type: 'info', text: '信息' }
}

function formatTime(time: string) {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}

function getFilterStatusType(status: string): string {
  const statusMap: Record<string, string> = {
    'pending': 'warning',
    'matched': 'success',
    'unmatched': 'info'
  }
  return statusMap[status] || 'info'
}

function getFilterStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    'pending': '待处理',
    'matched': '已匹配',
    'unmatched': '未匹配'
  }
  return statusMap[status] || status
}
</script>

<template>
  <div class="logs-view">
    <el-card shadow="hover" class="search-card">
      <el-form :inline="true" :model="queryParams">
        <el-form-item label="设备">
          <el-select v-model="queryParams.deviceId" placeholder="全部设备" clearable style="width: 150px">
            <el-option v-for="d in devices" :key="d.id" :label="d.name" :value="d.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="queryParams.startTime" type="datetime" placeholder="选择时间" value-format="YYYY-MM-DD HH:mm:ss" style="width: 180px" />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="queryParams.endTime" type="datetime" placeholder="选择时间" value-format="YYYY-MM-DD HH:mm:ss" style="width: 180px" />
        </el-form-item>
        <el-form-item label="关键字">
          <el-input v-model="queryParams.keyword" placeholder="搜索日志内容" clearable style="width: 200px" @keyup.enter="handleSearch" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon>
            搜索
          </el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="hover" class="table-card">
      <el-table :data="logs" v-loading="loading" stripe highlight-current-row @row-dblclick="viewLogDetail">
        <el-table-column prop="id" label="ID" width="70" />
        <el-table-column prop="deviceName" label="设备名称" width="120" />
        <el-table-column prop="sourceIp" label="来源IP" width="130" />
        <el-table-column label="威胁等级" width="90">
          <template #default="{ row }">
            <el-tag :type="getLevelDesc(row).type" size="small">
              {{ getLevelDesc(row).text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="rawMessage" label="日志内容" min-width="200">
          <template #default="{ row }">
            <span class="log-text">{{ row.rawMessage }}</span>
          </template>
        </el-table-column>
        <el-table-column label="接收时间" width="160">
          <template #default="{ row }">
            {{ formatTime(row.receivedAt) }}
          </template>
        </el-table-column>
        <el-table-column label="筛选状态" width="90">
          <template #default="{ row }">
            <el-tag :type="getFilterStatusType(row.filterStatus)" size="small">
              {{ getFilterStatusText(row.filterStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="已告警" width="70" align="center">
          <template #default="{ row }">
            <el-icon v-if="row.isAlerted" :style="{ color: 'var(--success-color)' }"><CircleCheck /></el-icon>
            <el-icon v-else :style="{ color: 'var(--text-muted)' }"><CircleClose /></el-icon>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="60" align="center">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="viewLogDetail(row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          v-model:current-page="queryParams.page"
          v-model:page-size="queryParams.pageSize"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
    </el-card>

    <el-dialog v-model="dialogVisible" title="日志详情" width="700px">
      <el-descriptions v-if="currentLog" :column="2" border>
        <el-descriptions-item label="ID">{{ currentLog.id }}</el-descriptions-item>
        <el-descriptions-item label="设备名称">{{ currentLog.deviceName }}</el-descriptions-item>
        <el-descriptions-item label="来源IP">{{ currentLog.sourceIp }}</el-descriptions-item>
        <el-descriptions-item label="优先级">{{ currentLog.priority }}</el-descriptions-item>
        <el-descriptions-item label="威胁等级">
          <el-tag :type="getLevelDesc(currentLog).type" size="small">
            {{ getLevelDesc(currentLog).text }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="接收时间">{{ formatTime(currentLog.receivedAt) }}</el-descriptions-item>
        <el-descriptions-item label="原始日志" :span="2">
          <pre class="log-content">{{ currentLog.rawMessage }}</pre>
        </el-descriptions-item>
        <el-descriptions-item label="解析数据" :span="2">
          <pre class="log-content">{{ currentLog.parsedData || '-' }}</pre>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.logs-view {
  .search-card {
    margin-bottom: 15px;
  }
  
  .table-card {
    .log-text {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
    
    .pagination {
      margin-top: 15px;
      display: flex;
      justify-content: flex-end;
    }
  }
  
  .log-content {
    background: var(--el-fill-color-light);
    padding: 10px;
    border-radius: 4px;
    font-size: 12px;
    white-space: pre-wrap;
    word-break: break-all;
    max-height: 200px;
    overflow: auto;
    margin: 0;
  }
}
</style>
