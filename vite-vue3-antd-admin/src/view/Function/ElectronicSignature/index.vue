<template>
  <div id='electronicSignature'>
    <component :is="currentComponent" @changeComponent="changeComponentFn"></component>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'
import WriteSignature from './components/WriteSignature.vue'
import ConcatSignature from './components/ConcatSignature.vue'
import ChangeComponent from './components/ChangeComponent.vue'
export default defineComponent({
  name: 'ElectronicSignature',
  components: {
    WriteSignature,
    ConcatSignature,
    ChangeComponent,
  },
  setup () {
    let state = reactive({
      currentComponent: ChangeComponent
    })

    function changeComponentFn (event) {
      switch (event.name) {
        case 'WriteSignature':
          state.currentComponent = WriteSignature;
          break;
        case 'ConcatSignature':
          state.currentComponent = ConcatSignature;
          break;
        case 'ChangeComponent':
          state.currentComponent = ChangeComponent;
          break;
        default:
          state.currentComponent = ChangeComponent;
          break;
      }
    }
    return {
      ...toRefs(state),
      changeComponentFn
    }
  },
})
</script>
<style>
</style>