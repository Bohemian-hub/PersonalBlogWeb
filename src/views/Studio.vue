<template>
    <TopBar />
    <!-- 添加主题切换按钮 -->
    <ThemeToggler class="home-theme-toggler" />
    <div class="page-wrapper" :class="currentTheme">
        <div class="page-content">
            <!-- 使用封装的页面标题组件 -->
            <PageHeader title="实践工坊" description="展示个人项目、技术积累与开发心得" icon="🛠️" />

            <!-- 主体内容区 - 两列布局 -->
            <div class="content-layout">
                <!-- 左侧主内容区 -->
                <div class="main-column">
                    <!-- 技术文章展示 -->
                    <section class="tech-articles-section section-container">
                        <h2 class="section-title">
                            <el-icon>
                                <Document />
                            </el-icon>
                            技术文章
                        </h2>
                        <div class="filter-bar">
                            <el-radio-group v-model="articleFilter" size="small">
                                <el-radio-button v-for="filter in articleFilters" :key="filter.value"
                                    :label="filter.value">
                                    {{ filter.label }}
                                </el-radio-button>
                            </el-radio-group>
                            <el-input v-model="searchQuery" placeholder="搜索文章..." prefix-icon="Search" size="small"
                                class="search-input" />
                        </div>
                        <div class="articles-container">
                            <div class="article-card" v-for="article in techArticles" :key="article.id">
                                <div class="article-cover">
                                    <img :src="article.coverImg" :alt="article.title" />
                                    <span class="article-category-tag">{{ article.category }}</span>
                                </div>
                                <div class="article-content">
                                    <div class="article-meta-top">
                                        <span class="article-date">{{ article.date }}</span>
                                    </div>
                                    <h3 class="article-title">{{ article.title }}</h3>
                                    <p class="article-excerpt">{{ article.excerpt }}...</p>
                                    <div class="article-footer">
                                        <span class="read-time">
                                            <el-icon>
                                                <Timer />
                                            </el-icon>
                                            {{ article.readTime }}分钟阅读
                                        </span>
                                        <el-button type="primary" class="read-btn">
                                            阅读全文
                                            <el-icon>
                                                <ArrowRight />
                                            </el-icon>
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pagination-container">
                            <el-pagination background layout="prev, pager, next" :total="paginationData.total"
                                :page-size="paginationData.pageSize" />
                        </div>
                    </section>

                    <!-- 项目展示区 -->
                    <section class="projects-section section-container">
                        <h2 class="section-title">
                            <el-icon>
                                <Suitcase />
                            </el-icon>
                            项目经历
                        </h2>
                        <div class="projects-grid">
                            <div class="project-card" v-for="project in projects" :key="project.id">
                                <div class="project-header">
                                    <img :src="project.coverImg" :alt="project.title" class="project-image" />
                                    <div class="project-badge">{{ project.status }}</div>
                                </div>
                                <div class="project-content">
                                    <h3 class="project-title">{{ project.title }}</h3>
                                    <p class="project-description">{{ project.description }}</p>
                                    <div class="project-tech">
                                        <el-tag size="small" v-for="tech in project.technologies" :key="tech"
                                            :type="getTagType(tech)">
                                            {{ tech }}
                                        </el-tag>
                                    </div>
                                    <div class="project-links">
                                        <el-button v-if="project.demoUrl" size="small" type="success"
                                            :href="project.demoUrl" target="_blank">
                                            <el-icon>
                                                <View />
                                            </el-icon> 演示
                                        </el-button>
                                        <el-button v-if="project.codeUrl" size="small" type="primary"
                                            :href="project.codeUrl" target="_blank">
                                            <el-icon>
                                                <Link />
                                            </el-icon> 源码
                                        </el-button>
                                        <el-button size="small" type="info">
                                            <el-icon>
                                                <InfoFilled />
                                            </el-icon> 详情
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- 开发工具推荐 -->
                    <section class="dev-tools section-container">
                        <h2 class="section-title">
                            <el-icon>
                                <Tools />
                            </el-icon>
                            开发工具推荐
                        </h2>
                        <div class="tools-grid">
                            <div class="tool-card" v-for="tool in devTools" :key="tool.id">
                                <div class="tool-icon">
                                    <el-icon>
                                        <component :is="tool.icon" />
                                    </el-icon>
                                </div>
                                <div class="tool-content">
                                    <h3 class="tool-name">{{ tool.name }}</h3>
                                    <p class="tool-description">{{ tool.description }}</p>
                                    <div class="tool-categories">
                                        <el-tag size="small" v-for="cat in tool.categories" :key="cat"
                                            :type="getTagType(cat)">
                                            {{ cat }}
                                        </el-tag>
                                    </div>
                                </div>
                                <el-button class="tool-link" type="primary" :href="tool.url" target="_blank">
                                    <el-icon>
                                        <Link />
                                    </el-icon> 访问
                                </el-button>
                            </div>
                        </div>
                    </section>
                </div>

                <!-- 右侧边栏 -->
                <div class="side-column">
                    <!-- 个人技术名片 -->
                    <div class="tech-profile side-card">
                        <h3 class="side-card-title">
                            <el-icon>
                                <User />
                            </el-icon>
                            技术名片
                        </h3>
                        <div class="profile-header">
                            <div class="profile-avatar">
                                <el-avatar :size="70" :src="profileData.avatarUrl" />
                            </div>
                            <div class="profile-info">
                                <h3>{{ profileData.name }}</h3>
                                <p>{{ profileData.title }}</p>
                            </div>
                        </div>
                        <div class="profile-description">
                            {{ profileData.bio }}
                        </div>
                        <div class="profile-links">
                            <a :href="profileData.githubUrl" class="social-link github">
                                <el-icon>
                                    <ElementPlus />
                                </el-icon>
                                GitHub
                            </a>
                            <a :href="profileData.linkedinUrl" class="social-link linkedin">
                                <el-icon>
                                    <Connection />
                                </el-icon>
                                LinkedIn
                            </a>
                        </div>
                    </div>

                    <!-- 技术栈展示 -->
                    <div class="tech-stack side-card">
                        <h3 class="side-card-title">
                            <el-icon>
                                <DataAnalysis />
                            </el-icon>
                            技术栈
                        </h3>
                        <div class="tech-categories">
                            <div class="tech-category" v-for="category in techStack" :key="category.name">
                                <h4 class="category-name">{{ category.name }}</h4>
                                <div class="skills-container">
                                    <div class="skill-item" v-for="skill in category.skills" :key="skill.name">
                                        <div class="skill-info">
                                            <span class="skill-name">{{ skill.name }}</span>
                                            <span class="skill-level">{{ skill.level }}</span>
                                        </div>
                                        <el-progress :percentage="skill.percentage"
                                            :color="getProgressColor(skill.percentage)" :stroke-width="12"
                                            :show-text="false" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 当前学习中 -->
                    <div class="currently-learning side-card">
                        <h3 class="side-card-title">
                            <el-icon>
                                <Reading />
                            </el-icon>
                            学习中
                        </h3>
                        <div class="learning-items">
                            <div class="learning-item" v-for="item in currentlyLearning" :key="item.id">
                                <div class="learning-progress">
                                    <el-progress type="circle" :percentage="item.progress" :width="50" :stroke-width="6"
                                        :color="getProgressColor(item.progress)" />
                                </div>
                                <div class="learning-content">
                                    <h4>{{ item.title }}</h4>
                                    <p>{{ item.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 技术博客推荐 -->
                    <div class="blog-recommendations side-card">
                        <h3 class="side-card-title">
                            <el-icon>
                                <Star />
                            </el-icon>
                            推荐博客
                        </h3>
                        <ul class="blog-list">
                            <li class="blog-item" v-for="blog in blogRecommendations" :key="blog.id">
                                <div class="blog-icon">
                                    <el-icon>
                                        <component :is="blog.icon" />
                                    </el-icon>
                                </div>
                                <div class="blog-info">
                                    <a :href="blog.url" target="_blank" class="blog-title">{{ blog.title }}</a>
                                    <p class="blog-description">{{ blog.description }}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 底部版权和备案信息 -->
    <Footer />
    <el-image class="bg-image" :src="bgUrl" :fit="'cover'" draggable="false"
        :class="{ 'dim-bg': currentTheme === 'dark' }" />
</template>

<script setup>
import { ref } from 'vue'
import {
    Document, ArrowRight, Search, Link, User,
    Tools, View, InfoFilled, ElementPlus, Connection,
    DataAnalysis, Reading, Suitcase, Star, Timer
} from '@element-plus/icons-vue'
import TopBar from '../components/TopBar.vue'
import Footer from '../components/Footer.vue'
import ThemeToggler from '../components/ThemeToggler.vue'
import PageHeader from '../components/PageHeader.vue'
import { currentTheme } from '../stores/themeStore'
// 导入背景图片，使用与Research不同的背景
import bgFile from '@/assets/images/bg5.png' // 假设有这个图片，如果没有请替换为实际存在的图片

// 背景图片
const bgUrl = bgFile

// 筛选和搜索
const articleFilter = ref('all')
const searchQuery = ref('')

// 分页数据
const paginationData = ref({
    total: 42,
    pageSize: 6
})

// 个人技术资料
const profileData = ref({
    name: '何东',
    title: '全栈开发工程师',
    bio: '热爱编程与技术创新，专注于Web开发、数据可视化和人工智能应用。喜欢探索新技术并将其应用到实际项目中。',
    avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    githubUrl: 'https://github.com/username',
    linkedinUrl: 'https://linkedin.com/in/username'
})

// 技术文章过滤选项
const articleFilters = [
    { value: 'all', label: '全部文章' },
    { value: 'frontend', label: '前端开发' },
    { value: 'backend', label: '后端技术' },
    { value: 'devops', label: 'DevOps' },
    { value: 'ai', label: 'AI技术' }
]

// 技术文章
const techArticles = ref([
    {
        id: 1,
        title: 'Vue3 Composition API实战经验',
        excerpt: '本文分享了在实际项目中使用Vue3 Composition API的经验和最佳实践',
        date: '2024年3月15日',
        coverImg: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        category: '前端开发',
        readTime: 8
    },
    {
        id: 2,
        title: 'Node.js微服务架构设计',
        excerpt: '探讨如何使用Node.js构建高可用、可扩展的微服务架构',
        date: '2024年2月20日',
        coverImg: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        category: '后端技术',
        readTime: 10
    },
    {
        id: 3,
        title: 'Docker与Kubernetes入门指南',
        excerpt: '容器化应用开发与编排管理的基础知识与实践指南',
        date: '2024年1月10日',
        coverImg: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        category: 'DevOps',
        readTime: 12
    },
    {
        id: 4,
        title: 'TensorFlow.js实现前端机器学习',
        excerpt: '如何在浏览器环境中运行机器学习模型并创建智能Web应用',
        date: '2024年4月5日',
        coverImg: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        category: 'AI技术',
        readTime: 9
    },
    {
        id: 5,
        title: 'CSS Grid与Flexbox布局技巧',
        excerpt: '现代CSS布局系统详解与实用案例分析',
        date: '2024年3月25日',
        coverImg: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        category: '前端开发',
        readTime: 7
    },
    {
        id: 6,
        title: 'GraphQL API设计最佳实践',
        excerpt: '如何设计高效、灵活且易于维护的GraphQL API',
        date: '2024年2月10日',
        coverImg: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        category: '后端技术',
        readTime: 11
    }
])

// 项目展示
const projects = ref([
    {
        id: 1,
        title: '智能客服助手',
        description: '基于自然语言处理的智能客服系统，支持多轮对话与意图识别',
        coverImg: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        technologies: ['Vue.js', 'Python', 'TensorFlow', 'Flask', 'Docker'],
        status: '已上线',
        demoUrl: '#',
        codeUrl: '#'
    },
    {
        id: 2,
        title: '数据可视化平台',
        description: '企业级数据分析与可视化平台，支持自定义数据源与动态图表生成',
        coverImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        technologies: ['React', 'D3.js', 'Node.js', 'MongoDB', 'AWS'],
        status: '进行中',
        demoUrl: '',
        codeUrl: '#'
    },
    {
        id: 3,
        title: '开源电子书阅读器',
        description: '跨平台电子书阅读应用，支持多种格式与自定义主题',
        coverImg: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        technologies: ['Electron', 'JavaScript', 'CSS', 'SQLite'],
        status: '已完成',
        demoUrl: '#',
        codeUrl: '#'
    },
    {
        id: 4,
        title: '健康数据追踪App',
        description: '移动端健康数据追踪应用，支持数据可视化与智能建议',
        coverImg: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        technologies: ['Flutter', 'Dart', 'Firebase', 'TensorFlow Lite'],
        status: '测试中',
        demoUrl: '#',
        codeUrl: '#'
    }
])

// 开发工具推荐
const devTools = ref([
    {
        id: 1,
        name: 'VS Code',
        description: '功能强大的轻量级代码编辑器，拥有丰富的插件生态',
        icon: 'Edit',
        categories: ['编辑器', '前端', '后端'],
        url: 'https://code.visualstudio.com/'
    },
    {
        id: 2,
        name: 'Postman',
        description: 'API开发与测试工具，支持自动化测试与团队协作',
        icon: 'Connection',
        categories: ['API', '测试', '开发工具'],
        url: 'https://www.postman.com/'
    },
    {
        id: 3,
        name: 'Figma',
        description: '协作式设计工具，支持原型设计与开发交接',
        icon: 'Brush',
        categories: ['设计', 'UI/UX', '协作'],
        url: 'https://www.figma.com/'
    },
    {
        id: 4,
        name: 'GitHub Copilot',
        description: 'AI驱动的代码辅助工具，提供智能代码补全与建议',
        icon: 'Robot',
        categories: ['AI', '编程辅助', '效率工具'],
        url: 'https://github.com/features/copilot'
    },
    {
        id: 5,
        name: 'Docker Desktop',
        description: '容器化开发与部署平台，简化环境配置',
        icon: 'Box',
        categories: ['DevOps', '容器', '部署'],
        url: 'https://www.docker.com/products/docker-desktop'
    },
    {
        id: 6,
        name: 'Vercel',
        description: '前端项目部署平台，支持自动化CI/CD与预览',
        icon: 'Upload',
        categories: ['部署', 'CI/CD', '前端'],
        url: 'https://vercel.com/'
    }
])

// 我的技术栈
const techStack = ref([
    {
        name: '前端开发',
        skills: [
            { name: 'Vue.js', level: '专家', percentage: 90 },
            { name: 'React', level: '高级', percentage: 80 },
            { name: 'JavaScript/TypeScript', level: '专家', percentage: 92 },
            { name: 'CSS/SASS', level: '高级', percentage: 85 }
        ]
    },
    {
        name: '后端开发',
        skills: [
            { name: 'Node.js', level: '高级', percentage: 82 },
            { name: 'Python', level: '中级', percentage: 75 },
            { name: 'Go', level: '初级', percentage: 60 },
            { name: 'SQL/NoSQL', level: '高级', percentage: 80 }
        ]
    },
    {
        name: 'DevOps',
        skills: [
            { name: 'Docker', level: '高级', percentage: 78 },
            { name: 'CI/CD', level: '中级', percentage: 70 },
            { name: 'AWS', level: '中级', percentage: 65 }
        ]
    }
])

// 当前学习中
const currentlyLearning = ref([
    {
        id: 1,
        title: 'Rust编程语言',
        description: '学习系统级编程与高性能应用开发',
        progress: 45
    },
    {
        id: 2,
        title: 'WebAssembly',
        description: '探索Web应用的高性能计算能力',
        progress: 62
    },
    {
        id: 3,
        title: 'LLM微调技术',
        description: '大型语言模型的定制化训练与部署',
        progress: 30
    }
])

// 技术博客推荐
const blogRecommendations = ref([
    {
        id: 1,
        title: 'CSS-Tricks',
        description: '前端技术与CSS技巧分享',
        icon: 'Brush',
        url: 'https://css-tricks.com/'
    },
    {
        id: 2,
        title: 'Smashing Magazine',
        description: '网页设计与开发专业资源',
        icon: 'Collection',
        url: 'https://www.smashingmagazine.com/'
    },
    {
        id: 3,
        title: 'Dev.to',
        description: '开发者社区与技术分享平台',
        icon: 'ChatDotRound',
        url: 'https://dev.to/'
    },
    {
        id: 4,
        title: 'Stack Overflow Blog',
        description: '编程问题解决与技术趋势',
        icon: 'Document',
        url: 'https://stackoverflow.blog/'
    }
])

// 辅助函数
const getTagType = (tag) => {
    const types = {
        'Vue.js': '',
        'React': 'success',
        'Python': 'warning',
        'Docker': 'info',
        'AI': 'danger',
        '前端': '',
        '后端': 'success',
        '设计': 'warning',
        'DevOps': 'info'
    }

    // 为部分常见标签返回固定类型，其他随机分配
    if (types[tag]) return types[tag]

    // 为其他标签随机分配类型
    const typeOptions = ['', 'success', 'warning', 'info', 'danger']
    const hashCode = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return typeOptions[hashCode % typeOptions.length]
}

const getProgressColor = (percentage) => {
    if (percentage < 60) return '#e6a23c'
    if (percentage < 80) return '#409eff'
    return '#67c23a'
}
</script>

<style scoped>
/* 主题变量定义 */
.page-wrapper.dark {
    --bg-primary: rgba(25, 25, 35, 0.173);
    --bg-secondary: rgba(30, 30, 40, 0.416);
    --bg-tertiary: rgba(40, 40, 55, 0.4);
    --text-color: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.8);
    --title-gradient: linear-gradient(45deg, #ffffff, #b8c6db);
    --title-shadow: 0 2px 4px rgba(216, 216, 216, 0.5);
    --divider-color: rgba(255, 255, 255, 0.5);
    --card-bg: rgba(30, 30, 40, 0.7);
    --card-bg-hover: rgba(40, 40, 55, 0.8);
    --card-border: rgba(255, 255, 255, 0.1);
    --card-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    --accent-color: #5a9eff;
    --accent-secondary: #4a90e2;
    --heading-color: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.6);
    --tag-bg: rgba(60, 60, 80, 0.7);
    --tag-text: #ffffff;
    --card-hover-transform: translateY(-4px);
    --timeline-line: rgba(255, 255, 255, 0.2);
    --timeline-dot: #5a9eff;
    --button-bg: #4a90e2;
    --button-text: white;
    --button-border: transparent;
    --button-hover-bg: #3a7bd5;
}

.page-wrapper.light {
    --bg-primary: rgba(245, 245, 250, 0.85);
    --bg-secondary: rgba(255, 255, 255, 0.9);
    --bg-tertiary: rgba(235, 235, 245, 0.7);
    --text-color: #333333;
    --text-secondary: rgba(0, 0, 0, 0.7);
    --title-gradient: linear-gradient(45deg, #333333, #555555);
    --title-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    --divider-color: rgba(0, 0, 0, 0.2);
    --card-bg: rgba(255, 255, 255, 0.85);
    --card-bg-hover: rgba(255, 255, 255, 0.95);
    --card-border: rgba(0, 0, 0, 0.1);
    --card-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    --accent-color: #3a7bd5;
    --accent-secondary: #3a7bd5;
    --heading-color: #333333;
    --text-muted: rgba(0, 0, 0, 0.5);
    --tag-bg: rgba(240, 240, 245, 0.8);
    --tag-text: #333333;
    --card-hover-transform: translateY(-3px);
    --timeline-line: rgba(0, 0, 0, 0.1);
    --timeline-dot: #3a7bd5;
    --button-bg: #4a90e2;
    --button-text: white;
    --button-border: transparent;
    --button-hover-bg: #3a7bd5;
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
    filter: brightness(0.9) saturate(0.8);
}

.page-wrapper {
    min-height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
    padding-bottom: 100px;
    position: relative;
}

.page-wrapper::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
}

.page-content {
    padding: 80px 40px 40px;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    color: var(--text-color);
}

.home-theme-toggler {
    position: fixed;
    bottom: 30px;
    left: 30px;
    z-index: 1000;
}

.page-header {
    text-align: center;
    margin-bottom: 40px;
    position: relative;
}

.page-title {
    font-size: 40px;
    margin-bottom: 16px;
    font-weight: 600;
    background: var(--title-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    letter-spacing: 2px;
    text-shadow: var(--title-shadow);
}

.description {
    font-size: 18px;
    opacity: 0.95;
    margin-bottom: 20px;
    font-style: italic;
    max-width: 800px;
    margin: 0 auto 30px;
    text-shadow: var(--title-shadow);
    color: var(--text-secondary);
}

.divider {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
}

.divider::before,
.divider::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--divider-color);
    margin: 0 15px;
}

