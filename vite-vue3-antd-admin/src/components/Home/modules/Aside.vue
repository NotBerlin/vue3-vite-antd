<template>
  <div id='aside'>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1']">
        <el-submenu v-for="(item, index) in menuArr" :index="index" :key="item.id">
          <template #title><i class="el-icon-message"></i>{{item.name}}</template>
          <el-menu-item-group v-for="(groupItem, groupIndex) in item.groups" :index="index + '-' + groupIndex" :key="groupItem.id">
            <template #title>{{groupItem.name}}</template>
            <el-menu-item v-for="(sectionItem, sectionIndex) in groupItem.sections" :index="index + '-' + groupIndex + '-' + sectionIndex" :key="sectionItem.id" @click="handleNav(sectionItem)">{{sectionItem.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots } from 'vue'
import useInstance from '../../../mixins/instance'

const { $store, $router } = useInstance()
const menuArr = $store.state.routes

function handleNav (sectionItem) {
  $router.push({
    path: sectionItem.path
  })
}
</script>
<style>
#aside {
  height: 100%;
  overflow: auto;
}

.el-aside {
  height: 100%;
}
</style>