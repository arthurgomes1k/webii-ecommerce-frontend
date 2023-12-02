<template>
  <button @click="logout" class="btn btn-danger">Logout</button>
</template>

<script>
export default {
  methods: {
    logout() {
      // Limpa o token do localStorage
      localStorage.removeItem('token');
      // Redireciona para a tela de login
      this.$router.push('/');
    }
  }
};
</script>