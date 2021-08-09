export default [
  {
    path: '/Map/Map',
    name: 'Map',
    meta: {
      title: '地图',
    },
    component: () => import('../../view/Map/Map/index.vue'),
  }
]