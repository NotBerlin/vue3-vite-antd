'use strict'
import axios from 'axios'
import store from '../store'
import { getCookie } from './cookie'
import { AUTH_TOKEN_FRONT, AUTH_TOKEN_END } from './Constant'
import { getAllPromise } from './util'
import { queryString } from './consts'
import { ElMessage } from 'element-plus'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

const baseConfig = {
  baseURL: import.meta.env.VITE_APP_BASE_URL || '',
  timeout: 60 * 1000,
  withCredentials: false,
  crossDomain: true,
  transformRequest: [
    (data) => {
      if (!data || typeof data === 'string') {
        return data
      }
      if (data instanceof FormData) {
        return data
      }
      // 对Blob对象进行处理
      const hasBlob = Object.values(data).some((it) => {
        return it instanceof Blob
      })
      if (!hasBlob) {
        return JSON.stringify(data)
      }
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
      })
      return formData
    }
  ]
}

const _axios = axios.create(baseConfig)

// 注册all方法，执行多个并发请求
// 可传入Promise、包含Promise的数组、返回值为Promise的方法
_axios.all = (...requsets) => {
  // 获取所有Promise对象
  const promiseList = getAllPromise(requsets)
  return new Promise((resolve, reject) => {
    axios
      .all(promiseList)
      .then(
        axios.spread((...response) => {
          // 两个请求现在都执行完成
          resolve(response)
        })
      )
      .catch((error) => {
        reject(error)
      })
  })
}

_axios.interceptors.request.use(
  (config) => {
    if (config.method == 'get') {
      config.url += queryString(config.query, '&', '?')
    }
    const token = getCookie(AUTH_TOKEN_FRONT)
    config.headers.common[AUTH_TOKEN_END] = token
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 拦截响应
_axios.interceptors.response.use(
  (response) => {
    if (
      response.config.responseType === 'arraybuffer'
      || response.config.responseType === 'blob'
    ) {
      return response
    }
    // 用来判断是否请求成功
    const success = response.status === 200 && response.data.code === 0
    let message = ''
    if (!success) {
      if (typeof response.data === 'string') {
        message = '服务器错误，未获取到响应数据'
      } else {
        if (response.status === 200 && response.data.code === 0) {
          return Promise.reject(response)
        }
        message = response.data.message || response.data.errorData || '操作执行失败'
      }
      ElMessage({ type: 'error', message: message })
      return Promise.reject(response)
    }
    return {
      data: response.data.data,
      success,
      message
    }
  },
  (error) => {
    if (!navigator.onLine) {
      ElMessage({ type: 'error', message: '网络连接异常，请检查网络！' })
      return Promise.reject(error)
    }
    const status = error.response.status
    if (status === 401) {
      ElMessage({ type: 'error', message: '您的登录已过期，请重新登录' })
      window.location.reload()
      store.dispatch('user/logout')
      return Promise.reject(error)
    }
    if (status < 200) {
      ElMessage({ type: 'warning', message: `未处理的消息响应，状态码：${ status }` })
    } else if (status >= 300 && status < 400) {
      ElMessage({ type: 'warning', message: `未处理的重定向响应，状态码：${ status }` })
    } else if (status >= 400 && status < 500) {
      console.log(this)
      ElMessage({ type: 'error', message: `客户端错误，状态码：${ status }` })
    } else if (status >= 500) {
      ElMessage({ type: 'error', message: `服务器错误，状态码：${ status }` })
    }
    // 系统请求失败
    return Promise.reject(error)
  }
)

export default _axios
