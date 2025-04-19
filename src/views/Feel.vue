<template>
    <TopBar />
    <!-- 添加主题切换按钮 -->
    <ThemeToggler class="home-theme-toggler" />
    <div class="page-wrapper" :class="currentTheme">
        <div class="page-content">
            <!-- 使用封装的页面标题组件 -->
            <PageHeader title="认知轨迹" description="生活思考与心灵沉淀的分享空间" icon="🧠" />

            <!-- 内容布局区 -->
            <div class="content-layout">
                <!-- 主内容区 -->
                <div class="main-column">
                    <!-- 置顶思考 -->
                    <section class="featured-thought section-container">
                        <div class="featured-content">
                            <div class="featured-meta">
                                <div class="featured-label">
                                    <el-icon>
                                        <Star />
                                    </el-icon>
                                    置顶思考
                                </div>
                                <div class="featured-date">2024年4月20日</div>
                            </div>
                            <h2 class="featured-title">关于持续学习的思考</h2>
                            <div class="featured-body">
                                <p>在这个急速变化的世界里，终身学习不再是一种选择，而是一种必需。每个人都应该培养对未知的好奇心，保持开放的心态去接触新事物。</p>
                                <p>我认为，真正的学习不仅是获取知识，更是一种思维方式的养成。它帮助我们在复杂的世界中保持清晰的思考，在不确定性中找到确定的方向。</p>
                                <div class="featured-quote">
                                    "活到老，学到老"不仅是一句古训，也是面对未来最实用的生存策略。
                                </div>
                            </div>
                            <div class="featured-tags">
                                <el-tag size="small" type="success">学习</el-tag>
                                <el-tag size="small" type="warning">思考</el-tag>
                                <el-tag size="small" type="info">成长</el-tag>
                            </div>
                            <el-button class="read-more" type="primary" plain>
                                阅读全文
                                <el-icon>
                                    <ArrowRight />
                                </el-icon>
                            </el-button>
                        </div>
                        <div class="featured-image">
                            <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                alt="持续学习" />
                        </div>
                    </section>

                    <!-- 思考随笔列表 -->
                    <section class="thoughts-section section-container">
                        <h2 class="section-title">
                            <el-icon>
                                <Edit />
                            </el-icon>
                            思考随笔
                        </h2>

                        <div class="filter-bar">
                            <el-radio-group v-model="thoughtFilter" size="small">
                                <el-radio-button v-for="filter in thoughtFilters" :key="filter.value"
                                    :label="filter.value">
                                    {{ filter.label }}
                                </el-radio-button>
                            </el-radio-group>
                            <el-input v-model="searchQuery" placeholder="搜索随笔..." prefix-icon="Search" size="small"
                                class="search-input" />
                        </div>

                        <div class="thoughts-grid">
                            <div class="thought-card" v-for="thought in thoughts" :key="thought.id">
                                <div class="thought-header">
                                    <span class="thought-date">{{ thought.date }}</span>
                                    <span class="thought-category">{{ thought.category }}</span>
                                </div>
                                <h3 class="thought-title">{{ thought.title }}</h3>
                                <p class="thought-excerpt">{{ thought.excerpt }}</p>
                                <div class="thought-footer">
                                    <div class="thought-tags">
                                        <el-tag size="small" v-for="tag in thought.tags" :key="tag"
                                            :type="getTagType(tag)">
                                            {{ tag }}
                                        </el-tag>
                                    </div>
                                    <el-button link type="primary">
                                        继续阅读
                                        <el-icon>
                                            <ArrowRight />
                                        </el-icon>
                                    </el-button>
                                </div>
                            </div>
                        </div>

                        <div class="pagination-container">
                            <el-pagination background layout="prev, pager, next" :total="paginationData.total"
                                :page-size="paginationData.pageSize" />
                        </div>
                    </section>

                    <!-- 生活格言 -->
                    <section class="quotes-section section-container">
                        <h2 class="section-title">
                            <el-icon>
                                <ChatDotRound />
                            </el-icon>
                            生活箴言
                        </h2>

                        <el-carousel :interval="5000" type="card" height="200px">
                            <el-carousel-item v-for="quote in lifeQuotes" :key="quote.id">
                                <div class="quote-slide" :style="{ backgroundColor: quote.bgColor }">
                                    <div class="quote-content">
                                        <span class="quote-mark">"</span>
                                        <p class="quote-text">{{ quote.text }}</p>
                                        <div class="quote-author">— {{ quote.author }}</div>
                                    </div>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </section>
                </div>

                <!-- 侧边栏 -->
                <div class="side-column">
                    <!-- 个人思考状态 -->
                    <div class="thinking-status side-card">
                        <h3 class="side-card-title">
                            <el-icon>
                                <MagicStick />
                            </el-icon>
                            思考状态
                        </h3>
                        <div class="status-content">
                            <div class="status-item">
                                <span class="status-icon reading">
                                    <el-icon>
                                        <Reading />
                                    </el-icon>
                                </span>
                                <div class="status-detail">
                                    <h4>正在阅读</h4>
                                    <p>《思考，快与慢》— 丹尼尔·卡尼曼</p>
                                </div>
                            </div>
                            <div class="status-item">
                                <span class="status-icon thinking">
                                    <el-icon>
                                        <Lightbulb />
                                    </el-icon>
                                </span>
                                <div class="status-detail">
                                    <h4>近期思考</h4>
                                    <p>认知偏差如何影响我们的决策过程</p>
                                </div>
                            </div>
                            <div class="status-item">
                                <span class="status-icon writing">
                                    <el-icon>
                                        <EditPen />
                                    </el-icon>
                                </span>
                                <div class="status-detail">
                                    <h4>创作中</h4>
                                    <p>《如何培养批判性思维》系列随笔</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 思考主题分类 -->
                    <div class="thought-categories side-card">
                        <h3 class="side-card-title">
                            <el-icon>
                                <Menu />
                            </el-icon>
                            思考主题
                        </h3>
                        <div class="category-list">
                            <div class="category-item" v-for="category in categories" :key="category.name">
                                <div class="category-name">
                                    <el-icon>
                                        <component :is="category.icon" />
                                    </el-icon>
                                    <span>{{ category.name }}</span>
                                </div>
                                <div class="category-count">{{ category.count }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- 阅读与思考 -->
                    <div class="reading-notes side-card">
                        <h3 class="side-card-title">
                            <el-icon>
                                <Collection />
                            </el-icon>
                            阅读心得
                        </h3>
                        <div class="book-notes">
                            <div class="book-note" v-for="book in readingNotes" :key="book.id">
                                <div class="book-cover">
                                    <img :src="book.cover" :alt="book.title" />
                                </div>
                                <div class="book-info">
                                    <h4 class="book-title">{{ book.title }}</h4>
                                    <p class="book-author">{{ book.author }}</p>
                                    <p class="book-excerpt">{{ book.excerpt }}</p>
                                    <el-button link type="primary" size="small">
                                        阅读笔记
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 标签云 -->
                    <div class="tag-cloud side-card">
                        <h3 class="side-card-title">
                            <el-icon>
                                <PriceTag />
                            </el-icon>
                            标签云
                        </h3>
                        <div class="tags-container">
                            <span class="cloud-tag" v-for="tag in tagCloud" :key="tag.name"
                                :style="{ fontSize: tag.size + 'px', color: tag.color }">
                                {{ tag.name }}
                            </span>
                        </div>
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
    Edit, Star, ChatDotRound, ArrowRight, Reading,
    Search, Menu, Collection, PriceTag, MagicStick, Lightbulb, EditPen
} from '@element-plus/icons-vue'
import TopBar from '../components/TopBar.vue'
import Footer from '../components/Footer.vue'
import ThemeToggler from '../components/ThemeToggler.vue'
import PageHeader from '../components/PageHeader.vue'
import { currentTheme } from '../stores/themeStore'
import bgFile from '@/assets/images/bg8.png' // 请确保图片存在，否则替换为实际存在的图片

