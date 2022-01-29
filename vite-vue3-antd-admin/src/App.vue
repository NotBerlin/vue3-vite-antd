<template>
  <div class="app-main" id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script setup>
console.log(import.meta.env)
//监听刷新页面事件方法
// window.addEventListener("beforeunload", function (event) {
//   debugger
//   return
//   // event.returnValue = "我在这写点东西...";
// });
window.onbeforeunload = function (event) {
  // 显示确认对话框
  event.preventDefault();
  // 为了兼容处理，Chrome需要设置returnValue
  event.returnValue = '';
};
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

html,
body {
  height: 100vh;
  width: 100vw;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
