<template>
<div id="tim-page" class="tim-page">
  
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
  timClinet: {
    type: Object,
    default: () => { }
  },
  login: {
    type: Boolean,
    default: false
  }
})

onMounted(() => {
})
</script>


<style scoped>
.tim-page {
  flex: 1;
  height: 100%;
  background: seashell;
}
</style>