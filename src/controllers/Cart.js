import {doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";

//class to manage cart of a user
export default class Cart {
    static async get() {
        const db = getFirestore();
        const logged = await firebase.getCurrentUser();
        const docSnap = await getDoc(doc(db,'users',logged.uid));
        return docSnap.data().cart;
    }


    static async update(cart) {
        const db = getFirestore();
        const logged = await firebase.getCurrentUser();
        await updateDoc(doc(db, `users/`,logged.uid), {cart:cart});
    }

}
