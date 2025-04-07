<template>
    <div class="activity_grid">
        <div class="each_month" v-for="(monthData, index) in recentMonths" :key="index">
            <div class="top_month">{{ monthData.monthName }} 月</div>
            <div class="bottom_day">
                <div class="left_week">
                    <div class="week" v-for="(item, index) in weeks" :key="index">{{ item }}</div>
                </div>
                <div class="right_day">
                    <!-- 这里可以放置日期格子 -->
                    <div class="day-grid">
                        <div v-for="col in getColumnsForMonth(monthData.daysInMonth, monthData.firstDayOfWeek)"
                            :key="col" class="day-column">
                            <div v-for="(dayData, idx) in getDaysForColumn(col, monthData.daysInMonth, monthData.year, monthData.month)"
                                :key="idx" :class="[
                                    'day-cell',
                                    {
                                        'empty': dayData.day === null,
                                        'has-activity': dayData.activity
                                    }
                                ]"
                                :style="dayData.activity && backgroundActivity[dayData.activity.mood] ? { background: backgroundActivity[dayData.activity.mood] } : {}"
                                v-bind="dayData.activity ? { 'data-tooltip': dayData.activity.desc } : {}">
                                {{ dayData.day }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 添加心情图例 -->
        <div class="mood-legend">
            <div class="legend-items">
                <div class="legend-item" v-for="(color, mood) in backgroundActivity" :key="mood">
                    <div class="color-box" :style="{ background: color }"></div>
                    <div class="mood-label">{{ mood }}</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const weeks = computed(() => {
    return ['日', '一', '二', '三', '四', '五', '六']
})
const recentActivity = ref([{ 'date': '2025-01-01', 'mood': '玩耍', 'desc': '今天运动了' }, { 'date': '2025-01-02', 'mood': '工作', 'desc': '今天参加了会议' }, { 'date': '2025-01-03', 'mood': '玩耍', 'desc': '今天运动了' }, { 'date': '2025-01-04', 'mood': '学习', 'desc': '今天阅读了文献' }, { 'date': '2025-01-05', 'mood': '躺平', 'desc': '今天休息了一天' }, { 'date': '2025-01-06', 'mood': '玩耍', 'desc': '今天玩了游戏' }, { 'date': '2025-01-07', 'mood': '玩耍', 'desc': '今天去了公园' }, { 'date': '2025-01-08', 'mood': '躺平', 'desc': '今天逛了街' }, { 'date': '2025-01-09', 'mood': '科研', 'desc': '今天研究了新课题' }, { 'date': '2025-01-10', 'mood': '学习', 'desc': '今天阅读了文献' }, { 'date': '2025-01-11', 'mood': '科研', 'desc': '今天做了实验' }, { 'date': '2025-01-12', 'mood': '玩耍', 'desc': '今天去了公园' }, { 'date': '2025-01-13', 'mood': '工作', 'desc': '今天完成了项目报告' }, { 'date': '2025-01-14', 'mood': '科研', 'desc': '今天分析了数据' }, { 'date': '2025-01-15', 'mood': '学习', 'desc': '今天做了练习题' }, { 'date': '2025-01-16', 'mood': '玩耍', 'desc': '今天去了公园' }, { 'date': '2025-01-17', 'mood': '玩耍', 'desc': '今天去了公园' }, { 'date': '2025-01-18', 'mood': '科研', 'desc': '今天研究了新课题' }, { 'date': '2025-01-19', 'mood': '激动', 'desc': '今天完成了重要任务' }, { 'date': '2025-01-20', 'mood': '学习', 'desc': '今天学习了新知识' }, { 'date': '2025-01-21', 'mood': '玩耍', 'desc': '今天去了公园' }, { 'date': '2025-01-22', 'mood': '躺平', 'desc': '今天休息了一天' }, { 'date': '2025-01-23', 'mood': '躺平', 'desc': '今天睡了懒觉' }, { 'date': '2025-01-24', 'mood': '玩耍', 'desc': '今天和朋友聚会' }, { 'date': '2025-01-25', 'mood': '躺平', 'desc': '今天休息了一天' }, { 'date': '2025-01-26', 'mood': '玩耍', 'desc': '今天去了公园' }, { 'date': '2025-01-27', 'mood': '科研', 'desc': '今天做了实验' }, { 'date': '2025-01-28', 'mood': '躺平', 'desc': '今天逛了街' }, { 'date': '2025-01-29', 'mood': '玩耍', 'desc': '今天玩了游戏' }, { 'date': '2025-01-30', 'mood': '科研', 'desc': '今天研究了新课题' }, { 'date': '2025-01-31', 'mood': '工作', 'desc': '今天完成了项目报告' }, { 'date': '2025-02-01', 'mood': '学习', 'desc': '今天参加了培训' }, { 'date': '2025-02-02', 'mood': '科研', 'desc': '今天写了论文' }, { 'date': '2025-02-03', 'mood': '玩耍', 'desc': '今天运动了' }, { 'date': '2025-02-04', 'mood': '躺平', 'desc': '今天逛了街' }, { 'date': '2025-02-05', 'mood': '玩耍', 'desc': '今天和朋友聚会' }, { 'date': '2025-02-06', 'mood': '工作', 'desc': '今天处理了邮件' }, { 'date': '2025-02-07', 'mood': '激动', 'desc': '今天赢得了比赛' }, { 'date': '2025-02-08', 'mood': '躺平', 'desc': '今天逛了街' }, { 'date': '2025-02-09', 'mood': '激动', 'desc': '今天收到了好消息' }, { 'date': '2025-02-10', 'mood': '科研', 'desc': '今天做了实验' }, { 'date': '2025-02-11', 'mood': '躺平', 'desc': '今天逛了街' }, { 'date': '2025-02-12', 'mood': '激动', 'desc': '今天赢得了比赛' }, { 'date': '2025-02-13', 'mood': '躺平', 'desc': '今天逛了街' }, { 'date': '2025-02-14', 'mood': '玩耍', 'desc': '今天去了公园' }, { 'date': '2025-02-15', 'mood': '躺平', 'desc': '今天休息了一天' }, { 'date': '2025-02-16', 'mood': '躺平', 'desc': '今天逛了街' }, { 'date': '2025-02-17', 'mood': '工作', 'desc': '今天与客户沟通' }, { 'date': '2025-02-18', 'mood': '躺平', 'desc': '今天看了电影' }, { 'date': '2025-02-19', 'mood': '学习', 'desc': '今天参加了培训' }, { 'date': '2025-02-20', 'mood': '躺平', 'desc': '今天休息了一天' }, { 'date': '2025-02-21', 'mood': '玩耍', 'desc': '今天去了公园' }, { 'date': '2025-02-22', 'mood': '躺平', 'desc': '今天休息了一天' }, { 'date': '2025-02-23', 'mood': '工作', 'desc': '今天处理了邮件' }, { 'date': '2025-02-24', 'mood': '工作', 'desc': '今天与客户沟通' }, { 'date': '2025-02-25', 'mood': '学习', 'desc': '今天阅读了文献' }, { 'date': '2025-02-26', 'mood': '激动', 'desc': '今天参加了活动' }, { 'date': '2025-02-27', 'mood': '科研', 'desc': '今天做了实验' }, { 'date': '2025-02-28', 'mood': '玩耍', 'desc': '今天运动了' }, { 'date': '2025-03-01', 'mood': '激动', 'desc': '今天参加了活动' }, { 'date': '2025-03-02', 'mood': '工作', 'desc': '今天参加了会议' }, { 'date': '2025-03-03', 'mood': '激动', 'desc': '今天完成了重要任务' }, { 'date': '2025-03-04', 'mood': '学习', 'desc': '今天参加了培训' }, { 'date': '2025-03-05', 'mood': '玩耍', 'desc': '今天和朋友聚会' }, { 'date': '2025-03-06', 'mood': '学习', 'desc': '今天做了练习题' }, { 'date': '2025-03-07', 'mood': '科研', 'desc': '今天研究了新课题' }, { 'date': '2025-03-08', 'mood': '激动', 'desc': '今天收到了好消息' }, { 'date': '2025-03-09', 'mood': '躺平', 'desc': '今天逛了街' }, { 'date': '2025-03-10', 'mood': '科研', 'desc': '今天做了实验' }, { 'date': '2025-03-11', 'mood': '工作', 'desc': '今天与客户沟通' }, { 'date': '2025-03-12', 'mood': '学习', 'desc': '今天学习了新知识' }, { 'date': '2025-03-13', 'mood': '躺平', 'desc': '今天睡了懒觉' }, { 'date': '2025-03-14', 'mood': '工作', 'desc': '今天完成了项目报告' }, { 'date': '2025-03-15', 'mood': '工作', 'desc': '今天完成了项目报告' }, { 'date': '2025-03-16', 'mood': '科研', 'desc': '今天分析了数据' }, { 'date': '2025-03-17', 'mood': '学习', 'desc': '今天参加了培训' }, { 'date': '2025-03-18', 'mood': '玩耍', 'desc': '今天和朋友聚会' }, { 'date': '2025-03-19', 'mood': '躺平', 'desc': '今天睡了懒觉' }, { 'date': '2025-03-20', 'mood': '激动', 'desc': '今天完成了重要任务' }, { 'date': '2025-03-21', 'mood': '玩耍', 'desc': '今天运动了' }, { 'date': '2025-03-22', 'mood': '躺平', 'desc': '今天休息了一天' }, { 'date': '2025-03-23', 'mood': '学习', 'desc': '今天参加了培训' }, { 'date': '2025-03-24', 'mood': '激动', 'desc': '今天完成了重要任务' }, { 'date': '2025-03-25', 'mood': '玩耍', 'desc': '今天玩了游戏' }, { 'date': '2025-03-26', 'mood': '工作', 'desc': '今天处理了邮件' }, { 'date': '2025-03-27', 'mood': '学习', 'desc': '今天做了练习题' }, { 'date': '2025-03-28', 'mood': '工作', 'desc': '今天与客户沟通' }, { 'date': '2025-03-29', 'mood': '学习', 'desc': '今天参加了培训' }, { 'date': '2025-03-30', 'mood': '躺平', 'desc': '今天看了电影' }, { 'date': '2025-03-31', 'mood': '玩耍', 'desc': '今天玩了游戏' }, { 'date': '2025-04-01', 'mood': '学习', 'desc': '今天做了练习题' }, { 'date': '2025-04-02', 'mood': '躺平', 'desc': '今天看了电影' }, { 'date': '2025-04-03', 'mood': '科研', 'desc': '今天写了论文' }, { 'date': '2025-04-04', 'mood': '科研', 'desc': '今天做了实验' }, { 'date': '2025-04-05', 'mood': '工作', 'desc': '今天完成了项目报告' }, { 'date': '2025-04-06', 'mood': '科研', 'desc': '今天分析了数据' }, { 'date': '2025-04-07', 'mood': '躺平', 'desc': '今天睡了懒觉' }, { 'date': '2025-04-08', 'mood': '测试', 'desc': '测试 2' }])
//每个 mood 和格子背景颜色的对应表
const backgroundActivity = {
    '科研': 'linear-gradient(135deg, rgba(210, 95, 83, 0.9), rgba(178, 69, 65, 0.85))',    // 专业红色渐变，表示研究的专注
    '工作': 'linear-gradient(135deg, rgba(92, 184, 92, 0.9), rgba(76, 156, 76, 0.85))',    // 商务绿色渐变，表示专业和效率
    '学习': 'linear-gradient(135deg, rgba(91, 126, 215, 0.9), rgba(63, 100, 189, 0.85))',  // 知识蓝色渐变，表示学术与深度
    '躺平': 'linear-gradient(135deg, rgba(187, 107, 217, 0.9), rgba(155, 89, 182, 0.85))', // 放松紫色渐变，表示休息与恢复
    '玩耍': 'linear-gradient(135deg, rgba(240, 173, 78, 0.9), rgba(230, 126, 34, 0.85))',  // 活力橙色渐变，表示乐趣与活力
    '激动': 'linear-gradient(135deg, rgba(77, 210, 226, 0.9), rgba(26, 188, 156, 0.85))',  // 振奋青色渐变，表示兴奋与成就
    '测试': 'linear-gradient(135deg, rgba(150, 150, 150, 0.9), rgba(100, 100, 100, 0.85))' // 测试灰色渐变
}

// 获取当前日期
const currentDate = ref(new Date())

// 计算最近4个月（包括当前月）
const recentMonths = computed(() => {
    const months = []
    const currentMonth = currentDate.value.getMonth()
    const currentYear = currentDate.value.getFullYear()

    for (let i = 0; i < 4; i++) {
        // 计算月份，处理跨年的情况
        let monthIndex = currentMonth - i
        let year = currentYear

        if (monthIndex < 0) {
            monthIndex += 12
            year -= 1
        }

        // 获取该月的天数
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()

        // 获取该月第一天是星期几 (0-6 对应周日-周六)
        const firstDayOfWeek = new Date(year, monthIndex, 1).getDay()

        months.push({
            year,
            month: monthIndex,
            monthName: monthIndex + 1, // 月份显示为 1-12
            daysInMonth,
            firstDayOfWeek
        })
    }

    return months.reverse() // 翻转数组顺序，从过去到现在排列
})

// 计算每个月需要的列数
const getColumnsForMonth = (daysInMonth, firstDayOfWeek) => {
    // 考虑月初空格的影响，计算需要多少列
    return Math.ceil((daysInMonth + firstDayOfWeek) / 7);
}

// 获取每一列的天数数组，对于不存在的天数或未来的日期返回 null
const getDaysForColumn = (col, daysInMonth, year, month) => {
    const days = [];
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    const currentDay = today.getDate();

    // 获取当前月份信息
    const monthData = recentMonths.value.find(m => m.year === year && m.month === month);
    if (!monthData) return days;

    // 计算第一列需要多少个空格子
    const firstDayOfWeek = monthData.firstDayOfWeek;

    for (let row = 0; row < 7; row++) {
        // 计算当前位置对应的日期
        // 对于第一列，需要考虑开始的空格
        let dayNumber;

        if (col === 1) {
            // 第一列需要考虑月初的空格子
            if (row < firstDayOfWeek) {
                // 月初的空格子
                days.push({ day: null, activity: null });
                continue;
            } else {
                // 第一列有效日期
                dayNumber = row - firstDayOfWeek + 1;
            }
        } else {
            // 其他列
            dayNumber = (col - 1) * 7 + row - firstDayOfWeek + 1;
        }

        // 检查日期是否有效
        if (dayNumber <= 0 || dayNumber > daysInMonth) {
            days.push({ day: null, activity: null });
        } else if (isCurrentMonth && dayNumber > currentDay) {
            // 当前月份超过今天的日期为空
            days.push({ day: null, activity: null });
        } else {
            // 构造日期字符串 YYYY-MM-DD
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
            // 查找此日期的活动
            const activity = recentActivity.value.find(a => a.date === dateStr);

            days.push({
                day: dayNumber,
                activity: activity || null
            });
        }
    }

    return days;
}
</script>
<style scoped>
.activity_grid {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: space-between;
}

.each_month {
    /* 移除固定宽度，改为自适应内容 */
    min-width: 150px;
    height: 200px;
    background-color: rgba(30, 30, 40, 0.7);
    border-radius: 12px;
    padding: 5px;
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2),
        0 2px 5px rgba(0, 0, 0, 0.15),
        0 0 1px rgba(255, 255, 255, 0.1);
    margin-right: 10px;
    /* 添加右侧间距 */
}

