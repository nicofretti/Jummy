<template>
  <div>
    <Navbar active="true"/>
    <div class="cart">
      <p class="action">Il tuo carrello!</p>
      <div id="asd" class="products">
        <EditProduct v-for="(product,idx) in cart"
                     :key="idx" :idx="idx"
                     :nome="product.nome"
                     :editNome="false"
                     :quantita="product.quantita"
                     v-on:edit="changeProduct"/>
      </div>
      <div class="buttons">
        <button class="secondary" @click="emptyCart">Svuota il carrello</button>
        <button class="primary" style="margin-left:20px" @click="print">Stampa carrello</button>
      </div>

    </div>
  </div>
</template>

<script>
import EditProduct from "../components/EditProduct"
import Navbar from "../components/Navbar";
import Cart from "../controllers/Cart"

export default {
  name: 'Cart',
  props: [],
  components: {
    Navbar,
    EditProduct
  },
  data: () => {
    return {
      cart: []
    }
  },
  created() {
    Cart.get().then((cart) => {
      this.cart = cart;
    }).catch((error) => {
      console.log(error);
    });
  },
  methods: {
    print(){
      window.print();
    },
    changeProduct(idx, obj) {
      //make a copy to trigger Vue
      let copy = this.products.slice();

      if (obj.quantita === 0) {
        //remove element from array
        copy.splice(idx, 1);
      } else {
        copy[idx] = obj;
      }
      //trigger of Vue
      this.products = copy;

    },
    emptyCart(){
      Cart.update([]).then((cart) => {
        this.cart = cart;
      }).catch((error) => {
        console.log(error);
      });
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
  margin: 20px 0 0;
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
