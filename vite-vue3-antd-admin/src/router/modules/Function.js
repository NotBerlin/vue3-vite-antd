export default [
  {
    path: '/function/drag',
    name: 'Drag',
    meta: {
      title: '拖拽功能',
    },
    component: () => import('../../view/Function/Drag/index.vue'),
  },
  {
    path: '/function/equipment',
    name: 'Equipment',
    meta: {
      title: '浏览器设备',
    },
    component: () => import('../../view/Function/Equipment/index.vue'),
  },
  {
    path: '/function/faceRecognition',
    name: 'FaceRecognition',
    meta: {
      title: '浏览器设备',
    },
    component: () => import('../../view/Function/FaceRecognition/index.vue'),
  },
  {
    path: '/function/electronicSignature',
    name: 'ElectronicSignature',
    meta: {
      title: '浏览器设备',
    },
    component: () => import('../../view/Function/ElectronicSignature/index.vue'),
  },
]