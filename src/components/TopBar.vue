<template>
  <div class="top-bar" :class="[{ 'hidden': !visible }, currentTheme]">
    <div class="site_title" @click="goHome">
      <!-- 将文本拆分为单独的字符 -->
      <span v-for="(char, index) in 'HEDONG'" :key="index" class="title-char"
        @mouseenter="setRandomColor($event.target)" @mouseleave="resetColor($event.target)">{{ char }}</span>
    </div>
    <div class="login_avatar" @click="toggleUserPanel">
      <el-image class="user_avatar" :src="notlogin"></el-image>
    </div>
    <!-- 汉堡菜单按钮 - 移动到头像左侧 -->
    <div class="mobile-menu-button" @click="toggleMobileMenu" :class="{ 'show': isMobileView }">
      <div class="menu-icon" :class="{ 'active': showMobileMenu }">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>


    <div class="site_menu" :class="{ 'hide': isMobileView }" ref="siteMenu">
      <div v-for="(item, index) in menuList" :key="index" class="menu_item" @click="navigate(item.route)"
        ref="menuItems">
        <el-image class="menu_item_icon" :src="item.icon"></el-image>
        <div class="menu_item_text">{{ item.text }}</div>
        <div class="menu_under"></div>
      </div>
    </div>
  </div>

  <!-- 直接显示菜单，不用遮罩层 -->
  <div class="mobile-menu" :class="currentTheme" v-if="showMobileMenu" @click.stop>
    <div v-for="(item, index) in menuList" :key="index" class="mobile-menu-item" @click="navigateAndClose(item.route)">
      <el-image class="mobile-menu-item-icon" :src="item.icon"></el-image>
      <div class="mobile-menu-item-text">{{ item.text }}</div>
    </div>
  </div>

  <User v-if="showUserPanel" />
</template>

<script setup>
import { ref, provide, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import User from './User.vue'
import { currentTheme } from '../stores/themeStore'

import icon_ai from '@/assets/icons/ai.png'
import icon_book from '@/assets/icons/book.png'
import icon_hudong from '@/assets/icons/hudong.png'
import icon_traval from '@/assets/icons/traval.png'
import icon_command from '@/assets/icons/command.png'
import icon_index from '@/assets/icons/index.png'
import icon_about from '@/assets/icons/about.png'
import notlogin from '@/assets/icons/notlogin.png'

// 控制用户面板显示状态
const showUserPanel = ref(false)
// 控制移动端菜单显示状态
const showMobileMenu = ref(false)
// 控制是否显示为移动端视图
const isMobileView = ref(false)
// 引用DOM元素
const siteMenu = ref(null)
const menuItems = ref([])

// 接收来自父组件的visible prop
const props = defineProps({
  visible: {
    type: Boolean,
    default: true
  }
})
provide('showUserPanel', showUserPanel)

// 响应式菜单数据
const menuList = ref([
  { text: '首页', icon: icon_index, route: '/' },
  { text: '我的文章', icon: icon_ai, route: '/research' },
  { text: '我的项目', icon: icon_command, route: '/studio' },
  { text: '朋友圈（开发中）', icon: icon_traval, route: '/play' },
  { text: '关于我', icon: icon_about, route: '/about' }
])
// 添加设置随机颜色的方法
const setRandomColor = (element) => {
  const colors = ['#e06614', '#ff4757', '#2ed573', '#1e90ff', '#ffa502', '#7bed9f', '#70a1ff', '#ff6b81'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  element.style.color = randomColor;
}
// 重置颜色
const resetColor = (element) => {
  element.style.color = '';
}
const router = useRouter()
function navigate(route) {
  router.push(route)
}

// 切换移动端菜单
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
}

// 关闭移动端菜单
const closeMobileMenu = () => {
  showMobileMenu.value = false;
}

// 导航并关闭菜单
const navigateAndClose = (route) => {
  navigate(route);
  closeMobileMenu();
}

function goHome() {
  router.push('/')
}
// 切换用户面板显示状态
const toggleUserPanel = () => {
  showUserPanel.value = !showUserPanel.value
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', handleResize)

  // 在下一个渲染周期检查菜单是否需要折叠
  nextTick(() => {
    checkMenuOverflow();
  });
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleResize)
  // 移除对body overflow的控制
})

// 窗口大小改变时处理
const handleResize = () => {
  checkMenuOverflow();

  if (!isMobileView.value && showMobileMenu.value) {
    closeMobileMenu();
  }
}

