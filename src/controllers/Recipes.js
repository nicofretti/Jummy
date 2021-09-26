import {addDoc, collection, doc, getDocs, getFirestore, setDoc,updateDoc, deleteDoc} from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import firebase from "firebase/compat/app";

//class to manage recipe on firebase
export default class Recipes {
    static async all() {
        //return list of logged user recipes
        const db = getFirestore();
        const logged = await firebase.getCurrentUser();
        const querySnapshot = await getDocs(collection(db, `users/${logged.uid}/recipes`));
        let query = [];
        querySnapshot.forEach((doc) => {
            query.push({...doc.data(),id:doc.id});
        });
        return query;
    }

    static async create(recipe) {
        const db = getFirestore();
        const logged = await firebase.getCurrentUser();
        //creating object recipe
        let objRecipe = await addDoc(collection(db, `users/${logged.uid}/recipes`), {...recipe, immagine: ""});
        //adding image file in storage
        if (recipe.immagine && recipe.immagine !== "") {
            let url = await this.uploadImage(objRecipe.id,recipe.immagine);
            await updateDoc(doc(db, `users/${logged.uid}/recipes/${objRecipe.id}/`), {immagine: url})
        }

    }

    static async uploadImage(idRecipe,img){
        //upload img and returns the img urs associated to idRecipe
        const storage = getStorage()
        //uploading img to /images/{id}
        const imageDoc = await uploadBytes(ref(storage, `images/${idRecipe}`), img.file);
        return await getDownloadURL(imageDoc.ref)
    }

    static async update(recipe) {
        const db = getFirestore();
        const logged = await firebase.getCurrentUser();
        const id = recipe.id;
        //if image has been modified re-upload
        if(recipe.immagine.url){
            let url = await this.uploadImage(id,recipe.immagine);
            recipe = {...recipe,immagine:url};
        }
        delete recipe.id; // remove field id from recipe
        await setDoc(doc(db, `users/${logged.uid}/recipes`, id), recipe);
        return {...recipe, id:id};

    }

    static async delete(id) {
        const db = getFirestore();
        const logged = await firebase.getCurrentUser();
        console.log(id);
        await deleteDoc(doc(db, `users/${logged.uid}/recipes`, id));
    }
}
