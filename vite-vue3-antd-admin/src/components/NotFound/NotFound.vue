<template>
  <div id='not-found'>
    <img src="../../assets/images/error.jpeg" alt="" srcset="">
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots } from 'vue'

const state = reactive({ count: 0 })
</script>
<style>
#not-found {
  height: 100%;
  width: 100%;
}

#not-found > img {
  height: 100%;
}
</style>