// 背景图片
const bgUrl = bgFile

// 筛选和搜索
const thoughtFilter = ref('all')
const searchQuery = ref('')

// 分页数据
const paginationData = ref({
    total: 36,
    pageSize: 6
})

// 思考随笔过滤选项
const thoughtFilters = [
    { value: 'all', label: '全部' },
    { value: 'life', label: '生活' },
    { value: 'philosophy', label: '哲学' },
    { value: 'psychology', label: '心理学' },
    { value: 'society', label: '社会' }
]

// 思考随笔数据
const thoughts = ref([
    {
        id: 1,
        title: '关于时间管理的思考',
        excerpt: '时间是我们最宝贵的资源，但我们往往没有意识到它的稀缺性。高效管理时间不是为了挤压生活中的每一分钟，而是为了让我们能够专注于真正重要的事情...',
        date: '2024年4月15日',
        category: '生活',
        tags: ['时间管理', '效率', '生活']
    },
    {
        id: 2,
        title: '幸福的本质是什么？',
        excerpt: '很多人把幸福等同于快乐，但我认为幸福比短暂的快乐更为深刻。真正的幸福来源于内心的平静、与他人的连接以及对生活的意义感...',
        date: '2024年3月28日',
        category: '哲学',
        tags: ['幸福', '哲学', '意义']
    },
    {
        id: 3,
        title: '数字时代的注意力危机',
        excerpt: '在信息爆炸的时代，我们的注意力成为了最珍贵的商品。各种应用和平台不断争夺我们的关注，这导致了注意力的碎片化，深度思考能力的丧失...',
        date: '2024年3月10日',
        category: '社会',
        tags: ['注意力', '数字社会', '深度思考']
    },
    {
        id: 4,
        title: '关于内在动机与外在激励',
        excerpt: '研究表明，长期来看，内在动机比外在奖励更能带来持久的行动力和满足感。当我们的行为由好奇心、兴趣和个人价值观驱动时，我们往往更有创造力...',
        date: '2024年2月25日',
        category: '心理学',
        tags: ['动机', '心理学', '自驱力']
    },
    {
        id: 5,
        title: '简单生活的力量',
        excerpt: '在物质丰富的今天，我们常常被消费主义裹挟，购买并不真正需要的东西。简单生活不是抛弃现代便利，而是有意识地选择真正能带来价值的物品和体验...',
        date: '2024年2月5日',
        category: '生活',
        tags: ['极简主义', '生活方式', '消费']
    },
    {
        id: 6,
        title: '冥想如何改变我的思维方式',
        excerpt: '坚持冥想练习让我对自己的思想有了更清晰的认识。通过观察而不评判自己的念头，我学会了与思想保持距离，不再被消极情绪完全控制...',
        date: '2024年1月20日',
        category: '心理学',
        tags: ['冥想', '正念', '自我觉察']
    }
])

