import routes from "./routes";
import VueRouter from 'vue-router';

/** Vuex */
import {
    store
} from '../store/store'

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, _, next) => {

    if (to.matched.some(record => record.meta.auth)) {

        store.getters.auth ? next() : next({
            name: 'login'
        });

    } else if (to.matched.some(record => record.meta.guest)) {

        store.getters.guest ? next() : next({
            path: '/'
        });

    } else {

        next();
    }

});

export default router;
