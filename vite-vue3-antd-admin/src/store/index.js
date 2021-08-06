import { createStore } from "vuex";
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
import route from "./modules/route";


/**
 * // 在browser中无法识别require.context()方法
 * // 使用webpack编译后可以使用
      const moduleFiles = require.context('./modules', true, /\.js$/)
      const modules = moduleFiles.keys().reduce((modules, modulePath) => {
        const storeName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
        modules[storeName] = moduleFiles(modulePath).default
        return modules
      }, {})
 */

// 在vite编译过程中nobundle
// 使用import方法
const moduleFiles = import.meta.globEager('./modules/*.js')
console.log(moduleFiles)
const modules = Object.keys(moduleFiles).reduce((modules, modulePath) => {
  const storeName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1').replace('modules/', '')
  modules[storeName] = moduleFiles[modulePath].default
  return modules
}, {})

export default createStore({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer: (state) => {
        return {
          userInfo: state.user.userInfo,
          routes: state.route.routes
        }
      }
    })
  ],
  modules,
  getters
})