// 生活箴言数据
const lifeQuotes = ref([
    {
        id: 1,
        text: '我们所见的，往往不是事物本身，而是我们想要看到的。',
        author: '个人感悟',
        bgColor: 'rgba(80, 140, 200, 0.7)'
    },
    {
        id: 2,
        text: '真正的自由不是做想做的事，而是不做不想做的事。',
        author: '生活所得',
        bgColor: 'rgba(110, 170, 130, 0.7)'
    },
    {
        id: 3,
        text: '成长不是变成别人眼中的样子，而是成为更好的自己。',
        author: '思考所得',
        bgColor: 'rgba(190, 130, 100, 0.7)'
    },
    {
        id: 4,
        text: '所有的不快乐，本质上都是内心期望与现实之间的落差。',
        author: '心理思考',
        bgColor: 'rgba(150, 110, 180, 0.7)'
    },
    {
        id: 5,
        text: '生活中最宝贵的不是我们拥有的物品，而是那些无可替代的经历。',
        author: '人生感悟',
        bgColor: 'rgba(180, 140, 90, 0.7)'
    }
])

// 思考主题分类
const categories = ref([
    { name: '生活感悟', count: 18, icon: 'House' },
    { name: '哲学思考', count: 12, icon: 'MagicStick' },
    { name: '心理探索', count: 15, icon: 'Avatar' },
    { name: '社会观察', count: 9, icon: 'View' },
    { name: '职场思考', count: 7, icon: 'Suitcase' }
])

