<template>
  <div class="container">
    <p class="title">Registrazione</p>
    <LabelInput v-model="username" label="Username" type="text" />
    <LabelInput v-model="email" label="Email" type="text" style="margin-top:20px"/>
    <LabelInput v-model="password" label="Password" type="password" style="margin-top:20px"/>
    <LabelInput v-model="confirm_password" label="Conferma password" type="password" style="margin-top:20px"/>
    <div class="buttons">
      <button style="margin-top:40px" class="primary"
              @click="register">Registrati!</button>
      <button style="margin-top:20px" class="secondary"
              @click="this.$router.push('login')">Vai al login</button>
    </div>
  </div>
</template>

<script>
import LabelInput from "../components/LabelInput"

export default {
  name: 'Register',
  data: () => {
    return {
      username: "",
      email:"",
      password: "",
      confirm_password:""
    }
  },
  components: {
    LabelInput
  },
  methods: {
    register(){
      console.log(this.username,this.email,this.password,this.confirm_password);
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
  padding: 0 20px 20px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

p.title {
  font-size: 50px;
  text-align: center;
  margin: 0;
  color:$PRIMARY;
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
