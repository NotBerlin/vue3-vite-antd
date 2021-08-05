<template>
  <div id="home">
    <left />
    <right />
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots } from 'vue'
import Left from './modules/Left.vue'
import Right from './modules/Right.vue'

const state = reactive({ count: 0 })
</script>
<style>
#home {
  height: 100%;
  width: 100%;
  display: flex;
}

#home > div {
  flex: 1;
  height: 100%;
}
</style>