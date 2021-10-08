<template>
  <div id='header'>
    <el-header style="text-align: right; font-size: 12px">
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
import { defineProps, reactive, defineEmits, useAttrs, useSlots, computed } from 'vue'
import useInstance from '../../../mixins/instance'

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
</style>