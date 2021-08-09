<template>
  <div id='not-found'>
    <img src="../../assets/images/error.jpeg" alt="" srcset="" @click="goBack()">
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots } from 'vue'
import useInstance from '../../mixins/instance'

const { $router } = useInstance()
function goBack() {
  console.log($router)
  $router.back()
}
</script>
<style>
#not-found {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#not-found > img {
  height: 100%;
  cursor: pointer;
}
</style>