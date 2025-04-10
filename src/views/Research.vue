<template>
    <TopBar />
    <!-- 添加主题切换按钮 -->
    <ThemeToggler class="home-theme-toggler" />
    <div class="page-wrapper" :class="currentTheme">
        <div class="page-content">
            <!-- 页面标题区 -->
            <header class="page-header">
                <h1 class="page-title">学术札记</h1>
                <p class="description">分享科研心得、学术观点与专业探索</p>
                <div class="divider">
                    <span class="divider-icon">📚</span>
                </div>

            </header>

            <!-- 主体内容区 - 两列布局 -->
            <div class="content-layout">
                <!-- 左侧主内容区 -->
                <div class="main-column">
                    <!-- 在移动设备上会显示在最上方的个人资料卡片 -->
                    <div class="profile-card side-card mobile-first">
                        <div class="profile-header">
                            <div class="profile-avatar">
                                <el-avatar :size="70" :src="profileData.avatarUrl" />
                            </div>
                            <div class="profile-info">
                                <h3>{{ profileData.name }}</h3>
                                <p>{{ profileData.title }}</p>
                            </div>
                        </div>
                        <div class="profile-stats">
                            <div class="stat-item" v-for="(stat, index) in profileData.stats" :key="index">
                                <span class="stat-value">{{ stat.value }}</span>
                                <span class="stat-label">{{ stat.label }}</span>
                            </div>
                        </div>
                        <div class="profile-links">
                            <a :href="profileData.scholarLink" class="scholar-link">
                                <el-icon>
                                    <Link />
                                </el-icon>
                                Google Scholar
                            </a>
                            <a :href="profileData.orcidLink" class="orcid-link">
                                <el-icon>
                                    <Connection />
                                </el-icon>
                                ORCID
                            </a>
                        </div>
                    </div>

                    <!-- 文章列表区域 -->
                    <section class="articles-section section-container">
                        <h2 class="section-title">
                            <el-icon>
                                <Document />
                            </el-icon>
                            学术分享
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
                            <div class="article-card" v-for="article in articles" :key="article.id">
                                <!-- 添加文章封面图 -->
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

                    <!-- 领域前沿论文 (从右侧移到左侧) -->
                    <section class="paper-recommendations-main section-container">
                        <h2 class="section-title">
                            <el-icon>
                                <Reading />
                            </el-icon>
                            领域前沿论文
                        </h2>
                        <div class="paper-grid">
                            <div class="frontier-paper-card" v-for="paper in frontierPapers" :key="paper.id">
                                <div class="paper-cover">
                                    <img :src="paper.coverImg" :alt="paper.title" />
                                    <div class="journal-badge">{{ paper.journal }}</div>
                                </div>
                                <div class="paper-content">
                                    <h3>{{ paper.title }}</h3>
                                    <p class="paper-authors">{{ paper.authors }}</p>
                                    <p class="paper-brief">{{ paper.brief }}</p>
                                    <div class="paper-tags">
                                        <el-tag size="small" :type="tag.type" v-for="tag in paper.tags" :key="tag.name">
                                            {{ tag.name }}
                                        </el-tag>
                                    </div>
                                    <el-button link type="primary" class="paper-link-btn">
                                        查看论文详情
                                        <el-icon>
                                            <ArrowRight />
                                        </el-icon>
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- 学术资源导航区 -->
                    <section class="academic-resources-compact section-container">
                        <h2 class="section-title">
                            <el-icon>
                                <Collection />
                            </el-icon>
                            学术资源导航
                        </h2>
                        <div class="resources-grid">
                            <div class="resource-card" v-for="resource in academicResources" :key="resource.id">
                                <el-icon class="resource-icon">
                                    <component :is="resource.icon" />
                                </el-icon>
                                <div class="resource-content">
                                    <h4>{{ resource.title }}</h4>
                                    <p>{{ resource.description }}</p>
                                </div>
                                <el-button link type="primary" :href="resource.link">
                                    <el-icon>
                                        <ArrowRight />
                                    </el-icon>
                                </el-button>
                            </div>
                        </div>
                    </section>
                </div>

                <!-- 右侧边栏 -->
                <div class="side-column">
                    <!-- 个人学术资料卡片 - 桌面版 -->
                    <div class="profile-card side-card desktop-only">
                        <div class="profile-header">
                            <div class="profile-avatar">
                                <el-avatar :size="70" :src="profileData.avatarUrl" />
                            </div>
                            <div class="profile-info">
                                <h3>{{ profileData.name }}</h3>
                                <p>{{ profileData.title }}</p>
                            </div>
                        </div>
                        <div class="profile-stats">
                            <div class="stat-item" v-for="(stat, index) in profileData.stats" :key="index">
                                <span class="stat-value">{{ stat.value }}</span>
                                <span class="stat-label">{{ stat.label }}</span>
                            </div>
                        </div>
                        <div class="profile-links">
                            <a :href="profileData.scholarLink" class="scholar-link">
                                <el-icon>
                                    <Link />
                                </el-icon>
                                Google Scholar
                            </a>
                            <a :href="profileData.orcidLink" class="orcid-link">
                                <el-icon>
                                    <Connection />
                                </el-icon>
                                ORCID
                            </a>
                        </div>
                    </div>

                    <!-- 研究时间轴 - 改为更紧凑的侧边栏版本 -->
                    <section class="research-timeline-compact side-card">
                        <h3 class="side-card-title">
                            <el-icon>
                                <Calendar />
                            </el-icon>
                            研究时间轴
                        </h3>
                        <ul class="timeline-compact">
                            <li class="timeline-item" v-for="item in researchTimeline" :key="item.id">
                                <div class="timeline-dot"></div>
                                <div class="timeline-date" v-if="item.date">{{ item.date }}</div>
                                <div class="timeline-content">
                                    <h4 v-if="item.title">{{ item.title }}</h4>
                                    <p v-if="item.description">{{ item.description }}</p>
                                    <div class="timeline-tags" v-if="item.tags && item.tags.length">
                                        <el-tag size="small" :type="tag.type" v-for="tag in item.tags" :key="tag.name">
                                            {{ tag.name }}
                                        </el-tag>
                                    </div>
                                    <el-button v-if="item.isButton" text type="primary" size="small">{{ item.buttonText
                                        }}</el-button>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <!-- 我的论文卡片 -->
                    <div class="my-papers side-card">
                        <h3 class="side-card-title">
                            <el-icon>
                                <Collection />
                            </el-icon>
                            我的论文
                        </h3>
                        <ul class="paper-list">
                            <li class="paper-item" v-for="paper in myPapers" :key="paper.id">
                                <div class="paper-title">{{ paper.title }}</div>
                                <div class="paper-journal">{{ paper.journal }}</div>
                                <div class="paper-citations">引用: {{ paper.citations }}次</div>
                            </li>
                        </ul>
                        <el-button link type="primary" class="view-all-btn">查看全部论文</el-button>
                    </div>

                    <!-- 学术工具推荐 -->
                    <div class="academic-tools side-card">
                        <h3 class="side-card-title">
                            <el-icon>
                                <Tools />
                            </el-icon>
                            学术工具推荐
                        </h3>
                        <ul class="tool-list">
                            <li class="tool-item" v-for="tool in academicTools" :key="tool.id">
                                <el-icon>
                                    <component :is="tool.icon" />
                                </el-icon>
                                <div class="tool-info">
                                    <div class="tool-name">{{ tool.name }}</div>
                                    <div class="tool-desc">{{ tool.description }}</div>
                                </div>
                                <el-button link type="primary" :href="tool.link">
                                    <el-icon>
                                        <Link />
                                    </el-icon>
                                </el-button>
                            </li>
                        </ul>
                    </div>

                    <!-- 学术会议日历 -->
                    <div class="conference-calendar side-card">
                        <h3 class="side-card-title">
                            <el-icon>
                                <Calendar />
                            </el-icon>
                            学术会议日历
                        </h3>
                        <ul class="conference-list">
                            <li class="conference-item" v-for="conference in conferences" :key="conference.id">
                                <div class="conference-date">{{ conference.date }}</div>
                                <div class="conference-info">
                                    <div class="conference-name">{{ conference.name }}</div>
                                    <div class="conference-location">{{ conference.location }}</div>
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
import { ref, onMounted, onUnmounted } from 'vue'
import {
    Document, Calendar, ArrowRight, Search, Link,
    Collection, Tools, Reading, ChatDotRound, Connection,
    Edit, Operation, School, VideoPlay, Notebook, Platform,
    Timer
} from '@element-plus/icons-vue'
import TopBar from '../components/TopBar.vue'
import bg7Url from '@/assets/images/bg7.png'
import Footer from '../components/Footer.vue'
import ThemeToggler from '../components/ThemeToggler.vue'
import { currentTheme } from '../stores/themeStore'

