<template>
  <div class="container mt-5">
    <h2>Lista de Produtos:</h2>
    <RouterButton @navigate="navigateTo" routePath="/product/add" buttonText="Adicionar produto" />
    <LogoutButton/>
    <table class="table mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Preço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td><router-link :to="{ name: 'ProductDetails', params: { id: product.id } }">{{ product.id }}</router-link></td>
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>US$ {{ product.price.toFixed(2) }}</td>
          <td>
            <router-link :to="{ name: 'ProductEdit', params: { id: product.id },query: { editing: true } }"
              class="btn btn-primary btn-sm mr-2">Editar</router-link>
            <button @click="deleteProduct(product.id)" class="btn btn-danger btn-sm">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
        <div class="pagination justify-content-end mt-3">
        <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-secondary mr-2">Anterior</button>
        <button @click="nextPage" :disabled="currentPage * pageSize >= totalProducts" class="btn btn-secondary">Próximo</button>
      </div>
  </div>
</template>

<script>
import api from '@/api'

import RouterButton from "@/components/RouterButton.vue"
import LogoutButton from "@/components/LogoutButton.vue"

export default {
  components: {
    RouterButton,
    LogoutButton
  },
  data() {
    return {
      products: [],
      currentPage: 1,
      pageSize: 3, // Número de itens por página
      totalProducts: 0
    }
  },
  beforeMount() {
    this.fetchProducts()
  },
  methods: {
    navigateTo(routePath) {
      this.$router.push(routePath)
    },
    async fetchProducts() {
      try {
        const response = await api.get(`/products?page=${this.currentPage}&size=${this.pageSize}&sort=price&direction=desc`)
        this.products = response.data.content
        this.totalProducts = response.data.totalElements;
      } catch (error) {
        console.error(error)
      }
    },
    async deleteProduct(productId) {
      if (confirm('Tem certeza de que deseja excluir este produto?')) {
        try {
          await api.delete(`/products/${productId}`)
          this.products = this.products.filter(product => product.id !== productId)
        } catch (error) {
          console.error(error)
        }
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchProducts();
      }
    },
    nextPage() {
      if (this.currentPage * this.pageSize < this.totalProducts) {
        this.currentPage++;
        this.fetchProducts();
      }
    }
  },
}
</script>
<style scoped>

.pagination {
  margin-top: 20px;
}

.justify-content-end {
  justify-content: flex-end;
}

.mt-5 {
  padding-top: 3rem !important;
  margin-top: 0rem !important;
}

.mt-5 h2 {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 2em;
  font-variant: small-caps;
  color: #091D1F;
  background-color: #DCF2F5;
  border-radius: 0px 10px 0px 10px;
  width: 400px;
}
.mt-5 table {
  border-bottom: #091D1F;
}
.mt-3 th {
  margin-top: 1rem !important;
  background-color: #0d2b2ef3;
  color: #DCF2F5;
  border-radius: 10px 10px 0px 0px;
}

.mt-3 td {
  margin-top: 1rem !important;
  background-color: #091d1fc9;
  color: #DCF2F5;
  border: 1px solid #091D1F;
}

.mt-3 a {
  text-decoration: none;
  color: #CDB954;
  font-weight: bold;
}

.mt-3 a:hover {
  text-decoration: underline;
  color: #CDB954;
  font-weight: bold;
}

</style>
