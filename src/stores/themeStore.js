import { ref } from 'vue'// 创建一个响应式的主题状态
export const currentTheme = ref(getSavedTheme())// 获取保存的主题
function getSavedTheme() {
    return sessionStorage.getItem('theme') || 'light'
}// 切换主题
export function toggleTheme() {
    currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark'
    // 保存主题设置到 sessionStorage
    sessionStorage.setItem('theme', currentTheme.value)
}// 设置特定主题
export function setTheme(theme) {
    if (theme === 'dark' || theme === 'light') {
        currentTheme.value = theme
        sessionStorage.setItem('theme', theme)
    }
}
