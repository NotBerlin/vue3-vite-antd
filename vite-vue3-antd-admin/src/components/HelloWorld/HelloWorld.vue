<template>
<div id="hello-world">
  <h1>{{ handleArray() }}</h1>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="state.count++">
    count is: {{ state.count }}
  </button>
  <button @click="handlePush">跳转页面</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</div>
  
</template>

<script setup>
import { defineProps, reactive } from 'vue'
import { handleArray } from '../../plugin/consts'
import useInstance from '../../mixins/instance'

defineProps({
  msg: String
})

const { $bus, $route, $router } = useInstance()

const state = reactive({ count: 0 })

function handlePush() {
  $router.push({
    path: '/home',
    params: {
      abc: 'abc'
    }
  })
}
</script>

<style scoped>
a {
  color: #42b983;
}

#hello-world {
  height: 100%;
  width: 100%;
}
</style>
