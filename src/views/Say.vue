<template>
    <TopBar />
    <!-- 添加主题切换按钮 -->
    <ThemeToggler class="home-theme-toggler" />
    <div class="page-wrapper" :class="currentTheme">
        <!-- 页面内容区域 -->
        <div class="page-content">
            <!-- 使用封装的页面标题组件 -->
            <PageHeader title="互动集市" description="在这里留下你的想法，与其他访客交流互动" icon="💬" />

            <!-- 弹幕墙区域 -->
            <div class="danmaku-wall">
                <div class="danmaku-container">
                    <div v-for="message in visibleMessages" :key="message.id" class="danmaku-item" :style="{
                        top: `${message.trackIndex * 60 + 20}px`,
                        animationDuration: `${message.speed}s`,
                        '--danmaku-width': message.width + 'px'
                    }">
                        <div class="danmaku-avatar">
                            <img :src="message.avatar" :alt="message.username">
                        </div>
                        <div class="danmaku-content">
                            <span class="danmaku-username">{{ message.username }}:</span>
                            <span class="danmaku-text">{{ message.text }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 发送弹幕的输入框 -->
            <div class="message-input-container">
                <div class="message-input-wrapper">
                    <div class="avatar-preview">
                        <img :src="userAvatar" alt="Your avatar">
                    </div>
                    <input v-model="newMessage" type="text" class="message-input" placeholder="在此输入你想说的话..."
                        @keyup.enter="sendMessage" />
                    <el-button type="primary" class="send-button" :disabled="!newMessage.trim()" @click="sendMessage">
                        发送
                    </el-button>
                </div>
            </div>
        </div>
    </div>
    <!-- 底部版权和备案信息 -->
    <Footer />
    <el-image class="bg-image" :src="bgUrl" :fit="'cover'" draggable="false"
        :class="{ 'dim-bg': currentTheme === 'dark' }" />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import TopBar from '../components/TopBar.vue'
import Footer from '../components/Footer.vue'
import ThemeToggler from '../components/ThemeToggler.vue'
import PageHeader from '../components/PageHeader.vue'
import { currentTheme } from '../stores/themeStore'
import { ElMessage } from 'element-plus'
import bgFile from '@/assets/images/bg3.png' // 确保这个图片存在，否则请替换

// 背景图片
const bgUrl = bgFile

// 用户头像 - 实际应用中可能从用户系统获取
const userAvatar = ref('https://randomuser.me/api/portraits/men/32.jpg')

// 新消息输入
const newMessage = ref('')

// 弹幕墙配置
const maxTracks = 8 // 最大轨道数
const maxVisibleMessages = 50 // 最大可见消息数

// 示例消息数据 - 简化版，不再包含speed、delay、paused字段
const messages = ref([
    {
        id: 1,
        username: '旅行爱好者',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        text: '风景真美啊，下次我也要去这个地方！',
    },
    {
        id: 2,
        username: '科技迷',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
        text: '这篇文章讲解得很清晰，学到了很多知识',
    },
    {
        id: 3,
        username: '读书人',
        avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
        text: '最近在看《思考，快与慢》，很推荐大家阅读',
    },
    {
        id: 4,
        username: '摄影师',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        text: '请问博主用的什么相机拍摄的？画质太棒了',
    },
    {
        id: 5,
        username: '美食家',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
        text: '这家餐厅我也去过，味道确实不错！推荐大家尝试',
    }
])

// 为每条消息分配轨道和速度
const initializeMessages = () => {
    const assignedTracks = [];

    messages.value.forEach((message, index) => {
        // 分配轨道 (0 到 maxTracks-1)
        let trackIndex = index % maxTracks;
        while (assignedTracks.includes(trackIndex)) {
            trackIndex = (trackIndex + 1) % maxTracks;
        }
        assignedTracks.push(trackIndex);

        // 分配动画持续时间 (25-35秒)
        const speed = 25 + Math.random() * 10;

        // 更新消息对象
        message.trackIndex = trackIndex;
        message.speed = speed;
    });

    // 在下一个DOM更新周期后测量每条消息宽度
    nextTick(() => {
        const danmakuItems = document.querySelectorAll('.danmaku-item');
        danmakuItems.forEach((item, index) => {
            if (index < messages.value.length) {
                messages.value[index].width = item.offsetWidth;
            }
        });
    });
}

// 当前可见的消息
const visibleMessages = computed(() => {
    return messages.value.slice(0, maxVisibleMessages);
})


// 发送新消息
const sendMessage = () => {
    if (!newMessage.value.trim()) return;

    // 创建临时消息对象用于尺寸计算
    const tempMessage = document.createElement('div');
    tempMessage.className = 'danmaku-item temp-measure';
    tempMessage.innerHTML = `
        <div class="danmaku-avatar">
            <img src="${userAvatar.value}" alt="Your avatar">
        </div>
        <div class="danmaku-content">
            <span class="danmaku-username">访客:</span>
            <span class="danmaku-text">${newMessage.value}</span>
        </div>
    `;
    document.body.appendChild(tempMessage);
    const messageWidth = tempMessage.offsetWidth;
    document.body.removeChild(tempMessage);

    // 创建新消息对象
    const newMsg = {
        id: Date.now(), // 使用时间戳作为ID
        username: '访客', // 实际应用中可能从用户信息获取
        avatar: userAvatar.value,
        text: newMessage.value,
        trackIndex: Math.floor(Math.random() * maxTracks),
        speed: 25 + Math.random() * 10,
        width: messageWidth
    };

    // 1秒后添加到消息列表
    setTimeout(() => {
        messages.value.push(newMsg);

        // 保持消息数量在可控范围内
        if (messages.value.length > maxVisibleMessages) {
            messages.value = messages.value.slice(messages.value.length - maxVisibleMessages);
        }
    }, 1000);

    // 清空输入框
    newMessage.value = '';

    // 提示用户
    ElMessage({
        message: '弹幕发送成功！',
        type: 'success',
        duration: 2000
    });
}

// 自动定期添加随机消息，模拟活跃的弹幕墙
let autoMessageInterval;

onMounted(() => {
    // 初始化消息轨道和速度
    initializeMessages();

});

onUnmounted(() => {
    // 清除自动消息定时器
    if (autoMessageInterval) {
        clearInterval(autoMessageInterval);
    }
});
</script>

<style scoped>
/* 主题变量定义 - 参考其他页面样式 */
.page-wrapper.dark {
    --bg-primary: rgba(25, 25, 35, 0.173);
    --bg-secondary: rgba(30, 30, 40, 0.416);
    --bg-tertiary: rgba(96, 96, 106, 0.4);
    --text-color: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.8);
    --title-gradient: linear-gradient(45deg, #ffffff, #b8c6db);
    --title-shadow: 0 2px 4px rgba(216, 216, 216, 0.5);
    --divider-color: rgba(255, 255, 255, 0.5);
    --card-bg: rgba(30, 30, 40, 0.7);
    --card-bg-hover: rgba(40, 40, 55, 0.8);
    --card-border: rgba(255, 255, 255, 0.1);
    --card-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    --accent-color: #5a9eff;
    --accent-secondary: #4a90e2;
    --heading-color: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.6);
    --tag-bg: rgba(60, 60, 80, 0.7);
    --tag-text: #ffffff;
    --card-hover-transform: translateY(-4px);
    --danmaku-bg: rgba(40, 40, 60, 0.6);
    --danmaku-hover-border: rgba(90, 158, 255, 0.8);
    --input-bg: rgba(40, 40, 60, 0.8);
    --input-text: #ffffff;
    --input-border: rgba(255, 255, 255, 0.2);
}

