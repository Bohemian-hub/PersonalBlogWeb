<template>
  <footer class="site-footer" :class="currentTheme">
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
import { currentTheme } from '../stores/themeStore'

// 计算网站运行天数
const runningDays = computed(() => {
  const startDate = new Date('2024-01-01') // 假设网站从2024年1月1日开始运行
  const today = new Date()
  const diffTime = Math.abs(today - startDate)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
})
</script>

<style scoped>
/* 主题变量定义 */
.site-footer.dark {
  --footer-bg: rgba(25, 25, 35, 0.75);
  --text-color: rgba(255, 255, 255, 0.8);
  --border-color: rgba(255, 255, 255, 0.1);
  --title-gradient: linear-gradient(45deg, #ffffff, #b8c6db);
  --link-color: rgba(255, 255, 255, 0.8);
  --link-hover-color: white;
}

.site-footer.light {
  --footer-bg: rgba(245, 245, 250, 0.85);
  --text-color: rgba(0, 0, 0, 0.7);
  --border-color: rgba(0, 0, 0, 0.1);
  --title-gradient: linear-gradient(45deg, #333333, #666666);
  --link-color: rgba(0, 0, 0, 0.7);
  --link-hover-color: #000;
}

/* 底部组件样式 */
.site-footer {
  width: 100%;
  background-color: var(--footer-bg);
  backdrop-filter: blur(10px);
  color: var(--text-color);
  position: relative;
  left: 0;
  z-index: 1;
  border-top: 1px solid var(--border-color);
  margin-top: auto;
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
  background: var(--title-gradient);
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
  border-top: 1px solid var(--border-color);
  font-size: 13px;
}

.footer-bottom p {
  margin: 5px 0;
}

.footer-bottom a {
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-bottom a:hover {
  color: var(--link-hover-color);
  text-decoration: underline;
}
</style>