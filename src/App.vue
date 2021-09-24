<template>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss">
@import "src/global";

@font-face {
  font-family: Quicksand;
  src: url("assets/fonts/Quicksand.ttf");
}

@font-face {
  font-family: Quicksand-Bold;
  src: url("assets/fonts/Quicksand-Bold.ttf");
}

body {
  background: $BACKGROUND;
  color: $TEXT;
  margin: 20px 40px 0;
  display: flex;
  flex-direction: column;
  font-family: Quicksand-Bold, sans-serif;
}

div.page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
