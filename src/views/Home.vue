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
        <Card :recipe="{
          nome:'Pasta alla carbonara',
          descrizione:'Pasta alla carbonara',
          prodotti:[{nome:'Pasta',quantita:1},{nome:'Pasta',quantita:1},{nome:'Pasta',quantita:1},{nome:'Pasta',quantita:1}],
          immagine:'https://firebasestorage.googleapis.com/v0/b/jummy-3a739.appspot.com/o/images%2FfDfXjZwEZ6GQixgbkQCL?alt=media&token=4aa9ef47-4aae-4df2-b7ec-ab1569a3d172'
          }
        "/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import AddCircleOutline from 'vue-ionicons/dist/md-add-circle-outline';
import Search from 'vue-ionicons/dist/md-search';
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
      selected: ""
    }
  },
  methods: {
    newReciple(){
      this.$router.push("/add_recipe")
    }
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
