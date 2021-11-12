<template>
  <div id='header'>
    <el-header style="text-align: right; font-size: 12px">
      <div class="audio-cover" @click="setState">
        <img src="../../../assets/images/music-active.png" alt="" srcset="" :class="[audioController.playing.value ? 'spin' : '']">
      </div>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            <!-- <el-dropdown-item @click="editUserInfo">修改信息</el-dropdown-item> -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="user-info" @click="userInfoFn">
        <img src="../../../assets/images/portrait.jpeg" alt="" srcset="">
        {{userInfo.name}}
      </div>
    </el-header>
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots, computed, inject, watch } from 'vue'
import useInstance from '../../../mixins/instance'

let audioController = inject('audioController')

const { $store, $router } = useInstance()
const userInfo = computed(() => $store.state.user.userInfo)


function logout () {
  $store.commit('route/SET_ROUTES', [])
  $store.commit('user/SET_USER', {})
  $router.push({
    path: '/login'
  })
}

function editUserInfo () { }

function userInfoFn () {
  $router.push({
    path: '/user'
  })
}

function setState () {
  audioController.setState(!audioController.state.value)
}

</script>
<style>
.el-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.user-info {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.user-info > img {
  height: 30px;
  border-radius: 30px;
  margin-right: 4px;
}

.audio-cover {
  height: 15px;
  width: 20px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-right: 12px;
  cursor: pointer;
}

.audio-cover > img {
  height: 15px;
}

.spin {
  -webkit-animation: spin 1s linear 1s 5 alternate;
  animation: spin 1s linear infinite;
}

@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>