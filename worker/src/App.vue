<template>
  <div id="app">
    <div class="nav">
      <span @click="routerChange('/home')">Home</span>
      <span @click="routerChange('/about')">About</span>
    </div>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    routerChange(path){
      this.$router.push(path)
    }
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
.nav{
  display: flex;
  color: green;
}
.nav span{
  flex: 1;
  cursor: pointer;
}
</style>
