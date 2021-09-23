<template>
  <div class="navbar">
    <p class="title">Jumm</p>
    <div class="buttons">
      <CartIcon w="40" h="40"/>
      <LogOutIcon w="40" h="40"/>
    </div>
  </div>
  <div>Olle</div>
</template>

<script>
import CartIcon from 'vue-ionicons/dist/md-cart'
import LogOutIcon from 'vue-ionicons/dist/md-log-out'
export default {
  name: 'Login',
  props: ["msg"],
  components:{
    CartIcon,
    LogOutIcon
  },
  data(){
    return {
      msg_2:"test"
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "src/colors";

div.navbar{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: $CONTAINER;
  border-radius: 8px;
  padding: 0 10px 0;
  .buttons{
    display:flex;
    flex-direction: row;
    * {
      &:first-child{
        margin-right: 30px;
      }
      &:hover{
        cursor: pointer;
      }

    }
  }

}
p.title{
  font-size:40px;
  margin:0;
  &:first-letter{
    color:$PRIMARY;
  }
  &:after {
    content: "y";
    color: $PRIMARY ;
  }
}
</style>
