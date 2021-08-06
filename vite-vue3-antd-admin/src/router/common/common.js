import NotFound from "../../components/NotFound/NotFound.vue";

export default [
    {
      path: "/login",
      name: "Login",
      component: () => import('../../components/Login/Login.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound
    },
    {
      path: "/",
      name: "Home",
      component: () => import('../../components/Home/Home.vue'),
      children: [
        {
          path: "/home",
          name: "Home",
          component: () => import('../../view/Home/Home.vue'),
          meta: {
            title: '首页'
          }
        },
      ],
      redirect: '/login'
    },
  ];
