import { getCurrentInstance } from 'vue'

function close () {
  let tags = this.$store._state.data.tag.tags
  let tag = tags[tags.length - 1]
  let next = tags[tags.length - 2]
  this.$store.commit('tag/REMOVE_TAG', tag)
  this.$router.push({
    path: next.fullPath
  })
}

// 定时器
let timer = null

// fn是我们需要包装的事件回调, delay是每次推迟执行的等待时间
function debounce (fn, delay) {

  // 将debounce处理结果当作函数返回
  return function () {
    // 保留调用时的this上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments
    // 每次事件被触发时，都去清除之前的旧定时器
    if (timer) {
      clearTimeout(timer)
    }
    // 设立新定时器
    timer = setTimeout(function () {
      fn(args)
    }, delay)
  }
}

export default function () {
  const { appContext } = getCurrentInstance()
  const { $bus, $route, $router, $store, $_http, $_API, $_mode } = appContext.config.globalProperties

  return {
    $bus, $route, $router, $store, $_http, $_API, $_mode, $_close: close.bind({ $router, $store }), $_debounce: debounce
  }
}
