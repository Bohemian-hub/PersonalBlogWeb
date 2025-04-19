<template>
    <TopBar />
    <!-- 添加主题切换按钮 -->
    <ThemeToggler class="about-theme-toggler" />

    <div class="about-wrapper" :class="currentTheme">
        <div class="about-content">
            <!-- 使用封装的页面标题组件 -->
            <PageHeader title="关于我" description="人工智能研究者 / 全栈开发工程师 / 未来教育者" icon="✨" />

            <!-- 简介和信息展示区 -->
            <section class="profile-section">
                <div class="profile-header">
                    <div class="profile-image-container">
                        <div class="profile-image">
                            <!-- <img src="@/assets/images/avatar.jpg" alt="个人照片" 
                                 onerror="this.src='https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" /> -->
                        </div>
                        <div class="profile-decorations">
                            <div class="decoration-item" v-for="i in 5" :key="i"></div>
                        </div>
                    </div>

                    <div class="profile-intro">
                        <h2>嗨，我是<span class="highlight-text">何东</span></h2>
                        <p class="intro-text">
                            一位充满热情的技术爱好者和教育者，专注于人工智能、全栈开发与知识传递。
                            现年25岁，即将成为一名大学教师，期待在教学与研究中探索更多可能性。
                        </p>

                        <div class="basic-info">
                            <div class="info-row">
                                <div class="info-item">
                                    <el-icon>
                                        <Calendar />
                                    </el-icon>
                                    <span>2000年5月20日</span>
                                </div>
                                <div class="info-item">
                                    <el-icon>
                                        <Location />
                                    </el-icon>
                                    <span>四川绵阳</span>
                                </div>
                            </div>
                            <div class="info-row">
                                <div class="info-item">
                                    <el-icon>
                                        <Star />
                                    </el-icon>
                                    <span>金牛座</span>
                                </div>
                                <div class="info-item">
                                    <el-icon>
                                        <User />
                                    </el-icon>
                                    <span>180cm / 76kg</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 教育和研究 -->
                <div class="education-research">
                    <div class="section-block education">
                        <h3 class="block-title"><el-icon>
                                <School />
                            </el-icon> 教育背景</h3>
                        <div class="timeline">
                            <div class="timeline-item">
                                <div class="timeline-dot"></div>
                                <div class="timeline-content">
                                    <h4>昆明理工大学</h4>
                                    <p class="timeline-meta">人工智能专业 · 硕士</p>
                                    <p class="timeline-period">2022 - 2025</p>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-dot"></div>
                                <div class="timeline-content">
                                    <h4>本科院校</h4>
                                    <p class="timeline-meta">计算机科学与技术专业 · 学士</p>
                                    <p class="timeline-period">2018 - 2022</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="section-block research">
                        <h3 class="block-title"><el-icon>
                                <Connection />
                            </el-icon> 研究方向</h3>
                        <div class="research-tags">
                            <div class="research-tag" v-for="(research, index) in researchAreas" :key="index">
                                {{ research }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 技术栈和兴趣 -->
                <div class="tech-interests">
                    <div class="section-block tech">
                        <h3 class="block-title"><el-icon>
                                <DataAnalysis />
                            </el-icon> 技术栈</h3>
                        <div class="skill-categories">
                            <div class="skill-category" v-for="(category, idx) in techStack" :key="idx">
                                <h4 class="category-name">{{ category.name }}</h4>
                                <div class="skill-tags">
                                    <el-tag v-for="(skill, i) in category.skills" :key="i" :type="getTagType(i)"
                                        class="skill-tag" effect="light">
                                        {{ skill }}
                                    </el-tag>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="section-block interests">
                        <h3 class="block-title"><el-icon>
                                <Star />
                            </el-icon> 兴趣爱好</h3>
                        <div class="interests-grid">
                            <div class="interest-item" v-for="(interest, index) in interests" :key="index">
                                <div class="interest-icon">
                                    <el-icon>
                                        <component :is="interest.icon" />
                                    </el-icon>
                                </div>
                                <div class="interest-content">
                                    <h4>{{ interest.title }}</h4>
                                    <p>{{ interest.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 座右铭和联系方式 -->
                <div class="motto-contact">
                    <div class="motto">
                        <blockquote>
                            技术改变世界，教育塑造未来。保持好奇，持续学习，让知识照亮前行的道路。
                            <cite>- 人生观：随缘而行，不忘初心</cite>
                        </blockquote>
                    </div>

                    <div class="contact-links">
                        <a href="#" class="contact-link" title="电子邮箱">
                            <el-icon>
                                <Message />
                            </el-icon>
                        </a>
                        <a href="#" class="contact-link" title="GitHub">
                            <el-icon>
                                <ElementPlus />
                            </el-icon>
                        </a>
                        <a href="#" class="contact-link" title="微信">
                            <el-icon>
                                <ChatDotRound />
                            </el-icon>
                        </a>
                        <a href="#" class="contact-link" title="LinkedIn">
                            <el-icon>
                                <Connection />
                            </el-icon>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    </div>

    <!-- 底部版权 -->
    <Footer />
    <el-image class="bg-image" :src="bgUrl" :fit="'cover'" draggable="false"
        :class="{ 'dim-bg': currentTheme === 'dark' }" />
</template>

<script setup>
import { ref } from 'vue'
import TopBar from '../components/TopBar.vue'
import Footer from '../components/Footer.vue'
import ThemeToggler from '../components/ThemeToggler.vue'
import PageHeader from '../components/PageHeader.vue'
import { currentTheme } from '../stores/themeStore'
import {
    Calendar, Location, Star, User, School, Connection,
    Message, ElementPlus, ChatDotRound, DataAnalysis,
    Headset, Film, Suitcase, Reading, Brush
} from '@element-plus/icons-vue'

// 导入背景图片
import bgFile from '@/assets/images/bg7.png' // 假设有这个图片，如果没有请替换为实际存在的图片

// 背景图片
const bgUrl = bgFile

// 研究方向
const researchAreas = [
    '生物医学工程',
    '自然语言处理',
    '信息抽取',
    '知识图谱',
    '大模型应用'
]

// 技术栈
const techStack = [
    {
        name: '前端开发',
        skills: ['Vue.js', 'HTML5/CSS3', 'JavaScript', 'TypeScript', '微信小程序']
    },
    {
        name: '后端开发',
        skills: ['Python', 'Flask', 'Django', 'Java', 'SpringBoot', 'RESTful API']
    },
    {
        name: '数据库',
        skills: ['MySQL', 'MongoDB', 'Redis', 'PostgreSQL']
    },
    {
        name: '人工智能',
        skills: ['PyTorch', 'TensorFlow', 'NLP', '大型语言模型', '知识图谱']
    }
]

// 兴趣爱好
const interests = [
    {
        icon: 'Suitcase',
        title: '旅游探索',
        description: '喜欢探索不同的城市和自然风光，体验多元文化，收集各地的独特记忆。'
    },
    {
        icon: 'Brush',
        title: '软硬件开发',
        description: '业余时间喜欢动手做一些创意硬件项目，结合软件开发创造实用工具。'
    },
    {
        icon: 'Headset',
        title: '音乐欣赏',
        description: '热爱民谣音乐，尤其喜欢回春丹、福绿寿等歌手的作品，享受音乐带来的情感共鸣。'
    },
    {
        icon: 'Film',
        title: '影视作品',
        description: '科幻电影和古装玄幻剧是闲暇时最爱的放松方式，享受想象力与视觉盛宴。'
    }
]

// 标签颜色辅助函数
const getTagType = (index) => {
    const types = ['', 'success', 'warning', 'danger', 'info'];
    return types[index % types.length];
}
</script>

<style scoped>
/* 主题变量定义 */
.about-wrapper.dark {
    --bg-primary: rgba(25, 25, 35, 0.75);
    --bg-secondary: rgba(30, 30, 40, 0.8);
    --bg-tertiary: rgba(40, 40, 55, 0.7);
    --text-color: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.8);
    --title-gradient: linear-gradient(45deg, #ffffff, #b8c6db);
    --title-shadow: 0 2px 4px rgba(216, 216, 216, 0.5);
    --divider-color: rgba(255, 255, 255, 0.2);
    --card-bg: rgba(30, 30, 40, 0.7);
    --card-bg-hover: rgba(40, 40, 55, 0.8);
    --card-border: rgba(255, 255, 255, 0.1);
    --card-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
    --accent-color: #5a9eff;
    --accent-secondary: #4a90e2;
    --heading-color: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.6);
    --tag-bg: rgba(60, 60, 80, 0.7);
    --timeline-line: rgba(255, 255, 255, 0.2);
    --timeline-dot: #5a9eff;
    --quote-bg: rgba(30, 30, 40, 0.8);
    --profile-decoration: rgba(255, 255, 255, 0.1);
    --social-bg: rgba(255, 255, 255, 0.1);
    --social-hover: rgba(255, 255, 255, 0.2);
    --highlight: #61dafb;
    --research-tag-bg: rgba(74, 144, 226, 0.2);
    --research-tag-color: #ffffff;
}

.about-wrapper.light {
    --bg-primary: rgba(245, 245, 250, 0.85);
    --bg-secondary: rgba(255, 255, 255, 0.9);
    --bg-tertiary: rgba(235, 235, 245, 0.7);
    --text-color: #333333;
    --text-secondary: rgba(0, 0, 0, 0.7);
    --title-gradient: linear-gradient(45deg, #333333, #555555);
    --title-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    --divider-color: rgba(0, 0, 0, 0.1);
    --card-bg: rgba(255, 255, 255, 0.85);
    --card-bg-hover: rgba(255, 255, 255, 0.95);
    --card-border: rgba(0, 0, 0, 0.1);
    --card-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    --accent-color: #3a7bd5;
    --accent-secondary: #3a7bd5;
    --heading-color: #333333;
    --text-muted: rgba(0, 0, 0, 0.5);
    --tag-bg: rgba(240, 240, 245, 0.8);
    --timeline-line: rgba(0, 0, 0, 0.1);
    --timeline-dot: #3a7bd5;
    --quote-bg: rgba(248, 248, 252, 0.9);
    --profile-decoration: rgba(0, 0, 0, 0.05);
    --social-bg: rgba(0, 0, 0, 0.05);
    --social-hover: rgba(0, 0, 0, 0.1);
    --highlight: #3a7bd5;
    --research-tag-bg: rgba(74, 144, 226, 0.1);
    --research-tag-color: #333333;
}

.bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.5s ease;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
    z-index: -2;
}

.bg-image.dim-bg {
    filter: brightness(0.6) saturate(0.8);
}

/* 全局布局 */
.about-wrapper {
    min-height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
    padding-bottom: 40px; /* 减少底部padding */
    position: relative;
}

.about-wrapper::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
}

.about-content {
    padding: 60px 40px 30px; /* 减少顶部和底部padding */
    max-width: 1400px; /* 将最大宽度调整为1400px */
    margin: 0 auto;
    width: 100%;
    color: var(--text-color);
}

.about-theme-toggler {
    position: fixed;
    bottom: 30px;
    left: 30px;
    z-index: 1000;
}

/* 页面标题 */
.page-header {
    text-align: center;
    margin-bottom: 30px; /* 减少底部margin */
    position: relative;
}

.page-title {
    font-size: 38px; /* 稍微减小字体 */
    margin-bottom: 10px; /* 减少底部margin */
    font-weight: 700;
    background: var(--title-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    letter-spacing: 2px;
    text-shadow: var(--title-shadow);
    animation: fadeIn 1s ease-out;
}

.description {
    font-size: 18px;
    opacity: 0.95;
    margin-bottom: 20px;
    font-style: italic;
    max-width: 800px;
    margin: 0 auto 20px;
    color: var(--text-secondary);
}

.divider {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px 0;
}

.divider::before,
.divider::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--divider-color);
    margin: 0 15px;
}

