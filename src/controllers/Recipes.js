import {addDoc, collection, doc, getDocs, getFirestore, setDoc, updateDoc} from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import firebase from "firebase/compat/app";

export default class Recipes {

    static async getRecipes() {
        //return list of recipes i
        const db = getFirestore();
        const logged = await firebase.getCurrentUser();
        const querySnapshot = await getDocs(collection(db, `users/${logged.uid}/recipes`));
        let query = {};
        querySnapshot.forEach((doc) => {
            query[doc.id] = doc.data;
        });
        return query;
    }

    static async createRecipe(recipe) {
        const db = getFirestore();
        const logged = await firebase.getCurrentUser();
        //creating object recipe
        let objRecipe = await addDoc(collection(db, `users/${logged.uid}/recipes`), {...recipe, immagine: ""});
        //adding image file in storage
        if (recipe.immagine && recipe.immagine !== "") {
            await this.uploadImage(db,logged,objRecipe,recipe.immagine);
        }

    }

    static async uploadImage(db,user,recipeRef,img){
        const storage = getStorage()
        const imageRef = ref(storage, `images/${recipeRef.id}`);
        //remove old img if exists
        //deleteObject(imageRef).then(()=>{}).catch(()=>{}); //ignoring response
        //uploading img to /images/{id}
        const imageDoc = await uploadBytes(imageRef, img.file);
        //add image to recipe doc
        await updateDoc(doc(db, `users/${user.uid}/recipes/${recipeRef.id}/`), {immagine: await getDownloadURL(imageDoc.ref)})
    }

    static async editRecipe(id, reciple) {
        const db = getFirestore();
        const logged = await firebase.getCurrentUser();
        await setDoc(doc(db, `users/${logged.uid}/reciples`, id), reciple);
    }
}
