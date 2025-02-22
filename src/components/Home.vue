<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <el-menu mode="horizontal" :background-color="navStyle.backgroundColor" :text-color="navStyle.textColor"
      :active-text-color="navStyle.activeColor" router>
      <el-menu-item v-for="item in navItems" :key="item.path" :index="item.path"
        :style="item.isBrand ? 'font-size: 18px; font-weight: bold' : ''">
        {{ item.title }}
      </el-menu-item>
    </el-menu>

    <!-- 主体内容 -->
    <div class="main-content">
      <el-row justify="center" align="middle">
        <el-col :span="12" class="text-center">
          <h1 class="main-title">{{ mainTitle }}</h1>
          <p class="description">{{ description }}</p>
          <div class="button-group">
            <el-button type="primary" size="large" @click="handleStart">
              {{ buttonText.primary }}
            </el-button>
            <el-button size="large" @click="showAbout">
              {{ buttonText.secondary }}
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      <p>{{ footerText }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { hello, login } from '@/api/auth'
import { baseUrl } from '@/common/config/index'

// 响应式数据
const mainTitle = ref('Hello，你好！')
const description = ref('欢迎来到 何东的个人博客！这里是我的网络家园，记录了我在人工智能、前后端开发、生活琐事等各个方面的点滴思考和实践成果。作为一个追求技术和乐趣的开发者，我的博客和工具可以让你感受到我对知识的热爱和对工具的追求。快来一起探索吧！🚀')

// 响应式对象
const navStyle = reactive({
  backgroundColor: '#34495e',
  textColor: '#fff',
  activeColor: '#ffd04b'
})

// 导航项数据
const navItems = ref([
  { path: '/', title: '首页', isBrand: true },
  { path: '/about', title: '关于我们' },
  { path: '/products', title: '产品服务' },
  { path: '/contact', title: '联系我们' },
])

// 按钮文本
const buttonText = reactive({
  primary: '立即开始',
  secondary: '了解更多'
})

// 页脚文本
const footerText = ref('© 2023 My Website. All rights reserved.')

// 方法定义
const handleStart = () => {
  ElMessage.success('欢迎开始使用！')
}

const showAbout = async() => {
  const res = await hello()
  console.log(res)
  ElMessage.info(res)
}

// 如果需要暴露属性给父组件可以使用 defineExpose
// defineExpose({ ... })
</script>


<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 80px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.main-title {
  font-size: 3.5rem;
  color: #2c3e50;
  margin-bottom: 30px;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.description {
  font-size: 1.2rem;
  color: #7f8c8d;
  line-height: 1.8;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.button-group {
  margin-top: 30px;
}

.el-button {
  margin: 0 15px;
  padding: 15px 30px;
  border-radius: 25px;
  font-weight: bold;
}

.footer {
  background-color: #34495e;
  color: #ecf0f1;
  padding: 20px;
  text-align: center;
  margin-top: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }

  .el-col {
    width: 100%;
    padding: 0 20px;
  }
}
</style>