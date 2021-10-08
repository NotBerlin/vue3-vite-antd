<template>
  <teleport to="body">
    <div v-show="visible" class="chat-function-model" id="chat-function-model"></div>
  </teleport>
</template>

<script>
import { defineComponent, toRefs, watch } from "@vue/runtime-core";

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    watch(props, (val) => {
    })
    return { ...toRefs(props) }
  }
})
</script>

<style scoped>
.chat-function-model {
  position: absolute;
  height: 300px;
  width: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-250px, -150px);
  background: white;
  box-shadow: 2px 2px 2px 2px #eeeeee;
  border-radius: 5px;
  border: 1px solid #eeeeee;
}
</style>