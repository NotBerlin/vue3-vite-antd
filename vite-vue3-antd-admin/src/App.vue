<template>
  <div class="app-main" id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script setup>
import { setWaterMark } from './utils/waterMark'
import { onMounted } from 'vue'

onMounted(() => {
  setWaterMark('陈罗林')
})

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
  text-align: center;
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
