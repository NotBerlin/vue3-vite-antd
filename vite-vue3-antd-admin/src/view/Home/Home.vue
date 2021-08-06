<template>
  <div id='home-view'>
    <h1>欢迎登录</h1>
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots } from 'vue'
  
const state = reactive({ count: 0 })
</script>
<style>
#home-view {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>