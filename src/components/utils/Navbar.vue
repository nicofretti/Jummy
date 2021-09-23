<template>
  <div class="navbar">
    <p class="title">Jumm</p>
    <div class="buttons">
      <CartIcon :class="[selected==='cart' ?'selected' : '']"
                @click="$emit('change','cart')"
                w="50" h="50"/>
      <LogOutIcon :class="[selected==='logout' ?'selected' : '']"
                  @click="$emit('change','logout')"
                  w="50" h="50"/>
    </div>
  </div>
</template>

<script>
import CartIcon from 'vue-ionicons/dist/md-cart';
import LogOutIcon from 'vue-ionicons/dist/md-log-out';

export default {
  name: "Navbar",
  props: ["selected"],
  emit: ["change"],
  components: {
    CartIcon,
    LogOutIcon
  },
}
</script>

<style scoped lang="scss">
@import "src/colors";

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