.divider-icon {
    font-size: 22px;
}

/* 个人简介区 */
.profile-section {
    background-color: var(--bg-primary);
    border-radius: 16px;
    padding: 25px; /* 减少内边距 */
    backdrop-filter: blur(10px);
    box-shadow: var(--card-shadow);
    border: 1px solid var(--card-border);
    color: var(--text-color);
    transition: all 0.3s ease;
    animation: fadeInUp 0.6s ease-out;
}

.profile-header {
    display: flex;
    gap: 20px; /* 减少间距 */
    margin-bottom: 25px; /* 减少底部margin */
    align-items: center;
}

.profile-image-container {
    position: relative;
    flex-shrink: 0;
}

.profile-image {
    width: 160px; /* 稍微减小图片尺寸 */
    height: 160px;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    border: 4px solid var(--card-bg);
    transform: rotate(-3deg);
    transition: all 0.3s ease;
    z-index: 2;
}

.profile-image:hover {
    transform: rotate(0deg);
}

.profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.profile-decorations {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
}

.decoration-item {
    position: absolute;
    background-color: var(--profile-decoration);
    border-radius: 50%;
}

.decoration-item:nth-child(1) {
    width: 40px;
    height: 40px;
    top: -10px;
    right: -10px;
    background: linear-gradient(45deg, var(--accent-color), transparent);
    opacity: 0.2;
}

