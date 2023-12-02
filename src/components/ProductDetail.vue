<template>
  <BackToHomeButton />
  <div>
    <h2>Detalhes do Produto</h2>
    <div v-if="product">
      <div v-if="product.image" class="text-center mb-4">
        <div class="rounded-circle border border-primary d-inline-block"
          style="width: 150px height: 150px overflow: hidden">
          <img :src="imageUrl" class="w-100 h-100" alt="Imagem do Produto">
        </div>
      </div>
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <p>Preço: {{ product.price }}</p>
      <button class="btn btn-primary btn-sm mr-2" @click="goToEditPage(product.id)">Editar</button>
    </div>
    <div v-else>
      Produto não encontrado.
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  computed: {
    imageUrl() {
      const baseUrl = 'http://localhost:8080' // Substitua pelo seu URL base
      return `${baseUrl}${this.product.image}`
    }
  },
  data() {
    return {
      product: null,
    }
  },
  mounted() {
    const productId = this.$route.params.id
    this.fetchProduct(productId)
  },
  
  methods: {
    async fetchProduct(productId) {
      try {
        const response = await api.get(`/products/${productId}`)
        this.product = response.data
      } catch (error) {
        console.error(error)
      }
    },
    goToEditPage(productId) {
      this.$router.push({ name: 'ProductEdit', params: { id: productId }, query: { editing: true } })
    },
  },
}
</script>
