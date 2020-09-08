<template>
  <div class="admin">
    <Add
    @refreshBurgers="refreshBurgers"
    ></Add>
    <Burgers
    :burgers="burgers"
    ></Burgers>
  </div>
</template>
<script>
import Add from '../components/Admin/Add.vue'
import Burgers from '../components/Admin/Burgers.vue'
import axios from "axios"


export default {
  name: 'Admin',
  data: function () {
    return {
      burgers: null
    }
  },
  components: {
    Add,
    Burgers
  },
  methods:{
    refreshBurgers(burger) {

      this.burgers.push(burger)
      //this.getBurgers()
    },

    getBurgers : function(){
      axios.get('http://localhost:3001/getProduct')
      
      .then( response => {
            this.burgers = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
    },
     


  },
    mounted() {
      this.getBurgers()
  }
}
</script>

<style>

</style>