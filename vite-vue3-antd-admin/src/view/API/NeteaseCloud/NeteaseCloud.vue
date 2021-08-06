<template>
  <div id='neteaseCloud'>
    <Header />
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots } from 'vue'
import Header from './modules/Header.vue'

const state = reactive({ count: 0 })
</script>
<style>
</style>