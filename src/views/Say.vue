<template>
    <div class="say-page">
        <TopBar />
        <div class="page-content">
            <h1 class="page-title">互动集市</h1>
            <div class="content-container">
                <div class="sections-row">
                    <!-- 留言板区域 -->
                    <div class="section message-board">
                        <h2 class="section-title">留言板</h2>
                        <div class="message-form">
                            <textarea placeholder="在此留下您的想法、建议或问题..."></textarea>
                            <button class="submit-btn">发送留言</button>
                        </div>
                        <div class="messages-list">
                            <div class="message-item" v-for="i in 3" :key="i">
                                <div class="message-avatar"></div>
                                <div class="message-content">
                                    <div class="message-header">
                                        <span class="message-author">访客{{ i }}</span>
                                        <span class="message-time">2025年4月{{ i }}日</span>
                                    </div>
                                    <div class="message-text">这是一条来自访客的留言，表达了对博客的喜爱和支持...</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 友情链接区域 -->
                    <div class="section friends-links">
                        <h2 class="section-title">友情链接</h2>
                        <div class="links-grid">
                            <a href="#" class="link-item" v-for="i in 6" :key="i">
                                <div class="link-icon"></div>
                                <div class="link-info">
                                    <div class="link-name">友情站点 {{ i }}</div>
                                    <div class="link-desc">这是一个很棒的网站，专注于技术与创新</div>
                                </div>
                            </a>
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
.say-page {
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

.sections-row {
    display: flex;
    gap: 30px;
}

@media (max-width: 900px) {
    .sections-row {
        flex-direction: column;
    }
}

.section {
    flex: 1;
    background-color: rgba(35, 35, 50, 0.5);
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.section-title {
    font-size: 22px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* 留言板样式 */
.message-form {
    margin-bottom: 25px;
}

.message-form textarea {
    width: 100%;
    height: 100px;
    padding: 12px;
    background-color: rgba(50, 50, 70, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: white;
    font-size: 14px;
    resize: none;
    margin-bottom: 10px;
}

.submit-btn {
    padding: 8px 16px;
    background-color: #3ba272;
    border: none;
    border-radius: 6px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
}

.submit-btn:hover {
    background-color: #4dc28a;
}

.message-item {
    display: flex;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.message-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(80, 80, 110, 0.7);
    margin-right: 15px;
}

.message-content {
    flex: 1;
}

.message-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.message-author {
    font-weight: bold;
}

.message-time {
    font-size: 12px;
    opacity: 0.7;
}

.message-text {
    font-size: 14px;
    line-height: 1.5;
}

/* 友情链接样式 */
.links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
}

.link-item {
    display: flex;
    align-items: center;
    background-color: rgba(50, 50, 70, 0.5);
    border-radius: 8px;
    padding: 15px;
    text-decoration: none;
    color: white;
    transition: all 0.2s;
}

.link-item:hover {
    background-color: rgba(60, 60, 85, 0.7);
    transform: translateY(-2px);
}

.link-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background-color: rgba(80, 80, 110, 0.7);
    margin-right: 15px;
}

.link-name {
    font-weight: bold;
    margin-bottom: 5px;
}

.link-desc {
    font-size: 12px;
    opacity: 0.8;
}
</style>