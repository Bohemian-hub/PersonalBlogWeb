<template>
    <div class="user" :class="{ 'show-panel': isShow }">
        <!-- 放一个小三角 -->
        <div class="angle"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isShow = ref(false)

onMounted(() => {
    // 添加一个小延迟，确保 DOM 已经渲染
    setTimeout(() => {
        isShow.value = true
    }, 100)
})
</script>

<style scoped>
.user {
    width: 400px;
    height: 0;
    /* 初始高度为0 */
    background-color: white;
    position: fixed;
    right: 10px;
    top: 60px;
    border-radius: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    /* overflow: hidden; 这里不能防止内容溢出，因为小三角需要展示，主体内容加上防止内容溢出 */
    opacity: 0;
    /* 初始透明度为0 */
    transition: all 0.3s ease-out;
    /* 添加过渡效果 */

    .angle {
        position: absolute;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid white;
        /* 改为白色，与面板背景色相同 */
        top: -8px;
        right: 28px;
        filter: drop-shadow(0 -2px 2px rgba(0, 0, 0, 0.1));
    }
}

.show-panel {
    height: 600px;
    /* 可以根据需要调整高度 */
    opacity: 1;
}
</style>