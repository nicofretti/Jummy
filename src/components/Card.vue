<template>
  <div class="card">
    <div class="image" v-bind:style="{background: 'url('+(this.recipe.immagine)+')'}"/>
    <p>{{this.recipe.nome}}</p>
    <div class="actions">
      <button class="secondary" style="border-radius:8px;padding:2px 5px 2px" @click="viewRecipe"><Document w="40" h="40"/></button>
      <button class="primary" @click="addProducts" style="margin-left: 20px;border-radius:8px;padding:2px 5px 2px"><Basket w="40" h="40"/></button>
    </div>
  </div>
</template>

<script>
import Basket from 'vue-ionicons/dist/ios-basket';
import Document from 'vue-ionicons/dist/ios-document';
import Cart from "../controllers/Cart"
export default {
  name: "Card",
  props: ["id", "recipe"],
  components:{
    Document,
    Basket
  },
  methods:{
    addProducts(){
      Cart.update(this.recipe.prodotti)
          .then(()=>{
            console.log("tutto ok");
          })
          .catch((error)=>{console.log(error)})
    },
    viewRecipe(){
      localStorage.setItem('recipe',JSON.stringify(this.recipe));
      this.$router.push({
        name:"recipe"
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/global";

div.card{
  display: flex;
  justify-self:stretch;
  flex-direction: column;
  justify-items: flex-start;
  background: $CONTAINER;
  border-radius: 8px;
  fill:$CONTAINER;
  padding-bottom: 10px;
  p{
    //title of the card
    min-height: 50px;
    display: -webkit-box;
    font-size:22px;
    text-align: center;
    margin:10px 10px 10px;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
div.image{
  min-height: 120px;
  border-radius: 8px 8px 0 0;
  background-position: center !important;
  background-size: cover !important;
}
div.actions{
  display: flex;
  justify-content: center;
  align-items: center;
  button{
    margin:0
  }
}
</style>
