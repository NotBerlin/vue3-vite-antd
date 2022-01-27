<template>
  <div id="ConcatSignature">
    <button @click="back">返回</button>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ConcatSignature',
  setup (props, { emit }) {
    function back () {
      emit('changeComponent', {
        name: 'ChangeComponent'
      })
    }
    return {
      back
    }
  }
})
</script>