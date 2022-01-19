<template>
  <div>
    <iframe src="http://127.0.0.1:3000/typescript/base.html" class="iframe">
    </iframe>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  setup () {
    let a = '1'
  }
})
</script>

<style scoped>
.iframe {
  height: 99%;
  width: 99%;
}
</style>