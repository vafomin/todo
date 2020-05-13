import Vue from "vue";
import Router from "vue-router";

const fb = require('../../firebaseConfig');

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/Home"),
        },
        {
            path: "/b/:id",
            name: "board",
            component: () => import("../views/Board"),
        },
        {
            path: "/noaccess",
            name: "noAccess",
            component: () => import("../views/NoAccess"),
        },
        {
            path: "*",
            name: "notFound",
            component: () => import("../views/NotFound"),
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.name === "board") {
        let id = to.params.id;
        fb.usersCollection.doc(id).get().then((doc) => {
            if (!doc.exists || !doc.data().isShare) {
                next({name: "noAccess"});
            } else next();
        });
    } else next()
});

export default router;
