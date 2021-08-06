export default [{
  path: "/nav/section1",
  name: "Section1",
  component: () => import('../../view/nav1/section1/Section1.vue'),
  meta: {
    title: '选项1'
  }
},
{
  path: "/nav/section2",
  name: "Section2",
  component: () => import('../../view/nav1/section2/Section2.vue'),
  meta: {
    title: '选项2'

  },
}]