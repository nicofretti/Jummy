<template>
  <div>
    <Navbar :selected="selected" @change="changeNavbar"/>
    <p>Ricetta x</p>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  name: 'Home',
  props: [],
  components: {
    Navbar
  },
  data: () => {
    return {
      selected: ""
    }
  },
  methods: {
    changeNavbar(value) {
      this.selected = value;
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/global";

div.navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: $CONTAINER;
  border-radius: 8px;
  padding: 0 10px 0;

  .buttons {
    display: flex;
    flex-direction: row;

    * {
      &:first-child {
        margin-right: 30px;
      }

      &:hover {
        cursor: pointer;
      }

    }
  }

}

p.title {
  font-size: 40px;
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
