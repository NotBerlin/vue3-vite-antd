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

    async function getTest () {
      const res = await $_http.get($_API.API_JAVA_TEST, {
        params: {
          userName: '陈'
        }
      });
      if (res.code === 0 || res.success) {
        state.java = res.data
      }
    }

    async function postTest () {
      const params = {
        list:
          [
            {
              userName: 'laochen',
              age: 18
            }, {
              userName: 'laodong',
              age: 11
            }
          ]
      }
      const res = await $_http.post($_API.API_JAVA_TEST_TEST2, params);
      if (res.code === 0 || res.success) {
        state.java = res.data
      }
    }

    onMounted(() => {
      // getTest()
      postTest()
    })

    return { ...toRefs(state) }
  }
}
</script>