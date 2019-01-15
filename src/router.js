import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const constantRouter = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        component: () => import("layouts/LoginLayout"),
    },
    {
        path: "/apps",
        component: () => import("layouts/BasicLayout"),
        redirect: "/desktop",
    },
    {
        path: "/desktop",
        component: () => import("views/desktop/index"),
    }
];

export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouter
});

