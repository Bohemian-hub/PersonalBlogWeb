<template>
  <div class="cover">
    <!-- 背景图片 -->
    <el-image class="bg-image" :src="bg8_url" :fit="'cover'" draggable="false" />
    <!-- 顶部栏组件 -->
    <TopBar />
    <!-- 封面标题文字 -->
    <div class="cover_text">
      <div class="text1">
        <div class="text1">
          <!-- 使用内联样式动态设置动画延迟 -->
          <span v-for="(char, index) in text1.split('')" :key="index" class="animated-char"
            :style="{ animationDelay: `${index * 0.3}s`, WebkitAnimationDelay: `${index * 0.4}s` }">{{ char }}</span>
        </div>
      </div>
      <div class="text2">
        <a :class="{ 'cursor-animation': showCursor }">{{ text2 }}</a>
      </div>
    </div>

  </div>
  <!-- 首页主体内容 -->
  <div class="content">
    <div class="main"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'


// 导入顶部栏组件
import TopBar from './top_bar.vue'

import bg8Url from '@/assets/images/bg8.png'
const bg8_url = bg8Url

const text1 = ref('温润如新')
const fullTextList = [
  "投策命晨装，暂与园田疏。",
  "花明玉关雪，叶暖金窗烟。"
]
const text2 = ref('')
const showCursor = ref(true)

let timer = null
let typeTimer = null
let currentIndex = 0
let currentTextIndex = 0 // 当前显示第几句话

// 清除文字效果函数
const clearText = () => {
  const textLength = text2.value.length
  let clearIndex = textLength

  const clearTimer = setInterval(() => {
    if (clearIndex > 0) {
      text2.value = text2.value.slice(0, -1)
      clearIndex--
    } else {
      clearInterval(clearTimer)
      // 清除完成后等待1秒再开始打字效果
      setTimeout(() => {
        typeText()
      }, 1000)
    }
  }, 100) // 每100ms删除一个字
}

// 打字效果函数
const typeText = () => {
  const currentText = fullTextList[currentTextIndex]
  currentIndex = 0

  typeTimer = setInterval(() => {
    if (currentIndex < currentText.length) {
      text2.value += currentText[currentIndex]
      currentIndex++
    } else {
      clearInterval(typeTimer)
      // 等待2秒后开始清除
      setTimeout(() => {
        // 切换到下一句话
        currentTextIndex = (currentTextIndex + 1) % fullTextList.length
        clearText()
      }, 2000)
    }
  }, 100) // 每100ms打一个字
}

//输入光标效果
const inputCunsor = () => {
  // 光标闪烁
  timer = setInterval(() => {
    showCursor.value = !showCursor.value
  }, 300)
}

onMounted(() => {
  //输入光标效果
  inputCunsor()

  // 启动打字效果
  typeText()
})

onUnmounted(() => {
  clearInterval(timer)
  clearInterval(typeTimer)
})
</script>

<style scoped>
.cover {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;

  .bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cover_text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* 水平居中 */
    text-align: center;

    .text1 {
      height: 100px;
      /* background-color: red; */
      font-size: 40px;
      color: #fff;
      margin-bottom: 40px;
      display: flex;
      justify-content: center;
      align-items: center;

      /* 添加浮动动画效果的字符样式 */
      .animated-char {
        /* background-color: greenyellow; */
        display: inline-block;
        /* 删除 float: left; 因为它会破坏居中效果 */
        animation: float-animation 0.8s ease-in-out infinite alternate;
        /* 保持文字在一行内不换行 */
        white-space: nowrap;
        /* 添加倒影效果 */
        -webkit-box-reflect: below 0px linear-gradient(to bottom, rgba(225, 0, 0, 0), rgba(0, 0, 0, 0.4));
        /* 添加一些间距，让倒影更明显 */
        padding-bottom: 5px;
        /* 可选：添加文字阴影使主文字更突出 */
        text-shadow: 0 0 10px rgba(5, 5, 5, 0.5);
      }
    }

    .text2 {
      font-size: 20px;
      border-radius: 10px;
      display: inline-block;
      padding: 15px 0;
      background-color: rgba(0, 0, 0, 0.412);
      color: #fff;
      min-width: 2px;

      a {
        margin: 0 20px;
        position: relative;
      }

      /* 添加光标动画 */
      .cursor-animation::after {
        content: '';
        position: absolute;
        right: -2px;
        top: 0;
        width: 2px;
        height: 100%;
        background-color: #fff;
        animation: cursor-fade 0.4s ease-in-out infinite;
      }


    }
  }
}



/* 将关键帧动画移至顶级作用域 */
@keyframes float-animation {
  0% {
    margin-top: 0px;
  }

  100% {
    margin-top: 30px;
  }
}

@keyframes cursor-fade {

  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
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