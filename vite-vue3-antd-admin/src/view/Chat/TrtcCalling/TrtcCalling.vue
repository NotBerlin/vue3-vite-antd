<template>
  <div id="trtc-calling">
    <div v-if="!state.login">
      userID<el-input v-model="state.userID" :disabled="state.login"></el-input>
      remoteUserID<el-input v-model="state.remoteUserID" :disabled="state.login"></el-input>
      <el-button @click="login" :disabled="state.login">登录</el-button>
    </div>
    <div v-else>
      <Group v-model:login="state.login" :tim="state.tim" />
      <!-- <el-button @click="call" v-if="state.login">拨打</el-button>
      <Tim v-model:login="state.login" :tim="state.tim" />
      <VideoPopup v-model:show="state.show" :trtcclient="trtcclient" @join="join" @leave="leave" :acceptSuccessed="acceptSuccessed" :hanguped="hanguped"></VideoPopup> -->
    </div>
  </div>
</template>
<script setup>
import trtcCalling from "./../modules/trtcCalling";
import VideoPopup from "./modules/VideoPopup.vue";
import Tim from "../Tim/Tim.vue"
import Group from "../Group/Group"
import eventEmitter from "../../../plugin/bus";
import useInstance from '../../../mixins/instance'
import {
  reactive,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";

const state = reactive({
  show: false,
  userID: '',
  remoteUserID: '',
  login: false,
  trtcclient: null,
  tim: null
});

const { $_mode } = useInstance()

let SDKAppID = parseInt($_mode.VITE_APP_SDKAPPID)
let trtcclient = new trtcCalling({ SDKAppID });

function call (options) {
  trtcclient.callClient({ userID: state.remoteUserID });
}

function login () {
  trtcclient.loginClient({
    userID: state.userID,
    userSig: state.userID === '123456' ?
      "eJwtzNsKgkAUheF3mVtD9hz2KEIXSoREJ7C6T2aUrVmeCCF690y9XN*C-8Mu*8R925YFTLjAVtMmY589ZTQxF1KhXp7OlPe6JsMCrgBQeoqL*bFDTa0dHREFAMzaU-U3LUEB*ohLhfIx3BehjHfxcC5PR9P4h8pxmlRsIn1V*tG*slu*TcMi44nXrdn3B7alMB4_" : 'eJw1zF0LgjAUxvHvsttCjptnkdBtBHVjilR3kts6jHLMl6zou2dal8-vgf*LZbs06JRnMeMBsPm4qVS3hjSN3NbK-4*6tIVzVLI4jABQLKKQT4-qHXk1OCJyAJi0oevXpIAIpFzir0Jm6GYPs34mW5ue70ff5Vbwvt2fVHHY6EaLBK295J1OKjOrVuz9AT1VMqM_',
  });
  state.tim = trtcclient.tim
}

function join (event) {
}

function leave (event) {
}

function loginSuccess () {
  state.login = true
}

function callSuccess (e) {
  state.show = true;
}

function acceptSuccessed (e) {
}

function hanguped (e) {
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