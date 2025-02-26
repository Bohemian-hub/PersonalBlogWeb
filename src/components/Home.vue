<template>
  <!-- 顶部栏组件，当滚动位置为0时显示 -->
  <TopBar :visible="showTopBar" />
  <!-- 使用封装的Cover组件，并设置高度为100vh -->
  <Cover height="100vh" />
  <!-- 首页主体内容 -->
  <div class="content">
    <div class="main"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 导入顶部栏组件和封装的Cover组件
import TopBar from './TopBar.vue'
import Cover from './Cover.vue'

// 创建一个响应式变量来控制TopBar的显示和隐藏
const showTopBar = ref(true)

// 处理滚动事件的函数
const handleScroll = () => {
  // 当滚动位置为0（页面顶部）时显示TopBar，否则隐藏
  showTopBar.value = window.scrollY <= 40
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
.hidden-topbar {
  opacity: 0;
  transform: translateY(-50px);
  pointer-events: none;
}

/* 首页主题内容 */
.content {
  width: 100%;
  background-color: #fff;

  .main {
    width: 1400px;
    background-color: #fff;
    height: 1400px;
    /* 临时设置，后续会根据实际情况调整 */
    margin: 0 auto;
    padding-top: 40px;
  }
}
</style>