// 阅读心得
const readingNotes = ref([
    {
        id: 1,
        title: '思考，快与慢',
        author: '丹尼尔·卡尼曼',
        cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        excerpt: '关于人类思维系统的深度解析，揭示了我们在决策过程中的系统性偏差...'
    },
    {
        id: 2,
        title: '自卑与超越',
        author: '阿尔弗雷德·阿德勒',
        cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        excerpt: '阿德勒心理学的核心著作，讨论了自卑感如何影响人的行为和成长...'
    },
    {
        id: 3,
        title: '人生的智慧',
        author: '叔本华',
        cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        excerpt: '关于如何获取人生幸福的实用哲学思考，探讨了痛苦与无聊的对立...'
    }
])

// 标签云
const tagCloud = ref([
    { name: '思考', size: 22, color: '#3498db' },
    { name: '生活', size: 20, color: '#2ecc71' },
    { name: '哲学', size: 18, color: '#9b59b6' },
    { name: '心理学', size: 24, color: '#e74c3c' },
    { name: '成长', size: 19, color: '#f39c12' },
    { name: '阅读', size: 16, color: '#1abc9c' },
    { name: '社会', size: 18, color: '#34495e' },
    { name: '自我', size: 21, color: '#16a085' },
    { name: '意义', size: 17, color: '#27ae60' },
    { name: '冥想', size: 15, color: '#8e44ad' },
    { name: '创造力', size: 16, color: '#d35400' },
    { name: '习惯', size: 19, color: '#2980b9' },
    { name: '学习', size: 18, color: '#c0392b' },
    { name: '感悟', size: 20, color: '#7f8c8d' }
])

// 辅助函数
const getTagType = (tag) => {
    const types = {
        '哲学': 'success',
        '心理学': 'warning',
        '社会': 'info',
        '生活': 'danger',
        '时间管理': '',
        '冥想': 'success',
        '注意力': 'warning',
        '极简主义': 'info'
    }

    // 为部分常见标签返回固定类型，其他随机分配
    if (types[tag]) return types[tag]

    // 为其他标签随机分配类型
    const typeOptions = ['', 'success', 'warning', 'info', 'danger']
    const hashCode = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return typeOptions[hashCode % typeOptions.length]
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
    --featured-gradient: linear-gradient(135deg, rgba(30, 30, 50, 0.8), rgba(20, 20, 40, 0.9));
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
    --featured-gradient: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 250, 0.9));
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

/* 置顶思考区样式 */
.featured-thought {
    display: flex;
    gap: 30px;
    overflow: hidden;
    /* background: var(--featured-gradient); */
}

.featured-content {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.featured-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.featured-label {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--accent-color);
    font-weight: 500;
}

.featured-date {
    font-size: 0.9rem;
    color: var(--text-muted);
}

.featured-title {
    font-size: 24px;
    margin-bottom: 15px;
    color: var(--heading-color);
    font-weight: 600;
}

.featured-body {
    margin-bottom: 20px;
    flex: 1;
}

.featured-body p {
    margin-bottom: 15px;
    line-height: 1.6;
    color: var(--text-secondary);
}

.featured-quote {
    margin: 20px 0;
    padding: 15px 20px;
    border-left: 4px solid var(--accent-color);
    background-color: rgba(90, 158, 255, 0.1);
    font-style: italic;
    color: var(--text-color);
}

.featured-tags {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.featured-image {
    width: 300px;
    height: auto;
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;
}

.featured-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.read-more {
    align-self: flex-start;
}

/* 思考随笔区 */
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

.thoughts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 25px;
}

.thought-card {
    background-color: var(--card-bg);
    border-radius: 10px;
    padding: 20px;
    transition: all 0.3s ease;
    box-shadow: var(--card-shadow);
    border: 1px solid var(--card-border);
    height: 100%;
    display: flex;
    flex-direction: column;
}

