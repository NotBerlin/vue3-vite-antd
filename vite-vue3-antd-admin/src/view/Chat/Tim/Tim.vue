<template>
<div id="tim-page">
  
</div>
</template>

<script setup>
import {
  defineProps,
  reactive,
  defineEmits,
  onMounted,
  defineExpose,
  toRefs,
  watch
} from "vue";

const prop = defineProps({
  tim: {
    type: Object,
    default: () => { }
  },
  login: {
    type: Boolean,
    default: false
  }
})


let onMessageReceived = function (event) {
  // event.data - 存储 Message 对象的数组 - [Message]
};

function timListener () {
  prop.tim.on("onMessageReceived", onMessageReceived);
}

watch(() => prop.login, (val) => {
  if (val) {
    timListener()
  }
})

onMounted(() => {
})
</script>