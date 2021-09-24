<template>
  <div class="navbar">
    <p class="title">Jumm</p>
    <div class="buttons">
      <CartIcon @click="cart"
                w="50" h="50"/>
      <LogOutIcon @click="logout()"
                  w="50" h="50"/>
    </div>
  </div>
</template>

<script>
import CartIcon from 'vue-ionicons/dist/md-cart';
import LogOutIcon from 'vue-ionicons/dist/md-log-out';
import {getAuth, signOut} from "firebase/auth";

export default {
  name: "Navbar",
  props: [
      "active" //false to activate warning
  ],
  components: {
    CartIcon,
    LogOutIcon
  },
  methods: {
    logout() {
      //Todo confirm exit
      if(confirm("Confermare di voler uscire?"))
      signOut(getAuth())
          .then(() => {
            this.$router.push("/login");
          })
          .catch((error) => {
            alert(error);
          })
    },
    cart() {
      if(!this.active && confirm("I dati inseriti andranno persi, vuoi cambiare pagina?")){
        this.$router.push("/add_reciple");
      }

    }
  }
}
</script>

<style scoped lang="scss">
@import "src/global";

div.navbar {
  display: flex;
  fill: $PRIMARY;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: $CONTAINER;
  border-radius: 8px;
  height: 80px;
  padding: 0 10px 0;

  .buttons {
    display: flex;
    flex-direction: row;

    .selected {
      fill: $TEXT_LIGHT;
      cursor: default !important;
    }

    * {
      &:first-child {
        margin-right: 40px;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
}

p.title {
  font-size: 50px;
  margin: 0;

  &:first-letter {
    color: $PRIMARY;
  }

  &:after {
    content: "y";
    color: $PRIMARY;
  }
}
</style>
