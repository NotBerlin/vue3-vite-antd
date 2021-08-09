<template>
  <div id="Login">
    <div class="seazi-a-seat"></div>
    <div class="seazi-a-seat"></div>
    <div class="seazi-a-seat"></div>
    <div class="login-iframe">
      <el-form label-position="right" label-width="80px" :model="form">
        <el-form-item label="账号：">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="login">Login</el-button>
    </div>
    <div class="seazi-a-seat"></div>
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots, toRefs, ref, onMounted } from 'vue'
import useInstance from '../../mixins/instance'
import { getUuid } from '../../utils/consts'

const { $bus, $route, $router, $store } = useInstance()

const form = reactive({
  account: '',
  password: ''
})

function login () {
  const arr = [
    {
      name: '导航1',
      id: getUuid('nav-'),
      icon: 'daohang.png',
      sections: [
        {
          name: '选项1',
          id: getUuid('section-'),
          path: '/nav/section1'
        },
        {
          name: '选项2',
          id: getUuid('section-'),
          path: '/nav/section2'
        },
        {
          name: '选项3',
          id: getUuid('section-'),
          path: '/nav/section3',
          disable: true
        },
      ]
    },
    {
      name: 'API',
      id: getUuid('API-'),
      icon: 'API.png',
      sections: [
        {
          name: '网易云音乐',
          id: getUuid('neteaseCloud-'),
          path: '/API/neteaseCloud'
        },
      ]
    },
    {
      name: 'ThreeJS',
      id: getUuid('ThreeJS-'),
      icon: '3D.png',
      sections: [
        {
          name: '风',
          id: getUuid('Cloud-'),
          path: '/ThreeJS/Cloud'
        },
      ]
    },
    {
      name: '地图',
      id: getUuid('Map-'),
      icon: 'ditu.png',
      sections: [
        {
          name: '地图',
          id: getUuid('Map-'),
          path: '/Map/Map'
        },
      ]
    },
    {
      name: '数据分析',
      id: getUuid('DataAnalysis-'),
      icon: 'data-analysis.png',
      sections: [
        {
          name: 'G2',
          id: getUuid('G2-'),
          path: '/dataAnalysis/g2'
        },
        {
          name: 'G6',
          id: getUuid('G6-'),
          path: '/dataAnalysis/g6'
        },
        {
          name: 'Echarts',
          id: getUuid('Echarts-'),
          path: '/dataAnalysis/echarts'
        },
      ]
    },
  ]

  const userInfo = {
    name: '陈陈陈',
    id: '511xxxxxxxxxxxxx14'
  }

  $store.commit('route/SET_ROUTES', arr)
  $store.commit('user/SET_USER', userInfo)
  $router.push({
    path: '/home'
  })
}

onMounted(() => {
  $store.commit('tag/CLEAR_TAGS')
  $store.commit('route/SET_ROUTES', [])
  $store.commit('user/SET_USER', {})
})

</script>
<style>
#Login {
  position: relative;
  height: 100%;
  width: 100%;
  background: linear-gradient(to right, #03a9f4, #8bc34a, #ffc107);
  overflow: auto;
  display: flex;
  align-items: center;
}

.seazi-a-seat {
  flex: 1;
}

.login-iframe {
  height: 450px;
  width: 320px;
  border-radius: 8px;
  padding: 26px 13px;
  position: relative;
  background: hsla(120, 50%, 0%, 0.3);
  overflow: hidden;
}

.login-iframe > button {
  width: 100%;
}
</style>