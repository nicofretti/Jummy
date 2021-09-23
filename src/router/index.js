import {createRouter, createWebHistory} from 'vue-router'
import Home from "./../views/Home"
import P404 from "./../views/P404"

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/login',
        name: 'login',
        component: Home,
    },
    {
        path: "/:pathMatch(.*)*",
        name: 'p404',
        component: P404,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const publics = ['/login', '/register'].includes(to.path);
    const logged = false;
    if (logged) {
        if(publics){
            //publics pages aren't useful for logged users
            next("/");
        }
        next();
    }
    else if (publics) {
        //anonymous user is checking public pages
        next();
    } else {
        //anonymous user is looking for 'secret' pages
        next("/login");
    }
});

export default router;
