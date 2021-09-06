<template>
  <div id="trtc-calling">
    userID<el-input v-model="state.userID" :disabled="state.login"></el-input>
    remoteUserID<el-input v-model="state.remoteUserID" :disabled="state.login"></el-input>
    <el-button @click="login" :disabled="state.login">登录</el-button>
    <el-button @click="call" v-if="state.login">拨打</el-button>
    <VideoPopup v-model:show="state.show" :trtcclient="trtcclient" @join="join" @leave="leave"></VideoPopup>
  </div>
</template>
<script setup>
import trtcCalling from "./../modules/trtcCalling";
import VideoPopup from "./modules/VideoPopup.vue";
import eventEmitter from "../../../plugin/bus";
import {
  reactive,
  onMounted,
  onBeforeUnmount,
} from "vue";

const state = reactive({
  show: false,
  userID: '',
  remoteUserID: '',
  login: false,
  trtcclient: null
});

let trtcclient = new trtcCalling({ SDKAppID: 1400537412 });

function call (options) {
  trtcclient.callClient({ userID: state.remoteUserID });
}

function login () {
  trtcclient.loginClient({
    userID: state.userID,
    userSig: state.userID === '123456' ?
      "eJwtzNsKgkAUheF3mVtD9hz2KEIXSoREJ7C6T2aUrVmeCCF690y9XN*C-8Mu*8R925YFTLjAVtMmY589ZTQxF1KhXp7OlPe6JsMCrgBQeoqL*bFDTa0dHREFAMzaU-U3LUEB*ohLhfIx3BehjHfxcC5PR9P4h8pxmlRsIn1V*tG*slu*TcMi44nXrdn3B7alMB4_" : 'eJw1zF0LgjAUxvHvsttCjptnkdBtBHVjilR3kts6jHLMl6zou2dal8-vgf*LZbs06JRnMeMBsPm4qVS3hjSN3NbK-4*6tIVzVLI4jABQLKKQT4-qHXk1OCJyAJi0oevXpIAIpFzir0Jm6GYPs34mW5ue70ff5Vbwvt2fVHHY6EaLBK295J1OKjOrVuz9AT1VMqM_',
  });
}

function join(event) {
}

function leave(event) {
}

function loginSuccess () {
  state.login = true
}

function callSuccess (e) {
  state.show = true;
}

onMounted(() => {
  eventEmitter.on("login-success", loginSuccess);
  eventEmitter.on("call-success", callSuccess);
  // new trtcCalling({ SDKAppID: import.meta.env.VUE_APP_SDKAPPID })
});

onBeforeUnmount(() => {
  trtcclient.logoutClient();
});
</script>
<style>
#trtc-calling {
  position: relative;
}
</style>