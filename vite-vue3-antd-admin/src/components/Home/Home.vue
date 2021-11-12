<template>
  <div id="home">
    <el-container style="height: 100%; border: 1px solid #eee">
      <Aside />

      <Container />
    </el-container>
    <audio-component :visible="audioVisible" @update:visible="audioVisible = $event" ref="audioComponentRef" />
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots, ref, provide, watch, nextTick } from 'vue'
import Aside from './modules/Aside.vue'
import Container from './modules/Container.vue'
import AudioComponent from '../../view/Music/AudioComponent/index.vue'
import { setWaterMark } from '../../utils/waterMark'
import { onMounted } from 'vue'

let audioVisible = ref(false)
let audioPlaying = ref(false)
let audioComponentRef = ref(null)

watch(audioVisible, (value) => {
  if (value) {
    nextTick(() => {
      audioComponentRef.value.initPosition()
    })
  }
})

function setState (event) {
  audioVisible.value = event
}

function setPlaying (event) {
  audioPlaying.value = event
}

provide('audioController', {
  state: audioVisible,
  playing: audioPlaying,
  setState,
  setPlaying
})

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