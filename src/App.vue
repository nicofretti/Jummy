<template>
  <div class="page">
    <Home :selected="selected"/>
  </div>

</template>

<script>
import Home from './components/pages/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  },
  data:()=>{
    return {selected:""}
}
}
</script>

<style lang="scss">
@import "src/colors";
@font-face {
  font-family: Quicksand;
  src: url("assets/fonts/Quicksand.ttf");
}
@font-face {
  font-family: Quicksand-Bold;
  src: url("assets/fonts/Quicksand-Bold.ttf");
}
body{
  background: $BACKGROUND;
  margin: 20px 40px 0;
  display: flex;
  flex-direction: column;
}
</style>
