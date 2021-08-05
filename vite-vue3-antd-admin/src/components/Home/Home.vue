<template>
  <div id="home">
    <el-container style="height: 100%; border: 1px solid #eee">
      <Aside />

      <Container />
    </el-container>
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots } from 'vue'
import Aside from './modules/Aside.vue'
import Container from './modules/Container.vue'
import { setWaterMark } from '../../utils/waterMark'
import { onMounted } from 'vue'

onMounted(() => {
  setWaterMark('陈罗林')
})

</script>
<style>
#home {
  height: 100%;
  width: 100%;
  display: flex;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>