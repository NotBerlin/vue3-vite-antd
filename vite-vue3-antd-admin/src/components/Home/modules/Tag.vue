<template>
  <div id='tag'>
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots } from 'vue'
import useInstance from '../../../mixins/instance'

const {$store} = useInstance()
const tags = $store.state.tag.tags

const state = reactive(tags)
</script>
<style>
</style>