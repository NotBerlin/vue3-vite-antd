import { createRouter,createWebHistory} from "vue-router";

// 路由信息
const routes = [
    {
        path: "/",
        name: "Login",
        component: () => import('../components/Login/Login.vue'),
    },
    {
        path: "/home",
        name: "Home",
        component: () => import('../components/Home/Home.vue'),
    },
];

// 导出路由
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;