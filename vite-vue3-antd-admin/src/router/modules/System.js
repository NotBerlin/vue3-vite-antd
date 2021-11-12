export default [
  {
    path: '/system/set-up',
    name: 'set-up',
    meta: {
      title: '设置',
    },
    component: () => import('../../view/System/SetUp/SetUp.vue'),
  },
]