.decoration-item:nth-child(2) {
    width: 30px;
    height: 30px;
    bottom: -5px;
    left: -15px;
    background: linear-gradient(45deg, var(--accent-secondary), transparent);
    opacity: 0.15;
}

.profile-intro {
    flex: 1;
}

.profile-intro h2 {
    font-size: 28px;
    margin-bottom: 15px;
    font-weight: 600;
    color: var(--heading-color);
}

.highlight-text {
    color: var(--highlight);
    position: relative;
    padding: 0 5px;
}

.highlight-text::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background-color: var(--highlight);
    opacity: 0.2;
    z-index: -1;
    border-radius: 4px;
}

.intro-text {
    font-size: 15px; /* 稍微减小字体 */
    line-height: 1.6; /* 减小行高 */
    margin-bottom: 15px; /* 减少底部margin */
    color: var(--text-secondary);
}

.basic-info {
    display: flex;
    flex-direction: row; /* 改为水平排列 */
    gap: 20px; /* 调整间距 */
    flex-wrap: wrap; /* 允许换行 */
}

.info-row {
    display: flex;
    gap: 20px;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    color: var(--text-secondary);
}

.info-item .el-icon {
    color: var(--accent-color);
}

/* 教育和研究区域 */
.education-research {
    display: flex;
    gap: 20px; /* 减少间距 */
    margin-bottom: 25px; /* 减少底部margin */
}

