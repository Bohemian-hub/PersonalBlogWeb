<template>
  <div>
    <!-- 顶部栏组件，当滚动位置为0时显示 -->
    <TopBar :visible="showTopBar" />
    <!-- 使用封装的Cover组件，并设置高度为100vh -->
    <Cover height="400px" />
    <!-- 添加主题切换按钮 -->
    <ThemeToggler class="home-theme-toggler" />
    <!-- 首页主体内容 -->
    <Index height="100vh" />
    <!-- 底部版权和备案信息 -->
    <Footer />
    <el-image class="bg-image" :src="bgUrl" :fit="'cover'" draggable="false" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import bgFile from '@/assets/images/bg7.png'
const bgUrl = bgFile

// 导入顶部栏组件和封装的Cover组件
import TopBar from '../components/TopBar.vue'
import Cover from '../components/Cover.vue'
import Index from '../components/Index.vue'
import Footer from '../components/Footer.vue'  // 导入新的Footer组件
import ThemeToggler from '../components/ThemeToggler.vue' // 导入主题切换组件

// 创建一个响应式变量来控制TopBar的显示和隐藏
const showTopBar = ref(true)

// 处理滚动事件的函数
const handleScroll = () => {
  // 当滚动位置为0（页面顶部）时显示TopBar，否则隐藏
  showTopBar.value = window.scrollY <= 400
}

// 组件挂载时添加滚动事件监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // 初始化状态
  handleScroll()
})

// 组件卸载时移除事件监听，防止内存泄漏
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 添加平滑过渡效果 */
  transition: filter 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 1;
  z-index: -2;
}

.home-theme-toggler {
  position: fixed;
  bottom: 30px;
  left: 30px;
  z-index: 1000;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .home-theme-toggler {
    bottom: 20px;
    left: 20px;
  }
}
</style>