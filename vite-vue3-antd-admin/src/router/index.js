import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

// 路由信息
// const routes = [
//     {
//         path: "/login",
//         name: "Login",
//         component: () => import('../components/Login/Login.vue'),
//         meta: {
//             title: '登录'
//         }
//     },
//     {
//         path: "/",
//         name: "Home",
//         component: () => import('../components/Home/Home.vue'),
//         children: [
//             {
//                 path: "/home",
//                 name: "Home",
//                 component: () => import('../view/Home/Home.vue'),
//                 meta: {
//                     title: '首页'
//                 }
//             },
//             {
//                 path: "/nav/section1",
//                 name: "Section1",
//                 component: () => import('../view/nav1/section1/Section1.vue'),
//                 meta: {
//                     title: '选项1'
//                 }
//             },
//             {
//                 path: "/nav/section2",
//                 name: "Section2",
//                 component: () => import('../view/nav1/section2/Section2.vue'),
//                 meta: {
//                     title: '选项2'

//                 },
//             }
//         ],
//         redirect: '/login'
//     },
// ];

const routes = []

// 共通路由
const commonFiles = import.meta.globEager('./common/*.js');
console.log(commonFiles)
Object.keys(commonFiles).forEach((commonFile, commonIndex) => {
    routes.push(...commonFiles[commonFile].default)
})

// 添加到/路径下
// /路径下的对象
const rootPathObject = routes.find(item => item.path === '/')

// 菜单路由
const moduleFiles = import.meta.globEager('./modules/*.js');
Object.keys(moduleFiles).forEach((moduleFile, moduleIndex) => {
    rootPathObject.children.push(...moduleFiles[moduleFile].default)
});

// 导出路由
const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.fullPath === '/') {
        document.title = '王的网站'
        next()
        return false
    }
    if (to.fullPath === '/login') {
        document.title = '王的网站'
        next()
        return false
    }
    if (from.fullPath !== '/login' && JSON.stringify(store.state.userInfo) === '{}') {
        document.title = '王的网站'
        router.push({
            path: '/'
        })
        next()
        return false
    }
    document.title = to.meta.title
    store.commit('tag/SET_TAGS', to)
    store.commit('tag/SET_CURRENT_TAG', to)
    next()
})

export default router;