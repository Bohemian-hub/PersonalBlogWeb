<template>
  <div class="top-bar">
    <div class="site_title" @click="goHome">HEDONG</div>
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

// filepath: /Users/macbookair/Project/personalBlog/web/src/components/top_bar.vue
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

provide('showUserPanel', showUserPanel)

// 响应式菜单数据
const menuList = ref([
  { text: '首页', icon: icon_index, route: '/' },
  { text: '成就', icon: icon_chengjiu, route: '/chengjiu' },
  { text: '百宝箱', icon: icon_book, route: '/yanjiu' },
  { text: '作品', icon: icon_command, route: '/zuopin' },
  { text: '人工智能', icon: icon_ai, route: '/about' }
])

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
  position: absolute;
  top: 0;
  width: 100%;
  height: 50px;
  transition: background-color 0.3s ease-in-out;
  /* 添加过渡动画 */
}

.top-bar:hover {
  background-color: #41414144;
}

.site_title {
  float: left;
  width: 100px;
  height: 50px;
  line-height: 50px;
  margin-left: 20px;
  font-size: 20px;
  color: #fff;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
  /* 添加过渡动画 */

}

.site_title:hover {
  color: #414141;
  font-weight: 900;
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
}

.user_avatar {
  width: 40px;
  height: 40px;
  margin: 5px;
  border-radius: 50%;
  border: 2px solid rgba(238, 238, 238, 0.513);
}

.user_avatar:hover {
  cursor: pointer;
  border: 2px solid rgb(255, 255, 255);
}
</style>