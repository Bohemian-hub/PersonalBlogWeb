<template>
    <div class="about-page">
        
        <el-container>
            <TopBar />
            <el-header class="header">
                <h1 class="title">关于我们</h1>
            </el-header>
            <el-main class="content">
                <el-card shadow="hover">
                    <p class="description">
                        欢迎来到我们的关于页面。这里介绍了我们的故事、理念以及团队发展历程。如果你有任何疑问或建议，欢迎与我们联系！
                    </p>
                </el-card>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import TopBar from '../components/TopBar.vue'
</script>

<style scoped>
.about-page {
    background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.header {
    text-align: center;
    padding: 20px 0;
}

.title {
    color: #333;
    font-size: 3rem;
    margin: 0;
}

.content {
    max-width: 800px;
    margin: 0 auto;
}

.description {
    font-size: 1.2rem;
    text-align: center;
    padding: 20px;
}
</style>