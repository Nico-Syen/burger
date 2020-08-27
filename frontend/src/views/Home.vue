<template>
  <div id="home">
    <img alt="Vue logo" src="../assets/burger.jpg">
    <ConnexionForm msg="Welcome to Your Vue.js App"/>
  </div>


</template>

<script>
import ConnexionForm from '../components/ConnexionForm.vue'

export default {
  name: 'Home',
  components: {
    ConnexionForm
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>