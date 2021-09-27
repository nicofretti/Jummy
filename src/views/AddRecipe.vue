<template>
  <div>
    <Navbar :active="activeNav"/>
    <Loader :active="loading" message="Stiamo caricando la nuova ricetta..."/>
    <div class="form">
      <p class="action">Aggiungi una nuova ricetta!</p>
      <LabelInput :error="!this.validValues.nome" style="margin-top:20px" v-model="recipe.nome" label="Nome ricetta"
                  type="text"
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
          <EditProduct v-for="(product,idx) in this.products"
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
      loading: false,
      recipe: {
        nome: "Spaghetti all'amatriciana",
        descrizione: "I piatti regionali sono spesso motivo di disputa tra gli italiani, che si tratti di chef professionisti o cuochi amatoriali, e gli spaghetti all’Amatriciana non fanno eccezione! Bucatini o spaghetti, pancetta o guanciale, aglio o cipolla… questi i principali interrogativi che chiunque si appresti a cucinare per la prima volta questa ricetta si trova a dover affrontare. Si dice che questo famoso piatto nato ad Amatrice fosse il pasto principale dei pastori, ma originariamente era senza pomodoro e prendeva il nome di “gricia”; questo ingrediente fu aggiunto in seguito quando i pomodori vennero importati dalle Americhe e il condimento prese il nome di Amatriciana. E’ quindi normale che una ricetta così antica e popolare si sia trasformata nel tempo assumendo le numerose varianti di cui ancora si discute al giorno d’oggi. Quella che vi proponiamo qui è la nostra versione, preparata con ingredienti locali e di qualità. Perché pensiamo che in realtà la ricetta degli spaghetti all’Amatriciana non divida l’Italia, bensì la unisca nel nome della bontà di una pietanza dall’animo semplice e dal carattere deciso… proprio come chi l’ha creata!",
        immagine: "",
      },
      products: [{nome: "", quantita: 1}],
      validValues: {
        nome: true,
        descrizione: true,
        prodotti: [true],
      }
    }
  },
  methods: {
    changeProduct(idx, obj) {
      // Some problem to edit a list of objects, then I choose to add fake objects to don't makes some bugs
      // also before putting objects in database I remove the fakes
      let copy = [];
      this.products.forEach((val, i) => {
            if (i === idx) {
              //edited object
              if (obj.quantita <= 0) {
                copy.push({}); //adding fake object to keep indexing
              } else {
                copy.push(obj);
              }

            } else {
              copy.push(val);
            }
          }
      );
      this.products = copy;

    },
    addProduct() {
      this.products.push({nome: "", quantita: 1});
      this.validValues.prodotti.push(true); //to disable errors on add
    }
    ,
    fileEdit(e) {
      if (e.target.files.length !== 0) {
        this.recipe.immagine = {
          file: e.target.files[0],
          url: URL.createObjectURL(e.target.files[0])
        }
      } else {
        this.recipe.immagine = "";
      }
    },
    addRecipe() {
      this.loading = true;
      let products = this.getProductsValid();
      if (this.checkRecipe() && products.length > 0) {
        Recipes.create({
          ...this.recipe,
          prodotti: products
        }).then(() => {
          this.$router.push("/");
        }).catch((error) => {
          console.log(error);
        });
      } else {
        alert("Non sono stati compilati i campi minimi o sono presenti degli errori");
      }
      this.loading = false;

    }
    ,
    checkRecipe() {
      //methods that check if the recipe has name and description, otherwise it set the errors
      let formValid = this.recipe.nome !== "" && this.recipe.descrizione !== "";
      if (!formValid) {
        this.validValues.nome = this.recipe.nome !== "";
        this.validValues.descrizione = this.recipe.descrizione !== "";
        return false
      }
      return true;
    },
    getProductsValid() {
      //methods that return the valid products checking for fakes and wrong typed
      let productValid = [];
      let realProducts = [];
      let wrong = false;
      if (this.products.length === 0) {
        return [];
      }
      for (let product of this.products) {
        if (Object.keys(product).length === 0) {
          //fakes objects
          productValid.push(true);
        } else if (product.nome === "" || product.quantita <= 0) {
          // products wrong typed
          productValid.push(false);
          wrong = true;
        } else {
          // real products well typed
          productValid.push(true);
          realProducts.push(product);
        }
        //Object.keys(product).length === 0
      }
      this.validValues.prodotti = productValid;
      if (wrong) {
        return [];
      }
      return realProducts;
    },
    back() {
      if (confirm("I dati inseriti andranno persi, vuoi cambiare pagina?")) {
        this.$router.push("/");
      }
    }
  },
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
  border: 1px dotted $TEXT;
  background-position: center !important;
  background-size: cover !important;
}
</style>
