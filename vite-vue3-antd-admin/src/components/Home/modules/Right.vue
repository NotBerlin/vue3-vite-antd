<template>
  <div id="right">
    Right
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots } from 'vue'
import useInstance from '../../../mixins/instance'

const { $bus, $route, $router } = useInstance()

const state = reactive({ count: 0 })

$bus.on('from-left-component', ({ detail }) => {
  debugger
})
</script>
<style>
</style>