.thought-card:hover {
    transform: var(--card-hover-transform);
    background-color: var(--card-bg-hover);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.thought-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    color: var(--text-muted);
    font-size: 0.9rem;
}

.thought-title {
    font-size: 18px;
    margin-bottom: 12px;
    color: var(--heading-color);
    font-weight: 600;
    line-height: 1.4;
}

.thought-excerpt {
    color: var(--text-secondary);
    margin-bottom: 15px;
    line-height: 1.6;
    flex: 1;
}

.thought-footer {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: auto;
}

.thought-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.pagination-container {
    margin-top: 30px;
    display: flex;
    justify-content: center;
}

/* 生活箴言区样式 */
.quotes-section {
    padding-bottom: 40px;
}

.quotes-section :deep(.el-carousel__item) {
    border-radius: 12px;
    overflow: hidden;
}

.quote-slide {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    color: white;
    position: relative;
}

.quote-slide::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.quote-content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 600px;
}

.quote-mark {
    font-size: 60px;
    line-height: 1;
    font-family: Georgia, serif;
    opacity: 0.5;
    display: block;
    margin-bottom: -20px;
}

.quote-text {
    font-size: 20px;
    font-weight: 500;
    line-height: 1.6;
    margin-bottom: 15px;
}

.quote-author {
    font-style: italic;
    font-size: 16px;
    opacity: 0.8;
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

/* 思考状态 */
.status-content {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.status-item {
    display: flex;
    align-items: center;
    gap: 15px;
}

.status-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.status-icon.reading {
    background-color: rgba(231, 76, 60, 0.2);
    color: #e74c3c;
}

.status-icon.thinking {
    background-color: rgba(241, 196, 15, 0.2);
    color: #f1c40f;
}

.status-icon.writing {
    background-color: rgba(46, 204, 113, 0.2);
    color: #2ecc71;
}

.status-detail h4 {
    margin: 0 0 5px;
    font-size: 14px;
    font-weight: 600;
    color: var(--heading-color);
}

.status-detail p {
    margin: 0;
    font-size: 13px;
    color: var(--text-secondary);
}

/* 思考主题分类 */
.category-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.category-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background-color: var(--bg-tertiary);
    border-radius: 8px;
    transition: all 0.3s ease;
}

.category-item:hover {
    background-color: var(--card-bg-hover);
    transform: translateX(5px);
}

.category-name {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--heading-color);
}

.category-count {
    background-color: var(--accent-color);
    color: white;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 12px;
}

/* 阅读心得 */
.book-notes {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.book-note {
    display: flex;
    gap: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--card-border);
}

.book-note:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.book-cover {
    width: 70px;
    height: 100px;
    border-radius: 6px;
    overflow: hidden;
    flex-shrink: 0;
}

.book-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.book-info {
    flex: 1;
}

.book-title {
    margin: 0 0 5px;
    font-size: 16px;
    font-weight: 600;
    color: var(--heading-color);
}

.book-author {
    margin: 0 0 8px;
    font-size: 13px;
    color: var(--text-muted);
    font-style: italic;
}

.book-excerpt {
    margin: 0 0 8px;
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* 标签云 */
.tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding: 5px;
}

.cloud-tag {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 15px;
    background-color: var(--tag-bg);
    transition: all 0.3s ease;
    cursor: pointer;
}

.cloud-tag:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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
    .side-column .thinking-status {
        grid-column: span 2;
    }
}

@media (max-width: 768px) {
    .page-content {
        padding: 60px 20px 20px;
    }

    .featured-thought {
        flex-direction: column;
    }

    .featured-image {
        width: 100%;
        height: 200px;
    }

    .thoughts-grid {
        grid-template-columns: 1fr;
    }

    /* 单列布局 */
    .side-column {
        display: block;
    }

    /* 移动端侧栏卡片间距 */
    .side-column .side-card {
        margin-bottom: 35px;
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

    .home-theme-toggler {
        bottom: 20px;
        left: 20px;
    }
}
</style>