// 背景图片
const bgUrl = bg7Url

// 创建一个响应式变量来控制TopBar的显示和隐藏
const showTopBar = ref(true)
const articleFilter = ref('all')
const searchQuery = ref('')

// 处理滚动事件的函数
const handleScroll = () => {
    // 当滚动位置为0（页面顶部）时显示TopBar，否则隐藏
    showTopBar.value = window.scrollY <= 400
}

// 组件挂载时添加滚动事件监听
onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    // 初始化状态
    handleScroll()
})

// 组件卸载时移除事件监听，防止内存泄漏
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

// 个人资料数据
const profileData = ref({
    name: '何东',
    title: '人工智能与社会伦理研究者',
    avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    stats: [
        { value: 12, label: '发表论文' },
        { value: 4, label: '研究项目' },
        { value: 320, label: '引用次数' }
    ],
    scholarLink: '#',
    orcidLink: '#'
})

// 文章过滤选项
const articleFilters = [
    { value: 'all', label: '全部文章' },
    { value: 'ai', label: '人工智能' },
    { value: 'ethics', label: '科技伦理' },
    { value: 'education', label: '教育科技' }
]

// 文章列表数据
const articles = ref([
    {
        id: 1,
        title: '大规模语言模型的认知偏差研究',
        excerpt: '这篇研究探讨了人工智能模型在处理复杂信息时的认知局限性与可能的优化方向',
        date: '2024年1月15日',
        coverImg: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
        category: '人工智能',
        readTime: 6
    },
    {
        id: 2,
        title: '数字化转型中的伦理边界探讨',
        excerpt: '这篇研究探讨了数字化转型过程中的伦理挑战和可能的解决框架',
        date: '2024年2月20日',
        coverImg: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
        category: '科技伦理',
        readTime: 7
    },
    {
        id: 3,
        title: '人工智能辅助教学系统设计与实现',
        excerpt: '这篇研究探讨了如何设计更智能、更人性化的教学辅助系统',
        date: '2024年3月5日',
        coverImg: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
        category: '教育科技',
        readTime: 8
    },
    {
        id: 4,
        title: '深度学习在文本分析中的最新进展',
        excerpt: '这篇研究探讨了深度学习技术在文本分析领域的突破性应用',
        date: '2024年4月10日',
        coverImg: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
        category: '人工智能',
        readTime: 9
    },
    {
        id: 5,
        title: '科技伦理教育的理论框架与实践路径',
        excerpt: '这篇研究探讨了科技伦理教育的核心问题与创新教学方法',
        date: '2024年5月18日',
        coverImg: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
        category: '科技伦理',
        readTime: 10
    },
    {
        id: 6,
        title: '教育场景中的人机协作模式研究',
        excerpt: '这篇研究探讨了人机协作在教育场景中的新模式与效果评估',
        date: '2024年6月22日',
        coverImg: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
        category: '教育科技',
        readTime: 11
    }
])

