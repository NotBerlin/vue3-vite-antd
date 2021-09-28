### 请求

### 全局注册
```js
import useInstance from '../../../mixins/instance'

const { $bus, $route, $router, $store, $_http, $_API } = useInstance()
```


# vite项目使用过程中的问题
## 在vite中使用jsx，报错
解决方案如下：
```js
// 首先安装编译jsx的插件
yarn add @vitejs/plugin-vue-jsx

// 其次在vite.config.js文件中挂载
import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig({
 plugins: [ vueJsx()]
})

使用jsx文件？？？？？？？
```
报错信息如下：
```js
[vite] Internal server error: Failed to parse source for import analysis because the content contains invalid JS syntax. Install @vitejs/plugin-vue to handle .vue files.
```


//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG
//
//
//