<template>
  <div class="top-bar" :class="{ 'hidden': !visible }">
    <div class="site_title" @click="goHome">
      <!-- 将文本拆分为单独的字符 -->
      <span v-for="(char, index) in 'HEDONG'" :key="index" class="title-char"
        @mouseenter="setRandomColor($event.target)" @mouseleave="resetColor($event.target)">{{ char }}</span>
    </div>
    <div class="login_avatar" @click="toggleUserPanel">
      <el-image class="user_avatar" :src="notlogin"></el-image>
    </div>
    <div class="site_menu">
      <div v-for="(item, index) in menuList" :key="index" class="menu_item" @click="navigate(item.route)">
        <el-image class="menu_item_icon" :src="item.icon"></el-image>
        <div class="menu_item_text">{{ item.text }}</div>
        <div class="menu_under"></div>
      </div>
    </div>
  </div>
  <User v-if="showUserPanel" />
</template>

<script setup>
import { ref, provide, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import User from './User.vue'

import icon_ai from '@/assets/icons/ai.png'
import icon_book from '@/assets/icons/book.png'
import icon_chengjiu from '@/assets/icons/chengjiu.png'
import icon_command from '@/assets/icons/command.png'
import icon_index from '@/assets/icons/index.png'
import notlogin from '@/assets/icons/notlogin.png'

// 控制用户面板显示状态
const showUserPanel = ref(false)
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
  { text: '成就', icon: icon_chengjiu, route: '/chengjiu' },
  { text: '百宝箱', icon: icon_book, route: '/yanjiu' },
  { text: '作品', icon: icon_command, route: '/zuopin' },
  { text: '人工智能', icon: icon_ai, route: '/about' }
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
function goHome() {
  router.push('/')
}
// 切换用户面板显示状态
const toggleUserPanel = () => {
  showUserPanel.value = !showUserPanel.value
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

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
</script>

<style scoped>
.top-bar {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 50px;
  /* 修改为更快的动画 */
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.top-bar.hidden {
  opacity: 0;
  transform: translateY(-100%);
  pointer-events: none;
}

.top-bar:hover {
  background-color: #41414144;
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
  color: #fff;
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
  color: #fff;
  float: left;
}

.menu_under {
  width: 0px;
  float: left;
  height: 5px;
  background-color: #e06614;
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
  color: #e06614;
  font-weight: 800;
}

.menu_item:hover .menu_under {
  width: 100%;
  float: left;
  height: 5px;
  background-color: #e06614;
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
  background-color: #41414144;
}
</style>