<template>
    <div class="user" :class="{ 'show-panel': isShow }">
        <!-- 小三角 -->
        <div class="angle"></div>
        <!-- 用户面板 -->
        <div class="user-panel">
            <!-- 切换按钮 -->
            <div class="switch-buttons">
                <div :class="['switch-btn', { active: !isRegister }]" @click="isRegister = false">登录</div>
                <div :class="['switch-btn', { active: isRegister }]" @click="isRegister = true">注册</div>
            </div>
            <transition name="form-fade" mode="out-in">
                <!-- 登录表单 -->
                <div v-if="!isRegister" class="form-container">
                    <el-form :model="loginForm" size="large">
                        <el-form-item>
                            <el-input v-model="loginForm.email" placeholder="请输入邮箱" :prefix-icon="Message" />
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"
                                :prefix-icon="Lock" show-password />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleLogin" style="width: 100%">
                                登录
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <!-- 注册表单 -->
                <div v-else class="form-container">
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
                            <el-input v-model="registerForm.password" type="password" placeholder="请设置密码"
                                :prefix-icon="Lock" show-password />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleRegister" style="width: 100%">
                                注册
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
// 导入需要使用的图标
import { Message, Lock, User, Key } from '@element-plus/icons-vue'

const isShow = ref(false)
const isRegister = ref(false)

// 登录表单数据
const loginForm = ref({
    email: '',
    password: ''
})

// 注册表单数据
const registerForm = ref({
    email: '',
    code: '',
    username: '',
    password: ''
})

// 验证码倒计时
const isCountDown = ref(false)
const countDown = ref(60)
const countDownText = ref('获取验证码')

// 发送验证码
const sendVerifyCode = () => {
    if (!registerForm.value.email) {
        ElMessage.warning('请先输入邮箱')
        return
    }

    isCountDown.value = true
    countDownText.value = `${countDown.value}s`

    const timer = setInterval(() => {
        countDown.value--
        countDownText.value = `${countDown.value}s`
        if (countDown.value <= 0) {
            clearInterval(timer)
            isCountDown.value = false
            countDown.value = 60
            countDownText.value = '获取验证码'
        }
    }, 1000)
}

// 处理登录
const handleLogin = () => {
    console.log('登录表单:', loginForm.value)
    // TODO: 调用登录接口
}

// 处理注册
const handleRegister = () => {
    console.log('注册表单:', registerForm.value)
    // TODO: 调用注册接口
}

// 监听注册状态变化，动态设置面板高度
watch(isRegister, (newVal) => {
    const root = document.documentElement
    root.style.setProperty('--panel-height', newVal ? '420px' : '300px')
})

onMounted(() => {
    // 初始设置登录面板高度
    document.documentElement.style.setProperty('--panel-height', '300px')
    setTimeout(() => {
        isShow.value = true
    }, 100)
})
</script>

<style scoped>
.user {
    width: 400px;
    height: 0;
    background-color: white;
    position: fixed;
    right: 10px;
    top: 60px;
    border-radius: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: all 0.3s ease-out;
    /* overflow: hidden; */
}

.show-panel {
    height: var(--panel-height);
    opacity: .95;
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
    padding: 20px 20px 0 20px;
    height: 100%;
    overflow-y: auto;
    /* 添加以下样式来隐藏滚动条 */
    scrollbar-width: none;  /* Firefox */
    -ms-overflow-style: none;  /* IE and Edge */
}
/* 为 Webkit 浏览器（Chrome、Safari等）隐藏滚动条 */
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
    padding: 20px 20px 0 20px;
}

.verify-code {
    display: flex;
    gap: 10px;

    .el-input {
        flex: 1;
    }

    .el-button {
        width: 100px;
    }
}
</style>