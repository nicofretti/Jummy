import {doc, getDoc, getFirestore, updateDoc} from "firebase/firestore";
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

    static async addProducts(newProducts){
        let cart = await this.get();
        let newCart = {}
        cart.forEach((prod)=>{
            newCart[prod.nome]=prod.quantita;
        })
        newProducts.forEach((prod)=>{
            if(Object.keys(newCart).includes(prod.nome)){
                newCart[prod.nome]+=prod.quantita
            }else{
                newCart[prod.nome]=prod.quantita
            }
        });
        let updateCart = [];
        for (const [key, value] of Object.entries(newCart)){
            updateCart.push({nome:key,quantita:value});
        }
        await this.update(updateCart);
    }

}
