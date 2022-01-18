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
import { defineComponent, onBeforeMount, onBeforeUnmount, onUnmounted } from 'vue'
import equipment from './modules/equipment'
import "./../FaceRecognition/modules/tracking-min.js"
import "./../FaceRecognition/modules/data/face-min.js"
import "./../FaceRecognition/modules/data/eye-min.js"
import "./../FaceRecognition/modules/data/mouth-min.js"
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
      setTimeout(() => {
        var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
        tracker.setStepSize(1.7);
        tracking.track('#img', tracker);
        tracker.on('track', function (event) {
          event.data.forEach(function (rect) {
            window.plot(rect.x, rect.y, rect.width, rect.height);
          });
        });

        window.plot = function (x, y, w, h) {
          var rect = document.createElement('div');
          document.querySelector('.local-photo').appendChild(rect);
          rect.classList.add('rect');
          rect.style.width = w + 'px';
          rect.style.height = h + 'px';
          rect.style.left = (img.offsetLeft + x) + 'px';
          rect.style.top = (img.offsetTop + y) + 'px';
        };
      }, 500)
    }

    onBeforeUnmount(() => {
      stopVideo()
    })

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
.rect {
  border: 2px solid #a64ceb;
  left: -1000px;
  position: absolute;
  top: -1000px;
}
</style>