<template>
  <div id='set-up'>
    <component :is="currentComponent"></component>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'
import AudioEdit from './components/audioEdit.vue'
export default defineComponent({
  setup (props, context) {
    let state = reactive({
      currentComponent: null
    })

    state.currentComponent = AudioEdit

    return { ...toRefs(state) }
  }
})
</script>
<style>
</style>