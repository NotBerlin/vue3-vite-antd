import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

// 路由信息
const routes = [
    {
        path: "/login",
        name: "Login",
        component: () => import('../components/Login/Login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: "/",
        name: "Home",
        component: () => import('../components/Home/Home.vue'),
        children: [
            {
                path: "/home",
                name: "Home",
                component: () => import('../view/Home/Home.vue'),
                meta: {
                    title: '首页'
                }
            },
            {
                path: "/nav/section1",
                name: "Section1",
                component: () => import('../view/nav1/section1/Section1.vue'),
                meta: {
                    title: '选项1'
                }
            },
            {
                path: "/nav/section2",
                name: "Section2",
                component: () => import('../view/nav1/section2/Section2.vue'),
                meta: {
                    title: '选项2'

                },
            }
        ],
        redirect: '/login'
    },
];

// 导出路由
const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.fullPath === '/' || to.fullPath === '/login') {
        next()
        return false
    }
    if (from.fullPath !== '/login' && JSON.stringify(store.state.userInfo) === '{}') {
        router.push({
            path: '/'
        })
        next()
        return false
    }
    store.commit('tag/SET_TAGS', to)
    store.commit('tag/SET_CURRENT_TAG', to)
    next()
})

export default router;