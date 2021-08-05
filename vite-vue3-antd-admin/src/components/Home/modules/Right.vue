<template>
  <div id="right">
    Right
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots, onMounted, onBeforeUnmount } from 'vue'
import useInstance from '../../../mixins/instance'

const { $bus, $route, $router } = useInstance()

const state = reactive({ count: 0 })

function FromLeftComponentEmit ({ detail }) {
  debugger
}

onMounted(() => {
  $bus.on('from-left-component', FromLeftComponentEmit)
})
onBeforeUnmount(() => {
  $bus.off('from-left-component', FromLeftComponentEmit)
})
</script>
<style>
</style>