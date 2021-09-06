<template>
  <div id="video-popup" v-show="show">
    <div class="remote-video" id="remote_video"></div>
    <div class="local-video" id="local_video"></div>
    <div class="hang-up" @click="hangup">
      <img src="../../../../assets/images/guaduandianhua.png" alt="" srcset="">
      挂断
    </div>
  </div>
</template>
<script setup>
import {
  defineProps,
  reactive,
  defineEmits,
  onMounted,
  defineExpose,
  toRefs
} from "vue";
import eventEmitter from "../../../../plugin/bus";

const emit = defineEmits(['join', 'leave'])
const state = reactive({})
const prop = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  trtcclient: {
    type: Object,
    default: null
  }
})

function acceptSuccess (e) {
  emit('update:show', true)
  emit('join', {
    type: 'accept',
    msg: '接受视频邀请',
    data: {}
  })
}

function leave () {
  emit('update:show', false)
  emit('leave', {
    type: 'leave',
    msg: '离开视频房间',
    data: {}
  })
}

function reject () {
  debugger
  state.show = false;
}

function hangup () {
  prop.trtcclient.hangupClient();
}

function dragEvent () {
  let box = document.getElementById("local_video");
  box.onmousedown = function (e) {
    var e = e || window.event; //兼容ie浏览器
    var diffX = e.clientX - box.offsetLeft; //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
    var diffY = e.clientY - box.offsetTop;
    document.onmousemove = function (event) {
      var event = event || window.event; //兼容ie浏览器
      var left = event.clientX - diffX;
      var top = event.clientY - diffY;

      //控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条
      if (left < 0) {
        left = 0;
      } else if (left > window.innerWidth - box.offsetWidth) {
        left = window.innerWidth - box.offsetWidth;
      }
      if (top < 0) {
        top = 0;
      } else if (top > window.innerHeight - box.offsetHeight) {
        top = window.innerHeight - box.offsetHeight;
      }

      //移动时重新得到物体的距离，解决拖动时出现晃动的现象
      box.style.left = left + "px";
      box.style.top = top + "px";

      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  };
}

function trtcCallingListener () {
  eventEmitter.on("accept-success", acceptSuccess);
  eventEmitter.on("leave", leave);
  eventEmitter.on("reject", reject);
}

onMounted(() => {
  trtcCallingListener()
  dragEvent()
});

defineExpose(
  { ...toRefs(state), ...toRefs(prop) }
)
</script>
<style scoped>
#video-popup {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}

.remote-video {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: blanchedalmond;
}

.local-video {
  position: absolute;
  top: 0;
  right: 0;
  height: 40%;
  width: 25%;
  background: black;
  cursor: pointer;
}

.hang-up {
  width: 64px;
  position: absolute;
  z-index: 99;
  bottom: 11%;
  left: 50%;
  transform: translateX(-32px);
  text-align: center;
  cursor: pointer;
}
</style>