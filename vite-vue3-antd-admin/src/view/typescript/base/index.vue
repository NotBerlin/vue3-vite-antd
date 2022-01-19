<template>
  <div>
    <iframe src="http://127.0.0.1:3000/typescript/base.html" class="iframe">
    </iframe>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "@vue/runtime-core";

export default defineComponent({
  setup () {
    onMounted(() => {
      // 主页面监听message事件,接收子组件的值
      window.addEventListener('message', function (e) {
        console.log(e.data) // 打印值
      }, false)
      setTimeout(() => {
        window.frames[0].postMessage('123', 'http://127.0.0.1:3000/typescript/base.html');
      }, 10000)
    })
  }
})
</script>

<style scoped>
.iframe {
  height: 99%;
  width: 99%;
}
</style>