/* 移除最后一个月份卡片的右侧外边距 */
.each_month:last-child {
    margin-right: 0;
}

.each_month:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25),
        0 4px 8px rgba(0, 0, 0, 0.2),
        0 0 1px rgba(255, 255, 255, 0.15);
}

.top_month {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 2px;
    padding-bottom: 2px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: linear-gradient(45deg, #ffffff, #b8c6db);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.bottom_day {
    display: flex;
    height: 150px;
}

.left_week {
    width: 30px;
    display: flex;
    flex-direction: column;
    padding-top: 2px;
    margin-right: 8px;
}

.week {
    width: 24px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    margin-bottom: 5px;
    font-size: 12px;
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.8);
    border-radius: 6px;
    transition: all 0.2s ease;
}

.week:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
}

.right_day {
    flex: 1;
    padding-top: 4px;
}

.day-grid {
    display: flex;
    gap: 6px;
    height: 155px;

}

.day-column {
    display: flex;
    flex-direction: column;
    /* 移除flex: 1，不再自适应宽度 */
    gap: 6px;
}

.day-cell {
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    transition: all 0.2s ease;
    flex: 1;
    font-size: 12px;
    line-height: 17px;
    width: 30px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    /* 保持相对定位 */
}


.day-cell:hover {
    background-color: rgba(255, 255, 255, 0.15);
    transform: scale(1.05);
    cursor: pointer;
}

