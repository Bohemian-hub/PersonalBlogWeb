<template>
    <div class="main">
        <!-- 个人介绍板块 -->
        <!-- 个人介绍板块 - 重构为三个区域 -->
        <section class="section personal-intro">
            <div class="section-header">
                <h2>个人介绍</h2>
            </div>
            <div class="section-content">
                <!-- 左侧头像与数据区域 -->
                <div class="profile-left">
                    <div class="avatar-container">
                        <div class="avatar-placeholder"></div>
                    </div>
                    <div class="profile-stats">
                        <div class="stat-item">
                            <div class="stat-value">528</div>
                            <div class="stat-label">访问量</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">42</div>
                            <div class="stat-label">文章</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">365</div>
                            <div class="stat-label">运营天数</div>
                        </div>
                    </div>
                    <button class="about-btn">关于我</button>
                </div>

                <!-- 右侧内容区域 -->
                <div class="profile-right">
                    <!-- 右上角一句话介绍/通知区域 -->
                    <div class="profile-intro">
                        <p class="tagline">「浅夜未央，星河流转，无论走到哪里，都是追寻自我的旅程」</p>
                    </div>

                    <!-- 右下角每日动态格子 -->
                    <div class="contribution-grid">
                        <p class="grid-title">每日动态</p>
                        <!-- 贡献格子区域 -->
                        <div class="grid-container">
                            <!-- 月份标签 -->
                            <div class="months-row">
                                <span>一月</span>
                                <span>二月</span>
                                <span>三月</span>
                                <span>四月</span>
                                <span>五月</span>
                                <span>六月</span>
                                <span>七月</span>
                            </div>

                            <!-- 星期标签 -->
                            <div class="days-column">
                                <span>周一</span>
                                <span>周三</span>
                                <span>周五</span>
                                <span>周日</span>
                            </div>

                            <!-- 活动格子 -->
                            <div class="activity-grid">
                                <!-- 这里会通过JavaScript动态生成格子 -->
                            </div>

                            <!-- 颜色图例 -->
                            <div class="color-legend">
                                <div class="legend-item">
                                    <div class="color-box work"></div>
                                    <span>研究</span>
                                </div>
                                <div class="legend-item">
                                    <div class="color-box study"></div>
                                    <span>学习</span>
                                </div>
                                <div class="legend-item">
                                    <div class="color-box play"></div>
                                    <span>玩耍</span>
                                </div>
                                <div class="legend-item">
                                    <div class="color-box rest"></div>
                                    <span>休息</span>
                                </div>
                                <div class="legend-item">
                                    <div class="color-box relax"></div>
                                    <span>放松</span>
                                </div>
                                <div class="legend-item">
                                    <div class="color-box busy"></div>
                                    <span>忙碌</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 内容展示区 - 分两列 -->
        <div class="content-columns">
            <!-- 左侧主要内容列 -->
            <div class="main-column">
                <!-- 学术札记 -->
                <section class="section academic-notes">
                    <div class="section-header">
                        <h2>学术札记</h2>
                        <span class="view-all">查看全部</span>
                    </div>
                    <div class="section-content">
                        <p class="section-desc">分享科研心得、学术观点与专业探索</p>
                        <div class="article-grid">
                            <!-- 文章预览卡片 -->
                            <div class="article-card">
                                <div class="article-image" style="background-image: url('https://picsum.photos/400/250?random=1')"></div>
                                <div class="article-content">
                                    <h3 class="article-title">复杂网络与知识图谱</h3>
                                    <div class="article-tags">
                                        <span class="tag">数据科学</span>
                                        <span class="tag">网络分析</span>
                                    </div>
                                    <p class="article-summary">探索知识图谱在复杂网络分析中的应用，及其在科研数据挖掘中的潜力...</p>
                                </div>
                            </div>
                            <div class="article-card">
                                <div class="article-image" style="background-image: url('https://picsum.photos/400/250?random=2')"></div>
                                <div class="article-content">
                                    <h3 class="article-title">深度学习模型优化策略</h3>
                                    <div class="article-tags">
                                        <span class="tag">AI</span>
                                        <span class="tag">机器学习</span>
                                    </div>
                                    <p class="article-summary">分析当前主流深度学习模型的性能瓶颈，并提出创新优化方法...</p>
                                </div>
                            </div>
                            <div class="article-card">
                                <div class="article-image" style="background-image: url('https://picsum.photos/400/250?random=3')"></div>
                                <div class="article-content">
                                    <h3 class="article-title">数据可视化的认知基础</h3>
                                    <div class="article-tags">
                                        <span class="tag">可视化</span>
                                        <span class="tag">认知科学</span>
                                    </div>
                                    <p class="article-summary">从认知科学角度探讨有效数据可视化的设计原则与方法论...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 实践工坊 -->
                <section class="section workshop">
                    <div class="section-header">
                        <h2>实践工坊</h2>
                        <span class="view-all">查看全部</span>
                    </div>
                    <div class="section-content">
                        <p class="section-desc">展示个人项目、工具开发与方法分享</p>
                        <div class="project-showcase">
                            <!-- 项目展示区 -->
                            <div class="project-card">
                                <div class="project-image" style="background-image: url('https://picsum.photos/500/300?random=4')"></div>
                                <div class="project-content">
                                    <h3 class="project-title">自动化数据分析平台</h3>
                                    <div class="project-tags">
                                        <span class="tag">Python</span>
                                        <span class="tag">数据分析</span>
                                        <span class="tag">开源</span>
                                    </div>
                                    <p class="project-summary">基于Python的自动化数据分析工具，支持多种数据源和可视化输出...</p>
                                    <div class="project-meta">
                                        <span class="meta-item"><i class="fa fa-star"></i> 进行中</span>
                                        <span class="meta-item"><i class="fa fa-calendar"></i> 2023-09</span>
                                    </div>
                                </div>
                            </div>
                            <div class="project-card">
                                <div class="project-image" style="background-image: url('https://picsum.photos/500/300?random=5')"></div>
                                <div class="project-content">
                                    <h3 class="project-title">知识库管理系统</h3>
                                    <div class="project-tags">
                                        <span class="tag">Vue.js</span>
                                        <span class="tag">Node.js</span>
                                        <span class="tag">MongoDB</span>
                                    </div>
                                    <p class="project-summary">一款轻量级个人知识管理系统，支持笔记整理、标签管理和全文检索...</p>
                                    <div class="project-meta">
                                        <span class="meta-item"><i class="fa fa-check-circle"></i> 已完成</span>
                                        <span class="meta-item"><i class="fa fa-calendar"></i> 2023-06</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <!-- 右侧次要内容列 -->
            <div class="side-column">
                <!-- 认知轨迹 -->
                <section class="section thoughts">
                    <div class="section-header">
                        <h2>认知轨迹</h2>
                        <span class="view-all">查看全部</span>
                    </div>
                    <div class="section-content">
                        <p class="section-desc">思考与观点的表达空间</p>
                        <div class="thought-list">
                            <!-- 文章列表 -->
                            <div class="thought-item">
                                <div class="thought-date">2023-11-15</div>
                                <div class="thought-content">
                                    <h3 class="thought-title">创造性思维的培养</h3>
                                    <div class="thought-tags">
                                        <span class="tag">思维模式</span>
                                        <span class="tag">创新</span>
                                    </div>
                                    <p class="thought-summary">关于如何培养和激发创造性思维的个人思考与实践方法...</p>
                                </div>
                            </div>
                            <div class="thought-item">
                                <div class="thought-date">2023-10-28</div>
                                <div class="thought-content">
                                    <h3 class="thought-title">数字极简主义</h3>
                                    <div class="thought-tags">
                                        <span class="tag">数字生活</span>
                                        <span class="tag">效率</span>
                                    </div>
                                    <p class="thought-summary">在信息过载时代如何实践数字极简主义，提升注意力质量...</p>
                                </div>
                            </div>
                            <div class="thought-item">
                                <div class="thought-date">2023-10-05</div>
                                <div class="thought-content">
                                    <h3 class="thought-title">专注与心流</h3>
                                    <div class="thought-tags">
                                        <span class="tag">心理学</span>
                                        <span class="tag">生产力</span>
                                    </div>
                                    <p class="thought-summary">探讨进入心流状态的条件与方法，以及其对创造力的影响...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 最近更新 - 额外添加的板块 -->
                <section class="section recent-updates">
                    <div class="section-header">
                        <h2>最近更新</h2>
                    </div>
                    <div class="section-content">
                        <div class="updates-list">
                            <!-- 更新列表 -->
                            <div class="update-item-placeholder"></div>
                            <div class="update-item-placeholder"></div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <!-- 游民时代 - 全宽度区域 -->
        <section class="section life-section">
            <div class="section-header">
                <h2>游民时代</h2>
                <span class="view-all">查看全部</span>
            </div>
            <div class="section-content">
                <p class="section-desc">生活瞬间、旅行记忆与个人故事集</p>
                <div class="media-gallery">
                    <!-- 照片/视频网格 -->
                    <div class="media-item">
                        <div class="media-image" style="background-image: url('https://picsum.photos/600/400?random=6')"></div>
                        <div class="media-overlay">
                            <h3 class="media-title">京都古寺之旅</h3>
                            <div class="media-tags">
                                <span class="tag">旅行</span>
                                <span class="tag">日本</span>
                                <span class="tag">摄影</span>
                            </div>
                            <p class="media-summary">漫步京都古寺，感受千年文化底蕴...</p>
                        </div>
                    </div>
                    <div class="media-item">
                        <div class="media-image" style="background-image: url('https://picsum.photos/600/400?random=7')"></div>
                        <div class="media-overlay">
                            <h3 class="media-title">阿尔卑斯山脉徒步</h3>
                            <div class="media-tags">
                                <span class="tag">户外</span>
                                <span class="tag">瑞士</span>
                                <span class="tag">徒步</span>
                            </div>
                            <p class="media-summary">在阿尔卑斯山脉的壮丽景色中徒步探险...</p>
                        </div>
                    </div>
                    <div class="media-item">
                        <div class="media-image" style="background-image: url('https://picsum.photos/600/400?random=8')"></div>
                        <div class="media-overlay">
                            <h3 class="media-title">咖啡馆的午后时光</h3>
                            <div class="media-tags">
                                <span class="tag">日常</span>
                                <span class="tag">咖啡</span>
                                <span class="tag">阅读</span>
                            </div>
                            <p class="media-summary">在城市角落的咖啡馆，与一本好书度过宁静午后...</p>
                        </div>
                    </div>
                    <div class="media-item">
                        <div class="media-image" style="background-image: url('https://picsum.photos/600/400?random=9')"></div>
                        <div class="media-overlay">
                            <h3 class="media-title">城市夜景探索</h3>
                            <div class="media-tags">
                                <span class="tag">城市</span>
                                <span class="tag">夜景</span>
                                <span class="tag">摄影</span>
                            </div>
                            <p class="media-summary">探索城市的夜晚面貌，捕捉光影交织的瞬间...</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 底部区域 -->
        <div class="bottom-sections">
            <!-- 互动交集 -->
            <section class="section interaction">
                <div class="section-header">
                    <h2>互动交集</h2>
                </div>
                <div class="section-content">
                    <div class="friends-links">
                        <h3>友情链接</h3>
                        <div class="links-grid">
                            <!-- 友链位置 -->
                            <div class="link-placeholder"></div>
                            <div class="link-placeholder"></div>
                            <div class="link-placeholder"></div>
                        </div>
                    </div>
                    <div class="message-board">
                        <h3>留言板</h3>
                        <div class="message-preview"></div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';

