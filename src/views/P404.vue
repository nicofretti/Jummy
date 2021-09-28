<template>
  <div class="notfound">
    <p>
      <span>404</span>
      <br/>
      Page not found
      <br/>
      :(
      <br/>
      <span style="font-size: 50px"><a href="/">Safe zone</a></span>
      </p>
  </div>
</template>

<script>

export default {
  name: 'P404',
}
</script>

<style scoped lang="scss">
@import "src/global";
div.notfound{
  display: flex;
  justify-content: center;
  p{
    font-size: 100px;
    text-align: center;
    span{
      color:$PRIMARY;
    }
  }
}
</style>
