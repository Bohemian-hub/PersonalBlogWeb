<template>
    <div class="cover" :style="{ height: height }" :class="currentTheme">
        <!-- 封面标题文字 -->
        <div class="cover_text" v-if="isComponentVisible">
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

    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { currentTheme } from '../stores/themeStore'

// 接收传递的高度参数，默认为300px
const props = defineProps({
    height: {
        type: String,
        default: '300px'
    }
})


const text1 = ref('纸醉金迷')
const fullTextList = [
    "投策命晨装，暂与园田疏。",
    "花明玉关雪，叶暖金窗烟。"
]
const text2 = ref('')
const showCursor = ref(true)

let currentIndex = 0
let currentTextIndex = 0 // 当前显示第几句话
// 添加控制组件显示/隐藏的状态变量
const isComponentVisible = ref(true)

// 添加计时器和定时器的引用
let cursorTimer = null;
let clearTextTimer = null;
const timeoutIds = [];
// 包装 setTimeout，记录 ID
const safeSetTimeout = (callback, delay) => {
    const id = setTimeout(callback, delay);
    timeoutIds.push(id);
    return id;
};

const clearAllTimeouts = () => {
    timeoutIds.forEach((id) => clearTimeout(id));
    timeoutIds.length = 0; // 清空数组
};

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
    //文字颜色根据主题
    charElement.style.color = currentTheme.value === 'dark' ? '#fff' : '#333'
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
    safeSetTimeout(() => {
        charElement.remove()
    }, 1200)
}
// 清除文字效果函数
const clearText = () => {
    const textLength = text2.value.length
    let clearIndex = textLength

    clearTextTimer = setInterval(() => {
        if (clearIndex > 0) {
            const last_char = text2.value[text2.value.length - 1]
            dropChar(last_char)
            text2.value = text2.value.slice(0, -1)
            clearIndex--
        } else {
            clearInterval(clearTextTimer)
            // 清除完成后等待1秒再开始打字效果
            safeSetTimeout(() => {
                typeText();
            }, 1000);
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
            safeSetTimeout(checkAndAddChar, 10)
        }
    }

    // 启动所有字符的飞行，按一定的时间间隔
    const launchChars = () => {
        for (let i = 0; i < currentText.length; i++) {
            safeSetTimeout(() => {
                flyText(currentText[i], i, () => {
                    charCallbacks[i] = true;
                    checkAndAddChar();
                });
            }, i * 150);
        }

        // 所有字符发射完毕后，等待一段时间再清除
        safeSetTimeout(() => {
            currentTextIndex = (currentTextIndex + 1) % fullTextList.length;
            clearText();
        }, currentText.length * 150 + 2000);
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
        coverElement.appendChild(flyingContainer)
    }


    // 创建字符元素
    const charElement = document.createElement('span')
    charElement.innerText = char
    charElement.style.position = 'absolute'
    charElement.style.zIndex = '999'
    charElement.style.color = currentTheme.value === 'dark' ? '#fff' : '#333'

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

    // 文字颜色根据主题
    charElement.style.color = currentTheme.value === 'dark' ? '#fff' : '#333'
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
    cursorTimer = setInterval(() => {
        showCursor.value = !showCursor.value
    }, 300)
}

// 检测页面可见性变化
const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
        isComponentVisible.value = true
        inputCunsor()
        typeText()
    } else {
        // 页面不可见时，执行关闭动画
        closeAnimate()
    }
};

const closeAnimate = () => {
    // console.log('关闭动画');
    // 当页面不可见时，隐藏组件
    isComponentVisible.value = false
    text2.value = '' // 清空文字
    currentTextIndex = 0 // 重置索引
    currentIndex = 0 // 重置索引
    // 清除所有飞行和掉落的字符
    const flyingContainer = document.getElementById('flying-chars-container')
    const droppingContainer = document.getElementById('dropping-chars-container')
    if (flyingContainer) flyingContainer.remove(); // 移除飞行字符容器
    if (droppingContainer) droppingContainer.remove(); // 移除掉落字符容器
    // 清除光标
    showCursor.value = false
    // 清除所有计时器、定时器
    if (cursorTimer) clearInterval(cursorTimer);
    if (clearTextTimer) clearInterval(clearTextTimer);


    clearAllTimeouts();
};

onMounted(() => {
    // 初始化动画效果
    inputCunsor()
    typeText()

    // 添加页面可见性变化监听器
    document.addEventListener('visibilitychange', handleVisibilityChange);
})

onUnmounted(() => {
    // 移除事件监听器以防止内存泄漏
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    closeAnimate()
})

</script>

<style scoped>
/* 主题变量定义 */
.cover.dark {
    --cover-text-color: #ffffff;
    --cover-text-shadow: 0 0 10px rgba(5, 5, 5, 0.5);
    --animated-char-reflection: rgba(0, 0, 0, 0.4);
    --text-bg-color: rgba(0, 0, 0, 0.2);
    --cursor-color: #fff;
    --sea-color: #015871;
    --char-color: white;
    --cover-border: rgba(255, 255, 255, 0.1);
}

.cover.light {
    --cover-text-color: #333333;
    --cover-text-shadow: 0 0 10px rgba(200, 200, 200, 0.5);
    --animated-char-reflection: rgba(100, 100, 100, 0.4);
    --text-bg-color: rgba(255, 255, 255, 0.3);
    --cursor-color: #333;
    --sea-color: #81c4e2;
    --char-color: #333;
    --cover-border: rgba(0, 0, 0, 0.1);
}

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
        width: 90%;
        /* 限制宽度，防止在小屏幕上过宽 */

        .text1 {
            height: 100px;
            /* background-color: red; */
            font-size: 40px;
            color: var(--cover-text-color);
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
                -webkit-box-reflect: below 0px linear-gradient(to bottom, rgba(225, 0, 0, 0), var(--animated-char-reflection));
                /* 添加一些间距，让倒影更明显 */
                padding-bottom: 5px;
                /* 可选：添加文字阴影使主文字更突出 */
                text-shadow: var(--cover-text-shadow);
            }
        }

        .text2 {
            font-size: 20px;
            border-radius: 10px;
            display: inline-block;
            padding: 15px 0;
            background-color: var(--text-bg-color);
            backdrop-filter: blur(10px);
            border: 1px solid var(--cover-border);
            color: var(--cover-text-color);
            min-width: 2px;
            max-width: 100%;
            /* 确保内容不超过父容器 */
            overflow: hidden;
            /* 防止内容溢出 */
            white-space: nowrap;
            /* 防止文本换行 */
            text-overflow: ellipsis;
            /* 如果文本溢出则显示省略号 */

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
                background-color: var(--cursor-color);
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
    background-color: var(--sea-color);
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