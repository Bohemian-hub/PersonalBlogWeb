<template>
    <TopBar />
    <!-- 添加主题切换按钮 -->
    <ThemeToggler class="home-theme-toggler" />
    <div class="page-wrapper" :class="currentTheme">
        <div class="page-content">
            <!-- 使用封装的页面标题组件 -->
            <PageHeader title="我的项目" description="展示个人项目、技术积累与开发心得" icon="🛠️" /> <!-- 主体内容区 - 两列布局 -->
            <div class="content-layout">
                <!-- 左侧主内容区 -->
                <div class="main-column">
                    <!-- 技术文章展示 -->
                    <section class="tech-articles-section section-container">
                        <h2 class="section-title">
                            <el-icon>
                                <Document />
                            </el-icon>
                            谁还没点事做了
                        </h2>
                        <div class="articles-container">
                            <div class="article-card" v-for="article in techArticles" :key="article.id"
                                @click="goToArticle(article.id)" style="cursor: pointer;">
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
                            <el-pagination 
                                background 
                                layout="prev, pager, next" 
                                :total="paginationData.total"
                                :page-size="paginationData.pageSize"
                                v-model:current-page="paginationData.currentPage"
                                @current-change="handlePageChange"
                            />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
    <!-- 底部版权和备案信息 -->
    <Footer />
    <div class="global-bg"></div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getArticles } from '../api/article'
import { baseUrl } from '@/common/config'
import {
    Document, ArrowRight, Timer
} from '@element-plus/icons-vue'
import TopBar from '../components/TopBar.vue'
import Footer from '../components/Footer.vue'
import ThemeToggler from '../components/ThemeToggler.vue'
import PageHeader from '../components/PageHeader.vue'
import { currentTheme } from '../stores/themeStore'// 分页数据
const paginationData = ref({
    currentPage: 1,
    total: 0,
    pageSize: 10
})
// 个人技术资料 (已删除)
const router = useRouter()

// 技术文章
const techArticles = ref([])

const loadArticles = async () => {
    try {
        const res = await getArticles({
            page: paginationData.value.currentPage,
            page_size: paginationData.value.pageSize,
            status: 'published',
            category: 'studio'
        });
        if (res && res.items) {
            techArticles.value = res.items.map(item => ({
                id: item.id,
                title: item.title,
                excerpt: item.summary,
                date: item.created_at,
                coverImg: item.cover_image_url ? baseUrl + item.cover_image_url : '',
                category: item.category,
                readTime: Math.ceil((item.summary?.length || 100) / 300) + 1
            }));
            paginationData.value.total = res.total;
        }
    } catch (e) {
        console.error("加载文章列表失败", e);
    }
}

// 处理页码变更
const handlePageChange = (val) => {
    paginationData.value.currentPage = val
    loadArticles()
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

const goToArticle = (id) => {
    router.push(`/article/${id}`);
}

onMounted(() => {
    loadArticles()
})

const techArticles_unused = ref([
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
</script>
<style scoped>
/* 主题变量定义 */
.page-wrapper.dark {
    --bg-primary: rgba(25, 25, 35, 0.2);
    --bg-secondary: rgba(30, 30, 40, 0.3);
    --bg-tertiary: rgba(40, 40, 55, 0.3);
    --text-color: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.8);
    --title-gradient: linear-gradient(45deg, #ffffff, #b8c6db);
    --title-shadow: 0 2px 4px rgba(216, 216, 216, 0.5);
    --divider-color: rgba(255, 255, 255, 0.5);
    --card-bg: rgba(30, 30, 40, 0.4);
    --card-bg-hover: rgba(40, 40, 55, 0.6);
    --card-border: rgba(255, 255, 255, 0.5);
    --card-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    --accent-color: #5a9eff;
    --accent-secondary: #4a90e2;
    --heading-color: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.6);
    --tag-bg: rgba(255, 255, 255, 0.15);
    --tag-text: #ffffff;
    --card-hover-transform: translateY(-4px);
    --timeline-line: rgba(255, 255, 255, 0.2);
    --timeline-dot: #5a9eff;
    --button-bg: #4a90e2;
    --button-text: white;
    --button-border: rgba(255, 255, 255, 0.5);
    --button-hover-bg: #3a7bd5;
}

.page-wrapper.light {
    --bg-primary: rgba(255, 255, 255, 0.3);
    --bg-secondary: rgba(255, 255, 255, 0.4);
    --bg-tertiary: rgba(235, 235, 245, 0.3);
    --text-color: #333333;
    --text-secondary: rgba(0, 0, 0, 0.7);
    --title-gradient: linear-gradient(45deg, #333333, #555555);
    --title-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    --divider-color: rgba(0, 0, 0, 0.2);
    --card-bg: rgba(255, 255, 255, 0.4);
    --card-bg-hover: rgba(255, 255, 255, 0.6);
    --card-border: rgba(255, 255, 255, 0.8);
    --card-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
    --accent-color: #3a7bd5;
    --accent-secondary: #3a7bd5;
    --heading-color: #333333;
    --text-muted: rgba(0, 0, 0, 0.5);
    --tag-bg: rgba(255, 255, 255, 0.5);
    --tag-text: #333333;
    --card-hover-transform: translateY(-3px);
    --timeline-line: rgba(0, 0, 0, 0.1);
    --timeline-dot: #3a7bd5;
    --button-bg: #4a90e2;
    --button-text: white;
    --button-border: rgba(255, 255, 255, 0.6);
    --button-hover-bg: #3a7bd5;
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
/* 开发工具推荐区 */
/* 侧边栏卡片样式 */
/* 个人技术名片 */
/* 技术栈样式 */
/* 学习中模块 */
/* 博客推荐列表 */
/* 响应式设计 */
@media (max-width: 1200px) {
    .content-layout {
        flex-direction: column;
    }
}

@media (max-width: 768px) {
    .page-content {
        padding: 60px 20px 20px;
    }

    .articles-container {
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

    /* 调整卡片内容在移动端的紧凑度 */
    .article-cover {
        height: 140px;
    }

    .home-theme-toggler {
        bottom: 20px;
        left: 20px;
    }
}
</style>