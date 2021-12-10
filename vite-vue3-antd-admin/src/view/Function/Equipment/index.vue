<template>
  <div id='equipment'>
    <div class="media-box">
      <div class="local-video" id="local-video"></div>
      <div class="local-photo" id="local-photo"></div>
    </div>
    <div class="btn-group">
      <button @click="getVideoJurisdiction">获取摄像头权限</button>
      <button @click="getAudioJurisdiction">获取麦克风权限</button>
      <button @click="startShooting">开始摄像</button>
      <button @click="stopVideoShooting">关闭摄像</button>
      <button @click="openAudio">开始录音</button>
      <button @click="photographSave">拍照保存</button>
      <button @click="photographShow">拍照展示</button>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import equipment from './modules/equipment'
export default defineComponent({
  name: 'Equipment',
  setup () {
    let { openVideo, openAudio, stopVideo, photograph } = equipment

    function getVideoJurisdiction () {
      openVideo()
    }
    function getAudioJurisdiction () {
      openAudio()
    }
    function startShooting () {
      openVideo({
        width: 400,
        height: 400,
        audio: true,
        play: true,
        videoID: 'local-video'
      })
    }
    function stopVideoShooting () {
      stopVideo()
    }
    function photographSave () {
      photograph()
    }
    function photographShow () {
      photograph({
        download: false,
        name: '',
        show: true,
        imageID: 'local-photo'
      })
    }
    return { getVideoJurisdiction, getAudioJurisdiction, startShooting, stopVideoShooting, photographSave, photographShow }
  },
})
</script>
<style>
.media-box {
  height: 500px;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: auto;
}

.media-box > div {
  flex-shrink: 1;
}

.local-video {
  height: 400px;
  width: 400px;
}

.btn-group {
  /* margin: 30px auto 0; */
}

.local-photo {
  height: 400px;
  width: 400px;
}
</style>