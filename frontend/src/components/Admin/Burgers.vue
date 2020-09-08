<template>
    <div class="burgers">
        <table>
            <tr v-for="burger in burgers" :key="burger._id">
                <td>{{burger.product}}</td>
                <td>{{burger.price}}</td>
            </tr>
        </table>
    
    </div>


</template>

<script>

export default {
  name: 'Burgers',
  props: ['burgers'],
  data: function () {
    return {
      
    }
  },
  methods:{
    },
  
  mounted() {
      
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
