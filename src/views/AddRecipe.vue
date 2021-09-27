<template>
  <div>
    <Navbar :active="activeNav"/>
    <Loader :active="loading" message="Stiamo caricando la nuova ricetta..."/>
    <div class="form">
      <p class="action">Aggiungi una nuova ricetta!</p>
      <LabelInput :error="!this.validValues.nome" style="margin-top:20px" v-model="recipe.nome" label="Nome ricetta" type="text"
                  styleInput="background:white"/>
      <div style="margin-top:20px">
        <p>Immagine</p>
        <div class="image"
             v-bind:style="this.recipe.immagine !==''&&{background: 'url('+(this.recipe.immagine.url ? this.recipe.immagine.url:this.recipe.immagine)+')'}"
        />
        <input type="file" @change="fileEdit" accept="image/*"/>
      </div>
      <div style="margin-top:20px">
        <p>Descrizione</p>
        <textarea :style="!this.validValues.descrizione && 'background-color:#ecdada'" v-model="recipe.descrizione"/>
      </div>
      <div style="margin-top:20px">
        <p>Prodotti</p>
        <div class="products">
          <EditProduct v-for="(product,idx) in products"
                       :key="idx" :idx="idx"
                       :nome="product.nome"
                       :quantita="product.quantita"
                       editNome="true"
                       :error="!this.validValues.prodotti[idx]"
                       v-on:edit="changeProduct"/>
          <button class="secondary" @click="addProduct">
            Aggiungi prodotto
          </button>
        </div>
      </div>
      <div class="buttons">
        <button @click="back" style="padding:10px 60px 10px;border-radius: 20px" class="secondary">Annulla</button>
        <button @click="addRecipe" style="padding:10px 30px 10px;border-radius:20px;margin-left:20px" class="primary">
          Aggiungi ricetta!
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import LabelInput from "../components/LabelInput"
import EditProduct from "../components/EditProduct"
import Recipes from "../controllers/Recipes"
import Loader from "../components/Loader"

export default {
  name: 'AddReciple',
  props: [],
  components: {
    Navbar,
    LabelInput,
    EditProduct,
    Loader
  },
  data: () => {
    return {
      activeNav: false,
      loading:false,
      recipe: {
        nome: "",
        descrizione: "",
        immagine: "",
      },
      products: [{nome: "", quantita: 1}],
      validValues:{
        nome:true,
        descrizione:true,
        prodotti:[true],
      }
    }
  },
  methods: {
    changeProduct(idx, obj) {
      console.log(idx);
      //make a copy to trigger Vue
      let copy = this.products.slice();

      if (obj.quantita == 0 || obj.quantita<0) {
        //remove element from array
        copy.splice(idx, 1);
      } else {
        copy[idx] = obj;
      }
      //trigger of Vue
      this.products = copy;

    },
    addProduct() {
      this.products.push({nome: "", quantita: 1});
      this.validValues.prodotti.push(true); //to disable errors on add
    },
    fileEdit(e) {
      if(e.target.files.length!==0){
        this.recipe.immagine = {
          file: e.target.files[0],
          url: URL.createObjectURL(e.target.files[0])
        }
      }else{
        this.recipe.immagine = "";
      }
    },
    addRecipe() {
      this.loading=true;
      if (this.checkForm()) {
        Recipes.create({
          ...this.recipe,
          prodotti: this.products
        }).then(()=>{
          this.$router.push("/");
        }).catch((error)=>{
          console.log(error);
        });
      } else {
        alert("Non sono stati compilati i campi minimi");
      }
      this.loading=false;

    },
    checkForm(){
      let formValid = this.recipe.nome !== "" && this.recipe.descrizione !== ""
      if(!this.productsValid() || !formValid){
        this.validValues.nome = this.recipe.nome !== "";
        this.validValues.descrizione = this.recipe.descrizione !== "";
        return false
      }
      return true;
    },
    productsValid() {
      if (this.products.length === 0) {
        return false;
      }
      let productValid = [];
      let valid = true;
      for (let product of this.products) {
        if (product.nome === "" || product.quantita <= 0) {
          productValid.push(false);
          valid=false;
        }else{
          productValid.push(true);
        }
      }
      this.validValues.prodotti = productValid;
      //all products have quantity and name
      return valid;
    },
    back() {
      if (confirm("I dati inseriti andranno persi, vuoi cambiare pagina?")) {
        this.$router.push("/");
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/global";

div.form {
  display: flex;
  margin: auto auto 20px;
  flex-direction: column;
  justify-content: center;
  max-width: 700px;
  font-size: 20px;

  textarea {
    margin: auto;
    width: 100%;
    max-width: 660px;
    min-height: 200px;
    border: none;
    border-radius: 8px;
    padding: 10px 20px 10px;
    font-size: 18px;
    color: $TEXT
  }

  * {
    font-family: Quicksand-Bold, sans-serif;

    margin: 0;
  }
}

//Title of the form
p.action {
  color: $PRIMARY;
  font-size: 40px;
  text-align: center;
  margin: 20px 0 0;
}

//Row inside of products list
div.products {
  background: $CONTAINER;
  border-radius: 8px;
  padding: 20px 10px 20px;

  > button {
    font-size: 18px;
    width: 100%;
    padding: 4px;
    margin-top: 10px;
    color: $TEXT;
    border: 2px dashed $TEXT;
    background: transparent;
  }
}

div.buttons {
  display: flex;
  justify-content: center;
  margin: 20px 0 0;
}

div.image {
  width: 100%;
  min-height: 215px;
  border-radius: 10px;
  border:1px dotted $TEXT;
  background-position: center !important;
  background-size: cover !important;
}
</style>
