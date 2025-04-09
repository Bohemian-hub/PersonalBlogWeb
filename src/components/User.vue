<template>
  <div class="user-container">
    <!-- 遮罩层：仅在移动端显示 -->
    <div class="overlay" v-if="isShow" @click="closePanel"></div>
    
    <div class="user" :class="{ 'show-panel': isShow, 'mobile-view': isMobileView }">
      <!-- 小三角 - 仅在桌面视图显示 -->
      <div class="angle" v-if="!isMobileView"></div>
      <!-- 用户面板 -->
      <div class="user-panel">
        <!-- 切换按钮 -->
        <div class="switch-buttons" v-if="!isLoggedIn">
          <div :class="['switch-btn', { active: !isRegister }]" @click="isRegister = false">登录</div>
          <div :class="['switch-btn', { active: isRegister }]" @click="isRegister = true">注册</div>
        </div>
        <transition name="form-fade" mode="out-in">
          <div>
            <!-- 登录表单 -->
            <div v-if="!isLoggedIn && !isRegister" class="form-container">
              <el-form :model="loginForm" size="large">
                <el-form-item>
                  <el-input v-model="loginForm.email" placeholder="请输入邮箱" :prefix-icon="Message" />
                </el-form-item>
                <el-form-item>
                  <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" :prefix-icon="Lock"
                    show-password />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleLogin" style="width: 100%">
                    登录
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <!-- 注册表单 -->
            <div v-if="!isLoggedIn && isRegister" class="form-container">
              <el-form :model="registerForm" size="large">
                <el-form-item>
                  <el-input v-model="registerForm.email" placeholder="请输入邮箱" :prefix-icon="Message" />
                </el-form-item>
                <el-form-item>
                  <div class="verify-code">
                    <el-input v-model="registerForm.code" placeholder="验证码" :prefix-icon="Key" />
                    <el-button :disabled="isCountDown" @click="sendVerifyCode">
                      {{ countDownText }}
                    </el-button>
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="registerForm.username" placeholder="请设置昵称" :prefix-icon="User" />
                </el-form-item>
                <el-form-item>
                  <el-input v-model="registerForm.password" type="password" placeholder="请设置密码" :prefix-icon="Lock"
                    show-password />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleRegister" style="width: 100%">
                    注册
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <!-- 已登录的用户菜单 -->
            <div v-if="isLoggedIn">
              <el-menu default-active="1" class="el-menu-vertical-demo" ellipsis-icon="ArrowRight">

                <!-- 两个菜单上面是用户的账号名称 -->
                <div class="username">{{ user.username }}</div>

                <el-menu-item index="1">
                  <el-icon>
                    <User />
                  </el-icon>
                  <span>个人中心</span>
                  <el-icon style="float: right">
                    <ArrowRight />
                  </el-icon>
                </el-menu-item>

                <!-- 添加记录按钮，仅当用户auth为1时显示 -->
                <el-menu-item v-if="user && user.auth === '1'" index="3" @click="navigateToRecord">
                  <el-icon>
                    <EditPen />
                  </el-icon>
                  <span>记录</span>
                  <el-icon style="float: right">
                    <ArrowRight />
                  </el-icon>
                </el-menu-item>

                <el-menu-item index="2" @click="handleLogout">
                  <el-icon>
                    <SwitchButton />
                  </el-icon>
                  <span>退出登录</span>
                </el-menu-item>
              </el-menu>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, inject, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import { sendCode, register, login } from '@/api/auth'
import { Message, Lock, User, Key, ArrowRight, SwitchButton, EditPen } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showUserPanel = inject('showUserPanel')

const isShow = ref(false)
const isRegister = ref(false)
const loginForm = ref({ email: '', password: '' })
const registerForm = ref({ email: '', code: '', username: '', password: '' })
const isCountDown = ref(false)
const countDown = ref(60) // 初始化倒计时时间
const countDownText = ref('获取验证码')
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const user = ref(null);
const isMobileView = ref(false);

// 关闭面板方法
const closePanel = () => {
  showUserPanel.value = false;
};

// 检测窗口大小的函数
const checkWindowSize = () => {
  isMobileView.value = window.innerWidth <= 768; // 768px作为移动端断点
};

const isLoggedIn = computed(() => {
  return !!user.value;
});

const sendVerifyCode = async () => {
  if (!registerForm.value.email) {
    ElMessage.warning('请先输入邮箱');
    return;
  }
  if (!emailPattern.test(registerForm.value.email)) {
    ElMessage.warning('请输入有效的邮箱地址');
    return;
  }
  try {
    await sendCode({ email: registerForm.value.email });
    ElMessage.success('验证码已发送'); // 成功提示信息提前

    isCountDown.value = true; // 禁用按钮
    countDownText.value = `${countDown.value}s`; // 立即显示倒计时

    const timer = setInterval(() => {
      countDown.value--;
      countDownText.value = `${countDown.value}s`;
      if (countDown.value <= 0) {
        clearInterval(timer);
        isCountDown.value = false; // 倒计时结束，启用按钮
        countDown.value = 60; // 重置倒计时时间
        countDownText.value = '获取验证码'; // 重置按钮文本
      }
    }, 1000);
  } catch (error) {
    ElMessage.error(error.message || '验证码发送失败'); // 显示错误信息
    isCountDown.value = false; // 发生错误，启用按钮
    countDownText.value = '获取验证码'; // 发生错误，重置按钮文本
  }
};

