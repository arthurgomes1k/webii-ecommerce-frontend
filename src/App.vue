<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;

  background-image: url(../public/imagens/espaco.jpg);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #091D1F;
  background-attachment: fixed;
}
</style>
