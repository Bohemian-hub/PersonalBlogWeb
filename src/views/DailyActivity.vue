<template>
    <div class="activity-container">
        <div class="content-wrapper">
            <!-- Header Section -->
            <div class="page-header">
                <h2 class="title" :class="{ 'scrolled': isScrolled }">
                    <i class="el-icon-date" style="margin-right: 8px;"></i>
                    每日动态
                </h2>
                <p class="subtitle">记录每一天的心情与故事</p>
            </div>

            <!-- Activity Cards -->
            <div class="activity-timeline">
                <div v-for="(day, index) in last7Days" :key="day.dateStr" class="timeline-item">
                    <!-- Date Column -->
                    <div class="date-col">
                        <span class="day-name">{{ day.dayName }}</span>
                        <span class="date-num">{{ day.dateDisplay }}</span>
                        <div class="line" v-if="index !== last7Days.length - 1"></div>
                    </div>

                    <!-- Content Card -->
                    <div class="activity-card"
                        :class="{ 'filled': day.hasData, 'is-today': day.isToday, 'empty': !day.hasData }"
                        @click="openEdit(day)">
                        <div class="card-content">
                            <div v-if="day.hasData" class="info-layout">
                                <div class="mood-badge" :style="{ backgroundColor: getMoodColor(day.data.mood) }">
                                    {{ getMoodEmoji(day.data.mood) }} {{ day.data.mood }}
                                </div>
                                <p class="description">{{ day.data.description }}</p>
                            </div>

                            <div v-else class="empty-state">
                                <i class="el-icon-edit-outline icon-add"></i>
                                <span>点击记录今天</span>
                            </div>
                        </div>

                        <!-- Edit Indicator (Hover/Active) -->
                        <div class="card-action">
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Dialog -->
        <el-dialog v-model="showModal" :title="'📝 记录 ' + (currentEditingDay ? currentEditingDay.dateDisplay : '')"
            :width="isMobile ? '90%' : '500px'" custom-class="activity-dialog" :close-on-click-modal="false"
            destroy-on-close center>
            <div class="form-content">
                <div class="form-item">
                    <label class="label">今日心情</label>
                    <div class="mood-selector">
                        <div v-for="m in moodOptions" :key="m.value" class="mood-item"
                            :class="{ active: formData.mood === m.value }" :style="{ '--active-color': m.color }"
                            @click="formData.mood = m.value">
                            <span class="emoji">{{ m.emoji }}</span>
                            <span class="text">{{ m.label }}</span>
                        </div>
                    </div>
                </div>

                <div class="form-item">
                    <label class="label">发生了什么？</label>
                    <el-input v-model="formData.description" type="textarea" :rows="5" placeholder="写下今天值得记录的事情..."
                        maxlength="500" show-word-limit class="custom-textarea"></el-input>
                </div>
            </div>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="showModal = false">取消</el-button>
                    <el-button type="primary" :loading="submitting" @click="submitActivity">提交记录</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { getActivities, saveActivity } from '@/api/activity';
import { ElMessage } from 'element-plus';

const activities = ref([]);
const showModal = ref(false);
const submitting = ref(false);
const currentEditingDay = ref(null);
const isScrolled = ref(false);
const isMobile = ref(window.innerWidth < 768);

const formData = ref({
    date: '',
    mood: '',
    description: ''
});

const moodOptions = [
    { value: '工作', label: '工作', emoji: '💼', color: '#409EFF' },
    { value: '学习', label: '学习', emoji: '📚', color: '#67C23A' },
    { value: '躺平', label: '躺平', emoji: '🛌', color: '#909399' },
    { value: '玩耍', label: '玩耍', emoji: '🎮', color: '#E6A23C' },
    { value: '激动', label: '激动', emoji: '🎉', color: '#F56C6C' }
];

const getMoodColor = (mood) => {
    const opt = moodOptions.find(m => m.value === mood);
    return opt ? opt.color + '20' : '#f4f4f5'; // 20 for transparency
};
const getMoodEmoji = (mood) => {
    const opt = moodOptions.find(m => m.value === mood);
    return opt ? opt.emoji : '';
}

const last7Days = computed(() => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const dateStr = formatDate(d);

        // Fix: Match date with fetched data
        const activity = activities.value.find(a => a.date === dateStr);

        days.push({
            dateStr,
            dateDisplay: `${d.getMonth() + 1}/${d.getDate()}`,
            dayName: i === 0 ? '今天' : i === 1 ? '昨天' : getWeekName(d),
            isToday: i === 0,
            hasData: !!activity,
            data: activity || {}
        });
    }
    return days;
});

