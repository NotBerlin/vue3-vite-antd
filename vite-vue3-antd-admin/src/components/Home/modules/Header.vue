<template>
  <div id='header'>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots } from 'vue'

const state = reactive({ count: 0 })
</script>
<style>
</style>