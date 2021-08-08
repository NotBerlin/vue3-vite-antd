import { getCurrentInstance } from 'vue'

export default function () {
  const { appContext } = getCurrentInstance()
  const { $bus, $route, $router, $store, $_http, $_API } = appContext.config.globalProperties

  return {
    $bus, $route, $router, $store, $_http, $_API
  }
}
