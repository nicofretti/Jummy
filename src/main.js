import {createApp} from 'vue'
import App from './App.vue'
import router from "./router"
import firebase from "firebase/compat/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAELj8EWL86q6YPPGyC-z5NYm99QhIYOmU",
    authDomain: "jummy-3a739.firebaseapp.com",
    projectId: "jummy-3a739",
    storageBucket: "jummy-3a739.appspot.com",
    messagingSenderId: "509479044250",
    appId: "1:509479044250:web:d6570f414be3d7464e0b23"
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