// 将days变量定义在顶层作用域
const days = 26 * 7; // 26周，约6个月

// 模拟数据生成函数
function generateActivityData() {
    const activities = ['work', 'study', 'play', 'rest', 'relax', 'busy', 'empty'];
    const weights = [3, 2, 1, 2, 1, 1, 0.5]; // 权重控制各种活动出现的概率
    const totalWeight = weights.reduce((a, b) => a + b, 0);

    // 生成过去6个月的数据
    const data = [];

    for (let i = 0; i < days; i++) {
        // 随机选择一种活动类型，基于权重
        let random = Math.random() * totalWeight;
        let activity = 'empty';

        for (let j = 0; j < activities.length; j++) {
            if (random < weights[j]) {
                activity = activities[j];
                break;
            }
            random -= weights[j];
        }

        data.push(activity);
    }

    return data;
}

// 在DOM加载后生成格子
onMounted(() => {
    const activityData = generateActivityData();
    const gridElement = document.querySelector('.activity-grid');

    if (gridElement) {
        // 清空格子区域
        gridElement.innerHTML = '';

        // 生成格子
        activityData.forEach((activity, index) => {
            const cell = document.createElement('div');
            cell.className = `grid-cell ${activity}`;

            // 添加日期提示
            const today = new Date();
            const dayOffset = days - index - 1;
            const cellDate = new Date(today);
            cellDate.setDate(today.getDate() - dayOffset);

            const dateStr = `${cellDate.getFullYear()}-${cellDate.getMonth() + 1}-${cellDate.getDate()}`;
            cell.setAttribute('title', dateStr);

            gridElement.appendChild(cell);
        });
    }
});
</script>

