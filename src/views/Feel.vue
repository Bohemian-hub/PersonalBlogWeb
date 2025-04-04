<template>
    <div class="feel-page">
        <TopBar />
        <div class="page-content">
            <h1 class="page-title">认知轨迹</h1>
            <div class="content-container">
                <p class="description">思考与观点的表达空间</p>
                <!-- 文章列表 -->
                <div class="thoughts-container">
                    <div class="thought-item" v-for="i in 8" :key="i">
                        <div class="thought-date">{{ 2025 - Math.floor(i / 4) }}年{{ (i % 12) + 1 }}月{{ (i % 28) + 1 }}日
                        </div>
                        <div class="thought-title">思考记录 #{{ i }}: 关于生活的哲思</div>
                        <div class="thought-excerpt">
                            这是一段关于人生、工作或学习的思考片段。在这里，我会记录自己的所思所想，以及对某些事物的深度思考和感悟...
                        </div>
                        <div class="thought-tags">
                            <span class="tag">思考</span>
                            <span class="tag">人生</span>
                            <span class="tag">哲学</span>
                        </div>
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
.feel-page {
    min-height: 100vh;
    background-color: rgba(20, 20, 30, 0.7);
    color: white;
}

.page-content {
    padding: 80px 40px 40px;
    max-width: 800px;
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

.thoughts-container {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.thought-item {
    background-color: rgba(35, 35, 50, 0.5);
    border-radius: 12px;
    padding: 25px;
    transition: all 0.3s ease;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    cursor: pointer;
}

.thought-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    background-color: rgba(40, 40, 60, 0.6);
}

.thought-date {
    font-size: 12px;
    opacity: 0.7;
    margin-bottom: 8px;
}

.thought-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 12px;
}

.thought-excerpt {
    font-size: 14px;
    opacity: 0.8;
    margin-bottom: 15px;
    line-height: 1.6;
}

.thought-tags {
    display: flex;
    gap: 8px;
}

.tag {
    background-color: rgba(80, 80, 100, 0.6);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
}
</style>