.section-block {
    background-color: var(--bg-secondary);
    border-radius: 12px;
    padding: 18px; /* 减少内边距 */
    box-shadow: var(--card-shadow);
    transition: transform 0.3s ease;
}

.section-block:hover {
    transform: translateY(-3px);
}

.education {
    flex: 1;
}

.research {
    flex: 1;
}

.block-title {
    font-size: 17px; /* 稍微减小字体 */
    margin-bottom: 12px; /* 减少底部margin */
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--card-border);
    color: var(--heading-color);
}

.block-title .el-icon {
    color: var(--accent-color);
}

/* 时间线样式 */
.timeline {
    position: relative;
    padding-left: 20px;
}

.timeline::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 6px;
    width: 2px;
    background-color: var(--timeline-line);
}

.timeline-item {
    position: relative;
    padding-bottom: 12px; /* 减少底部padding */
    margin-bottom: 8px; /* 减少底部margin */
}

.timeline-item:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
}

.timeline-dot {
    position: absolute;
    left: -20px;
    top: 5px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--timeline-dot);
}

.timeline-content {
    padding-left: 5px;
}

.timeline-content h4 {
    margin: 0 0 3px 0; /* 减少底部margin */
    font-size: 16px;
    font-weight: 600;
    color: var(--heading-color);
}

.timeline-meta {
    font-size: 14px;
    color: var(--accent-color);
    margin: 0 0 3px 0;
}

.timeline-period {
    font-size: 13px;
    color: var(--text-muted);
    margin: 0;
}

