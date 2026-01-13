<!--
 * @Author: Bohemian-hub dongshangwl@gmail.com
 * @Date: 2025-08-30 14:41:08
 * @LastEditors: Bohemian-hub dongshangwl@gmail.com
 * @LastEditTime: 2025-10-06 11:27:49
 * @FilePath: \personalBlog\PersonalBlogWeb\src\views\Research.vue
 * @Description: 
-->
<template>
    <TopBar />
    <!-- 添加主题切换按钮 -->
    <ThemeToggler class="home-theme-toggler" />
    <div class="page-wrapper" :class="currentTheme">
        <div class="page-content">
            <!-- 使用封装的页面标题组件 -->
            <PageHeader title="我的文章" description="分享科研心得、学术观点与专业探索" icon="📚" /> <!-- 主体内容区 - 两列布局 -->
            <div class="content-layout">
                <!-- 左侧主内容区 -->
                <div class="main-column">
                    <!-- 文章列表区域 -->
                    <section class="articles-section section-container">
                        <h2 class="section-title">
                            <el-icon>
                                <Document />
                            </el-icon>
                            记录自己的成就之路
                        </h2>
                        <div class="articles-container">
                            <div class="article-card" v-for="article in articles" :key="article.id"
                                @click="goToArticle(article.id)" style="cursor: pointer;">
                                <!-- 左侧：文章封面图 -->
                                <div class="article-cover">
                                    <img :src="article.coverImg" :alt="article.title" />
                                </div> <!-- 中间：文章主要信息 -->
                                <div class="article-middle-content">
                                    <h3 class="article-title">
                                        <span class="article-category-tag">
                                            {{ article.category }}
                                        </span>
                                        {{ article.title }}
                                    </h3>
                                    <p class="article-excerpt">{{ article.excerpt }}...</p>
                                </div> <!-- 右侧：时间和操作 -->
                                <div class="article-right-content">
                                    <span class="article-date">{{ article.date }}</span>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getArticles } from '../api/article'
import { baseUrl } from '@/common/config'
import {
    Document, Search
} from '@element-plus/icons-vue'
import TopBar from '../components/TopBar.vue'
import Footer from '../components/Footer.vue'
import ThemeToggler from '../components/ThemeToggler.vue'
import PageHeader from '../components/PageHeader.vue'
import { currentTheme } from '../stores/themeStore'
const router = useRouter()
// 创建一个响应式变量来控制TopBar的显示和隐藏
const showTopBar = ref(true)// 处理滚动事件的函数
const handleScroll = () => {
    // 当滚动位置为0（页面顶部）时显示TopBar，否则隐藏
    showTopBar.value = window.scrollY <= 400
}// 组件挂载时添加滚动事件监听
onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    // 初始化状态
    handleScroll()
    loadArticles()
})// 组件卸载时移除事件监听，防止内存泄漏
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
// 文章列表数据
const articles = ref([])

// 分页数据
const paginationData = ref({
    currentPage: 1,
    pageSize: 10,
    total: 0
})


const loadArticles = async () => {
    try {
        const res = await getArticles({
            page: paginationData.value.currentPage,
            page_size: paginationData.value.pageSize,
            status: 'published',
            category: 'article'
        });
        if (res && res.items) {
            articles.value = res.items.map(item => ({
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
</script>
<style scoped>
/* 主题变量定义 */
.page-wrapper.dark {
    --bg-primary: rgba(25, 25, 35, 0.2);
    --bg-secondary: rgba(30, 30, 40, 0.3);
    --bg-tertiary: rgba(96, 96, 106, 0.3);
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
    /* background-color: var(--bg-overlay); */
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
    content: '';
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

/* 内容容器样式更新为与Index页面一致 */
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

/* 文章列表 */
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
    display: flex;
    flex-direction: column;
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
    display: flex;
    flex-direction: row;
    height: 70px;
    border: 1px solid var(--card-border);
}

.article-card:hover {
    transform: var(--card-hover-transform);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* 封面图 */
.article-cover {
    width: 100px;
    height: 100%;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
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
    color: rgba(58, 123, 213, 0.9);
    padding-right: 6px;
    margin-right: 6px;
    border-right: #3a7bd5 1px solid;
    display: inline-block;
    font-size: 16px;
    font-weight: 900;
}

/* 中间内容 */
.article-middle-content {
    flex: 1;
    padding: 0 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 1px dashed var(--timeline-line);
    min-width: 0;
}

.article-title {
    font-size: 16px;
    margin-bottom: 5px;
    line-height: title-shadow;
    font-weight: 600;
    color: var(--heading-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.article-excerpt {
    font-size: 0.8rem;
    line-height: 1.4;
    color: var(--text-secondary);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 0;
}

/* 右侧内容 */
.article-right-content {
    width: 160px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0;
    flex-shrink: 0;
    background-color: rgba(0, 0, 0, 0.02);
}

.article-date {
    font-size: 0.9rem;
    color: var(--text-muted);
}

.pagination-container {
    margin-top: 30px;
    display: flex;
    justify-content: center;
}

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

    /* 移动端布局调整 */
    .mobile-first {
        display: block;
        margin-bottom: 24px;
    }

    .desktop-only {
        display: none;
    }

    /* 确保移动端各板块之间有足够间距 */
    .section-container {
        margin-bottom: 35px;
        /* 增加板块间距 */
        padding: 20px;
        /* 减小内边距使卡片更紧凑 */
    }

    .page-title {
        font-size: 32px;
    }

    .article-card {
        flex-direction: column;
        height: auto;
    }

    .article-cover {
        width: 100%;
        height: 160px;
    }

    .article-middle-content {
        border-right: none;
        border-bottom: 1px dashed var(--timeline-line);
    }

    .article-right-content {
        width: 100%;
        padding: 15px;
        flex-direction: row;
        justify-content: space-between;
    }

    .home-theme-toggler {
        bottom: 20px;
        left: 20px;
    }
}
</style>
