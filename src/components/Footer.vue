<template>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="site-info">
        <h3>何东的个人博客</h3>
        <p>浅夜未央，星河流转，无论走到哪里，都是追寻自我的旅程</p>
      </div>
      <div class="footer-bottom">
        <p>© 2025 HEDONG |
        运行 {{ runningDays }} 天 | <a href="mailto:2605191106@qq.com">联系我</a></p>
        <p>粤ICP备XXXXXXXX号 | <a href="#">隐私政策</a> | <a href="#">使用条款</a></p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

// 计算网站运行天数
const runningDays = computed(() => {
const startDate = new Date('2024-01-01') // 假设网站从2024年1月1日开始运行
const today = new Date()
const diffTime = Math.abs(today - startDate)
return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
})
</script>

<style scoped>
/* 底部组件样式 */
.site-footer {
width: 100%;
background-color: rgba(25, 25, 35, 0.75);
  backdrop-filter: blur(10px);
  color: rgba(255, 255, 255, 0.8);
position: relative; /* 改为相对定位，不再固定 */
left: 0;
z-index: 1;
border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
max-width: 1400px;
margin: 0 auto;
padding: 25px 40px;
text-align: center;
}

.site-info {
margin-bottom: 20px;
}

.site-info h3 {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
  background: linear-gradient(45deg, #ffffff, #b8c6db);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
  

.site-info p {
font-size: 14px;
opacity: 0.8;
max-width: 600px;
margin: 0 auto;
font-style: italic;
}

.footer-bottom {
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 13px;
}
  
.footer-bottom p {
  margin: 5px 0;
}
  
.footer-bottom a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.2s ease;
}
  
.footer-bottom a:hover {
  color: white;
  text-decoration: underline;
}
/* 移除悬停效果 */
</style>