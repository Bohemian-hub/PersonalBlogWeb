<template>
  <div class="home">
    <!-- 背景图片 -->
    <el-image class="bg-image" :src="bg8_url" :fit="'cover'" />
    <!-- 顶部栏组件 -->
    <TopBar />
    <div class="content">
      <div class="text1">{{ text1 }}</div>
      <div class="text2">
        <a :class="{ 'cursor-animation': showCursor }">{{ text2 }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { hello, login } from '@/api/auth'

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
.home {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.text1 {
  font-size: 30px;
  color: #fff;
  margin-bottom: 20px;
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

@keyframes cursor-fade {

  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
}
</style>