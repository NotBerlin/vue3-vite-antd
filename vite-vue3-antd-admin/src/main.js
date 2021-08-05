import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Bus from './plugin/bus'
import store from './store'

import useElement from './plugin/Element'

import './assets/css/common.module.css'

const app = createApp(App)

app.config.globalProperties.$bus = Bus

app.use(router).use(store).use(useElement).mount('#app')
