import { getUuid } from '../../../utils/consts'
export default [
  {
    name: '导航1',
    id: getUuid('nav-'),
    icon: 'daohang.png',
    sections: [
      {
        name: '选项1',
        id: getUuid('section-'),
        path: '/nav/section1'
      },
      {
        name: '选项2',
        id: getUuid('section-'),
        path: '/nav/section2'
      },
      {
        name: '选项3',
        id: getUuid('section-'),
        path: '/nav/section3',
        disable: true
      },
    ]
  },
  {
    name: 'API',
    id: getUuid('API-'),
    icon: 'API.png',
    sections: [
      {
        name: '网易云音乐',
        id: getUuid('neteaseCloud-'),
        path: '/API/neteaseCloud'
      },
      {
        name: 'JAVA本地测试接口',
        id: getUuid('javaTest-'),
        path: '/API/javaTest'
      },
    ]
  },
  {
    name: 'ThreeJS',
    id: getUuid('ThreeJS-'),
    icon: '3D.png',
    sections: [
      {
        name: '风',
        id: getUuid('Cloud-'),
        path: '/ThreeJS/Cloud'
      },
    ]
  },
  {
    name: '地图',
    id: getUuid('Map-'),
    icon: 'ditu.png',
    sections: [
      {
        name: '地图',
        id: getUuid('Map-'),
        path: '/Map/Map'
      },
    ]
  },
  {
    name: '数据分析',
    id: getUuid('DataAnalysis-'),
    icon: 'data-analysis.png',
    sections: [
      {
        name: 'G2',
        id: getUuid('G2-'),
        path: '/dataAnalysis/g2'
      },
      {
        name: 'G6',
        id: getUuid('G6-'),
        path: '/dataAnalysis/g6'
      },
      {
        name: 'Echarts',
        id: getUuid('Echarts-'),
        path: '/dataAnalysis/echarts'
      },
    ]
  },
  {
    name: '实时通信',
    id: getUuid('RealTimeCommunication-'),
    icon: 'chat.png',
    sections: [
      {
        name: 'TrtcCalling',
        id: getUuid('TrtcCalling-'),
        path: '/Chat/trtcCalling'
      },
    ]
  },
  {
    name: '音乐',
    id: getUuid('Music-'),
    icon: 'music.png',
    sections: [
      {
        name: 'Migu',
        id: getUuid('Migu-'),
        path: '/music/mi-gu'
      },
    ]
  },
  {
    name: '实用小功能',
    id: getUuid('Function-'),
    icon: 'function.png',
    sections: [
      {
        name: '拖拽功能',
        id: getUuid('Drag-'),
        path: '/function/drag'
      },
      {
        name: '浏览器设备',
        id: getUuid('Equipment-'),
        path: '/function/equipment'
      },
      {
        name: '人脸识别',
        id: getUuid('FaceRecognition-'),
        path: '/function/faceRecognition'
      },
    ]
  },
  {
    name: '系统',
    id: getUuid('System-'),
    icon: 'system-set-up.png',
    sections: [
      {
        name: '设置',
        id: getUuid('SetUp-'),
        path: '/system/set-up'
      },
    ]
  },
]