<template>
  <div class="container">
    <p class="title">Jumm</p>
    <LabelInput v-model="email" label="Email" type="text"/>
    <LabelInput v-model="password" label="Password" type="password" style="margin-top:20px"/>
    <div class="buttons">
      <button style="margin-top:40px" class="primary" @click="this.login">Entra</button>
      <button style="margin-top:20px" class="secondary" @click="this.$router.push('register')">Registrati</button>
    </div>
  </div>
</template>

<script>
import LabelInput from "../components/LabelInput"
import {getAuth,signInWithEmailAndPassword} from "firebase/auth";

export default {
  name: 'Login',
  data: () => {
    return {
      email: "nico.fretti@gmail.com",
      password: "asdasd"
    }
  },
  components: {
    LabelInput
  },
  methods: {
    login() {
      signInWithEmailAndPassword(getAuth(), this.email, this.password)
          .then(() => {
            this.$router.push("/");
          })
          .catch((errors) => {
            alert(errors)
          })
    }
  }
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
