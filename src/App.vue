<template>
  <div class="header bg-black text-white text-start p-2">
      <h1 class="mt-0">Splitify</h1>
  </div>
  <div class="main-body">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
  }

  /* .no-gutters > [class^="col-"] {
    padding-right: 0;
    padding-left: 0;
  } */

</style>
