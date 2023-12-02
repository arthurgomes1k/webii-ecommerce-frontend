<template>
  <router-link to="/products" class="btn btn-success">Voltar ao Início</router-link>
</template>

<script>
export default {
  name: 'BackToHomeButton'
};
</script>

<style scoped>
  .btn.btn-success {
    background-color: #b1962b;
    border: 1px solid #b1962b;
  }

  .btn.btn-success:hover {
    background-color: #ecd560;
    border: 1px solid #ecd560;
    color: #091D1F;
  }

</style>
