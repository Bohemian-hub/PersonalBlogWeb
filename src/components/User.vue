<template>
    <div class="user">
        <!-- 放一个小三角 -->
        <div class="angle"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

</script>

<style scoped>
.user {
    width: 400px;
    height: 600px;
    background-color: white;
    position: fixed;
    right: 10px;
    top: 60px;
    border-radius: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .angle {
        position: absolute;
        width: 0;
        height: 0;
        /* 使用边框创建三角形 */
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid white;
        /* 位置调整 */
        top: -8px;
        right: 28px;
        /* 添加阴影效果 */
        filter: drop-shadow(0 -2px 2px rgba(0, 0, 0, 0.1));
    }
}
</style>