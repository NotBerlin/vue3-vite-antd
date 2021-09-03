export default [
  {
    path: '/API/neteaseCloud',
    name: 'NeteaseCloud',
    meta: {
      title: '网易云',
    },
    component: () => import('../../view/API/NeteaseCloud/NeteaseCloud.vue'),
  },
  {
    path: '/API/javaTest',
    name: 'JavaTest',
    meta: {
      title: 'Java本地',
    },
    component: () => import('../../view/API/LocalJava/index.vue'),
  }
]