<style scoped>
.main {
    width: 1400px;
    background-color: transparent;
    min-height: 1000px;
    margin: 0 auto;
    padding: 40px;
    color: white;
    font-family: 'Helvetica Neue', Arial, sans-serif;
}

/* 通用板块样式 */
.section {
    border: none;
    border-radius: 16px;
    margin-bottom: 30px;
    padding: 24px;
    position: relative;
    backdrop-filter: blur(10px);
    background-color: rgba(25, 25, 35, 0.55);
    /* 颜色调浅 */
    transition: all 0.3s ease;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2),
        0 2px 8px rgba(0, 0, 0, 0.15),
        0 0 1px rgba(255, 255, 255, 0.1);
}

.section:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25),
        0 4px 10px rgba(0, 0, 0, 0.2),
        0 0 1px rgba(255, 255, 255, 0.15);
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 16px;
    margin-bottom: 24px;
}

.section-header h2 {
    font-size: 22px;
    font-weight: 600;
    margin: 0;
    position: relative;
    letter-spacing: 0.5px;
}

.section-header h2::after {
    content: '';
    position: absolute;
    bottom: -16px;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
}

.view-all {
    font-size: 14px;
    opacity: 0.7;
    cursor: pointer;
    transition: all 0.2s;
    padding: 4px 10px;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.05);
}


