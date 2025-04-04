<template>
    <div class="research-page">
        <TopBar />
        <div class="page-content">
            <h1 class="page-title">学术札记</h1>
            <div class="content-container">
                <p class="description">分享科研心得、学术观点与专业探索</p>
                <!-- 内容区域 -->
                <div class="articles-container">
                    <!-- 文章列表将在此显示 -->
                    <div class="article-placeholder" v-for="i in 6" :key="i">
                        <div class="article-title">示例学术文章 {{ i }}</div>
                        <div class="article-excerpt">这里是文章摘要，描述了这篇学术文章的主要内容和亮点...</div>
                        <div class="article-meta">2025年4月{{ i }}日 · 阅读时间：{{ 5 + i }}分钟</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import TopBar from '../components/TopBar.vue'
</script>

<style scoped>
.research-page {
    min-height: 100vh;
    background-color: rgba(20, 20, 30, 0.7);
    color: white;
}

.page-content {
    padding: 80px 40px 40px;
    max-width: 1200px;
    margin: 0 auto;
}

.page-title {
    font-size: 36px;
    margin-bottom: 30px;
    text-align: center;
}

.description {
    text-align: center;
    margin-bottom: 40px;
    font-size: 18px;
    opacity: 0.8;
}

.articles-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 30px;
}

.article-placeholder {
    background-color: rgba(35, 35, 50, 0.5);
    border-radius: 12px;
    padding: 25px;
    transition: all 0.3s ease;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    cursor: pointer;
}

.article-placeholder:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    background-color: rgba(40, 40, 60, 0.6);
}

.article-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
}

.article-excerpt {
    font-size: 14px;
    opacity: 0.8;
    margin-bottom: 20px;
    line-height: 1.6;
}

.article-meta {
    font-size: 12px;
    opacity: 0.6;
}
</style>