const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

const getWeekName = (date) => {
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return days[date.getDay()];
};

const fetchActivities = async () => {
    try {
        const res = await getActivities({ limit: 14 });
        // Fix: interceptor already returns body
        if (Array.isArray(res)) {
            activities.value = res;
        } else {
            // fallback in case middleware changes
            activities.value = res.body || [];
        }
    } catch (e) {
        console.error(e);
        ElMessage.error('获取列表失败');
    }
};

const openEdit = (day) => {
    currentEditingDay.value = day;
    formData.value = {
        date: day.dateStr,
        mood: day.hasData ? day.data.mood : '',
        description: day.hasData ? day.data.description : ''
    };
    showModal.value = true;
};

const submitActivity = async () => {
    if (!formData.value.mood) {
        ElMessage.warning('请记录此刻的心情~');
        return;
    }

    submitting.value = true;
    try {
        const res = await saveActivity(formData.value);
        // interceptor handling
        ElMessage.success('记录成功！');
        await fetchActivities();
        showModal.value = false;
    } catch (e) {
        // Error logged by interceptor
    } finally {
        submitting.value = false;
    }
};

const handleResize = () => {
    isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
    fetchActivities();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', () => {
        isScrolled.value = window.scrollY > 20;
    });
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.activity-container {
    min-height: 100vh;
    background-color: #f7f9fc;
    color: #333;
    padding: 20px 0;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.content-wrapper {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header */
.page-header {
    text-align: center;
    margin-bottom: 40px;
    position: sticky;
    top: 0;
    z-index: 10;
    padding-top: 20px;
    background-color: #f7f9fc;
    /* Match bg to hide scroll under */
}

.title {
    font-size: 28px;
    font-weight: 700;
    color: #2c3e50;
    margin: 0;
    transition: all 0.3s ease;
}

.subtitle {
    color: #8c9fa9;
    font-size: 14px;
    margin-top: 5px;
}

/* Timeline */
.activity-timeline {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.timeline-item {
    display: flex;
    gap: 20px;
    opacity: 1;
    /* Removed animation for simplicity or add back if needed */
}


/* Date Column */
.date-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 60px;
    padding-top: 15px;
    position: relative;
}

.day-name {
    font-size: 18px;
    font-weight: 600;
    color: #2c3e50;
}

.date-num {
    font-size: 12px;
    color: #909399;
    margin-top: 2px;
}

.line {
    width: 2px;
    background-color: #e4e7ed;
    flex: 1;
    margin-top: 10px;
    margin-bottom: -30px;
    /* Extend to next item */
}

/* Card */
.activity-card {
    flex: 1;
    background: white;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.activity-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.activity-card.is-today {
    border-color: #409EFF;
    background: linear-gradient(to right bottom, #ffffff, #f0f7ff);
}

.activity-card.empty {
    border: 1px dashed #dcdfe6;
    background-color: #fafafa;
}

.activity-card.empty:hover {
    background-color: #fff;
    border-color: #c0c4cc;
}

/* Card Content */
.info-layout {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.mood-badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    color: #606266;
    width: fit-content;
}

.description {
    font-size: 15px;
    color: #555;
    line-height: 1.6;
    white-space: pre-wrap;
    margin: 0;
}

.empty-state {
    display: flex;
    align-items: center;
    color: #909399;
    gap: 8px;
    padding: 10px 0;
}

.card-action {
    color: #dcdfe6;
    font-size: 20px;
    margin-left: 15px;
}

/* Form Styles */
.form-content {
    padding: 10px 0;
}

.mood-selector {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}

.mood-item {
    border: 1px solid #e4e7ed;
    border-radius: 12px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s;
}

.mood-item:hover {
    background-color: #f9fafc;
}

.mood-item.active {
    background-color: var(--active-color);
    border-color: transparent;
    color: black;
}

.emoji {
    font-size: 24px;
    margin-bottom: 4px;
}

.text {
    font-size: 13px;
}

.label {
    display: block;
    margin-bottom: 10px;
    font-weight: 600;
    color: #303133;
}

.form-item {
    margin-bottom: 24px;
}

/* Mobile Adaptation */
@media (max-width: 768px) {
    .mood-selector {
        grid-template-columns: repeat(3, 1fr);
    }

    .timeline-item {
        gap: 12px;
    }

    .date-col {
        min-width: 45px;
    }

    .day-name {
        font-size: 16px;
    }

    .title {
        font-size: 24px;
    }

    .activity-card {
        padding: 15px;
    }
}
</style>
