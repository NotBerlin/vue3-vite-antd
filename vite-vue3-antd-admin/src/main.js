import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Bus from './plugin/bus'

const app = createApp(App)

app.config.globalProperties.$bus = Bus

app.use(router).mount('#app')
