<template>
  <!-- 顶部栏组件 -->
  <TopBar />
  <!-- 使用封装的Cover组件，并设置高度为100vh -->
  <Cover height="100vh" />
  <!-- 首页主体内容 -->
  <div class="content">
    <div class="main"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 导入顶部栏组件和封装的Cover组件
import TopBar from './top_bar.vue'
import Cover from './Cover.vue'
</script>

<style scoped>
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