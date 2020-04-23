import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home";
import Page from "../views/Page";
import NotFound from "../views/NotFound";
import store from '../store';

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/page",
            name: "page",
            component: Page,
            meta: {requiresAuth: true}
        },
        {
            path: "*",
            name: "notFound",
            component: NotFound
        }
    ]
});

router.beforeEach((to, from, next) => {
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !store.getters.isAuth) {
        next('/');
    } else {
        next();
    }
});

export default router;
