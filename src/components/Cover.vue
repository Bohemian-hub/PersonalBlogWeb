<template>
    <div class="cover" :style="{ height: height }">
        <!-- 背景图片 -->
        <!-- <el-image class="bg-image" :src="bg_url_list[bg_index]" :fit="'cover'" draggable="false" /> -->
        <!-- <el-image class="bg-image" :src="bg_url_list[bg_index]" :fit="'cover'" draggable="false" @click="changeBg" /> -->
        <!-- 封面标题文字 -->
        <div class="cover_text">
            <div class="text1">
                <div class="text1">
                    <!-- 使用内联样式动态设置动画延迟 -->
                    <span v-for="(char, index) in text1.split('')" :key="index" class="animated-char"
                        :style="{ animationDelay: `${index * 0.3}s`, WebkitAnimationDelay: `${index * 0.4}s` }">{{ char
                        }}</span>
                </div>
            </div>
            <div class="text2">
                <a :class="{ 'cursor-animation': showCursor }">{{ text2 }}</a>
            </div>
        </div>
        <!-- 在封面的最底部做波浪 -->
        <!-- <div class="sea">
            <div class="wave"></div>
            <div class="wave"></div>
            <el-image class="roll_icon" :src="roll_icon"></el-image>
        </div> -->
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 接收传递的高度参数，默认为300px
const props = defineProps({
    height: {
        type: String,
        default: '300px'
    }
})

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
import xia from '@/assets/icons/xia.png'
const bg_url_list = [
    bg1Url,
    bg2Url,
    bg3Url,
    bg4Url,
    bg5Url,
    bg6Url,
    bg7Url,
    bg8Url,
    bg9Url,
    bg10Url
]
const bg_index = ref(6)
const roll_icon = xia
const text1 = ref('HeDong个人站')
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


