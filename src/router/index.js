import {createRouter, createWebHistory} from 'vue-router'
import Home from "./../views/Home"
import Login from "./../views/Login"
import Register from "./../views/Register"
import { getAuth } from "firebase/auth";


const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    //{
    //    path: "/:pathMatch(.*)*",
    //    name: 'p404',
    //    component: P404,
    //},
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {

    next();
    const publics = ['/login', '/register'].includes(to.path);
    const logged = getAuth().currentUser;
    console.log(getAuth().currentUser)
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
