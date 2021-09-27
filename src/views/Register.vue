<template>
  <div class="container">
    <p class="title">Registrazione</p>
    <LabelInput :error="!this.validValues.username" v-model="username" label="Username" type="text"/>
    <LabelInput :error="!this.validValues.email" v-model="email" label="Email" type="text" style="margin-top:20px"/>
    <LabelInput :error="!this.validValues.password" v-model="password" label="Password" type="password" style="margin-top:20px"/>
    <LabelInput :error="!this.validValues.password" v-model="confirm_password" label="Conferma password" type="password" style="margin-top:20px"/>
    <div class="buttons">
      <button style="margin-top:40px" class="primary"
              @click="register">Registrati!
      </button>
      <button style="margin-top:20px" class="secondary"
              @click="this.$router.push('login')">Vai al login
      </button>
    </div>
  </div>
</template>

<script>
import LabelInput from "../components/LabelInput"
import {collection, doc, getFirestore, setDoc} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: 'Register',
  data: () => {
    return {
      loading:true,
      username: "FrexOver",
      email: "nico.fretti@gmail.com",
      password: "asdasd",
      confirm_password: "asdasd",
      validValues:{
        username:true,
        email:true,
        password:true
      }
    }
  },
  components: {
    LabelInput
  },
  methods: {
    checkValues(){
      this.validValues.password = this.password.length>=6 && this.password ==this.confirm_password;
      this.validValues.email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email);
      this.validUsername = /^[a-zA-Z0-9èéòçù\s]{3,30}$/.test(this.username);
      return false;
      //return this.validValues.password && this.validValues.email && this.validValues.username;
    },
    register() {
      this.loading=true;
      if(this.checkValues()){
        createUserWithEmailAndPassword(
            getAuth(),
            this.email,
            this.password
        ).then((data)=>{
          const db = getFirestore();
          const userRef = collection(db, 'users');

          setDoc(doc(userRef, data.user.uid), {
            username: this.username,
            cart: [],
            reciples: []
          }).then(()=>{
                this.$router.push('/');
              }
          );
        }).catch((error)=>{
          alert(error.message);
        });
      }
      this.loading=false;

    }
  }
}
//TODO checks and popup
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
  color: $PRIMARY;
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