// 分页数据
const paginationData = ref({
    total: 50,
    pageSize: 6
})

// 前沿论文数据
const frontierPapers = ref([
    {
        id: 1,
        title: 'Advances in Neural Information Processing Systems',
        authors: 'Zhang et al. (2024)',
        brief: '提出了一种新的transformer架构，在多模态任务中取得突破性进展',
        coverImg: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
        journal: 'NeurIPS',
        tags: [
            { name: '深度学习', type: '' },
            { name: '多模态', type: 'info' }
        ]
    },
    {
        id: 2,
        title: 'Ethics of Artificial Intelligence in Education',
        authors: 'Johnson & Williams (2024)',
        brief: '系统性分析了AI教育应用中的伦理问题与监管框架',
        coverImg: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
        journal: 'Nature',
        tags: [
            { name: '教育科技', type: 'success' },
            { name: '伦理学', type: 'info' }
        ]
    },
    {
        id: 3,
        title: 'Causal Inference in Natural Language Processing',
        authors: 'Li et al. (2023)',
        brief: '探索因果推断在自然语言处理中的新方法与应用',
        coverImg: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
        journal: 'Science',
        tags: [
            { name: 'NLP', type: 'warning' },
            { name: '因果推断', type: 'danger' }
        ]
    }
])

// 学术资源导航数据
const academicResources = ref([
    {
        id: 1,
        title: '开放获取期刊',
        description: '发现高质量的开放获取学术资源',
        icon: 'School',
        link: '#'
    },
    {
        id: 2,
        title: '学术讲座视频',
        description: '来自顶尖大学和研究机构的公开课',
        icon: 'VideoPlay',
        link: '#'
    },
    {
        id: 3,
        title: '研究方法指南',
        description: '学术研究方法论与实践技巧',
        icon: 'Notebook',
        link: '#'
    },
    {
        id: 4,
        title: '数据集平台',
        description: '开放科学研究数据集收集',
        icon: 'Platform',
        link: '#'
    }
])

