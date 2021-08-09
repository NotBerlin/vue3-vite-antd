import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

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

console.log(rootPathObject)

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
    if (!to.meta.title) {
        document.title = '王的网站'
    } else {
        document.title = to.meta.title
        store.commit('tag/SET_TAGS', to)
        store.commit('tag/SET_CURRENT_TAG', to)
    }
    next()
})

export default router;