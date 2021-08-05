import { getCurrentInstance } from 'vue'

export default function () {
  const { appContext } = getCurrentInstance()
  const { $bus, $route, $router, $store } = appContext.config.globalProperties

  return {
    $bus, $route, $router, $store
  }
}