const handleClickOutside = (event) => {
  const userPanel = document.querySelector('.user');
  const loginAvatar = document.querySelector('.login_avatar');
  const passwordButton = event.target.closest('svg');

  if (userPanel &&  // 如果用户面板存在
    !userPanel.contains(event.target) &&  // 点击的不是用户面板
    loginAvatar &&  // 如果登录头像存在
    !loginAvatar.contains(event.target) &&  // 点击的不是登录头像
    !passwordButton  // 如果点击的不是密码按钮
  ) {
    showUserPanel.value = false;
  }
};

// 计算菜单需要的宽度和检查是否需要显示移动端视图
const checkMenuOverflow = () => {
  if (!siteMenu.value) return;

  // 计算顶部栏可用宽度（排除标题和头像区域）
  const topBarWidth = window.innerWidth;
  const siteTitleWidth = document.querySelector('.site_title')?.offsetWidth || 120;
  const siteTitleMargin = parseInt(getComputedStyle(document.querySelector('.site_title')).marginLeft) || 0;
  const loginAvatarWidth = document.querySelector('.login_avatar')?.offsetWidth || 70;
  const loginAvatarMargin = parseInt(getComputedStyle(document.querySelector('.login_avatar')).marginRight) || 0;
  const mobileButtonWidth = 50; // 为移动菜单按钮预留宽度
  // console.log(topBarWidth);
  // console.log(siteTitleWidth);
  // console.log(siteTitleMargin);
  // console.log(loginAvatarWidth);
  // console.log(loginAvatarMargin);
  // console.log(mobileButtonWidth);

  // 可用于菜单的空间
  const availableWidth = topBarWidth - siteTitleWidth - loginAvatarWidth - mobileButtonWidth - siteTitleMargin - loginAvatarMargin;
  // console.log(availableWidth);

  //直接获取包含了菜单的site_menu的总宽度
  const menuWidth = document.querySelector('.site_menu')?.offsetWidth || 815;
  // console.log(menuWidth);
  // 如果可用宽度小于菜单需要的宽度，切换到移动端视图
  isMobileView.value = availableWidth < menuWidth;

}
</script>

<style scoped>
/* 主题变量定义 */
.top-bar.dark,
.mobile-menu.dark {
  --top-bar-bg: rgba(65, 65, 65, 0.2);
  --top-bar-hover-bg: rgba(65, 65, 65, 0.4);
  --text-color: #fff;
  --text-hover-color: #e06614;
  --underline-color: #e06614;
  --menu-bg: rgba(65, 65, 65, 0.4);
  --menu-border: rgba(255, 255, 255, 0.5);
  --menu-hover-bg: rgba(224, 102, 20, 0.2);
  --menu-active-bg: rgba(224, 102, 20, 0.4);
  backdrop-filter: blur(10px);
}

.top-bar.light,
.mobile-menu.light {
  --top-bar-bg: rgba(255, 255, 255, 0.3);
  --top-bar-hover-bg: rgba(255, 255, 255, 0.5);
  --text-color: #333;
  --text-hover-color: #e06614;
  --underline-color: #e06614;
  --menu-bg: rgba(255, 255, 255, 0.4);
  --menu-border: rgba(255, 255, 255, 0.6);
  --menu-hover-bg: rgba(224, 102, 20, 0.1);
  --menu-active-bg: rgba(224, 102, 20, 0.2);
  backdrop-filter: blur(10px);
}

