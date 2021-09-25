<template v-if="this.recipe.nome">
  <Navbar active="true"/>
  <div class="recipe" v-if="this.recipe.nome">
    <div class="header">
      <p class="title">{{this.recipe.nome}}</p>

      <button @click="edit"><Create w="40" h="40"/></button>
      <button @click="remove" style="margin-left: 15px"><Trash w="40" h="40"/></button>
    </div>
    <div class="image" v-bind:style="{background: 'url('+(this.recipe.immagine)+')'}"/>
    <p class="description">{{this.recipe.descrizione}}</p>
    <p class="subtitle">Ingredienti</p>
    <ul>
      <li v-for="(prod,idx) in this.recipe.prodotti" :key="idx">
        {{prod.nome}} x {{prod.quantita}}
      </li>
    </ul>
  </div>
  <p v-else>
    Non dovresti essere qui :) torna al menu!
  </p>
</template>


<script>
import Navbar from "../components/Navbar";
import Trash from 'vue-ionicons/dist/md-trash';
import Create from 'vue-ionicons/dist/md-create';
export default {
  name: 'Recipe',
  params: [],
  components: {
    Navbar,
    Trash,
    Create
  },
  data: () => {
    return{
      recipe:{}
    }
  },
  created() {
    const recipe = localStorage.getItem('recipe');
    console.log("created");
    if(recipe){
      this.recipe = JSON.parse(recipe);
    }
  },
  methods:{
    remove(){
      console.log("going to delete")
    },
    edit(){
      console.log("going to edit");
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/global";

div.recipe{
  display: flex;
  margin: 20px auto 20px;
  flex-direction: column;
  justify-content: center;
  max-width: 700px;
  font-size: 20px;
  *{
    margin:0
  }
}
div.header{
  display: flex;
  justify-content: space-between;
  p{
    //title
    flex:2;
    font-family: Quicksand-Bold,sans-serif;
    font-size: 40px;
    color:$PRIMARY;
  }
  button{
    //actions
    fill:$PRIMARY;
    background: transparent;
    border:none;
    &:active{
      opacity:0.5;
    }
  }

}
div.image{
  width: 100%;
  margin-top:20px;
  min-height: 215px;
  border-radius: 10px;
  background-position: center !important;
  background-size: cover !important;
}
p.description{
  //description of recipe
  margin-top:20px;
  font-family: Quicksand,sans-serif;
  text-align: justify;
  font-size: 20px;

}
p.subtitle{
  color:$PRIMARY;
  font-size:20px;
  margin: 10px 0 10px;
}
</style>
