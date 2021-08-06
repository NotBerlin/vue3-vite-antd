<template>
  <div id='tag'>
    <el-tag :key="tag.fullPath" size="medium" v-for="tag in tags" :closable="tag.fullPath !== '/home'" :disable-transitions="false" @close="handleClose(tag)" :checked="currentUrl.fullPath === tag.fullPath" @click="onChange(tag)">
      {{tag.meta.title}}
    </el-tag>
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots, computed, ref } from 'vue'
import useInstance from '../../../mixins/instance'

const { $store, $router } = useInstance()
const tags = $store.state.tag.tags

let currentUrl = computed(() => $store.state.tag.currentTag)

function handleClose (tag) {
  $store.commit('tag/REMOVE_TAG', tag)
  if (tag.fullPath === currentUrl.value.fullPath) {
    $router.push({
      path: tags[tags.length - 1].fullPath
    })
  }
}
function onChange (tag) {
  $router.push({
    path: tag.fullPath
  })
}
</script>
<style>
#tag {
  background: white;
  height: 39px;
  width: 100%;
  border-bottom: 1px solid #f6f6f6;
}

.el-tag {
  margin: 6px 3px;
  cursor: pointer;
}

.el-tag[checked="true"] {
  background: #409eff;
  color: white;
}

.el-tag[checked="true"] > .el-tag__close {
  color: white;
}
</style>