/* 内容布局 */
.content-layout {
    display: flex;
    gap: 30px;
}

.main-column {
    flex: 1;
    min-width: 0;
}

.side-column {
    width: 340px;
    flex-shrink: 0;
}

/* 内容容器样式 */
.section-container {
    background-color: var(--bg-primary);
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 30px;
    backdrop-filter: blur(10px);
    box-shadow: var(--card-shadow);
    border: 1px solid var(--card-border);
    color: var(--text-color);
    transition: all 0.3s ease;
}

.section-container:hover {
    background-color: var(--bg-secondary);
    transform: var(--card-hover-transform);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.section-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--heading-color);
}

/* 技术文章列表样式 */
.filter-bar {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 20px;
    align-items: center;
}

.search-input {
    width: 220px;
}

.articles-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 20px;
}

.article-card {
    background-color: var(--card-bg);
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: var(--card-shadow);
    cursor: pointer;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--card-border);
}

.article-card:hover {
    transform: var(--card-hover-transform);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.article-cover {
    height: 160px;
    position: relative;
    overflow: hidden;
}

.article-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.article-card:hover .article-cover img {
    transform: scale(1.05);
}

.article-category-tag {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(58, 123, 213, 0.9);
    color: white;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.article-content {
    padding: 15px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    color: var(--text-color);
}

.article-meta-top {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 8px;
    font-size: 0.8rem;
    color: var(--text-muted);
}

.article-title {
    font-size: 16px;
    margin-bottom: 8px;
    line-height: 1.4;
    font-weight: 600;
    color: var(--heading-color);
}

.article-excerpt {
    font-size: 0.85rem;
    line-height: 1.5;
    margin-bottom: 15px;
    color: var(--text-secondary);
    flex-grow: 1;
}

.article-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    margin-top: auto;
    border-top: 1px solid var(--card-border);
}

.read-time {
    font-size: 0.85rem;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    gap: 4px;
}

.read-btn {
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 0.9rem;
    background-color: var(--button-bg);
    border-color: var(--button-border);
    color: var(--button-text);
}

.read-btn:hover,
.read-btn:focus {
    background-color: var(--button-hover-bg);
}

.pagination-container {
    margin-top: 30px;
    display: flex;
    justify-content: center;
}

/* 项目展示区样式 */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
    margin-top: 20px;
}

