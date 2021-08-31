<template>
  <div id="trtc-calling">
    <el-button @click="call">发起视频</el-button>
    <VideoPopup v-show="state.show"></VideoPopup>
  </div>
</template>
<script setup>
import trtcCalling from "./../modules/trtcCalling";
import VideoPopup from "./modules/VideoPopup.vue";
import eventEmitter from "../../../plugin/bus";
import {
  defineProps,
  reactive,
  defineEmits,
  useAttrs,
  useSlots,
  onMounted,
  onBeforeUnmount,
} from "vue";

const state = reactive({
  show: true,
});

let trtcclient = null;
// let trtcclient = null;

function call() {
  trtcclient.call({ userID: "user0" });
}

function callSuccess(e) {
  state.show = true;
}

onMounted(() => {
  trtcclient = new trtcCalling({ SDKAppID: 1400537412 });
  // new trtcCalling({ SDKAppID: import.meta.env.VUE_APP_SDKAPPID })
  trtcclient.login({
    userID: "123456",
    userSig:
      "eJwtzNsKgkAUheF3mVtD9hz2KEIXSoREJ7C6T2aUrVmeCCF690y9XN*C-8Mu*8R925YFTLjAVtMmY589ZTQxF1KhXp7OlPe6JsMCrgBQeoqL*bFDTa0dHREFAMzaU-U3LUEB*ohLhfIx3BehjHfxcC5PR9P4h8pxmlRsIn1V*tG*slu*TcMi44nXrdn3B7alMB4_",
  });
  eventEmitter.on("call-success", callSuccess);
});

onBeforeUnmount(() => {
  trtcclient.logout();
});
</script>
<style>
#trtc-calling {
  position: relative;
}
</style>