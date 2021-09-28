<template>
  <div id="trtc-calling">
    <div class="cover2" v-if="!state.login">
      userID<el-input v-model="state.userID" :disabled="state.login"></el-input>
      remoteUserID<el-input v-model="state.remoteUserID" :disabled="state.login"></el-input>
      <el-button @click="login" :disabled="state.login">登录</el-button>
    </div>
    <div class="cover" v-else>
      <Group v-model:login="state.login" :tim="state.tim" />
      <!-- <div id="drag-line" class="drag-line" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp"></div> -->
      <!-- <el-button @click="call" v-if="state.login">拨打</el-button> -->
      <Tim v-model:login="state.login" :tim="state.tim" />
      <VideoPopup v-model:show="state.show" :trtcclient="trtcclient" @join="join" @leave="leave" :acceptSuccessed="acceptSuccessed" :hanguped="hanguped"></VideoPopup>
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
  login: true,
  trtcclient: null,
  tim: null,
  all: 0,
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
  if (state.all == 1) {
    state.login = true
  } else {
    state.all = 1
  }
}

function callSuccess (e) {
  state.show = true;
}

function acceptSuccessed (e) {
}

function hanguped (e) {
}

function TIM_EVENT_SDK_READY () {
  if (state.all == 1) {
    state.login = true
  } else {
    state.all = 1
  }
}

onMounted(() => {
  eventEmitter.on("login-success", loginSuccess);
  eventEmitter.on("call-success", callSuccess);
  eventEmitter.on("TIM_EVENT_SDK_READY", TIM_EVENT_SDK_READY);
  // new trtcCalling({ SDKAppID: import.meta.env.VUE_APP_SDKAPPID })
  dragDom = document.getElementById('group-component')
  dragDom.style.width = '300px'
  window.addEventListener('mouseup', e => {
    _move = false
  });
});

onBeforeUnmount(() => {
  trtcclient.logoutClient();
  window.removeEventListener('mouseup', e => {
    _move = false
  });
});


let _move = false, _x = 520, _y = 0;
let dragDom = null;

function mouseDown (event) {
  _move = true
  _x = event.pageX;
  _y = event.pageY;
}

function mouseMove (event) {
  if (_move) {
    console.log('event.pageX: ', event.pageX, '_x: ', _x, '_move: ', _move)
    if (event.pageX >= 630 || event.pageX <= 395) { } else {
      dragDom.style.width = event.pageX - 220 + 'px';
    }
  }
}

function mouseUp (event) {
  _move = false
}
</script>
<style>
#trtc-calling {
  position: relative;
}

.cover {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.cover2 {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  padding: 50px 30px;
}

.drag-line {
  height: 100%;
  width: 4px;
  position: relative;
  right: 0;
  top: 0;
}

.drag-line::before {
  content: '';
  position: absolute;
  height: 100%;
  width: 1px;
  background: #eeeeee;
  right: 3px;
}

.drag-line::after {
  content: '';
  position: absolute;
  height: 100%;
  width: 2px;
  background: #eeeeee;
  right: 0;
  cursor: col-resize;
}
</style>