<template>
  <div class="navbar">
    <div class="title" @click="redirect('/')">Jumm</div>
    <div class="buttons">
      <CartIcon @click="redirect('/cart')" w="50" h="50"/>
      <LogOutIcon @click="logout" w="50" h="50"/>
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
    "active" //false to activate warning on change page
  ],
  components: {
    CartIcon,
    LogOutIcon
  },
  methods: {
    logout() {
      if (confirm("Confermare di voler uscire?"))
        signOut(getAuth())
            .then(() => {
              this.$router.push("/login");
            })
            .catch((error) => {
              alert(error);
            })
    },
    redirect(path) {
      //if active is false user have to confirm to change page
      if (!this.active && confirm("I dati inseriti andranno persi, vuoi cambiare pagina?")) {
        this.$router.push(path);
      } else {
        this.$router.push(path);
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
  min-width: 1015px;
  height: 80px;
  padding: 0 10px 0;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

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
        opacity: 0.7;
      }
    }
  }
}

div.title {
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 50px;
  margin: 0;
  cursor: pointer;

  &:first-letter {
    color: $PRIMARY;
  }

  &:after {
    content: "y";
    color: $PRIMARY;
  }
}
</style>