.view-all:hover {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.1);
}

.section-desc {
    font-size: 15px;
    opacity: 0.8;
    margin-bottom: 20px;
}

/* 个人介绍区域 */
.personal-intro {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
}

.personal-intro .section-content {
    display: flex;
    gap: 25px;
}

/* 左侧区域 */
.profile-left {
    flex: 0 0 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.avatar-container {
    margin-bottom: 20px;
}

.avatar-placeholder {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: none;
    background-color: rgba(255, 255, 255, 0.08);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25),
        inset 0 0 0 2px rgba(255, 255, 255, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.avatar-placeholder:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3),
        inset 0 0 0 2px rgba(255, 255, 255, 0.3);
}


/* 数据统计样式 */
.profile-stats {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
    padding: 0 10px;
}

.stat-item {
    text-align: center;
}

.stat-value {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 5px;
}

.stat-label {
    font-size: 12px;
    opacity: 0.7;
}

/* 关于我按钮 */
.about-btn {
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    padding: 8px 30px;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.about-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

/* 右侧区域 */
.profile-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* 右侧上部区域 - 介绍 */
.profile-intro {
    background-color: rgba(40, 40, 55, 0.4);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.tagline {
    font-size: 20px;
    font-weight: 300;
    margin: 0;
    letter-spacing: 0.5px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    line-height: 1.4;
    text-align: center;
    font-style: italic;
    background: linear-gradient(45deg, #ffffff, #b8c6db);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

/* 右侧下部区域 - 每日动态 */
.contribution-grid {
    background-color: rgba(35, 35, 45, 0.35);
    border-radius: 12px;
    padding: 18px;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
    flex: 1;
}


.intro-text {
    flex: 1;
}



.grid-title {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 15px;
    font-weight: 500;
}

.grid-container {
    position: relative;
    padding-left: 30px;
    padding-top: 20px;
}

/* 月份行样式 */
.months-row {
    display: flex;
    position: absolute;
    top: 0;
    left: 30px;
    right: 0;
    height: 20px;
}

.months-row span {
    flex: 1;
    text-align: center;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.6);
}

/* 星期列样式 */
.days-column {
    position: absolute;
    left: 0;
    top: 20px;
    bottom: 30px;
    width: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.days-column span {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
}

/* 活动网格样式 */
.activity-grid {
    display: grid;
    grid-template-columns: repeat(26, 1fr);
    grid-template-rows: repeat(7, 1fr);
    gap: 3px;
    height: 110px;
}

.grid-cell {
    border-radius: 2px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.grid-cell:hover {
    transform: scale(1.3);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    z-index: 2;
}

/* 各种状态的颜色 */
.grid-cell.empty {
    background-color: rgba(255, 255, 255, 0.07);
}

.grid-cell.work {
    background-color: #5470c6;
    /* 蓝色：专注、专业 */
}

.grid-cell.study {
    background-color: #9a60b4;
    /* 紫色：知识、智慧 */
}

.grid-cell.play {
    background-color: #ee6666;
    /* 红色：活力、热情 */
}

.grid-cell.rest {
    background-color: #73c0de;
    /* 淡蓝色：安静、平静 */
}

.grid-cell.relax {
    background-color: #3ba272;
    /* 绿色：舒适、自然 */
}

.grid-cell.busy {
    background-color: #fc8452;
    /* 橙色：活力、效率 */
}

/* 颜色图例样式 */
.color-legend {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 10px;
    gap: 12px;
    padding: 5px;
}

.legend-item {
    display: flex;
    align-items: center;
    margin-right: 10px;
}

.color-box {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    margin-right: 5px;
}

.color-box.work {
    background-color: #5470c6;
}

.color-box.study {
    background-color: #9a60b4;
}

.color-box.play {
    background-color: #ee6666;
}

.color-box.rest {
    background-color: #73c0de;
}

.color-box.relax {
    background-color: #3ba272;
}

.color-box.busy {
    background-color: #fc8452;
}

.legend-item span {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.8);
}

/* 内容列布局 */
.content-columns {
    display: flex;
    gap: 30px;
    margin-bottom: 40px;
}

.main-column {
    flex: 3;
}

.side-column {
    flex: 2;
}

/* 学术札记 */
.article-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.article-card-placeholder {
    height: 120px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border: 1px dashed rgba(255, 255, 255, 0.2);
}

/* 实践工坊 */
.project-showcase {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.project-card-placeholder {
    height: 150px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border: 1px dashed rgba(255, 255, 255, 0.2);
}

/* 认知轨迹 */
.thought-item-placeholder {
    height: 60px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    margin-bottom: 15px;
    border: 1px dashed rgba(255, 255, 255, 0.2);
}

/* 最近更新 */
.update-item-placeholder {
    height: 50px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    margin-bottom: 15px;
    border: 1px dashed rgba(255, 255, 255, 0.2);
}

/* 游民时代 */
.media-gallery {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.media-item-placeholder {
    height: 180px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border: 1px dashed rgba(255, 255, 255, 0.2);
}

/* 互动交集 */
.interaction .section-content {
    display: flex;
    gap: 30px;
}

.friends-links,
.message-board {
    flex: 1;
}

.links-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
}

.link-placeholder {
    height: 40px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border: 1px dashed rgba(255, 255, 255, 0.2);
}

.message-preview {
    height: 150px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border: 1px dashed rgba(255, 255, 255, 0.2);
}

/* 各种占位符元素的样式修改 */
.article-card-placeholder,
.project-card-placeholder,
.thought-item-placeholder,
.update-item-placeholder,
.media-item-placeholder,
.link-placeholder,
.message-preview {
    background-color: rgba(255, 255, 255, 0.07);
    /* 稍微调亮 */
    border-radius: 12px;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15),
        inset 0 0 0 1px rgba(255, 255, 255, 0.05);
    transition: all 0.2s ease;
}

.article-card-placeholder:hover,
.project-card-placeholder:hover,
.thought-item-placeholder:hover,
.update-item-placeholder:hover,
.media-item-placeholder:hover,
.link-placeholder:hover {
    background-color: rgba(255, 255, 255, 0.1);
    /* 悬停时更亮 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2),
        inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
}

h3 {
    font-size: 18px;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 15px;
}

/* 学术札记卡片样式 */
.article-card {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    background-color: rgba(30, 30, 40, 0.7);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.article-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25);
}

.article-image {
    height: 140px;
    background-size: cover;
    background-position: center;
    position: relative;
}

.article-image::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(to top, rgba(30, 30, 40, 1), rgba(30, 30, 40, 0));
}

.article-content {
    padding: 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.article-title {
    margin: 0 0 10px 0;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: 0.3px;
    background: linear-gradient(45deg, #ffffff, #b8c6db);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.article-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 10px;
}

.article-summary {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    opacity: 0.8;
    flex: 1;
}

/* 实践工坊卡片样式 */
.project-card {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    background-color: rgba(30, 30, 40, 0.7);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
}

.project-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25);
}

.project-image {
    height: 160px;
    background-size: cover;
    background-position: center;
    position: relative;
}

.project-image::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: linear-gradient(to top, rgba(30, 30, 40, 1), rgba(30, 30, 40, 0));
}

.project-content {
    padding: 18px;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.project-title {
    margin: 0 0 10px 0;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.3;
    background: linear-gradient(45deg, #ffffff, #b8c6db);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 12px;
}

.project-summary {
    margin: 0 0 15px 0;
    font-size: 14px;
    line-height: 1.5;
    opacity: 0.8;
    flex: 1;
}

.project-meta {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    opacity: 0.7;
}

.meta-item {
    display: flex;
    align-items: center;
    gap: 5px;
}

/* 认知轨迹卡片样式 */
.thought-item {
    background-color: rgba(30, 30, 40, 0.7);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 15px;
    position: relative;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    display: flex;
    gap: 15px;
}

.thought-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    background-color: rgba(35, 35, 45, 0.75);
}

.thought-date {
    padding-top: 3px;
    font-size: 13px;
    opacity: 0.7;
    white-space: nowrap;
}

.thought-content {
    flex: 1;
}

.thought-title {
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.3;
    background: linear-gradient(45deg, #ffffff, #b8c6db);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.thought-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 8px;
}

.thought-summary {
    margin: 0;
    font-size: 13px;
    line-height: 1.5;
    opacity: 0.8;
}

/* 游民时代卡片样式 */
.media-item {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    height: 200px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
}

.media-item:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

.media-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: transform 0.5s ease;
}

.media-item:hover .media-image {
    transform: scale(1.1);
}

.media-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0));
    transition: all 0.3s ease;
}

