<template>
  <div class="hello">
     
    <form>
    <label for="fname">Produit</label><br>
    <input type="text" v-model="product"><br>
    <label for="lname">Prix</label><br>
    <input type="text" v-model="price">
    
                {{msg}}
    </form> 
   <button @click="sendAddProductForm()">Ajouter</button>
</div>


</template>

<script>
import axios from "axios"

export default {
  name: 'Crud',
  props: [],
  data: function () {
    return {
      product: null,
      price: null,
      msg: null
    }
  },
  methods:{
    sendAddProductForm : function(){
      axios.post('http://localhost:3001/add', {
        product : this.product,
        price  : this.price
      })
      .then( response => {
        this.msg = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    
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
