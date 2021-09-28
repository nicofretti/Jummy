<template>
  <div>
    <Navbar active="true"/>
    <Loader :active="loading" message="Stiamo preparando le ricette..."/>
    <ActionPopup :active="error" v-on:close="this.error=false" :message="errorMessage"/>
    <div class="body">
      <div class="bar">
        <div class="search">
          <input v-model="search" placeholder="Cerca ricetta..." type="text"/>
          <button class="primary" style="margin:0;padding:0 15px 0;border-radius: 0 8px 8px 0">
            <Search style="fill:white;" h="55" w="55"/>
          </button>
        </div>
        <button class="primary"
                @click="newRecipe"
                style="margin-left:20px;border-radius: 8px;padding:8px;padding:0 10px 0;box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);">
          <AddCircleOutline style="fill:white;margin:0;" w="30" h="30"/>
          Nuova ricetta
        </button>
      </div>
      <p class="empty" v-if="resultQuery.length===0">Non ci sono ricette nel tuo inventario... <br/>
        Crea subito la tua <a href="/add_recipe">ricetta</a></p>
      <div class="reciples">

        <Card v-for="(rec,idx) in resultQuery" :recipe="rec" :key="idx"/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import AddCircleOutline from 'vue-ionicons/dist/md-add-circle-outline';
import Search from 'vue-ionicons/dist/md-search';
import Recipes from "../controllers/Recipes"
import Loader from "../components/Loader";
import ActionPopup from "../components/ActionPopup"
export default {
  name: 'Home',
  props: [],
  components: {
    Navbar,
    AddCircleOutline,
    Search,
    Card,
    Loader,
    ActionPopup
  },
  data: () => {
    return {
      recipes: [],
      search: "",
      loading: false,
      error: false,
      errorMessage: "",
    }
  },
  methods: {
    newRecipe() {
      this.$router.push("/add_recipe")
    },
  },
  async created() {
    Recipes.all().then((recipes) => {
      this.recipes = recipes
    }).catch((error) => {
      this.error = true;
      this.errorMessage = error.toString();
    }).finally(() => {
      this.loading = false;
    });
  },
  computed: {
    resultQuery: function () {
      if (this.search === "") {
        return this.recipes;
      }
      let query = [];
      this.recipes.forEach((recipe) => {
        if (recipe.nome.toLowerCase().includes(this.search.toLowerCase())) {
          query.push(recipe);
        }
      })
      return query;
    }
  },
}
</script>

<style scoped lang="scss">
@import "src/global";

div.body {
  margin: 40px 200px 20px;
  min-width: 500px;
}

div.bar {
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    margin: 0;
    font-size: 20px
  }
}

div.search {
  display: flex;
  flex: 2; //to fit the remaining content
  border-radius: 8px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  input {
    font-size: 22px;
    font-family: Quicksand-Bold, sans-serif;
    color: $TEXT;
    background: $CONTAINER;
    height: 60px;
    border: none;
    border-radius: 8px 0 0 8px;
    margin: 0;
    padding-left: 20px;
    width: 100%;

    &:focus {
      outline: none;
    }

    &::placeholder {
      text-align: center;
    }
  }

  button {
    margin-left: -10px;
  }
}
p.empty{
  text-align: center;
  font-size: 20px;
  margin-top:50px;
}
div.reciples {
  padding: 40px 0 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px
}
</style>
