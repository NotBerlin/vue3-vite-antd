export default [
  {
    path: '/user',
    name: 'User',
    meta: {
      title: '用户信息',
    },
    component: () => import('../../view/User/User.jsx'),
  },
]