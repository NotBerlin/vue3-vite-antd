import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

console.log(import.meta.env)

export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        }
      ]
    }),
  ],
  server: {
    host: '127.0.0.1',
    post: 3000,
    // 是否在端口占用情况下退出应用
    strictPort: false,
    open: true,
    cors: true,
    proxy: {
      //这里是通过请求/api 来转发到 https://api.pingping6.com/
      //假如你要请求https://api.*.com/a/a
      //那么axios的url，可以配置为 /api/a/a
      '/api': {
        target: 'https://api.imjad.cn/cloudmusic/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/local': {
        target: 'http://localhost:10086',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/local/, '')
      }
    }
  }
})