// 研究时间轴数据
const researchTimeline = ref([
    {
        id: 1,
        date: '2024年4月',
        title: '论文《人工智能与社会影响》发表',
        description: '在《科技与社会》期刊发表研究成果',
        tags: [
            { name: '人工智能', type: '' },
            { name: '社会科学', type: 'success' }
        ]
    },
    {
        id: 2,
        date: '2024年2月',
        title: '参加亚太地区科技伦理国际会议',
        description: '发表演讲《大模型时代的伦理挑战与对策》',
        tags: [
            { name: '会议', type: 'warning' }
        ]
    },
    {
        id: 3,
        date: '2023年11月',
        title: '启动新研究项目',
        description: '《人工智能在教育领域的应用研究》项目获批'
    },
    {
        id: 4,
        isButton: true,
        buttonText: '查看更多历史研究...'
    }
])

// 我的论文数据
const myPapers = ref([
    {
        id: 1,
        title: '人工智能与社会影响: 一项实证研究',
        journal: '《科技与社会》, 2024',
        citations: 37
    },
    {
        id: 2,
        title: '大语言模型在教育领域的应用与伦理考量',
        journal: '《教育技术》, 2023',
        citations: 42
    },
    {
        id: 3,
        title: '数字化转型与隐私保护的平衡策略',
        journal: '《信息安全研究》, 2023',
        citations: 28
    }
])

// 学术工具推荐数据
const academicTools = ref([
    {
        id: 1,
        name: 'Zotero',
        description: '开源文献管理工具',
        icon: 'Edit',
        link: '#'
    },
    {
        id: 2,
        name: 'Semantic Scholar',
        description: 'AI驱动的学术搜索引擎',
        icon: 'Search',
        link: '#'
    },
    {
        id: 3,
        name: 'Overleaf',
        description: '在线LaTeX协作编辑',
        icon: 'ChatDotRound',
        link: '#'
    },
    {
        id: 4,
        name: 'Connected Papers',
        description: '论文关联可视化工具',
        icon: 'Operation',
        link: '#'
    }
])

