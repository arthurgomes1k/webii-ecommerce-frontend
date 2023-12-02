<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" class="form-control" required>
              </div>
              <button type="submit" class="btn btn-primary btn-block">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await api.post('/users/login', {
          username: this.username,
          password: this.password
        });
        // Armazena o token de autenticação no localStorage
        localStorage.setItem('token', response.data.token);
        // Redireciona o usuário para outra página após o login, se necessário
        this.$router.push('/products');
      } catch (error) {
        alert('Erro ao fazer login.', error);
        // Trate o erro de acordo com sua necessidade (exibindo uma mensagem de erro, por exemplo)
      }
    }
  }
};
</script>
<style scoped>
.login-container {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 10px;
}

input {
  background-color: #DCF2F5;
}

button {
  background-color: #8AD5DD;
  color: #091D1F;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #CDB954;
  color: #091D1F;
}

.mt-5 {
  margin-top: 0rem !important;
}

.col-md-6 {
  flex: 0 0 auto;
  width: 50%;
}

.row {
  padding-top: 100px;
}

.card {
  background-color: #091d1fd8;
  color: #DCF2F5;
}

.card-header {
  background-color: #091D1F;
  font-weight: bolder;
}

</style>