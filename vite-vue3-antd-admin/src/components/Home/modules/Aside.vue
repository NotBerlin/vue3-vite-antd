<template>
  <div id='aside'>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1']">
        <el-submenu v-for="(item, index) in menuArr" :index="index" :key="item.id">
          <template #title><img :src="getSrc(item.icon)" alt="" srcset="">{{item.name}}</template>
          <el-menu-item v-for="(sectionItem, sectionIndex) in item.sections" :index="index+ '-' + sectionIndex" :key="sectionItem.id" @click="handleNav(sectionItem)" :disabled="sectionItem.disable">{{sectionItem.name}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots, computed } from 'vue'
import useInstance from '../../../mixins/instance'

const { $store, $router } = useInstance()
const menuArr = computed(() => $store.state.route.routes)

function handleNav (sectionItem) {
  if (sectionItem.disable) return false
  $router.push({
    path: sectionItem.path
  })
}

function getSrc (icon) {
  const path = `../../../assets/images/nav/${icon}`;
  const modules = import.meta.globEager("../../../assets/images/nav/*.*");
  return modules[path].default;
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

.aside-disable {
  background: #f6f6f6;
  cursor: not-allowed;
}

.el-submenu__title > img {
  height: 18px;
  margin-right: 5px;
  margin-bottom: 3px;
}
</style>