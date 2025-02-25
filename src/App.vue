<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap');

/* 全局滚动条样式 */
::-webkit-scrollbar {
  width: 5px;
  /* 设置滚动条宽度 */

}

::-webkit-scrollbar-track {
  background-color: #dbf3fe;
  /* 设置滚动条背景颜色 */
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #a1c4fd, #c2fbef);
  /* 设置滚动条滑块的背景渐变 */
  border-radius: 4px;
  /* 设置滑块的圆角 */
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #78b0ff, #54ddcf);
  /* 鼠标悬停时的背景渐变 */
  cursor: pointer;
}

#app {
  font-family: "ZCOOL KuaiLe", serif;
  font-weight: 400;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.clear {
  clear: both;
}
</style>