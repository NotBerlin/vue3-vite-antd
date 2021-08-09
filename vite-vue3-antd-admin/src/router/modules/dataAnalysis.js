export default [{
  path: "/dataAnalysis/g2",
  name: "G2",
  component: () => import('../../view/DataAnalysis/AntVG2/index.vue'),
  meta: {
    title: 'G2'
  }
},
{
  path: "/dataAnalysis/g6",
  name: "G6",
  component: () => import('../../view/DataAnalysis/AntVG6/index.vue'),
  meta: {
    title: 'G6'
  }
},
{
  path: "/dataAnalysis/echarts",
  name: "echarts",
  component: () => import('../../view/DataAnalysis/Echarts/index.vue'),
  meta: {
    title: 'Echarts'
  },
}]