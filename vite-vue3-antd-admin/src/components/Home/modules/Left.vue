<template>
  <div id="left">
    Left
    <button @click="handleEmit">emit</button>
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots } from 'vue'
import useInstance from '../../../mixins/instance'

const { $bus, $route, $router } = useInstance()

const state = reactive({ count: 0 })

function handleEmit() {
  $bus.emit('from-left-component', {
    type: 'handleEmit'
  })
}
</script>
<style>
</style>