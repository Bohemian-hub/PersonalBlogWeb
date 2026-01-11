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
    <div class="global-bg"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'// 导入顶部栏组件和封装的Cover组件
import TopBar from '../components/TopBar.vue'
import Cover from '../components/Cover.vue'
import Index from '../components/Index.vue'
import Footer from '../components/Footer.vue'  // 导入新的Footer组件
import ThemeToggler from '../components/ThemeToggler.vue' // 导入主题切换组件// 创建一个响应式变量来控制TopBar的显示和隐藏
const showTopBar = ref(true)</script>
<style scoped>
.global-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;

  background: linear-gradient(225deg, #fcb8e2 0.000%, #feb9e4 5.000%, #ffbce7 10.000%, #ffc2ea 15.000%, #ffc8ed 20.000%, #ffd0f0 25.000%, #ffd8f3 30.000%, #fee0f6 35.000%, #fbe8f9 40.000%, #f7effb 45.000%, #f3f4fd 50.000%, #eef8ff 55.000%, #e8f9ff 60.000%, #e3f9ff 65.000%, #dcf6ff 70.000%, #d6f2ff 75.000%, #d0ecff 80.000%, #c9e5ff 85.000%, #c3ddfe 90.000%, #bdd5fc 95.000%, #b8cdfa 100.000%);
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