.top-bar {
  position: fixed;
  top: 0;
  z-index: 100;
  /* 使用更高的值 */
  width: 100%;
  height: 50px;
  /* 修改为更快的动画 */
  transition: opacity 0.3s ease, transform 0.3s ease;
  /* 加一点点默认的背景色，没有 hover 时候那么浓 */
  background-color: var(--top-bar-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--menu-border);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.top-bar.hidden {
  opacity: 0;
  transform: translateY(-100%);
  pointer-events: none;
}

.top-bar:hover {
  background-color: var(--top-bar-hover-bg);
  transition: background-color 0.3s ease-in-out;
}

.site_title {
  float: left;
  width: 100px;
  height: 50px;
  line-height: 50px;
  margin-left: 20px;
  font-size: 20px;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
}

.title-char {
  color: var(--text-color);
  transition: color 0.3s ease-in-out;
  display: inline-block;
  /* 让每个字符可以独立应用过渡效果 */
}

.title-char:hover {
  transform: scale(1.2);
  /* 可选：添加放大效果 */
}

.site_menu {
  float: right;
  height: 50px;
}

.menu_item {
  width: auto;
  margin-right: 20px;
  height: 50px;
  float: left;
  cursor: pointer;
}

.menu_item_icon {
  width: 20px;
  height: 20px;
  margin: 15px 10px 10px 10px;
  float: left;
  /* 添加过渡效果，使尺寸和位置变化更平滑 */
  transition: all 0.1s ease-in-out;
}

.menu_item_text {
  height: 20px;
  margin: 15px 5px 10px 5px;
  line-height: 20px;
  font-size: 14px;
  color: var(--text-color);
  float: left;
}

.menu_under {
  width: 0px;
  float: left;
  height: 5px;
  background-color: var(--underline-color);
  transition: width 0.3s ease-in-out;
  /* 添加过渡动画 */
}

.menu_item:hover .menu_item_icon {
  width: 30px;
  height: 30px;
  margin: 10px 5px 5px 5px;
}

.menu_item:hover .menu_item_text {
  height: 20px;
  margin: 15px 5px 10px 5px;
  line-height: 20px;
  font-size: 14px;
  color: var(--text-hover-color);
  font-weight: 800;
}

.menu_item:hover .menu_under {
  width: 100%;
  float: left;
  height: 5px;
  background-color: var(--underline-color);
}

.login_avatar {
  margin-right: 20px;
  height: 50px;
  width: 50px;
  float: right;
  border-radius: 50%;
  display: flex;
}

.user_avatar {
  width: 40px;
  height: 40px;
  margin: 5px;
  border-radius: 50%;
}

.login_avatar:hover {
  cursor: pointer;
  box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05), 15px 25px 10px rgba(0, 0, 0, 0.05), 15px 20px 20px rgba(0, 0, 0, 0.05);
  background-color: var(--top-bar-hover-bg);
}

/* 移动端菜单按钮样式 - 默认隐藏 */
.mobile-menu-button {
  display: none;
  width: 40px;
  height: 40px;
  margin: 5px;
  float: right;
  cursor: pointer;
  z-index: 2;
  padding: 10px;
}

.mobile-menu-button.show {
  display: block;
}

.menu-icon {
  position: relative;
  width: 20px;
  height: 20px;
}

.menu-icon span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: var(--text-color);
  border-radius: 2px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: .25s ease-in-out;
}

/* 添加三条线的位置定义 */
.menu-icon span:nth-child(1) {
  top: 0px;
}

.menu-icon span:nth-child(2) {
  top: 9px;
}

.menu-icon span:nth-child(3) {
  top: 18px;
}

/* 添加激活状态下的动画 */
.menu-icon.active span:nth-child(1) {
  top: 9px;
  transform: rotate(45deg);
}

.menu-icon.active span:nth-child(2) {
  opacity: 0;
  width: 0%;
}

.menu-icon.active span:nth-child(3) {
  top: 9px;
  transform: rotate(-45deg);
}

/* 更新移动端菜单样式 */
.mobile-menu {
  position: fixed;
  top: 50px;
  left: 0;
  width: 100%;
  height: auto;
  max-height: calc(100vh - 50px);
  background-color: var(--menu-bg);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  animation: slideDown 0.3s ease-out;
  z-index: 999;
}

/* 修改动画为从上到下滑动 */
@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
}

/* 响应式布局 - 使用类控制而不是媒体查询 */
.site_menu.hide {
  display: none;
}

/* 保留媒体查询做为回退方案 */
@media (max-width: 768px) {
  .site_menu {
    display: none;
  }

  .mobile-menu-button {
    display: block;
  }

  .site_title {
    margin-left: 5px;
  }

  .login_avatar {
    margin-right: 10px;
  }
}

/* 移动端菜单项样式 */
.mobile-menu-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid var(--menu-border);
  transition: background-color 0.3s ease;
}

.mobile-menu-item:last-child {
  border-bottom: none;
}

.mobile-menu-item:hover {
  background-color: var(--menu-hover-bg);
}

.mobile-menu-item-icon {
  width: 24px;
  height: 24px;
  margin-right: 15px;
}

.mobile-menu-item-text {
  color: var(--text-color);
  font-size: 16px;
  font-weight: 500;
}

.mobile-menu-item:active {
  background-color: var(--menu-active-bg);
}
</style>