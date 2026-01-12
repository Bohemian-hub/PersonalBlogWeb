<template>
    <div class="activity-manage">
        <!-- 操作栏 -->
        <div class="toolbar">
            <el-button type="primary" @click="openDialog('add')">
                <el-icon>
                    <Plus />
                </el-icon>
                新增动态
            </el-button>
        </div>

        <!-- 列表展示 -->
        <el-table :data="activityList" style="width: 100%" v-loading="loading">
            <el-table-column prop="date" label="日期" width="120" sortable />
            <el-table-column prop="mood" label="心情" width="100">
                <template #default="{ row }">
                    <el-tag :color="getMoodColor(row.mood)" effect="dark"
                        style="border: none; color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">{{
                            row.mood }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="内容" show-overflow-tooltip />
            <el-table-column label="操作" width="150" align="center">
                <template #default="{ row }">
                    <el-button type="primary" link @click="openDialog('edit', row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
                v-model:current-page="currentPage" @current-change="loadData" />
        </div>

        <!-- 编辑/新增对话框 -->
        <el-dialog v-model="dialogVisible" :title="dialogType === 'add' ? '新增动态' : '编辑动态'" width="500px">
            <el-form :model="formData" label-width="80px" ref="formRef" :rules="rules">
                <el-form-item label="日期" prop="date">
                    <el-date-picker v-model="formData.date" type="date" placeholder="选择日期" format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD" style="width: 100%" />
                </el-form-item>
                <el-form-item label="心情" prop="mood">
                    <div class="mood-selector">
                        <div v-for="mood in moodOptions" :key="mood" class="mood-option"
                            :class="{ active: formData.mood === mood }" :style="{ background: getMoodColor(mood) }"
                            @click="selectMood(mood)">
                            <span>{{ mood }}</span>
                            <el-icon v-if="formData.mood === mood" class="check-icon">
                                <Check />
                            </el-icon>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="内容" prop="description">
                    <el-input v-model="formData.description" type="textarea" :rows="4" placeholder="今天发生了什么有趣的..." />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="submitForm" :loading="submitting">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { Plus, Edit, Delete, Check } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getActivities, saveActivity } from '@/api/activity'

// 状态定义
const loading = ref(false)
const activityList = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0) // 目前API暂未返回total，预留

const dialogVisible = ref(false)
const dialogType = ref('add') // 'add' or 'edit'
const submitting = ref(false)
const formRef = ref(null)

const formData = reactive({
    date: '',
    mood: '',
    description: ''
})

const rules = {
    date: [{ required: true, message: '请选择日期', trigger: 'change' }],
    mood: [{ required: true, message: '请选择心情', trigger: 'change' }],
    description: [{ required: false }]
}

const moodOptions = ['工作', '学习', '躺平', '玩耍', '激动']
const moodColors = {
    '工作': '#55965f',
    '学习': '#5a73b4',
    '躺平': '#a06eb4',
    '玩耍': '#c8915a',
    '激动': '#50aab4'
}

// 方法
const getMoodColor = (mood) => {
    return moodColors[mood] || '#999'
}

const selectMood = (mood) => {
    formData.mood = mood
}

const loadData = async () => {
    loading.value = true
    try {
        const res = await getActivities({
            limit: 365
        })
        if (res) {
            activityList.value = res
            // 简单前端分页
            // const start = (currentPage.value - 1) * pageSize.value
            // const end = start + pageSize.value
            // activityList.value = res.slice(start, end)
            total.value = res.length
        }
    } catch (error) {
        console.error('加载动态失败', error)
        ElMessage.error('加载失败')
    } finally {
        loading.value = false
    }
}

const openDialog = (type, row) => {
    dialogType.value = type
    dialogVisible.value = true
    if (type === 'edit' && row) {
        formData.date = row.date
        formData.mood = row.mood
        formData.description = row.description
    } else {
        // 新增时默认选中今天
        const today = new Date()
        const y = today.getFullYear()
        const m = String(today.getMonth() + 1).padStart(2, '0')
        const d = String(today.getDate()).padStart(2, '0')

        formData.date = `${y}-${m}-${d}`
        formData.mood = '工作'
        formData.description = ''
    }
}

const submitForm = async () => {
    if (!formRef.value) return

    await formRef.value.validate(async (valid) => {
        if (valid) {
            submitting.value = true
            try {
                await saveActivity(formData)
                ElMessage.success('保存成功')
                dialogVisible.value = false
                loadData()
            } catch (error) {
                console.error(error)
                ElMessage.error('保存失败')
            } finally {
                submitting.value = false
            }
        }
    })
}

onMounted(() => {
    loadData()
})

</script>

<style scoped>
.activity-manage {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    min-height: 500px;
}

.toolbar {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
}

.pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.mood-selector {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.mood-option {
    padding: 5px 15px;
    border-radius: 20px;
    color: #fff;
    cursor: pointer;
    position: relative;
    font-size: 14px;
    transition: transform 0.2s;
    user-select: none;
    opacity: 0.7;
}

.mood-option:hover {
    opacity: 0.9;
    transform: translateY(-2px);
}

.mood-option.active {
    opacity: 1;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
    font-weight: bold;
}

.check-icon {
    position: absolute;
    right: -5px;
    top: -5px;
    background: #fff;
    color: #409EFF;
    border-radius: 50%;
    padding: 2px;
    font-size: 12px;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
