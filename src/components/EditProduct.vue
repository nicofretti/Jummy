<template>
  <div class="product">
    <input placeholder="Nome prodotto..."
           :class="this.editNome ? '': 'disabled'"
           :disabled="!this.editNome"
           :value="nome" @input="changeName"
           :style="!this.error&&'background:#ecdada;'"
           type="text"/>
    <div>
      <button class="primary" @click="decrease">
        <RemoveCircleOutline w="35" h="35"/>
      </button>
      <p>{{ quantita }}</p>
      <button class="primary" @click="add">
        <AddCircleOutline w="35" h="35"/>
      </button>
    </div>
  </div>
</template>


<script>
import AddCircleOutline from 'vue-ionicons/dist/md-add-circle-outline';
import RemoveCircleOutline from 'vue-ionicons/dist/md-remove-circle-outline';

export default {
  name: "EditProduct",
  props: ["idx",
    "nome",
    "quantita",
    "error", //true if product has errors
    "editNome" //enables to edit product name
  ],
  emit: ["edit"],
  data() {
    return {
      product: {
        nome: this.nome,
        quantita: this.quantita,
      }
    }
  },
  components: {
    AddCircleOutline,
    RemoveCircleOutline
  },
  methods: {
    changeName(e) {
      if (e.target.value !== undefined && e.target.value) {
        //to catch the effective editing
        this.product.nome = e.target.value;
        this.$emit('edit', this.idx, this.product)
      }

    },
    add() {
      this.product.quantita++;
      this.$emit('edit', this.idx, this.product)
    },
    decrease() {
      this.product.quantita--;
      this.$emit('edit', this.idx, this.product)
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/global";

div.product {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  input {
    flex-grow: 2;
    font-size: 18px;
    font-family: Quicksand-Bold, sans-serif;
    color: $TEXT;
    height: 30px;
    border: 1px solid $TEXT;
    border-radius: 2px;
    padding-left: 5px;
  }

  //div where there are the buttons and number
  div {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  //buttons plus and minus
  button {
    fill: $CONTAINER;
    background: $PRIMARY;
    border: none;
    border-radius: 100px;
    padding: 0;
    margin: 0;
    text-align: center;
  }

  //text number
  p {
    text-align: center;
    min-width: 40px;
    margin: 5px 2px 0;
    border-radius: 8px;
  }

  input.disabled {
    background: transparent;
    border: none;
  }
}

</style>
