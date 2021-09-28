<template>
  <div class="action_back" v-if="active">
    <div class="popup">
      <MdBarcodeIcon w="50" h="50"/>
      <p class="header">Errore con il server:</p>
      <p class="message">{{ message }}</p>
      <button @click="$emit('close')">Chiudi</button>
    </div>
  </div>
</template>

<script>
import MdBarcodeIcon from 'vue-ionicons/dist/md-barcode.vue';

//This component display errors coming from server
export default {
  name: "ActionPopup",
  props: [
    "active",
    "message"
  ],
  emit: ['close'],
  components: {
    MdBarcodeIcon
  },
}
</script>

<style scoped lang="scss">

@import "src/global";

div.action_back {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: rgb(1, 1, 1, 0.7);
}

div.popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 200px;
  color: $CONTAINER;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  fill: red;
  padding: 10px;
  background: $CONTAINER;

  * {
    color: $TEXT;
  }

  button {
    font-family: Quicksand-Bold, sans-serif;
    display: flex;
    font-size: 22px;
    align-self: flex-end;
    margin-right: 20px;
    border-radius: 8px;
    border: none;
    background-color: $PRIMARY;
    color: $CONTAINER;

    &:active {
      opacity: 0.7;
    }
  }
}

p.header {
  font-size: 25px;
  margin: 0;
}

p.message {
  font-size: 22px;
  font-family: Quicksand, sans-serif;
  margin: 10px 0 20px
}


</style>