.page-wrapper.light {
    --bg-primary: rgba(245, 245, 250, 0.85);
    --bg-secondary: rgba(255, 255, 255, 0.9);
    --bg-tertiary: rgba(235, 235, 245, 0.7);
    --text-color: #333333;
    --text-secondary: rgba(0, 0, 0, 0.7);
    --title-gradient: linear-gradient(45deg, #333333, #555555);
    --title-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    --divider-color: rgba(0, 0, 0, 0.2);
    --card-bg: rgba(255, 255, 255, 0.85);
    --card-bg-hover: rgba(255, 255, 255, 0.95);
    --card-border: rgba(0, 0, 0, 0.1);
    --card-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    --accent-color: #3a7bd5;
    --accent-secondary: #3a7bd5;
    --heading-color: #333333;
    --text-muted: rgba(0, 0, 0, 0.5);
    --tag-bg: rgba(240, 240, 245, 0.8);
    --tag-text: #333333;
    --card-hover-transform: translateY(-3px);
    --danmaku-bg: rgba(255, 255, 255, 0.75);
    --danmaku-hover-border: rgba(58, 123, 213, 0.8);
    --input-bg: rgba(255, 255, 255, 0.8);
    --input-text: #333333;
    --input-border: rgba(0, 0, 0, 0.1);
}

.bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.5s ease;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
    z-index: -2;
}

.bg-image.dim-bg {
    filter: brightness(0.9) saturate(0.8);
}

.page-wrapper {
    min-height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
    padding-bottom: 100px;
    position: relative;
}

.page-wrapper::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
}

