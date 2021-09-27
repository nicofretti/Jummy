<template>
  <div>
    <Navbar active="true"/>
    <Loader :active="loading" message="Stiamo preparando il carrello..."/>
    <div class="previous">
      <button @click="this.$router.go(-1)"><ArrowBack w="50" h="50"/></button>
    </div>
    <div class="cart" v-if="cart.length!==0">
      <p class="action">Il tuo carrello!</p>
      <div id="asd" class="products">
        <EditProduct v-for="(product,idx) in cart"
                     :key="idx" :idx="idx"
                     :nome="product.nome"
                     :editNome="false"
                     :error="false"
                     :quantita="product.quantita"
                     v-on:edit="changeProduct"/>
      </div>
      <div class="buttons">
        <button class="secondary" @click="emptyCart">Svuota il carrello</button>
        <button class="primary" style="margin-left:20px" @click="print">Stampa carrello</button>
      </div>
    </div>
    <div class="cart" v-else>
      <p class="action">Carrello</p>
      <p style="text-align: center; margin-top:20px">Il tuo carrello è attualmente vuoto,
        vai a riempirlo nel <a href="/">menu ricette</a></p>
    </div>
  </div>
</template>

<script>
import EditProduct from "../components/EditProduct"
import Navbar from "../components/Navbar";
import Cart from "../controllers/Cart"
import Loader from "../components/Loader"
import ArrowBack from 'vue-ionicons/dist/md-arrow-back';

export default {
  name: 'Cart',
  props: [],
  components: {
    Navbar,
    EditProduct,
    Loader,
    ArrowBack
  },
  data: () => {
    return {
      loading: true,
      cart: []
    }
  },
  created() {
    this.loading=true;
    Cart.get().then((cart) => {
      this.cart = cart;
    }).catch((error) => {
      console.log(error);
    });
    this.loading=false;
  },
  methods: {
    print(){
      window.print();
    },
    changeProduct(idx, obj) {
      this.loading=true;
      //make a copy to trigger Vue
      let copy = this.cart.slice();

      if (obj.quantita === 0) {
        //remove element from array
        copy.splice(idx, 1);
      } else {
        copy[idx] = obj;
      }
      //trigger of Vue
      this.cart = copy;
      Cart.update(this.cart);
      this.loading=false;

    },
    emptyCart(){
      this.loading = true;
      Cart.update([]).then(() => {
        this.cart = [];
      }).catch((error) => {
        console.log(error);
      });
      this.loading = false;
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/global";

div.cart {
  display: flex;
  margin: auto auto 20px;
  flex-direction: column;
  justify-content: center;
  width: 700px; //set to make printable the list
  font-size: 20px;
  padding: 0 210px 0;
  * {
    margin: 0;
  }
  >button{
    alignment: left;
    margin:20px auto auto;
  }
}

//Title of the page
p.action {
  color: $PRIMARY;
  font-size: 40px;
  text-align: center;
  margin: 0 ;
}

div.products {
  >* {
    border-bottom: 1px dashed $TEXT;
    padding-bottom: 2px;
    margin-bottom: 3px;
  }
  *{
    font-size: 22px;
  }
}

div.buttons{
  display: flex;
  margin-top:20px;
  justify-content: center;
}
</style>
