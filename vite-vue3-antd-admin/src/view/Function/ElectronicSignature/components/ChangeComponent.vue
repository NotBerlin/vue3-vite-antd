<template>
  <div id="ChangeComponent">
    <button @click="toWrite">手写签章</button>
    <button @click="toConcat">合并签章</button>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ChangeComponent',
  setup (props, { emit }) {
    function toWrite () {
      emit('changeComponent', {
        name: 'WriteSignature'
      })
    }
    function toConcat () {
      emit('changeComponent', {
        name: 'ConcatSignature'
      })
    }
    return {
      toWrite,
      toConcat
    }
  }
})
</script>