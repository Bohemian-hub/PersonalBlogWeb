<template>
  <div class="error-page">
    <div class="error-container">
      <el-row :gutter="20" class="error-content">
        <el-col :span="12" class="illustration-col">
          <img src="../assets/svg/404.svg" alt="404" class="error-illustration" />
        </el-col>
        <el-col :span="12" class="content-col">
          <h1 class="error-code">404</h1>
          <h2 class="error-title">页面不见了</h2>
          <p class="error-description">
            哎呀！您访问的页面可能已被移动、删除或从未存在过。
          </p>
          <div class="actions">
            <el-button type="primary" color="#3B69A9" @click="goHome" size="large" class="action-button">
              <el-icon class="el-icon-left">
                <HomeFilled />
              </el-icon>返回首页
            </el-button>
            <el-button @click="goBack" size="large" class="action-button">
              <el-icon class="el-icon-back">
                <Back />
              </el-icon>返回上页
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { HomeFilled, Back } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.error-container {
  max-width: 1000px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 20px;
}

.error-content {
  display: flex;
  align-items: center;
}

.illustration-col {
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-illustration {
  width: 100%;
  max-width: 400px;
}

.content-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 20px;
}

.error-code {
  font-size: 72px;
  font-weight: 700;
  margin: 0 0 20px;
  background: linear-gradient(45deg, #3B69A9, #35495e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.error-title {
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 20px;
  color: #333;
}

.error-description {
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
}

.actions {
  display: flex;
  gap: 15px;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 768px) {
  .error-content {
    flex-direction: column;
  }

  .illustration-col,
  .content-col {
    width: 100%;
    max-width: 100%;
  }

  .content-col {
    padding: 30px 10px;
    text-align: center;
  }

  .actions {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .error-code {
    font-size: 60px;
  }

  .error-title {
    font-size: 28px;
  }
}
</style>