.day-cell.empty {
    background-color: transparent;
}

/* 有活动的日期格子样式 */
.day-cell.has-activity {
    color: #fff;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* 调整悬浮时的定位和z-index */
.day-cell[data-tooltip]:hover {
    z-index: 100;
    /* 确保悬浮的格子在上层 */
    position: relative;
}

/* 悬浮提示样式 */
.day-cell[data-tooltip]:hover::after {
    content: attr(data-tooltip);
    position: fixed;
    /* 改为fixed定位，避免被其他元素遮挡 */
    z-index: 1000;
    /* 提高z-index确保在最上层 */
    /* 计算位置 */
    left: 50%;
    transform: translateX(-50%);
    bottom: auto;
    /* 移除之前的bottom设置 */
    top: -35px;
    /* 调整位置，放在鼠标下方 */
    min-width: 100px;
    max-width: 200px;
    padding: 6px 10px;
    background-color: rgba(255, 255, 255, 1);
    color: #171717;
    border-radius: 6px;
    font-size: 12px;
    line-height: 1.3;
    white-space: nowrap;
    pointer-events: none;
    animation: fadeIn 0.3s ease;
    backdrop-filter: blur(3px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

/* 提示箭头 */
.day-cell[data-tooltip]:hover::before {
    content: '';
    position: fixed;
    /* 改为fixed定位 */
    z-index: 1000;
    /* 匹配tooltip的z-index */
    top: -5px;
    /* 调整位置 */
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px 5px 0;
    border-style: solid;
    border-color: rgba(234, 234, 234, 0.508) transparent transparent transparent;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

/* 心情图例样式 */
.mood-legend {
    width: 100%;
}


.legend-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    padding: 10px 0;
}

.legend-item {
    display: flex;
    align-items: center;
    margin-right: 15px;
    margin-bottom: 5px;
}

.color-box {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    margin-right: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease;
}

.legend-item:hover .color-box {
    transform: scale(1.1);
}

.mood-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);
}
</style>