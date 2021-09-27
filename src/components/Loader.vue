<template>
  <div class="container" :style="this.active?'':'display:none'">
    <div class="popup">
      <BounceLoader color="#CA3976" />
      <p v-if="message" class="message">{{message}}</p>

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
  position: fixed;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: rgb(1,1,1,0.7);
}
div.popup{
  position: absolute;
  background: #f1e9e9;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-height: 200px;
  padding:50px 10px 50px;
  color:$PRIMARY;
  border-radius:8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  fill:$TEXT;
  *{

    margin:0px;
    color: $PRIMARY;
  }
}

p.message{
  font-size:30px;
  margin: 10px 10px 0;
}


</style>
