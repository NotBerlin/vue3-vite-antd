import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Bus from './plugin/bus'
import store from './store'
import axios from './utils/axios'
import $_API from './api'

import useElement from './plugin/Element'
import useCustomElement from './plugin/customElement'

import './assets/css/common.module.css'

const app = createApp(App)

app.config.globalProperties.$bus = Bus
app.config.globalProperties.$_http = axios
app.config.globalProperties.$_API = $_API
app.config.globalProperties.$_mode = import.meta.env

app.use(router).use(store).use(useElement).use(useCustomElement).mount('#app')