const handleLogin = async () => {
  if (!loginForm.value.email || !loginForm.value.password) {
    ElMessage.warning('请填写完整的登录信息');
    return;
  }
  try {
    const userData = await login(loginForm.value);
    // console.log(userData);
    ElMessage.success('登录成功');
    sessionStorage.setItem('user', JSON.stringify(userData.user));
    user.value = userData.user;
    // console.log(user);

    showUserPanel.value = false; // 登录成功后关闭面板
  } catch (error) {
    // ElMessage.error(error.message || '登录失败'); // 移除重复的错误提示
  }
};

const handleRegister = async () => {
  if (!registerForm.value.email || !registerForm.value.code ||
    !registerForm.value.username || !registerForm.value.password) {
    ElMessage.warning('请填写完整的注册信息');
    return;
  }
  try {
    const user = await register(registerForm.value);
    ElMessage.success('注册成功');
    isRegister.value = false;
    registerForm.value = { email: '', code: '', username: '', password: '' };
  } catch (error) {
    // ElMessage.error(error.message || '注册失败'); // 移除重复的错误提示
  }
};
// 添加导航到记录页面的方法
const navigateToRecord = () => {
  router.push('/record')
  showUserPanel.value = false // 点击后关闭面板
}

const handleLogout = () => {
  sessionStorage.removeItem('user');
  user.value = null;
  showUserPanel.value = true; // 退出登录后显示登录/注册面板
};

// 不再需要监听isRegister变化来调整高度
watch(isRegister, (newVal) => {
  // 不再需要设置面板高度
});

onMounted(() => {
  const storedUser = sessionStorage.getItem('user');
  isShow.value = true;
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }

  // 初始检测窗口大小
  checkWindowSize();
  
  // 添加窗口大小变化的监听器
  window.addEventListener('resize', checkWindowSize);
});

// 组件卸载前移除事件监听器
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkWindowSize);
});
</script>

<style scoped>
.user-container {
  position: relative;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
  display: none;
}

.user {
  width: 280px;
  height: 0;
  background-color: white;
  position: fixed;
  right: 10px;
  top: 60px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: all 0.3s ease-out;
  z-index: 10;
  max-height: 80vh;
  overflow: hidden;
}

/* 移动端视图样式 */
.user.mobile-view {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  right: auto;
  width: 90%;
  max-width: 350px;
}

.show-panel {
  height: auto !important;
  opacity: .95;
}

/* 显示遮罩层 */
.show-panel + .overlay,
.show-panel ~ .overlay {
  display: block;
}

/* 切换表单时的过渡动画 */
.form-fade-enter-active,
.form-fade-leave-active {
  transition: opacity 0.3s ease;
}

.form-fade-enter-from,
.form-fade-leave-to {
  opacity: 0;
}

.angle {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white;
  top: -8px;
  right: 28px;
  filter: drop-shadow(0 -2px 2px rgba(0, 0, 0, 0.1));
}

.user-panel {
  padding: 20px 20px 20px 20px;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
}

.user-panel::-webkit-scrollbar {
  display: none;
}

.switch-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: #f5f5f5;
  padding: 4px;
}

.switch-btn {
  padding: 8px 30px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s;
}

.switch-btn.active {
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-container {
  padding: 20px 0px 0 0px;
}

.verify-code {
  display: flex;
  gap: 10px;
}

.verify-code .el-input {
  flex: 1;
}

.verify-code .el-button {
  width: 100px;
}

.el-menu-vertical-demo {
  border-right: none !important;

  .username {
    text-align: center;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 900;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(128, 128, 128, 0.405);
  }

  li {
    border-radius: 20px;
    overflow: hidden;
  }
}

/* 鼠标悬停时的背景色变化 */
.el-menu-item {
  padding: 0 0 0 20px !important;
  /* 移除默认的 padding */
  position: relative;
  /* 添加相对定位 */
}

.el-menu-item .el-icon:last-child {
  position: absolute;
  /* 使用绝对定位 */
  top: 50%;
  right: 20px;
  /* 调整右边距 */
  transform: translateY(-50%);
  /* 垂直居中 */
}

.el-menu-item:hover {
  background-color: #f5f5f5;
}

/* 媒体查询 - 移动端显示遮罩层 */
@media (max-width: 768px) {
  .overlay {
    display: block;
  }
  
  .user-panel {
    padding: 20px;
  }
}
</style>