<template>
  <div class="container" v-if="active">
    <div class="popup">
      <p v-if="message" class="message">{{message}}</p>
      <BounceLoader color="#FFFFFF" />
    </div>
  </div>
</template>

<script>
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'

export default {
  name: "Loader",
  props: [
    "active",
    "message"
  ],
  components: {
    BounceLoader
  },
}
</script>

<style scoped lang="scss">

@import "src/global";

div.container{
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: rgb(1,1,1,0.3);
}
div.popup{
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 200px;
  color:$CONTAINER;
  border-radius:8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  fill:$TEXT;
  *{
    color:$CONTAINER;
  }
}

p.message{
  font-size:30px;
  margin: 10px 10px 0;
}


</style>
