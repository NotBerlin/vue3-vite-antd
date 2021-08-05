import { createRouter,createWebHistory} from "vue-router";

// 路由信息
const routes = [
    {
        path: "/",
        name: "HelloWorld",
        component:  () => import('../components/HelloWorld/HelloWorld.vue'),
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