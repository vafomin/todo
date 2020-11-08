import Vue from "vue";
import Router from "vue-router";
import store from "../store";

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
    store.commit("settings/setSettingsDialog", false)

    if (to.name === "board") {
        let url = to.params.id;
        fb.usersCollection.where("url", "==", url).orderBy("uid", "desc").onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
                let settings = doc.data();
                if (!settings.isShare) {
                    next({name: "noAccess"});
                } else {
                    store.commit("setTkn", settings.uid);
                    next();
                }
            });
        });
    } else {
        next();
    }
});

export default router;