// 学术会议日历数据
const conferences = ref([
    {
        id: 1,
        date: '6月15-18日',
        name: 'ICML 2024',
        location: '维也纳，奥地利'
    },
    {
        id: 2,
        date: '7月8-12日',
        name: 'ACL 2024',
        location: '曼谷，泰国'
    },
    {
        id: 3,
        date: '9月20-24日',
        name: 'IJCAI 2024',
        location: '巴塞罗那，西班牙'
    }
])
</script>

<style scoped>
/* 主题变量定义 */
.page-wrapper.dark {
    --bg-overlay: rgba(20, 20, 30, 0.7);
    --text-color: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.8);
    --title-gradient: linear-gradient(45deg, #ffffff, #b8c6db);
    --title-shadow: 0 2px 4px rgba(216, 216, 216, 0.5);
    --divider-color: rgba(255, 255, 255, 0.5);
    --card-bg: rgba(40, 40, 50, 0.85);
    --card-bg-hover: rgba(50, 50, 65, 0.9);
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
    --bg-overlay: rgba(245, 245, 250, 0.6);
    --text-color: #333333;
    --text-secondary: rgba(0, 0, 0, 0.7);
    --title-gradient: linear-gradient(45deg, #333333, #555555);
    --title-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    --divider-color: rgba(0, 0, 0, 0.2);
    --card-bg: rgba(255, 255, 255, 0.9);
    --card-bg-hover: rgba(255, 255, 255, 1);
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
    filter: brightness(0.4) saturate(0.8);
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
    background-color: var(--bg-overlay);
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

/* 移动端显示隐藏控制 */
.mobile-first {
    display: none;
}

.desktop-only {
    display: block;
}

/* 内容容器样式更新为浅色半透明 */
.section-container {
    background-color: var(--card-bg);
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
    background-color: var(--card-bg-hover);
    transform: var(--card-hover-transform);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.section-title {
    font-size: 22px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--card-border);
    color: var(--heading-color);
}

.section-title .el-icon {
    color: var(--accent-color);
}

/* 文章列表 */
.filter-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    align-items: center;
}

.search-input {
    width: 220px;
}

.articles-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    /* 调整为更小的尺寸，确保一行显示3个 */
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

/* 添加文章封面图样式 */
.article-cover {
    height: 160px;
    /* 减小高度从180px到160px */
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
    /* 减小内边距从20px到15px */
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    color: var(--text-color);
}

.article-meta-top {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 8px;
    /* 减小下边距 */
    font-size: 0.8rem;
    /* 减小字体大小 */
    color: var(--text-muted);
}

.article-title {
    font-size: 16px;
    /* 减小字体大小从18px到16px */
    margin-bottom: 8px;
    /* 减小下边距 */
    line-height: 1.4;
    font-weight: 600;
    color: var(--heading-color);
}

.article-excerpt {
    font-size: 0.85rem;
    /* 减小字体大小 */
    line-height: 1.5;
    margin-bottom: 15px;
    /* 减小下边距 */
    color: var(--text-secondary);
    flex-grow: 1;
}

.article-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    /* 减小上内边距 */
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

/* 前沿论文区块样式 */
.paper-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    /* 与文章卡片保持一致 */
    gap: 20px;
}

.frontier-paper-card {
    background-color: var(--card-bg);
    border-radius: 10px;
    /* 减小圆角 */
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: var(--card-shadow);
    height: 100%;
    border: 1px solid var(--card-border);
}

