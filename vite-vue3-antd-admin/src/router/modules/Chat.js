export default [
  {
    path: '/Chat/trtcCalling',
    name: 'trtcCalling',
    meta: {
      title: '实时通信',
    },
    component: () => import('../../view/Chat/TrtcCalling/TrtcCalling.vue'),
  }
]