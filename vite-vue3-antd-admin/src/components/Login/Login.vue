<template>
  <div id="Login">
    <div class="seazi-a-seat"></div>
    <div class="seazi-a-seat"></div>
    <div class="seazi-a-seat"></div>
    <div class="login-iframe">
      <el-form label-position="right" label-width="80px" :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="账号：" prop="account">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
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
import adminRouter from './modules/adminRouter'

const { $bus, $route, $router, $store, $_http, $_API, $_debounce } = useInstance()

const form = reactive({
  account: '',
  password: ''
})

const ruleForm = ref(null)

async function login () {
  // console.log(ruleForm)
  // ruleForm.value.validate((valid) => {
  // })
  // return
  let res = null;
  try {
    let params = {
      account: form.account,
      password: form.password
    }
    // res = await $_http.post($_API.API_POST_LOGIN, params);
    res = {
      code: 0,
      success: true
    }
  } catch (error) {
    console.log(error)
    res = {
      code: 0,
      success: true
    }
  }
  if (res.code == 0 || res.success) {
    const arr = adminRouter

    const userInfo = {
      name: '陈陈陈',
      id: '511xxxxxxxxxxxxx14'
    }

    $_debounce(() => {
      $store.commit('route/SET_ROUTES', arr)
      $store.commit('user/SET_USER', userInfo)
      $router.push({
        path: '/home'
      })
    }, 300)()
  }
}

const rules = {
  // account: [
  //   {
  //     required: true, message: '请输入活动名称', trigger: 'blur'
  //   }
  // ]
}

onMounted(() => {
  $store.commit('tag/CLEAR_TAGS')
  $store.commit('tag/CLEAR_CACHEVIEWS')
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