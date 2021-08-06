export default [
  {
    path: '/API/neteaseCloud',
    name: 'NeteaseCloud',
    meta: {
      title: '网易云',
    },
    component: () => import('../../view/API/NeteaseCloud/NeteaseCloud.vue'),
  }
]