.project-card {
    background-color: var(--card-bg);
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: var(--card-shadow);
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--card-border);
}

.project-card:hover {
    transform: var(--card-hover-transform);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
}

.project-header {
    position: relative;
    height: 180px;
}

.project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.project-card:hover .project-image {
    transform: scale(1.05);
}

.project-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(58, 123, 213, 0.9);
    color: white;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.project-content {
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.project-title {
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: 600;
    color: var(--heading-color);
}

.project-description {
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 15px;
    color: var(--text-secondary);
    flex-grow: 1;
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 15px;
}

.project-tech .el-tag {
    margin-bottom: 5px;
}

.project-links {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: auto;
}

/* 开发工具推荐区 */
.tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.tool-card {
    background-color: var(--card-bg);
    border-radius: 10px;
    padding: 20px;
    display: flex;
    align-items: flex-start;
    transition: all 0.3s ease;
    box-shadow: var(--card-shadow);
    border: 1px solid var(--card-border);
    position: relative;
}

.tool-card:hover {
    transform: var(--card-hover-transform);
    background-color: var(--card-bg-hover);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.tool-icon {
    font-size: 24px;
    color: var(--accent-color);
    margin-right: 15px;
    background-color: rgba(74, 144, 226, 0.1);
    width: 45px;
    height: 45px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
}

.tool-content {
    flex-grow: 1;
}

.tool-name {
    font-size: 16px;
    margin: 0 0 8px 0;
    font-weight: 600;
    color: var(--heading-color);
}

.tool-description {
    font-size: 0.85rem;
    line-height: 1.5;
    color: var(--text-secondary);
    margin-bottom: 12px;
}

.tool-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

.tool-link {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 0.9rem;
    padding: 4px 8px;
    border-radius: 6px;
}

/* 侧边栏卡片样式 */
.side-card {
    background-color: var(--bg-primary);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 24px;
    backdrop-filter: blur(10px);
    box-shadow: var(--card-shadow);
    border: 1px solid var(--card-border);
    color: var(--text-color);
    transition: all 0.3s ease;
}

.side-card:hover {
    background-color: var(--bg-secondary);
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.side-card-title {
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--card-border);
    color: var(--heading-color);
}

.side-card-title .el-icon {
    color: var(--accent-color);
}

/* 个人技术名片 */
.tech-profile {
    border-top: 4px solid #3a7bd5;
}

.profile-header {
    display: flex;
    margin-bottom: 16px;
}

.profile-avatar {
    margin-right: 15px;
}

.profile-info h3 {
    margin: 0 0 5px 0;
    font-size: 18px;
    color: var(--heading-color);
}

.profile-info p {
    margin: 0;
    font-size: 0.9rem;
    color: var(--text-secondary);
}

.profile-description {
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 15px;
    color: var(--text-secondary);
    padding-bottom: 15px;
    border-bottom: 1px solid var(--card-border);
}

.profile-links {
    display: flex;
    justify-content: space-between;
}

.social-link {
    display: flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    color: var(--accent-color);
    font-size: 0.9rem;
    transition: all 0.2s;
    padding: 5px 12px;
    border-radius: 20px;
    background-color: rgba(74, 144, 226, 0.1);
}

.social-link:hover {
    background-color: rgba(74, 144, 226, 0.2);
}

/* 技术栈样式 */
.tech-categories {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.tech-category h4 {
    margin: 0 0 12px 0;
    font-size: 16px;
    color: var(--heading-color);
    display: flex;
    align-items: center;
}

.skills-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.skill-item {
    margin-bottom: 5px;
}

.skill-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
}

.skill-name {
    font-size: 0.85rem;
    color: var(--text-secondary);
}

.skill-level {
    font-size: 0.85rem;
    color: var(--accent-color);
    font-weight: 500;
}

/* 学习中模块 */
.learning-items {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.learning-item {
    display: flex;
    align-items: center;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--card-border);
}

.learning-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.learning-progress {
    margin-right: 15px;
    flex-shrink: 0;
}

.learning-content h4 {
    margin: 0 0 5px 0;
    font-size: 16px;
    color: var(--heading-color);
}

.learning-content p {
    margin: 0;
    font-size: 0.85rem;
    color: var(--text-secondary);
}

/* 博客推荐列表 */
.blog-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.blog-item {
    display: flex;
    align-items: flex-start;
    padding: 12px 0;
    border-bottom: 1px solid var(--card-border);
}

.blog-item:last-child {
    border-bottom: none;
}

.blog-icon {
    margin-right: 12px;
    color: var(--accent-color);
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(74, 144, 226, 0.1);
    border-radius: 6px;
    flex-shrink: 0;
}

.blog-info {
    flex: 1;
}

.blog-title {
    display: block;
    font-size: 0.95rem;
    margin-bottom: 5px;
    color: var(--heading-color);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
}

.blog-title:hover {
    color: var(--accent-color);
}

.blog-description {
    font-size: 0.85rem;
    margin: 0;
    color: var(--text-secondary);
}

/* 响应式设计 */
@media (max-width: 1200px) {
    .content-layout {
        flex-direction: column;
    }

    .side-column {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
    }

    .side-column>div {
        margin-bottom: 0;
    }

    /* 占据整行的元素 */
    .side-column .tech-profile {
        grid-column: span 2;
    }
}

@media (max-width: 768px) {
    .page-content {
        padding: 60px 20px 20px;
    }

    /* 单列布局 */
    .side-column {
        display: block;
    }

    /* 移动端侧栏卡片间距 */
    .side-column .side-card {
        margin-bottom: 35px;
    }

    .articles-container,
    .projects-grid,
    .tools-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    /* 确保移动端各板块之间有足够间距 */
    .section-container {
        margin-bottom: 35px;
        padding: 20px;
    }

    .page-title {
        font-size: 32px;
    }

    .filter-bar {
        flex-direction: column;
        gap: 15px;
    }

    .search-input {
        width: 100%;
    }

    /* 调整卡片内容在移动端的紧凑度 */
    .article-cover,
    .project-header {
        height: 140px;
    }

    .home-theme-toggler {
        bottom: 20px;
        left: 20px;
    }
}
</style>