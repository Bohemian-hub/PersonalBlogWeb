<template>
  <div class="theme-toggler-container">
    <div 
      class="theme-toggler" 
      @click="toggleTheme" 
      :title="currentTheme === 'dark' ? '切换到浅色模式' : '切换到深色模式'"
    >
      <div class="toggle-background" :class="currentTheme">
        <div class="celestial-body" :class="currentTheme">
          <div v-if="currentTheme === 'dark'" class="sun-rays"></div>
        </div>
        <div class="stars" v-if="currentTheme === 'light'">
          <div class="star" v-for="n in 5" :key="n"></div>
        </div>
        <div class="toggle-icon-container" :class="currentTheme">
          <el-icon v-if="currentTheme === 'dark'" class="icon sun">
            <Sunny />
          </el-icon>
          <el-icon v-else class="icon moon">
            <Moon />
          </el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Sunny, Moon } from '@element-plus/icons-vue'
import { currentTheme, toggleTheme } from '../stores/themeStore'
</script>

<style scoped>
.theme-toggler-container {
  position: relative;
  z-index: 10;
}

.theme-toggler {
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.toggle-background {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toggle-background.dark {
  background: linear-gradient(135deg, #2c3e50, #1a1a2e);
}

.toggle-background.light {
  background: linear-gradient(135deg, #87ceeb, #add8e6);
}

.toggle-icon-container {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toggle-icon-container.dark {
  transform: scale(1);
}

.toggle-icon-container.light {
  transform: scale(1);
}

.icon {
  font-size: 22px;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.sun {
  color: #ffdb58;
  filter: drop-shadow(0 0 5px rgba(255, 219, 88, 0.7));
}

.moon {
  color: #ffffff;
  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5));
}

.celestial-body {
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.celestial-body.dark {
  background-color: #ffdb58;
  box-shadow: 0 0 20px rgba(255, 219, 88, 0.7);
  transform: scale(0);
  opacity: 0;
}

.celestial-body.light {
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  transform: scale(1);
  opacity: 1;
}

.sun-rays {
  position: absolute;
  width: 100%;
  height: 100%;
}

.sun-rays::before,
.sun-rays::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 160%;
  height: 160%;
  background: radial-gradient(circle, rgba(255, 219, 88, 0.3) 0%, rgba(255, 219, 88, 0) 70%);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  animation: pulse 3s infinite;
}

.sun-rays::after {
  animation-delay: 1.5s;
}

.stars {
  position: absolute;
  width: 100%;
  height: 100%;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: white;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0);
  animation: twinkle 3s infinite;
}

.star:nth-child(1) {
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}
.star:nth-child(2) {
  top: 15%;
  left: 60%;
  animation-delay: 0.5s;
}
.star:nth-child(3) {
  top: 50%;
  left: 80%;
  animation-delay: 1s;
}
.star:nth-child(4) {
  top: 70%;
  left: 30%;
  animation-delay: 1.5s;
}
.star:nth-child(5) {
  top: 80%;
  left: 70%;
  animation-delay: 2s;
}

.theme-toggler:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2), 0 2px 5px rgba(0, 0, 0, 0.15);
}

.theme-toggler:active .toggle-icon-container {
  transform: rotate(360deg);
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3;
  }
}

@keyframes twinkle {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}
</style>
