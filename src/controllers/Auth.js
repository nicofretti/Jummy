import firebase from "firebase/compat/app";
import { onAuthStateChanged } from "firebase/auth";

export default class Auth {
    static instance = null;
    user = null;
    auth = null;

    constructor() {
        onAuthStateChanged(async user =>{
            if(user){
                this.user={
                    email: user.email,
                    uid:user.uid
                }
            }else{
                user=null;
            }


        })
    }

    static getInstance = () => {
        if (!Auth.instance) Auth.instance = new Auth();
        return Auth.instance;
    }

    register= async(email,username,password)=>{

    }

    login = async (email,password)=>{
        //firebase.auth().signInWithEmailAndPassword(email,password);
    }
    logout = async ()=>{
        //firebase.auth().signOut();
    }
    static getInstance = () => {
        if (!Auth.instance) Auth.instance = new Auth();
        return Auth.instance;
    }
}
