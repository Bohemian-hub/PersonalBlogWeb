<template>
    <div class="play-page">
        <TopBar />
        <div class="page-content">
            <h1 class="page-title">游民时代</h1>
            <div class="content-container">
                <p class="description">生活瞬间、旅行记忆与个人故事集</p>
                <!-- 照片/视频网格 -->
                <div class="gallery-container">
                    <div class="gallery-item" v-for="i in 9" :key="i">
                        <div class="gallery-image"></div>
                        <div class="gallery-overlay">
                            <div class="gallery-title">旅行记忆 #{{ i }}</div>
                            <div class="gallery-location">地点：城市{{ i }}</div>
                            <div class="gallery-date">2025年{{ (i % 12) + 1 }}月</div>
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
.play-page {
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

.gallery-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

.gallery-item {
    position: relative;
    height: 250px;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
}

.gallery-image {
    width: 100%;
    height: 100%;
    background-color: rgba(45, 45, 60, 0.7);
    transition: transform 0.5s ease;
}

.gallery-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    transform: translateY(100px);
    transition: transform 0.3s ease;
}

.gallery-item:hover .gallery-image {
    transform: scale(1.1);
}

.gallery-item:hover .gallery-overlay {
    transform: translateY(0);
}

.gallery-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
}

.gallery-location,
.gallery-date {
    font-size: 12px;
    opacity: 0.8;
}
</style>