import { getFirestore, collection, getDocs, addDoc,doc, setDoc} from "firebase/firestore";
import firebase from "firebase/compat/app";

export default class Reciples{

    static async getReciples(){
        const db = getFirestore();
        const logged = await firebase.getCurrentUser();
        const querySnapshot = await getDocs(collection(db, `users/${logged.uid}/reciples`));
        let query = {};
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            query[doc.id]=doc.data;
        });
        return query;
    }

    static async createReciple(reciple){
        const db = getFirestore();
        const logged = await firebase.getCurrentUser();
        await addDoc(collection(db, `users/${logged.uid}/reciples`), reciple);


    }

    static async editReciple(id, reciple){
        const db = getFirestore();
        const logged = await firebase.getCurrentUser();
        await setDoc(doc(db, `users/${logged.uid}/reciples`, id), reciple);
    }
}
