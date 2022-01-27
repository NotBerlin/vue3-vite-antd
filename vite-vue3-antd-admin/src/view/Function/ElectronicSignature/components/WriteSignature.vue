<template>
  <div id="WriteSignature">
    <div class="write-plate"></div>
    <button @click="back">返回</button>
    <button @click="toConcat">前往合并签章</button>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'WriteSignature',
  setup (props, { emit }) {
    function back () {
      emit('changeComponent', {
        name: 'ChangeComponent'
      })
    }
    function toConcat () {
      emit('changeComponent', {
        name: 'ConcatSignature'
      })
    }
    return {
      back,
      toConcat
    }
  }
})
</script>

<style scoped>
.write-plate {
  height: 400px;
  width: 400px;
  background: white;
  border: 1px solid #59595960;
  border-radius: 4px;
  cursor: url('../../../../assets/icon/pen.ico'), auto;
}
</style>