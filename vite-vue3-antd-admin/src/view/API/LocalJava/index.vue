<template>
  <div>
    天气： {{java.weather}}
    颜色： {{java.color}}
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from '@vue/runtime-core'
import useInstance from "../../../mixins/instance";
export default {
  name: 'LocalJava',
  setup () {
    const { $_http, $_API } = useInstance();

    const state = reactive({
      java: {}
    })

    onMounted(async () => {
      const res = await $_http.get($_API.API_JAVA_TEST, {});
      if (res.code === 0 || res.success) {
        state.java = res.data
      }
    })

    return {...toRefs(state)}
  }
}
</script>