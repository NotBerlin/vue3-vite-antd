<template>
  <div>
    天气： {{java.weather}}
    颜色： {{java.color}}
    <video id="video1" class="video-js vjs-default-skin" width="640" height="480" data-setup='{"controls" : true, "autoplay" : true, "preload" : "auto"}'>
      <source src="http://1259045199.vod2.myqcloud.com/61828e4fvodcq1259045199/9f12dc323701925925598196138/f0.flv" type="video/x-flv">
    </video>
    <video src="http://1259045199.vod2.myqcloud.com/61828e4fvodcq1259045199/9f12dc323701925925598196138/f0.flv" controls="controls">
      您的浏览器不支持 video 标签。
    </video>
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

    // 使用get请求，传递数组参数，后端使用strs变量接收
    async function getTest1 () {
      const res = await $_http.get($_API.API_JAVA_TEST_TEST1 + '?strs=123&strs=321&strs=1');
      if (res.code === 0 || res.success) {
        state.java = res.data
      }
    }

    // 通过post请求，传递对象
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

    // 通过post请求，传递数组
    async function postTest4 () {
      const params = [
        {
          userName: 'laochen',
          age: 18
        }, {
          userName: 'laodong',
          age: 11
        }
      ]
      const res = await $_http.post($_API.API_JAVA_TEST_TEST4, params);
      if (res.code === 0 || res.success) {
        state.java = res.data
      }
    }

    // 通过post请求，中文乱码
    async function postTest5 () {
      const params = [
        {
          userName: '老陈',
          age: 18
        }, {
          userName: '老懂',
          age: 11
        }
      ]
      const res = await $_http.post($_API.API_JAVA_TEST_TEST5, params);
      if (res.code === 0 || res.success) {
        state.java = res.data
      }
    }

    // 使用get请求，传递参数名不对，到后端接口进行映射
    async function getTest6 () {
      const res = await $_http.get($_API.API_JAVA_TEST_TEST6);
      if (res.code === 0 || res.success) {
        state.java = res.data
      }
    }

    // RESTFUL风格请求参数
    async function getTest7 () {
      const res = await $_http.get($_API.API_JAVA_TEST_TEST7 + '/1');
      if (res.code === 0 || res.success) {
        state.java = res.data
      }
    }

    // 格式化传参
    async function getTest8 () {
      const res = await $_http.get($_API.API_JAVA_TEST_TEST8 + '?date=2021/09/10');
      if (res.code === 0 || res.success) {
        state.java = res.data
      }
    }

    // 格式化传参
    async function getTest10 () {
      const res = await $_http.get($_API.API_JAVA_TEST_TEST10);
      if (res.code === 0 || res.success) {
        state.java = res.data
      }
    }

    function postDatabase1 () {
      let params = {
        name: '老陈',
        money: 5000
      }
      $_http.post($_API.API_JAVA_DATABASE_TEST1, params);
    }

    onMounted(() => {
      // getTest()
      // postTest()
      // getTest1()
      // postTest4()
      // postTest5()
      // getTest6()
      // getTest8()
      postDatabase1()
    })

    return { ...toRefs(state) }
  }
}
</script>