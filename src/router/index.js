import {createRouter, createWebHistory} from 'vue-router'
import Home from "./../views/Home"
import Login from "./../views/Login"
import Register from "./../views/Register"
import AddRecipe from "./../views/AddRecipe"
import Recipe from "./../views/Recipe"
import Cart from "./../views/Cart"
import EditRecipe from "./../views/EditRecipe"
import firebase from "firebase/compat/app";

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
    {
        path: '/add_recipe',
        name: 'add_recipe',
        component: AddRecipe,
    },
    {
        path: '/recipe',
        name: 'recipe',
        component: Recipe,
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart,
    },
    {
        path: '/edit_recipe',
        name: 'edit_recipe',
        component: EditRecipe,
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

router.beforeEach(async (to, from, next) => {
    const publics = ['/login', '/register'].includes(to.path);
    const logged = await firebase.getCurrentUser();
    console.log(logged);
    if (logged) {
        if(publics){
            //publics pages aren't useful for logged users
            next("/");
            return;
        }
        next();
        return;
    }
    else if (publics) {
        //anonymous user is checking public pages
        next();
        return;
    } else {
        //anonymous user is looking for 'secret' pages
        next("/login");
        return;
    }
});

export default router;
