<template>
  <div id='faceRecognition'>
    <div class="demo-frame">
      <div class="demo-container">
        <img id="img" src="../../../assets/images/face/faces.png" />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, nextTick, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from 'vue'
import "./modules/tracking-min.js"
import "./modules/data/face-min.js"
import "./modules/data/eye-min.js"
import "./modules/data/mouth-min.js"
export default defineComponent({
  name: 'FaceRecognition',
  setup () {
    onMounted(() => {
      var img = document.getElementById('img');
      img.onload = function () {
        var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
        tracker.setStepSize(1.7);

        tracking.track('#img', tracker);

        tracker.on('track', function (event) {
          // let { data } = event
          // if (data?.length == 0 || !data) {
          //   alert('请将人脸放置于摄像头中间')
          // } else if (data?.length > 1) {
          //   alert('请让无关人员离开摄像头范围')
          // } else {
          //   alert('识别人脸成功')
          // }
          event.data.forEach(function (rect) {
            window.plot(rect.x, rect.y, rect.width, rect.height);
          });
        });

        window.plot = function (x, y, w, h) {
          var rect = document.createElement('div');
          document.querySelector('.demo-container').appendChild(rect);
          rect.classList.add('rect');
          rect.style.width = w + 'px';
          rect.style.height = h + 'px';
          rect.style.left = (img.offsetLeft + x) + 'px';
          rect.style.top = (img.offsetTop + y) + 'px';
        };
      }
    })
  },
})
</script>
<style>
.rect {
  border: 2px solid #a64ceb;
  left: -1000px;
  position: absolute;
  top: -1000px;
}

.demo-frame {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>