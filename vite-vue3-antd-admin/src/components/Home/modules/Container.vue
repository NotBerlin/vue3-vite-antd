<template>
  <div id='container'>
    <Header />

    <el-container>
      <el-main>
        <Tag />

        <router-view class="content"></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots } from 'vue'
import Header from './Header.vue'
import Tag from './Tag.vue'

</script>
<style>
#container {
  flex: 1;
  height: 100%;
  overflow: auto;
}

.el-container {
  height: calc(100% - 60px);
  background: #F6F6F6;
}

.content {
  background: white;
  height: calc(100% - 40px);
}
</style>