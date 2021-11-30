import {createApp} from 'vue'
import App from './App.vue'
import router from "./router"
import firebase from "firebase/compat/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    /*YUMMY CONFIG*/
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(getAuth(),user => {
            unsubscribe();
            resolve(user);
        }, reject);
    })
};
let app = createApp(App);
app.use(router);
app.mount('#app');


