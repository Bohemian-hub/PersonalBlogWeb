<template>
    <TopBar />
    <!-- 添加主题切换按钮 -->
    <ThemeToggler class="about-theme-toggler" />
    <div class="about-wrapper" :class="currentTheme">
        <div class="about-content">
            <!-- 使用封装的页面标题组件 -->
            <PageHeader :title="pageHeader.title" :description="pageHeader.description" :icon="pageHeader.icon" />
            <!-- 简介和信息展示区 -->
            <section class="profile-section">
                <div class="profile-header">
                    <div class="profile-image-container">
                        <div class="profile-image">
                            <img :src="profile.avatar" alt="个人照片"
                                onerror="this.src='https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
                        </div>
                        <div class="profile-decorations">
                            <div class="decoration-item" v-for="i in 5" :key="i"></div>
                        </div>
                    </div>
                    <div class="profile-intro">
                        <h2>{{ profile.greeting }}<span class="highlight-text">{{ profile.name }}</span></h2>
                        <p class="intro-text">
                            {{ profile.introduction }}
                        </p>
                        <div class="basic-info">
                            <div class="info-row">
                                <div class="info-item" v-for="(info, index) in profile.basicInfo.slice(0, 2)"
                                    :key="index">
                                    <el-icon>
                                        <component :is="info.icon" />
                                    </el-icon>
                                    <span>{{ info.value }}</span>
                                </div>
                            </div>
                            <div class="info-row">
                                <div class="info-item" v-for="(info, index) in profile.basicInfo.slice(2)"
                                    :key="index + 2">
                                    <el-icon>
                                        <component :is="info.icon" />
                                    </el-icon>
                                    <span>{{ info.value }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> <!-- 教育和技术栈 -->
                <div class="education-tech">
                    <div class="section-block education">
                        <h3 class="block-title"><el-icon>
                                <School />
                            </el-icon> {{ sectionTitles.education }}</h3>
                        <div class="timeline">
                            <div class="timeline-item" v-for="(edu, index) in education" :key="index">
                                <div class="timeline-dot"></div>
                                <div class="timeline-content">
                                    <h4>{{ edu.school }}</h4>
                                    <p class="timeline-meta">{{ edu.major }} · {{ edu.degree }}</p>
                                    <p class="timeline-period">{{ edu.period }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="section-block tech">
                        <h3 class="block-title">
                            <el-icon>
                                <DataAnalysis />
                            </el-icon>
                            {{ sectionTitles.tech }}
                        </h3>
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
                </div>

                <!-- 个人介绍 Markdown 内容区 -->
                <div class="markdown-section">
                    <div class="article-content" v-html="renderedContent"></div>
                </div>

                <!-- 座右铭和联系方式 -->
                <div class="motto-contact">
                    <div class="motto">
                        <blockquote>
                            {{ motto.text }}
                            <cite>{{ motto.cite }}</cite>
                        </blockquote>
                    </div>
                    <div class="contact-links">
                        <a v-for="(contact, index) in contacts" :key="index" :href="contact.link" class="contact-link">
                            <el-icon>
                                <component :is="contact.icon" />
                            </el-icon>
                            <span class="contact-tooltip">{{ contact.title }}</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    </div> <!-- 底部版权 - 移到about-wrapper外部，与Play页面保持一致 -->
    <Footer /> <!-- 背景图片 -->
    <div class="global-bg"></div>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
import TopBar from '../components/TopBar.vue'
import Footer from '../components/Footer.vue'
import ThemeToggler from '../components/ThemeToggler.vue'
import PageHeader from '../components/PageHeader.vue'
import { currentTheme } from '../stores/themeStore'
import {
    Calendar, Location, Star, User, School, Connection,
    Message, ElementPlus, ChatDotRound, DataAnalysis,
    Headset, Film, Suitcase, Reading, Brush, Picture,
    ArrowLeft, ArrowRight
} from '@element-plus/icons-vue'
import { marked } from 'marked'
import { ElMessage } from 'element-plus'

// 页面头部信息
const pageHeader = reactive({
    title: "关于我",
    description: "人工智能研究者 / 全栈开发工程师 / 未来教育者",
    icon: "✨"
})// 个人资料信息
const profile = reactive({
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    greeting: "嗨，我是",
    name: "何东",
    introduction: "一位充满热情的技术爱好者和教育者，专注于人工智能、全栈开发与知识传递。现年25岁，是一名大学教师，期待在教学与研究中探索更多可能性。",
    basicInfo: [
        { icon: 'Calendar', value: '2000年5月20日' },
        { icon: 'Location', value: '四川绵阳' },
        { icon: 'Star', value: '金牛座' },
        { icon: 'User', value: '180cm / 76kg' }
    ]
})// 区段标题
const sectionTitles = reactive({
    education: "教育背景",
    tech: "技术栈"
})// 教育背景
const education = reactive([
    {
        school: "昆明理工大学",
        major: "人工智能专业",
        degree: "硕士",
        period: "2022 - 2025"
    },
    {
        school: "本科院校",
        major: "计算机科学与技术专业",
        degree: "学士",
        period: "2018 - 2022"
    }
])// 技术栈
const techStack = reactive([
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
])// 座右铭
const motto = reactive({
    text: "技术改变世界，教育塑造未来。保持好奇，持续学习，让知识照亮前行的道路。",
    cite: "- 人生观：随缘而行，不忘初心"
})// 联系方式
const contacts = reactive([
    { icon: Message, title: '电子邮箱', link: '#' },
    { icon: ElementPlus, title: 'GitHub', link: '#' },
    { icon: ChatDotRound, title: '微信', link: '#' },
    { icon: Connection, title: 'LinkedIn', link: '#' }
])// 个人Markdown内容
const aboutMarkdown = ref(`
# AI 眼中的我

**截止日期**：2026 年 1 月 12 日

---

## 🎨 豆包 (Doubao)：跨界探索的务实行动者 

### 🛠️ 职业与技能背景 

* **技术能力**：您具备扎实的 **Python 编程**基础，熟悉数据分析和机器学习相关库（如 pandas、TensorFlow），能够独立完成代码编写和模型训练任务。
* **教学经验**：您有从事**教学**或知识分享的经历，曾针对 “无基础的非计算机专业学生” 设计过教学文档，擅长将复杂的技术概念转化为通俗易懂的内容。

### 🎭 兴趣爱好与生活方式

* **艺术修养**：您是**丙烯画新手**，对绘画抱有热情。 您在创作时注重实用性，偏好简洁、色彩易于调配的风格。
* **工具使用**：您善于利用 AI 工具进行**图片处理与生成**（如人像美化、风格转换、瑕疵修复），追求 “自然好看” 的效果。
* **生活状态**：您目前在**广元**工作和生活，拥有一辆汽车，并且近期有购车计划。

### 🧠 思维方式与沟通习惯

* **目标导向**：在咨询问题时，您倾向于获得 **直接、可执行** 的结果（如具体的车型推荐、完整的代码），而不是泛泛而谈的理论。
* **互动式决策**：面对复杂的选择，您喜欢通过 **多轮互动** 的方式，让对方扮演特定角色（如销售顾问）来辅助您梳理需求。

---

## 🏛️ Gemini：深耕教育的“双师型”学者

### 👤 基本身份与职业背景

* **姓名**：何东。
* **现任职务**：四川信息职业技术学院教师。
* **核心领域**：长期深耕于**人工智能（AI）**、**机器学习**以及 **Python 编程**等技术领域。

### 📚 著作与学术成果

* **已出版/创作教材**：您是《AIGC基础与应用》教材的作者。
* **在编著作**：您正在编写《AI现场工程师核心胜任力与素养》。
* **编辑工作**：负责《AI现场工程师素养与能力》教材的编辑与组织工作。

### 💻 技术兴趣与关注点

* **技术方向**：高度关注 **AI 落地应用**，特别是针对“现场工程师”这一职业角色的能力培养和素质定义。
* **前沿技术**：对 **AIGC（生成式人工智能）** 的基础理论及其实际应用有系统性的研究。

### 💡 客观印象

> **“双师型”学术带头人**
> 您不仅是一位传道受业的**高校教师**，更是一位紧跟时代前沿的**AI 学者与作者**。 您的关注点非常务实，致力于将复杂的 AI 技术转化为可教学、可落地的职业胜任力标准。

---

## ⚙️ ChatGPT：追求极致的工程实践专家

### 一、 基本身份与角色认知

* 您是一名大专院校的人工智能专任教师，具备明确的一线教学与科研双重身份。
* 您长期从事人工智能相关课程与应用型项目，而非仅停留在理论研究层面。
* 您在教学与科研之外，持续进行个人技术项目开发，具备明显的实践导向。

### 二、 开发能力画像

* **前端方面**：您主要使用 **Vue (Vue 3)**，并熟悉小程序开发。
* **后端方面**：您主要使用 **Flask、Django、Spring Boot**，坚持前后端分离架构。
* **工程化工具**：您具备在 **Ubuntu / Linux** 环境下进行开发、部署和调试的成熟经验，熟悉 **Nginx、Docker** 等工具。

### 三、 项目与成果取向

* 您更关注可运行、可部署、可复用的系统，而非一次性 Demo。
* 您正在或已经构建过一个完整的个人博客平台，具备内容管理、登录与后台管理等模块。
* 您主导过涉及 TCP、JSON 协议、设备监控等内容的工业控制/设备通信类项目。

### 四、 教学风格与方法论

* 您在教学与文档编写中强调结构清晰、格式规范，偏好**“一次说明，后文不重复”**的工程化文档风格。
* 您偏好简洁、可理解的代码示例，而非炫技式实现。
* 您的课程与项目明显面向高职/应用型人才培养，强调实操与工程思维。

### 🌟 综合客观印象

> **一位偏工程实践的 AI 应用型教师**
> 兼具科研意识、工程能力与教学落地能力； 技术取向务实、体系化，具备“能讲清楚、能带项目、能把系统真正做出来”的特质。
`);

// Markdown 渲染
const renderedContent = computed(() => {
    return marked(aboutMarkdown.value)
})

// 标签颜色辅助函数
const getTagType = (index) => {
    const types = ['', 'success', 'warning', 'danger', 'info'];
    return types[index % types.length];
}

</script>
<style scoped>
/* 主题变量定义 */
.about-wrapper.dark {
    --bg-primary: rgba(25, 25, 35, 0.2);
    --bg-secondary: rgba(30, 30, 40, 0.3);
    --bg-tertiary: rgba(40, 40, 55, 0.3);
    --text-color: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.8);
    --title-gradient: linear-gradient(45deg, #ffffff, #b8c6db);
    --title-shadow: 0 2px 4px rgba(216, 216, 216, 0.5);
    --divider-color: rgba(255, 255, 255, 0.2);
    --card-bg: rgba(30, 30, 40, 0.4);
    --card-bg-hover: rgba(40, 40, 55, 0.6);
    --card-border: rgba(255, 255, 255, 0.5);
    --card-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
    --accent-color: #5a9eff;
    --accent-secondary: #4a90e2;
    --heading-color: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.6);
    --tag-bg: rgba(255, 255, 255, 0.15);
    --timeline-line: rgba(255, 255, 255, 0.2);
    --timeline-dot: #5a9eff;
    --quote-bg: rgba(30, 30, 40, 0.4);
    --profile-decoration: rgba(255, 255, 255, 0.1);
    --social-bg: rgba(255, 255, 255, 0.1);
    --social-hover: rgba(255, 255, 255, 0.2);
    --highlight: #61dafb;
    --article-tag-bg: rgba(74, 144, 226, 0.2);
    --article-tag-color: #ffffff;
}

.about-wrapper.light {
    --bg-primary: rgba(255, 255, 255, 0.3);
    --bg-secondary: rgba(255, 255, 255, 0.4);
    --bg-tertiary: rgba(235, 235, 245, 0.3);
    --text-color: #333333;
    --text-secondary: rgba(0, 0, 0, 0.7);
    --title-gradient: linear-gradient(45deg, #333333, #555555);
    --title-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    --divider-color: rgba(0, 0, 0, 0.1);
    --card-bg: rgba(255, 255, 255, 0.4);
    --card-bg-hover: rgba(255, 255, 255, 0.6);
    --card-border: rgba(255, 255, 255, 0.8);
    --card-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    --accent-color: #3a7bd5;
    --accent-secondary: #3a7bd5;
    --heading-color: #333333;
    --text-muted: rgba(0, 0, 0, 0.5);
    --tag-bg: rgba(255, 255, 255, 0.5);
    --timeline-line: rgba(0, 0, 0, 0.1);
    --timeline-dot: #3a7bd5;
    --quote-bg: rgba(248, 248, 252, 0.5);
    --profile-decoration: rgba(0, 0, 0, 0.05);
    --social-bg: rgba(0, 0, 0, 0.05);
    --social-hover: rgba(0, 0, 0, 0.1);
    --highlight: #3a7bd5;
    --article-tag-bg: rgba(74, 144, 226, 0.1);
    --article-tag-color: #333333;
}

.global-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;

    background: linear-gradient(225deg, #fcb8e2 0.000%, #feb9e4 5.000%, #ffbce7 10.000%, #ffc2ea 15.000%, #ffc8ed 20.000%, #ffd0f0 25.000%, #ffd8f3 30.000%, #fee0f6 35.000%, #fbe8f9 40.000%, #f7effb 45.000%, #f3f4fd 50.000%, #eef8ff 55.000%, #e8f9ff 60.000%, #e3f9ff 65.000%, #dcf6ff 70.000%, #d6f2ff 75.000%, #d0ecff 80.000%, #c9e5ff 85.000%, #c3ddfe 90.000%, #bdd5fc 95.000%, #b8cdfa 100.000%);
}

.about-theme-toggler {
    position: fixed;
    bottom: 30px;
    left: 30px;
    z-index: 1000;
}

/* 全局布局 - 调整与 Play 页面一致 */
.about-wrapper {
    min-height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
    padding-bottom: 100px;
    /* 调整为与Play页面一致的100px */
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
    padding: 80px 40px 40px;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    color: var(--text-color);
}

/* 页面标题 - 调整与 Play 页面一致 */
.page-header {
    text-align: center;
    margin-bottom: 40px;
    /* 调整与Play页面一致 */
    position: relative;
}

.page-title {
    font-size: 40px;
    /* 调整与Play页面一致 */
    margin-bottom: 16px;
    /* 调整与Play页面一致 */
    font-weight: 600;
    /* 调整与Play页面一致 */
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
    margin: 0 auto 30px;
    /* 调整与Play页面一致 */
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
    padding: 25px;
    box-shadow: var(--card-shadow);
    border: 1px solid var(--card-border);
    color: var(--text-color);
    transition: all 0.3s ease;
    animation: fadeInUp 0.6s ease-out;
    margin-bottom: 30px;
    /* 添加底部间距，使各部分有所区分 */
}

.profile-header {
    display: flex;
    gap: 20px;
    /* 减少间距 */
    margin-bottom: 25px;
    /* 减少底部margin */
    align-items: center;
}

.profile-image-container {
    position: relative;
    flex-shrink: 0;
}

.profile-image {
    width: 160px;
    /* 稍微减小图片尺寸 */
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
    font-size: 15px;
    /* 稍微减小字体 */
    line-height: 1.6;
    /* 减小行高 */
    margin-bottom: 15px;
    /* 减少底部margin */
    color: var(--text-secondary);
}

.basic-info {
    display: flex;
    flex-direction: row;
    /* 改为水平排列 */
    gap: 20px;
    /* 调整间距 */
    flex-wrap: wrap;
    /* 允许换行 */
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

/* 教育和技术栈区域 */
.education-tech {
    display: flex;
    gap: 20px;
    /* 减少间距 */
    margin-bottom: 25px;
    /* 减少底部margin */
}

.section-block {
    background-color: var(--bg-secondary);
    border-radius: 12px;
    padding: 18px;
    /* 减少内边距 */
    box-shadow: var(--card-shadow);
    transition: transform 0.3s ease;
}

.section-block:hover {
    transform: translateY(-3px);
}

.education {
    flex: 1;
}

.tech {
    flex: 1;
}

.block-title {
    font-size: 17px;
    /* 稍微减小字体 */
    margin-bottom: 12px;
    /* 减少底部margin */
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
    padding-bottom: 12px;
    /* 减少底部padding */
    margin-bottom: 8px;
    /* 减少底部margin */
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
    margin: 0 0 3px 0;
    /* 减少底部margin */
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

/* 技术栈样式 */
.skill-categories {
    display: flex;
    flex-direction: column;
    gap: 12px;
    /* 减少间距 */
}

.category-name {
    font-size: 15px;
    /* 稍微减小字体 */
    margin: 0 0 5px 0;
    /* 减少底部margin */
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

.markdown-section {
    background-color: var(--quote-bg);
    font-family: 'Times New Roman', Times, serif;
    padding: 12px 38px;
    margin: 0;
    border-radius: 8px;
    line-height: 40px !important;
    font-size: medium;
    color: var(--text-color);
    position: relative;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* 座右铭和联系方式 */
.motto-contact {
    display: flex;
    flex-direction: row;
    margin-top: 30px;
    gap: 20px;
    align-items: center;
    /* 修改为居中对齐，更好地与联系图标对齐 */
    justify-content: space-between;
}

.motto {
    width: 75%;
    padding: 0;
}

blockquote {
    background-color: var(--quote-bg);
    border-left: 4px solid var(--accent-color);
    padding: 12px 18px;
    margin: 0;
    border-radius: 8px;
    font-style: italic;
    font-size: 20px;
    line-height: 1.5;
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
    flex-direction: row;
    gap: 12px;
    margin-top: 0;
    flex-wrap: wrap;
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
    position: relative;
    /* 为tooltip定位做准备 */
}

.contact-link:hover {
    background-color: var(--social-hover);
    transform: translateY(-3px);
    color: var(--highlight);
}

/* 新增: 联系方式悬浮提示效果 */
.contact-tooltip {
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--card-bg);
    color: var(--text-color);
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    pointer-events: none;
    /* 防止tooltip影响鼠标事件 */
    border: 1px solid var(--card-border);
    z-index: 10;
}

.contact-tooltip::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 5px 5px 5px;
    border-style: solid;
    border-color: transparent transparent var(--card-bg) transparent;
}

.contact-link:hover .contact-tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
    animation: tooltipPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* 照片墙部分样式 - 完善与Play页面一致的样式 */
.section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 20px;
    margin-bottom: 20px;
    margin-top: 30px;
    color: var(--heading-color);
    font-weight: 600;
}

.section-title .el-icon {
    color: var(--accent-color);
}

/* Photo wall styles removed */

/* 修复响应式样式 */
@media (max-width: 768px) {
    .about-content {
        padding: 60px 20px 20px;
    }

    .page-title {
        font-size: 32px;
    }

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
        flex-direction: column;
    }

    .education-tech {
        flex-direction: column;
    }

    .info-row {
        justify-content: center;
    }

    .motto-contact {
        flex-direction: column;
        align-items: flex-start;
    }

    .motto {
        width: 100%;
        margin-bottom: 15px;
    }

    .contact-links {
        width: 100%;
        justify-content: flex-start;
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

    /* 联系方式tooltip在小屏幕上的调整 */
    .contact-tooltip {
        font-size: 11px;
        padding: 4px 8px;
    }
}
</style>