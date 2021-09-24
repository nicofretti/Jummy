<template>
  <div>
    <Navbar :active="activeNav"/>
    <div class="form">
      <p class="action">Aggiungi una nuova ricetta!</p>
      <LabelInput style="margin-top:20px" v-model="name" label="Nome ricetta" type="text"
                  styleInput="background:white"/>
      <div style="margin-top:20px">
        <p>Descrizione</p>
        <textarea/>
      </div>
      <div style="margin-top:20px">
        <p>Immagine</p>
        <input type="file" accept="image/*"/>
      </div>
      <div style="margin-top:20px">
        <p>Prodotti</p>
        <div class="products">
          <div class="product_row">
            <input type="text"/>
            <div>
              <button class="primary"><RemoveCircleOutline w="30" h="30"/></button>
              <p>5</p>
              <button class="primary"><AddCircleOutline w="30" h="30"/></button>
            </div>
          </div>
          <button class="secondary" style="font-size:18px;width: 100%;padding: 4px;margin-top:10px">Aggiungi prodotto</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import LabelInput from "../components/LabelInput"
import AddCircleOutline from 'vue-ionicons/dist/md-add-circle-outline';
import RemoveCircleOutline from 'vue-ionicons/dist/md-remove-circle-outline';

export default {
  name: 'Reciple',
  props: [],
  components: {
    Navbar,
    LabelInput,
    AddCircleOutline,
    RemoveCircleOutline
  },
  data: () => {
    return {
      activeNav: false,
      ricetta: {
        name: "",
        description: "",
        img: "",
        products: "",
      }
    }
  },
  methods: {
    changeNavbar(value) {
      this.selected = value;
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
  font-size:20px;
  textarea{
    margin:auto;
    width:100%;
    max-width: 700px;
    min-height: 200px;
    border: none;
    border-radius:8px;
  }
  input{
    font-family: Quicksand-Bold, sans-serif;
  }
  *{
    margin:0;
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
div.products{
  background:$CONTAINER;
  border-radius:8px;
  padding: 20px 10px 20px;
}
div.product_row{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  input{
    flex-grow: 2;
    font-size: 18px;
    font-family: Quicksand, sans-serif;
    color: $TEXT;
    height: 30px;
    border:1px solid $TEXT;
    border-radius: 2px;
    padding-left: 5px;
  }
  //div where there are the buttons and number
  div{
    flex:1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  //buttons plus and minus
  button{
    fill:$CONTAINER;
    background:$PRIMARY;
    border:none;
    border-radius:100px;
    padding:0;
    text-align: center;
  }
  //text number
  p{
    text-align: center;
    margin:5px 10px 0;
  }
}
</style>
