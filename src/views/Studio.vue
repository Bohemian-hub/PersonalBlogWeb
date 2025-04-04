<template>
    <div class="studio-page">
        <TopBar />
        <div class="page-content">
            <h1 class="page-title">实践工坊</h1>
            <div class="content-container">
                <p class="description">展示个人项目、工具开发与方法分享</p>
                <!-- 项目展示区 -->
                <div class="projects-container">
                    <div class="project-card" v-for="i in 4" :key="i">
                        <div class="project-image"></div>
                        <div class="project-details">
                            <div class="project-title">项目{{ i }}: 创新应用</div>
                            <div class="project-tags">
                                <span class="tag">Vue.js</span>
                                <span class="tag">Python</span>
                                <span class="tag">AI</span>
                            </div>
                            <div class="project-description">
                                这是一个结合了前端技术和人工智能的创新项目，旨在解决实际问题...
                            </div>
                            <div class="project-links">
                                <a href="#" class="link">查看详情</a>
                                <a href="#" class="link">GitHub</a>
                            </div>
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
.studio-page {
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

.projects-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 30px;
}

.project-card {
    display: flex;
    background-color: rgba(35, 35, 50, 0.5);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.project-image {
    width: 200px;
    background-color: rgba(60, 60, 80, 0.5);
}

.project-details {
    flex: 1;
    padding: 20px;
}

.project-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

.project-tags {
    display: flex;
    gap: 8px;
    margin-bottom: 15px;
}

.tag {
    background-color: rgba(80, 80, 100, 0.6);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
}

.project-description {
    font-size: 14px;
    opacity: 0.8;
    margin-bottom: 15px;
    line-height: 1.6;
}

.project-links {
    display: flex;
    gap: 15px;
}

.link {
    color: #73c0de;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.2s;
}

.link:hover {
    color: #9ee3ff;
    text-decoration: underline;
}
</style>