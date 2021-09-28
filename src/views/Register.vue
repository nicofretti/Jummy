<template>
  <div class="container">
    <Loader :active="this.loading" message="Stiamo completando la registrazione..."/>
    <p class="title">Registrazione</p>
    <LabelInput :error="!this.validValues.username" v-model="username" label="Username*" type="text"/>
    <LabelInput :error="!this.validValues.email" v-model="email" label="Email" type="text" style="margin-top:20px"/>
    <LabelInput :error="!this.validValues.password" v-model="password" label="Password*" type="password" style="margin-top:20px"/>
    <LabelInput :error="!this.validValues.password" v-model="confirm_password" label="Conferma password*" type="password" style="margin-top:20px"/>
    <div class="buttons">
      <p>*Username e password devono avere almeno 6 caratteri</p>
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
import Loader from "../components/Loader"

export default {
  name: 'Register',
  data: () => {
    return {
      loading:false,
      error:false,
      errorMessage:"",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      validValues:{
        username:true,
        email:true,
        password:true
      }
    }
  },
  components: {
    LabelInput,
    Loader
  },
  methods: {
    checkValues(){
      this.validValues.password = this.password.length>=6 && this.password === this.confirm_password;
      this.validValues.email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email)
      && this.email!=="";
      this.validValues.username = /^[a-zA-Z0-9èéòçù\s]{6,}$/.test(this.username) && this.username!=="";
      return this.validValues.password && this.validValues.email && this.validValues.username;
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
                this.loading=false;
                this.$router.push('/');
              }
          );
        }).catch((error)=>{
          alert(error.message);
        }).finally(()=>{
          this.loading=false;
        });
      }else{
        alert("I dati inseriti non sono corretti")
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
