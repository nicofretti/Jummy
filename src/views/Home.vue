<template>
  <div>
    <Navbar active="true" />
    <div class="body">
      <div class="bar">
        <div class="search">
          <input v-model="search" placeholder="Ricerca ricetta..." type="text"/>
          <button class="primary" style="margin:0">
            <Search style="fill:white;" h="55" w="55"/>
          </button>
        </div>
        <button class="primary"
                @click="newReciple"
                style="margin-left:20px">
          <AddCircleOutline style="fill:white" w="30" h="30"/>
          Nuova ricetta
        </button>
      </div>
      <div class="reciples">
        <Card v-for="(rec,idx) in this.recipes" :recipe="rec" :key="idx"/>
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
export default {
  name: 'Home',
  props: [],
  components: {
    Navbar,
    AddCircleOutline,
    Search,
    Card
  },
  data: () => {
    return {
      search:"",
      recipes:[],
    }
  },
  methods: {
    newReciple(){
      this.$router.push("/add_recipe")
    }
  },
  async created(){
    this.recipes = await Recipes.all();
  },
  computed:{
    searchReciples(){
      if(this.search){
        console.log("SEARCHING");
      }
      return this.search;
    }
  },
}
</script>

<style scoped lang="scss">
@import "src/global";

div.body{
  margin:40px 200px 20px;
}
div.bar{
  display:flex;
  justify-content: center;
  align-items:center;
  button{
    margin:0;
    font-size:20px
  }
}

div.search{
  display: flex;
  flex:2; //to fit the remaining content
  input{
    font-size: 22px;
    font-family: Quicksand-Bold, sans-serif;
    color: $TEXT;
    background: $CONTAINER;
    height: 60px;
    border: none;
    border-radius: 8px;
    margin:0;
    padding-left:20px;
    width:100%;
    &:focus{
      outline:none;
    }
    &::placeholder{
      text-align: center;
    }
  }
  button{
    margin-left: -10px;
  }
}

div.reciples{
  padding: 40px 0 40px;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap:50px
}
</style>