//changeBg
const changeBg = () => {
    // 先将当前图片淡出
    const currentImage = document.querySelector('.bg-image');
    if (currentImage) {
        currentImage.style.opacity = '0';

        // 等待过渡完成后切换图片
        setTimeout(() => {
            bg_index.value = (bg_index.value + 1) % bg_url_list.length;
            // 然后将新图片淡入
            setTimeout(() => {
                currentImage.style.opacity = '1';
            }, 50);
        }, 750); // 这个时间应该是过渡时间的一半，确保平滑衔接
    } else {
        // 如果没有找到元素，直接切换
        bg_index.value = (bg_index.value + 1) % bg_url_list.length;
    }
}
// 文字掉落效果函数
const dropChar = (char) => {
    // 获取text2 a元素（这是文字真正显示的地方）
    const textElement = document.querySelector('.text2 a')
    if (!textElement) return

    // 获取 Cover 元素作为容器的参照物
    const coverElement = document.querySelector('.cover')
    if (!coverElement) return


    // 创建一个容器用于显示掉落字符（如果不存在）
    let droppingContainer = document.getElementById('dropping-chars-container')
    if (!droppingContainer) {
        droppingContainer = document.createElement('div')
        droppingContainer.id = 'dropping-chars-container'
        droppingContainer.style.position = 'absolute'
        droppingContainer.style.top = '0'
        droppingContainer.style.left = '0'
        droppingContainer.style.width = '100%'
        droppingContainer.style.height = '100%'
        droppingContainer.style.overflow = 'hidden'
        droppingContainer.style.pointerEvents = 'none'
        droppingContainer.style.zIndex = '999'
        coverElement.appendChild(droppingContainer)
    }

    // 创建字符元素
    const charElement = document.createElement('span')
    charElement.innerText = char
    charElement.style.position = 'absolute'
    charElement.style.zIndex = '999'
    charElement.style.color = 'white'
    charElement.style.fontSize = '20px'

    // 添加到固定容器中
    droppingContainer.appendChild(charElement)

    // 获取文本位置信息
    const targetRect = textElement.getBoundingClientRect()

    // 计算字符的初始位置（文本末尾）
    const textLength = textElement.textContent.length
    const charWidth = 20 // 估计每个字符的宽度
    // 最后一个字符的位置
    const lastCharPosition = targetRect.left + textLength * charWidth - charWidth

    // 设置初始位置为文本的最后一个字符的位置
    charElement.style.left = `${lastCharPosition}px`
    charElement.style.top = `${targetRect.top}px`

    // 强制重排，让元素立即显示
    void charElement.getBoundingClientRect()

    // 设置动画过渡
    charElement.style.transition = 'all 1.2s cubic-bezier(0.55, 0.085, 0.68, 0.53)'

    // 计算最终位置（随机向下掉落，但限制在cover内）
    const randomX = lastCharPosition + (Math.random() * 100 - 50)
    const randomY = coverElement.clientHeight - 20 // 确保掉到cover底部

    // 添加旋转效果
    charElement.style.transform = `translate(${randomX - lastCharPosition}px, ${randomY - targetRect.top}px) rotate(${Math.random() * 720 - 360}deg)`

    // 逐渐变透明
    charElement.style.opacity = '0'

    // 动画结束后移除元素
    setTimeout(() => {
        charElement.remove()
    }, 1500)
}
// 清除文字效果函数
const clearText = () => {
    const textLength = text2.value.length
    let clearIndex = textLength

    const clearTimer = setInterval(() => {
        if (clearIndex > 0) {
            const last_char = text2.value[text2.value.length - 1]
            dropChar(last_char)
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
// 打字效果函数
const typeText = () => {
    const currentText = fullTextList[currentTextIndex]
    currentIndex = 0

    // 存储每个字符的回调，以便按顺序处理
    const charCallbacks = []

    // 初始化所有字符的回调
    for (let i = 0; i < currentText.length; i++) {
        charCallbacks[i] = false
    }

    // 检查是否可以添加下一个字符
    const checkAndAddChar = () => {
        // 找到最小的未处理的索引
        let nextIndex = charCallbacks.findIndex(cb => cb === true)

        if (nextIndex !== -1) {
            // 将该字符添加到文本中
            text2.value += currentText[nextIndex]

            // 标记为已处理
            charCallbacks[nextIndex] = false

            // 处理队列中的下一个字符
            setTimeout(checkAndAddChar, 10)
        }
    }

    // 启动所有字符的飞行，按一定的时间间隔
    const launchChars = () => {
        for (let i = 0; i < currentText.length; i++) {
            setTimeout(() => {
                flyText(currentText[i], i, () => {
                    // 标记该字符已经到达目标位置
                    charCallbacks[i] = true

                    // 尝试添加字符
                    checkAndAddChar()
                })
            }, i * 150) // 每150ms发射一个新字符
        }

        // 所有字符发射完毕后，等待一段时间再清除
        setTimeout(() => {
            // 切换到下一句话
            currentTextIndex = (currentTextIndex + 1) % fullTextList.length
            clearText()
        }, currentText.length * 150 + 2000) // 等待所有字符飞行并额外停留2秒
    }

    // 开始发射字符
    launchChars()
}

//flyText，文字飞入效果 (添加回调参数)
const flyText = (char, i, callback) => {

    // 获取text2 a元素（这是文字真正显示的地方）
    const textElement = document.querySelector('.text2 a')
    if (!textElement) {
        if (callback) callback() // 如果没有找到元素，仍要执行回调
        return
    }


    // 获取 Cover 元素作为容器的参照物
    const coverElement = document.querySelector('.cover')
    if (!coverElement) {
        if (callback) callback()
        return
    }

    // 创建一个容器用于显示飞行字符（如果不存在）
    let flyingContainer = document.getElementById('flying-chars-container')
    if (!flyingContainer) {
        flyingContainer = document.createElement('div')
        flyingContainer.id = 'flying-chars-container'
        flyingContainer.style.position = 'absolute'
        flyingContainer.style.top = '0'
        flyingContainer.style.left = '0'
        flyingContainer.style.width = '100%'
        flyingContainer.style.height = '100%'
        flyingContainer.style.overflow = 'hidden'
        flyingContainer.style.pointerEvents = 'none'
        flyingContainer.style.zIndex = '999'
        //color
        flyingContainer.style.color = 'white'
        coverElement.appendChild(flyingContainer)
    }


    // 创建字符元素
    const charElement = document.createElement('span')
    charElement.innerText = char
    charElement.style.position = 'absolute'
    charElement.style.zIndex = '999'

    // 添加到固定容器中
    flyingContainer.appendChild(charElement)

    // 随机起始位置 (屏幕四周)
    const startPosition = Math.floor(Math.random() * 4) // 0-3

    // 计算安全的边界位置（现在是相对于cover的大小）
    const safeWidth = coverElement.clientWidth - 20
    const safeHeight = coverElement.clientHeight - 20

    // 设置随机起始位置 (上、右、下、左)
    switch (startPosition) {
        case 0: // 顶部
            charElement.style.top = '10px'
            charElement.style.left = Math.floor(Math.random() * safeWidth) + 10 + 'px'
            break
        case 1: // 右侧
            charElement.style.top = Math.floor(Math.random() * safeHeight) + 10 + 'px'
            charElement.style.left = safeWidth + 'px'
            break
        case 2: // 底部
            charElement.style.top = safeHeight + 'px'
            charElement.style.left = Math.floor(Math.random() * safeWidth) + 10 + 'px'
            break
        case 3: // 左侧
            charElement.style.top = Math.floor(Math.random() * safeHeight) + 10 + 'px'
            charElement.style.left = '10px'
            break
    }

    // 样式设置
    charElement.style.color = 'white'
    charElement.style.fontSize = '20px'
    charElement.style.transition = 'all 0.8s ease-in-out'

    // 获取目标元素的位置信息（文字应该飞到的位置）
    const targetRect = textElement.getBoundingClientRect()

    // 计算目标位置时获取相对于飞行容器的坐标
    const coverRect = coverElement.getBoundingClientRect()
    const targetX = targetRect.left - coverRect.left + 14 * i
    const targetY = targetRect.top - coverRect.top + targetRect.height / 2

    // 强制重排，让元素立即显示
    void charElement.getBoundingClientRect()

    // 设置最终位置（飞向文本的末尾位置）
    charElement.style.top = `${targetY}px`
    charElement.style.left = `${targetX}px`
    charElement.style.transform = 'translate(-50%, -50%)'

    // 当过渡动画完成时，执行回调
    charElement.addEventListener('transitionend', function handler() {
        // 移除事件监听器以避免多次触发
        charElement.removeEventListener('transitionend', handler)

        // 2. 飞行文字到达目标位置了，触发回调
        if (callback) callback()

        // 飞行完成后，淡出并移除元素
        charElement.style.opacity = '0'
        charElement.remove()
    })
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
html,
body {
    overflow-x: hidden;
}

.cover {
    width: 100%;
    overflow: hidden;
    position: relative;

    .bg-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        /* 添加过渡效果 */
        transition: opacity 1.5s ease;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 1;
    }

    /* 可以添加淡出类 */
    .bg-image-fade-out {
        opacity: 0;
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

/* 海平面 */
.sea {
    width: 100%;
    height: 5%;
    background-color: #015871;
    /* 绝对定位 底部 */
    position: absolute;
    left: 0;
    bottom: 0;

}

.roll_icon {
    width: 70px;
    height: 40px;
    position: absolute;
    opacity: .6;
    left: calc(50% - 25px);
    animation: rollFloat 2s ease-in-out infinite alternate;
    /* 新增上下浮动动画 */
}

@keyframes rollFloat {
    0% {
        transform: translate(0, -20px);
    }

    100% {
        transform: translate(0, -70px);
    }
}

.wave {
    background: url("@/assets/icons/wave.svg") repeat-x;
    width: 6400px;
    height: 98px;
    /* 绝对定位 */
    position: absolute;
    top: -98px;
    /* 执行波动动画：动画名 时长 贝塞尔曲线 无限次播放 */
    animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
}

.wave:nth-child(2) {
    top: -75px;
    /* 执行波动+上下浮动动画 */
    animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite, swell 7s ease infinite;
    animation-delay: -0.2s;
}

/* 定义动画 */
/* 波动动画 */
@keyframes wave {
    0% {
        margin-left: 0;
    }

    100% {
        margin-left: -1600px;
    }
}

/* 上下浮动动画 */
@keyframes swell {

    0%,
    100% {
        transform: translate(0, -25px);
    }

    50% {
        transform: translate(0, 5px);
    }
}
</style>