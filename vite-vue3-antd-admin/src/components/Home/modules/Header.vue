<template>
  <div id='header'>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span>{{userInfo.name}}</span>
    </el-header>
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots } from 'vue'
import useInstance from '../../../mixins/instance'

const { $store, $router } = useInstance()
const userInfo = $store.state.userInfo

function logout() {
  $store.commit('route/SET_ROUTES', [])
  $store.commit('user/SET_USER', {})
  $router.push({
    path: '/login'
  })
}

</script>
<style>
</style>