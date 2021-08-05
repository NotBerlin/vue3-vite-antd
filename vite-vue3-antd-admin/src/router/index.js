import { createRouter, createWebHistory } from "vue-router";

// 路由信息
const routes = [
    {
        path: "/login",
        name: "Login",
        component: () => import('../components/Login/Login.vue'),
    },
    {
        path: "/",
        name: "Home",
        component: () => import('../components/Home/Home.vue'),
        children: [
            {
                path: "home",
                name: "Home",
                component: () => import('../view/Home/Home.vue'),
            },
            {
                path: "/nav1/group1/section1",
                name: "Section1",
                component: () => import('../view/nav1/group1/section1/Section1.vue'),
            },
        ],
        redirect: '/login'
    },
];

// 导出路由
const router = createRouter({
    history: createWebHistory(),
    routes
});

router.afterEach((to, from) => {
})

export default router;