.media-item:hover .media-overlay {
    padding-bottom: 30px;
}

.media-title {
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.3;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.media-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 8px;
}

.media-summary {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    opacity: 0;
    height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
}

.media-item:hover .media-summary {
    opacity: 0.9;
    height: auto;
}

/* 标签样式 */
.tag {
    display: inline-block;
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 500;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    transition: all 0.2s ease;
}

.tag:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
}

/* 随机标签颜色 */
.article-tags .tag:nth-child(3n+1),
.project-tags .tag:nth-child(3n+1),
.thought-tags .tag:nth-child(3n+1),
.media-tags .tag:nth-child(3n+1) {
    background-color: rgba(84, 112, 198, 0.2);
    border: 1px solid rgba(84, 112, 198, 0.3);
}

.article-tags .tag:nth-child(3n+2),
.project-tags .tag:nth-child(3n+2),
.thought-tags .tag:nth-child(3n+2),
.media-tags .tag:nth-child(3n+2) {
    background-color: rgba(154, 96, 180, 0.2);
    border: 1px solid rgba(154, 96, 180, 0.3);
}

.article-tags .tag:nth-child(3n+3),
.project-tags .tag:nth-child(3n+3),
.thought-tags .tag:nth-child(3n+3),
.media-tags .tag:nth-child(3n+3) {
    background-color: rgba(238, 102, 102, 0.2);
    border: 1px solid rgba(238, 102, 102, 0.3);
}

/* 移除原占位符样式 */
.article-card-placeholder,
.project-card-placeholder,
.thought-item-placeholder,
.media-item-placeholder {
    display: none;
}
</style>