.frontier-paper-card:hover {
    transform: var(--card-hover-transform);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.paper-cover {
    height: 140px;
    /* 减小高度从160px到140px */
    position: relative;
    overflow: hidden;
}

.paper-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.frontier-paper-card:hover .paper-cover img {
    transform: scale(1.05);
}

.journal-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: rgba(0, 0, 0, 0.75);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
}

.paper-content {
    padding: 15px;
    /* 减小内边距从20px到15px */
    color: var(--text-color);
}

.paper-content h3 {
    font-size: 16px;
    /* 减小字体大小 */
    margin: 0 0 6px 0;
    /* 减小下边距 */
    line-height: 1.4;
    color: var(--heading-color);
    font-weight: 600;
}

.paper-authors {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin: 0 0 8px 0;
    font-style: italic;
}

.paper-brief {
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0 0 15px 0;
    color: var(--text-secondary);
}

.paper-tags {
    display: flex;
    gap: 6px;
    margin-bottom: 16px;
    flex-wrap: wrap;
}

.paper-tags .el-tag {
    background-color: var(--tag-bg);
    color: var(--tag-text);
    border: none;
    margin: 0 3px 3px 0;
}

.paper-link-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    justify-content: flex-end;
    width: 100%;
    margin-top: 10px;
}

/* 学术资源区 - 紧凑版 */
.academic-resources-compact .resources-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}

.academic-resources-compact .resource-card {
    background-color: var(--card-bg);
    border-radius: 10px;
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 15px;
    transition: all 0.3s;
    box-shadow: var(--card-shadow);
    border: 1px solid var(--card-border);
}

.academic-resources-compact .resource-card:hover {
    background-color: var(--card-bg-hover);
    transform: var(--card-hover-transform);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.academic-resources-compact .resource-icon {
    font-size: 24px;
    color: var(--accent-color);
    flex-shrink: 0;
    background: rgba(58, 123, 213, 0.1);
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
}

.academic-resources-compact .resource-content {
    flex: 1;
}

.academic-resources-compact h4 {
    margin: 0 0 5px 0;
    font-size: 16px;
    color: var(--heading-color);
}

.academic-resources-compact p {
    margin: 0;
    font-size: 0.8rem;
    color: var(--text-secondary);
}

/* 侧边栏卡片 */
.side-card {
    background-color: var(--card-bg);
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
    background-color: var(--card-bg-hover);
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

/* 个人资料卡片 */
.profile-card {
    border-top: 4px solid #3a7bd5;
}

.profile-header {
    display: flex;
    align-items: center;
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

.profile-stats {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-top: 1px solid var(--card-border);
    border-bottom: 1px solid var(--card-border);
    margin-bottom: 15px;
}

.stat-item {
    text-align: center;
}

.stat-value {
    display: block;
    font-size: 20px;
    font-weight: 600;
    color: #3a7bd5;
}

.stat-label {
    font-size: 0.8rem;
    color: var(--text-muted);
}

.profile-links {
    display: flex;
    gap: 15px;
}

.profile-links a {
    display: flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    color: var(--text-secondary);
    font-size: 0.9rem;
    transition: all 0.2s;
}

.profile-links a:hover {
    color: var(--accent-color);
}

/* 自定义紧凑型时间轴 */
.timeline-compact {
    list-style: none;
    padding: 0;
    margin: 0;
    position: relative;
}

.timeline-compact::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 10px;
    width: 2px;
    background: var(--timeline-line);
}

.timeline-item {
    position: relative;
    padding-left: 30px;
    padding-bottom: 20px;
}

.timeline-item:last-child {
    padding-bottom: 0;
}

.timeline-dot {
    position: absolute;
    left: 6px;
    top: 5px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--timeline-dot);
    box-shadow: 0 0 5px rgba(58, 123, 213, 0.3);
}

.timeline-date {
    font-size: 0.85rem;
    color: var(--accent-color);
    font-weight: 500;
    margin-bottom: 4px;
}

.timeline-content h4 {
    margin: 0 0 6px 0;
    font-size: 1rem;
    color: var(--heading-color);
}

.timeline-content p {
    margin: 0 0 8px 0;
    font-size: 0.85rem;
    color: var(--text-secondary);
}

.timeline-tags {
    margin-top: 6px;
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
}

/* 论文列表 */
.paper-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.paper-item {
    padding: 12px 0;
    border-bottom: 1px solid var(--card-border);
}

.paper-item:last-child {
    border-bottom: none;
}

.paper-title {
    font-size: 0.95rem;
    margin-bottom: 5px;
    font-weight: 500;
    color: var(--heading-color);
}

.paper-journal {
    font-size: 0.85rem;
    margin-bottom: 5px;
    font-style: italic;
    color: var(--text-secondary);
}

.paper-citations {
    font-size: 0.8rem;
    color: #3a7bd5;
}

.view-all-btn {
    display: block;
    margin: 10px auto 0;
    text-align: center;
    color: #3a7bd5;
}

/* 工具列表 */
.tool-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.tool-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid var(--card-border);
}

