<template>
  <div>
    <Navbar :active="true" @change="changeNavbar"/>
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
      {{searchReciples}}
    </div>

  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import AddCircleOutline from 'vue-ionicons/dist/md-add-circle-outline';
import Search from 'vue-ionicons/dist/md-search';
export default {
  name: 'Home',
  props: [],
  components: {
    Navbar,
    AddCircleOutline,
    Search
  },
  data: () => {
    return {
      search:"",
      selected: ""
    }
  },
  methods: {
    newReciple(){
      this.$router.push("/add_reciple")
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

div.bar{
  display:flex;
  justify-content: center;
  align-items:center;
  alignment-baseline: center;
  margin: 40px 200px 20px;
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
    &:active{

    }
    &::placeholder{
      text-align: center;
    }
  }
  button{
    margin-left: -10px;
  }
}
</style>
