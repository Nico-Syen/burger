<template>
  <div class="hello">
     
    <form>
    <label for="fname">Identifiant</label><br>
    <input type="text" v-model="login"><br>
    <label for="lname">Mot de passe</label><br>
    <input type="password" v-model="pwd">
    
                {{msg}}
    </form> 
   <button @click="sendConnexionForm()">Connexion</button><button @click="sendRegisterForm">Inscription</button>
</div>


</template>

<script>
import axios from "axios"

export default {
  name: 'ConnexionForm',
  props: [],
  data: function () {
    return {
      login: null,
      pwd: null,
      msg: null
    }
  },
  methods:{
    sendConnexionForm : function(){
      axios.post('http://localhost:3001/connexion', {
        name : this.login,
        password  : this.pwd
      })
      .then( response => {
        this.msg = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    sendRegisterForm : function(){
      axios.post('http://localhost:3001/register', {
        name : this.login,
        password  : this.pwd
      })
      .then(response => {
        this.msg = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
