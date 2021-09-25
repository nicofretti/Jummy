<template>
  <div>
    <Navbar :active="activeNav"/>
    <div class="form">
      <p class="action">Aggiungi una nuova ricetta!</p>
      <LabelInput style="margin-top:20px" v-model="recipe.nome" label="Nome ricetta" type="text"
                  styleInput="background:white"/>
      <div style="margin-top:20px">
        <p>Descrizione</p>
        <textarea v-model="recipe.descrizione"/>
      </div>
      <div style="margin-top:20px">
        <p>Immagine</p>
        <input type="file" @change="fileEdit" accept="image/*"/>
      </div>
      <div style="margin-top:20px">
        <p>Prodotti</p>
        <div class="products">
          <EditProduct v-for="(product,idx) in products"
                       :key="idx" :idx="idx"
                       :nome="product.nome"
                       :quantita="product.quantita"
                       v-on:edit="changeProduct"/>
          <button class="secondary" @click="addProduct">
            Aggiungi prodotto
          </button>
        </div>
      </div>
      <div class="buttons">
        <button @click="back" style="padding:10px 60px 10px;border-radius: 20px" class="secondary">Annulla</button>
        <button @click="addReciple" style="padding:10px 30px 10px;border-radius:20px;margin-left:20px" class="primary">Aggiungi ricetta!
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

export default {
  name: 'AddReciple',
  props: [],
  components: {
    Navbar,
    LabelInput,
    EditProduct,
  },
  data: () => {
    return {
      activeNav: false,
      recipe: {
        nome: "asd",
        descrizione: "asd",
        immagine: "",
      },
      products: [{nome: "asd", quantita: 1}]
    }
  },
  methods: {
    changeProduct(idx, obj) {
      //make a copy to trigger Vue
      let copy = this.products.slice();

      if (obj.quantita === 0) {
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
    },
    fileEdit(e){
      this.recipe.immagine = {
        file:e.target.files[0],
        url:URL.createObjectURL(e.target.files[0])
      }
    },
    addReciple(){
      if(this.recipe.name!=="" && this.recipe.descrizione!=="" && this.productsValid() ){
        Recipes.createRecipe({
          ...this.recipe,
          prodotti:this.products
        });
      }else{
        alert("Non sono stati compilati i campi minimi");
      }

    },
    productsValid(){
      if(this.products.length===0){
        return false;
      }
      for(let product of this.products) {
        if (product.nome === "" || product.quantita<=0) {
          return false;
        }
      }
      //all products have quantity and name
      return true;
    },
    back(){
      if(confirm("I dati inseriti andranno persi, vuoi cambiare pagina?")){
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
  margin: auto;
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
    color:$TEXT
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
  >button{
    font-size:18px;
    width: 100%;
    padding: 4px;
    margin-top:10px;
    color:$TEXT;
    border:2px dashed $TEXT;
    background:transparent;
  }
}

div.buttons {
  display: flex;
  justify-content: center;
  margin: 20px 0 0;

}
</style>
