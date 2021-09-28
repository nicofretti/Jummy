<template v-if="this.recipe.nome">
  <Navbar active="true"/>
  <Loader :active="loading" message="Stiamo aggiungendo i prodotti..."/>
  <ActionPopup :active="error" v-on:close="this.error=false" :message="errorMessage"/>
  <div class="previous">
    <button @click="this.$router.go(-1)">
      <ArrowBack w="50" h="50"/>
    </button>
  </div>
  <div class="min_page">
    <div class="recipe" v-if="this.recipe.nome">
      <div class="header">
        <p class="title">{{ this.recipe.nome }}</p>
        <button @click="basket">
          <Basket w="40" h="40"/>
        </button>
        <button @click="edit" style="margin:0 15px 0">
          <Create w="40" h="40"/>
        </button>
        <button @click="remove">
          <Trash w="40" h="40"/>
        </button>
      </div>
      <div class="image" v-bind:style="{background: 'url('+(this.recipe.immagine)+')'}"/>
      <p class="description">{{ this.recipe.descrizione }}</p>
      <p class="subtitle">Ingredienti</p>
      <ul>
        <li v-for="(prod,idx) in this.recipe.prodotti" :key="idx">
          {{ prod.nome }} x {{ prod.quantita }}
        </li>
      </ul>
    </div>
    <p v-else>
      Non dovresti essere qui :) torna al menu!
    </p>
  </div>
</template>


<script>
import Navbar from "../components/Navbar";
import Trash from 'vue-ionicons/dist/md-trash';
import Create from 'vue-ionicons/dist/md-create';
import Basket from 'vue-ionicons/dist/ios-basket'
import Recipes from "../controllers/Recipes"
import Cart from "../controllers/Cart"
import Loader from "../components/Loader"
import ArrowBack from "vue-ionicons/dist/md-arrow-back"
import ActionPopup from "../components/ActionPopup"

export default {
  name: 'Recipe',
  params: [],
  components: {
    Navbar,
    Trash,
    Create,
    ArrowBack,
    Basket,
    ActionPopup,
    Loader
  },
  data: () => {
    return {
      recipe: {},
      loading: false,
      error: false,
      errorMessage: "",
    }
  },
  created() {
    const recipe = localStorage.getItem('recipe');
    if (recipe) {
      this.recipe = JSON.parse(recipe);
    }
  },
  methods: {
    remove() {
      if (confirm("Confermare la cancellazione della ricetta?")) {
        Recipes.delete(this.recipe.id).then(() => {
          localStorage.getItem('recipe'); //clear localstorage
          this.$router.push("/");
        }).catch((error) => {
          this.error = true;
          this.errorMessage = error.toString();
        });
      }
    },
    edit() {
      this.$router.push('edit_recipe');
    },
    async basket() {
      this.loading = true;
      Cart.addProducts(this.recipe.prodotti).then(() => {
      }).catch((error) => {
        this.error = true;
        this.errorMessage = error;
      }).finally(() => {
        this.loading = false;
      });
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/global";

div.ming_page {
  min-width: 1015px;
}

div.recipe {
  display: flex;
  margin: 20px auto 20px;
  flex-direction: column;
  justify-content: center;
  max-width: 700px;
  font-size: 20px;

  * {
    margin: 0
  }
}

div.header {
  display: flex;
  justify-content: space-between;

  p {
    //title
    flex: 2;
    font-family: Quicksand-Bold, sans-serif;
    font-size: 40px;
    color: $PRIMARY;
  }

  button {
    //actions
    fill: $PRIMARY;
    background: transparent;
    border: none;

    &:active {
      opacity: 0.5;
    }
  }

}

div.image {
  width: 100%;
  margin-top: 20px;
  min-height: 215px;
  border-radius: 10px;
  background-position: center !important;
  background-size: cover !important;
  background-color: $IMG !important;
}

p.description {
  //description of recipe
  margin-top: 20px;
  font-family: Quicksand, sans-serif;
  text-align: justify;
  font-size: 20px;

}

p.subtitle {
  color: $PRIMARY;
  font-size: 20px;
  margin: 10px 0 10px;
}
</style>
