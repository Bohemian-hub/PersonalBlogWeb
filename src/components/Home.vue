<template>
  <!-- 顶部栏组件，当滚动位置为0时显示 -->
  <TopBar :visible="showTopBar" />
  <!-- 使用封装的Cover组件，并设置高度为100vh -->
  <Cover height="400px" />
  <!-- 首页主体内容 -->
  <Index height="100vh" />
  <el-image class="bg-image" :src="bgUrl" :fit="'cover'" draggable="false" />
  <div class="overlay" ref="overlay"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import bg1Url from '@/assets/images/bg1.png'
import bg2Url from '@/assets/images/bg2.png'
import bg3Url from '@/assets/images/bg3.png'
import bg4Url from '@/assets/images/bg4.png'
import bg5Url from '@/assets/images/bg5.png'
import bg6Url from '@/assets/images/bg6.png'
import bg7Url from '@/assets/images/bg7.png'
import bg8Url from '@/assets/images/bg8.png'
import bg9Url from '@/assets/images/bg9.png'
import bg10Url from '@/assets/images/bg10.png'
const bgUrl = bg7Url

// 导入顶部栏组件和封装的Cover组件
import TopBar from './TopBar.vue'
import Cover from './Cover.vue'
import Index from './Index.vue'

// 创建一个响应式变量来控制TopBar的显示和隐藏
const showTopBar = ref(true)
const overlay = ref(null)

// 处理滚动事件的函数
const handleScroll = () => {
  // 当滚动位置为0（页面顶部）时显示TopBar，否则隐藏
  showTopBar.value = window.scrollY <= 400

  const scrollY = window.scrollY;
  const bgImage = document.querySelector('.bg-image');

  // 设置模糊和其他效果的阈值
  const startEffect = 200;
  const endEffect = 400;

  if (scrollY <= startEffect) {
    // 200px以下：清晰无效果
    bgImage.style.filter = 'blur(0) brightness(1) contrast(1)';
    if (overlay.value) overlay.value.style.opacity = '0';
  } else if (scrollY >= endEffect) {
    // 400px以上：最大效果 - 增加暗化程度
    bgImage.style.filter = 'blur(6px) brightness(0.7) contrast(1.1)';
    if (overlay.value) overlay.value.style.opacity = '0.5';
  } else {
    // 200-400px之间：线性增加效果
    const progress = (scrollY - startEffect) / (endEffect - startEffect);
    const blurValue = 6 * progress;
    const brightnessValue = 1 - (0.3 * progress);
    const contrastValue = 1 + (0.1 * progress);
    const overlayOpacity = 0.5 * progress;

    bgImage.style.filter = `blur(${blurValue}px) brightness(${brightnessValue}) contrast(${contrastValue})`;
    if (overlay.value) overlay.value.style.opacity = overlayOpacity.toString();
  }
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
  /* 初始无效果状态 */
  filter: blur(0) brightness(1) contrast(1);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4));
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
</style>