.tool-item:last-child {
    border-bottom: none;
}

.tool-item .el-icon {
    font-size: 20px;
    margin-right: 12px;
    color: var(--accent-color);
}

.tool-info {
    flex: 1;
}

.tool-name {
    font-weight: 500;
    margin-bottom: 3px;
    color: var(--heading-color);
}

.tool-desc {
    font-size: 0.85rem;
    color: var(--text-secondary);
}

/* 学术会议 */
.conference-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.conference-item {
    display: flex;
    padding: 12px 0;
    border-bottom: 1px solid var(--card-border);
}

.conference-item:last-child {
    border-bottom: none;
}

.conference-date {
    min-width: 90px;
    font-weight: 500;
    color: #3a7bd5;
}

.conference-name {
    font-weight: 500;
    margin-bottom: 3px;
    color: var(--heading-color);
}

.conference-location {
    font-size: 0.85rem;
    color: var(--text-secondary);
}

/* 响应式设计 */
@media (max-width: 1200px) {
    .content-layout {
        flex-direction: column;
    }

    .side-column {
        width: 100%;
    }

    .academic-resources-compact .resources-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    /* 在中等屏幕上显示双列侧边内容 */
    .side-column {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
    }

    .side-column>div {
        margin-bottom: 0;
    }

    /* 占据整行的元素 */
    .side-column .profile-card {
        grid-column: span 2;
    }
}

@media (max-width: 768px) {
    .page-content {
        padding: 60px 20px 20px;
    }

    /* 移动端布局调整 */
    .mobile-first {
        display: block;
        margin-bottom: 24px;
    }

    .desktop-only {
        display: none;
    }

    /* 单列布局 */
    .side-column {
        display: block;
    }

    /* 移动端侧栏卡片间距 */
    .side-column .side-card {
        margin-bottom: 35px;
        /* 增加移动端侧栏卡片之间的间距 */
    }

    .articles-container,
    .paper-grid {
        grid-template-columns: 1fr;
        gap: 16px;
        /* 减小卡片间的间隙 */
    }

    /* 确保移动端各板块之间有足够间距 */
    .section-container {
        margin-bottom: 35px;
        /* 增加板块间距 */
        padding: 20px;
        /* 减小内边距使卡片更紧凑 */
    }

    /* 使资源导航区更紧凑 */
    .academic-resources-compact .resources-grid {
        grid-template-columns: 1fr;
        gap: 12px;
        /* 减小间距 */
    }

    .academic-resources-compact .resource-card {
        padding: 12px;
        /* 减小内边距 */
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
    .paper-cover {
        height: 140px;
        /* 统一移动端封面图高度 */
    }

    .article-content,
    .paper-content {
        padding: 12px;
        /* 减小内边距 */
    }

    .home-theme-toggler {
        bottom: 20px;
        left: 20px;
    }

}
</style>