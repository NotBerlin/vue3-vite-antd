<template>
  <div class="trtc-calling">
    <el-button @click="call">发起视频</el-button>
    <div class="remote-video" id="remote_video"></div>
    <div class="local-video" id="local_video"></div>
  </div>
</template>
<script setup>
import trtcCalling from './../modules/trtcCalling'
import { defineProps, reactive, defineEmits, useAttrs, useSlots } from 'vue'
let trtcclient = new trtcCalling({ SDKAppID: 1400537412 })
// let trtcclient = new trtcCalling({ SDKAppID: import.meta.env.VUE_APP_SDKAPPID })
trtcclient.login({
  userID: '123456',
  userSig: 'eJwtzNsKgkAUheF3mVtD9hz2KEIXSoREJ7C6T2aUrVmeCCF690y9XN*C-8Mu*8R925YFTLjAVtMmY589ZTQxF1KhXp7OlPe6JsMCrgBQeoqL*bFDTa0dHREFAMzaU-U3LUEB*ohLhfIx3BehjHfxcC5PR9P4h8pxmlRsIn1V*tG*slu*TcMi44nXrdn3B7alMB4_'
})

function call() {
  trtcclient.call({userID: 'user0'})
}

const state = reactive({ count: 0 })
</script>
<style>
</style>