/* 研究方向标签 */
.research-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.research-tag {
    background-color: var(--research-tag-bg);
    color: var(--research-tag-color);
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.research-tag:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 技术栈和兴趣 */
.tech-interests {
    display: flex;
    gap: 20px; /* 减少间距 */
    margin-bottom: 25px; /* 减少底部margin */
}

.tech {
    flex: 1;
}

.interests {
    flex: 1;
}

.skill-categories {
    display: flex;
    flex-direction: column;
    gap: 12px; /* 减少间距 */
}

.category-name {
    font-size: 15px; /* 稍微减小字体 */
    margin: 0 0 5px 0; /* 减少底部margin */
    color: var(--heading-color);
}

.skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.skill-tag {
    margin-right: 0;
    margin-bottom: 4px;
}

/* 兴趣爱好 */
.interests-grid {
    display: flex;
    flex-direction: column;
    gap: 12px; /* 减少间距 */
}

.interest-item {
    display: flex;
    gap: 10px; /* 减少间距 */
    align-items: flex-start;
}

.interest-icon {
    background-color: var(--accent-color);
    color: white;
    width: 32px; /* 减小图标尺寸 */
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.interest-content {
    flex: 1;
}

.interest-content h4 {
    margin: 0 0 5px 0;
    font-size: 16px;
    color: var(--heading-color);
}

.interest-content p {
    margin: 0;
    font-size: 13px; /* 稍微减小字体 */
    line-height: 1.4; /* 减小行高 */
    color: var(--text-secondary);
}

/* 座右铭和联系方式 */
.motto-contact {
    display: flex;
    flex-direction: row; /* 改为水平排列 */
    gap: 20px;
    align-items: flex-start; /* 顶部对齐 */
    justify-content: space-between; /* 两端对齐 */
}

.motto {
    width: 75%; /* 占据75%的宽度 */
    padding: 0;
}

blockquote {
    background-color: var(--quote-bg);
    border-left: 4px solid var(--accent-color);
    padding: 12px 18px; /* 减少内边距 */
    margin: 0;
    border-radius: 8px;
    font-style: italic;
    font-size: 15px; /* 减小字体 */
    line-height: 1.5; /* 减小行高 */
    color: var(--text-color);
    position: relative;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

blockquote cite {
    display: block;
    margin-top: 10px;
    font-size: 14px;
    color: var(--text-secondary);
    text-align: right;
    font-style: normal;
}

.contact-links {
    display: flex;
    flex-direction: column; /* 垂直排列社交链接 */
    gap: 12px;
    margin-top: 0;
}

.contact-link {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--social-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-color);
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 18px;
}

.contact-link:hover {
    background-color: var(--social-hover);
    transform: translateY(-3px);
    color: var(--highlight);
}

/* 动画效果 */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 添加一个桌面优化媒体查询 */
@media (min-width: 1200px) {
    .education-research,
    .tech-interests {
        display: grid;
        grid-template-columns: 3fr 2fr; /* 使用网格布局优化比例 */
        gap: 20px;
    }
    
    /* 在大屏下优化研究标签和技能标签的布局 */
    .research-tags,
    .skill-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-content: flex-start;
    }
    
    /* 优化兴趣爱好网格在大屏下的布局 */
    .interests-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
    }
}

/* 响应式设计 */
@media (max-width: 900px) {
    .profile-header {
        flex-direction: column;
    }

    .profile-image {
        margin: 0 auto;
    }

    .profile-intro {
        text-align: center;
    }

    .basic-info {
        justify-content: center;
        flex-direction: column; /* 在小屏上恢复垂直布局 */
    }

    .education-research,
    .tech-interests {
        flex-direction: column;
    }

    .info-row {
        justify-content: center;
    }
    
    .motto-contact {
        flex-direction: column; /* 在小屏上恢复垂直布局 */
    }
    
    .motto {
        width: 100%;
    }
}

@media (max-width: 600px) {
    .about-content {
        padding: 60px 20px 30px;
    }

    .page-title {
        font-size: 32px;
    }

    .profile-section {
        padding: 20px;
    }

    .section-block {
        padding: 15px;
    }

    .info-row {
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    .about-theme-toggler {
        bottom: 20px;
        left: 20px;
    }
}
</style>