<template>
  <div id='container'>
    <Header />

    <el-container>
      <el-main>
        <Tag />

        <!-- vue3 keep-alive缓存 -->
        <transition name="fade-transform" mode="out-in">
          <router-view v-slot="{ Component }">
            <keep-alive :include="cachedViews">
              <component :is="Component" class="content"></component>
            </keep-alive>
          </router-view>
        </transition>

        <!-- vue2 keep-alive缓存 -->
        <!-- <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cachedViews">
            <router-view class="content"></router-view>
          </keep-alive>
        </transition> -->
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import { defineProps, reactive, defineEmits, useAttrs, useSlots } from 'vue'
import Header from './Header.vue'
import Tag from './Tag.vue'
import useInstance from '../../../mixins/instance'

const { $store } = useInstance()
console.log($store.state)

const cachedViews = $store.state.cacheViews

</script>
<style>
#container {
  flex: 1;
  height: 100%;
  overflow: auto;
}

.el-container {
  height: calc(100% - 60px);
  background: #f6f6f6;
}

.content {
  background: white;
  height: calc(100% - 40px);
}
</style>