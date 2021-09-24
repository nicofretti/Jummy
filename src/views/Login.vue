<template>
  <div class="container">
    <p class="title">Jumm</p>
    <LabelInput label="Username" type="text" :value="username"/>
    <LabelInput label="Password" type="password" :value="password" style="margin-top:20px"/>
    <div class="buttons">
      <button style="margin-top:40px" class="primary">Entra</button>
      <button style="margin-top:20px" class="secondary" @click="this.$router.push('register')">Registrati</button>
    </div>
  </div>
</template>

<script>
import LabelInput from "../components/LabelInput"

export default {
  name: 'Login',
  data: () => {
    return {
      username: "",
      password: ""
    }
  },
  components: {
    LabelInput
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import "src/global";

div.container {
  background: $CONTAINER;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px auto auto;
  width: 600px;
  height: 570px;
  padding: 0 20px 20px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

p.title {
  font-size: 100px;
  text-align: center;
  margin: 0;

  &:first-letter {
    color: $PRIMARY;
  }

  &:after {
    content: "y";
    color: $PRIMARY;
  }
}

div.buttons {
  display: flex;
  justify-content: center;
  flex-direction: column;

  button {
    height: 60px;
    width: 350px;
  }
}

</style>
