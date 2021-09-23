<template>
  <div class="page">
    <Login />
  </div>

</template>

<script>
import Login from './components/Login.vue'

export default {
  name: 'App',
  components: {
    Login
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
#app {
  font-family: Quicksand-Bold, sans-serif;
  margin-top: 60px;
}
</style>