.page-content {
    padding: 80px 40px 40px;
    /* 移除最大宽度限制 */
    width: 100%;
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
}

.home-theme-toggler {
    position: fixed;
    bottom: 30px;
    left: 30px;
    z-index: 1000;
}

.page-header {
    text-align: center;
    margin-bottom: 40px;
    position: relative;
}

.page-title {
    font-size: 40px;
    margin-bottom: 16px;
    font-weight: 600;
    background: var(--title-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    letter-spacing: 2px;
    text-shadow: var(--title-shadow);
}

.description {
    font-size: 18px;
    opacity: 0.95;
    margin-bottom: 20px;
    font-style: italic;
    max-width: 800px;
    margin: 0 auto 30px;
    text-shadow: var(--title-shadow);
    color: var(--text-secondary);
}

.divider {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
}

.divider::before,
.divider::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--divider-color);
    margin: 0 15px;
}

.divider-icon {
    font-size: 24px;
}

/* 弹幕墙样式改进 */
.danmaku-wall {
    position: relative;
    width: 100%;
    height: calc(100vh - 400px);
    min-height: 400px;
    overflow: hidden;
    margin-bottom: 20px;
}

.danmaku-container {
    position: relative;
    width: 100%;
    height: 100%;
}

/* 临时测量元素样式 */
.temp-measure {
    position: absolute;
    visibility: hidden;
    top: -9999px;
    left: -9999px;
}

.danmaku-item {
    position: absolute;
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border-radius: 40px;
    background-color: var(--danmaku-bg);
    backdrop-filter: blur(8px);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    z-index: 1;
    left: 100%;
    animation: danmaku-scroll linear infinite;
    border: 2px solid transparent;
    max-width: 80%;
    transition: border-color 0.3s ease, transform 0.3s ease, color 0.3s ease;
    will-change: transform;
}

.danmaku-item:hover {
    border-color: var(--danmaku-hover-border);
    transform: translateY(-3px);
    z-index: 10;
    animation-play-state: paused;
    /* 鼠标悬停时暂停动画 */
}

.danmaku-item:hover .danmaku-text {
    color: #ffffff;
}

.danmaku-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    flex-shrink: 0;
}

.danmaku-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.danmaku-content {
    display: flex;
    align-items: center;
    gap: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.danmaku-username {
    font-weight: 600;
    color: var(--accent-color);
    font-size: 14px;
}

.danmaku-text {
    color: var(--text-color);
    font-size: 14px;
}

/* 输入框样式 */
.message-input-container {
    position: fixed;
    bottom: 80px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0 20px;
    z-index: 100;
}

.message-input-wrapper {
    display: flex;
    align-items: center;
    max-width: 800px;
    width: 100%;
    background-color: var(--input-bg);
    backdrop-filter: blur(15px);
    border: 1px solid var(--input-border);
    border-radius: 40px;
    padding: 8px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.message-input-wrapper:focus-within {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
    border-color: var(--accent-color);
}

.avatar-preview {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    flex-shrink: 0;
}

.avatar-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.message-input {
    flex: 1;
    height: 36px;
    border: none;
    background: transparent;
    color: var(--input-text);
    padding: 0 10px;
    font-size: 15px;
    outline: none;
}

.message-input::placeholder {
    color: var(--text-muted);
}

.send-button {
    height: 36px;
    border-radius: 18px;
    padding: 0 20px;
    font-size: 14px;
    font-weight: 500;
}

/* 改进的弹幕动画 - 使用CSS变量动态设置动画 */
@keyframes danmaku-scroll {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(calc(-100% - var(--danmaku-width) - 100vw));
    }
}

/* 响应式布局 */
@media (max-width: 768px) {
    .page-content {
        padding: 60px 20px 40px;
    }

    .page-title {
        font-size: 32px;
    }

    .description {
        font-size: 16px;
    }

    .danmaku-wall {
        height: calc(100vh - 350px);
        min-height: 300px;
    }

    .message-input-container {
        bottom: 70px;
    }

    .home-theme-toggler {
        bottom: 20px;
        left: 20px;
    }
}

@media (max-width: 480px) {
    .page-title {
        font-size: 28px;
    }

    .danmaku-item {
        padding: 6px 12px;
        max-width: 90%;
    }

    .danmaku-avatar {
        width: 24px;
        height: 24px;
    }

    .danmaku-username,
    .danmaku-text {
        font-size: 12px;
    }

    .message-input-wrapper {
        padding: 6px;
    }

    .avatar-preview {
        width: 30px;
        height: 30px;
    }

    .message-input {
        font-size: 14px;
    }

    .send-button {
        padding: 0 15px;
        font-size: 13px;
    }
}
</style>