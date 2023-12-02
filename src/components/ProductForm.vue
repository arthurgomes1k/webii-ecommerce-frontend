<template>
  <BackToHomeButton />
  <div class="container mt-5">
    <div class="cont-transp">
      <div v-if="editedProduct.image && !imagePreview" class="text-center mb-4">
        <div class="rounded-circle border border-primary d-inline-block"
          style="width: 150px height: 150px overflow: hidden">
          <img :src="imageUrl" class="w-100 h-100" alt="Imagem do Produto">
        </div>
      </div>
      <h2>{{ editing ? 'Editar Produto' : 'Adicionar Produto' }}</h2>
      <form @submit.prevent="saveProduct">
      
        <div class="form-group">
          <label for="image">Imagem do Produto:</label>
          <input type="file" class="form-control-file" id="image" @change="onImageChange" accept="image/*">
        </div>
        <div v-if="imagePreview">
          <h2>Pré-visualização da Imagem</h2>
          <div class="rounded-circle border border-primary d-inline-block"
            style="width: 150px height: 150px overflow: hidden">
            <img :src="imagePreview" class="w-100 h-100" alt="Pré-visualização da Imagem">
          </div>
        </div>
        <div class="form-group">
          <label for="name">Nome:</label>
          <input type="text" class="form-control" id="name" v-model="editedProduct.name" required>
        </div>
        <div class="form-group">
          <label for="description">Descrição:</label>
          <textarea class="form-control" id="description" v-model="editedProduct.description" required></textarea>
        </div>
        <div class="form-group">
            <label for="price">Preço:</label>
            <input type="number" step=".01" class="form-control" id="price" v-model="editedProduct.price" required>
          </div>
        <div class="form-group">
          <label for="category">Categoria:</label>
          <select class="form-control" id="category" v-model="selectedCategoryId" required>
            <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">{{ editing ? 'Salvar' : 'Adicionar' }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  props: {
    editing: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    imageUrl() {
      const baseUrl = 'http://localhost:8080' // Substitua pelo seu URL base
      return `${baseUrl}${this.editedProduct.image}`
    },
    selectedCategoryId: {
      get() {
        return this.editedProduct.category.id
      },
      set(value) {
        const selectedCategory = this.categories.find(category => category.id === value)
        this.editedProduct.category = selectedCategory
      }
    }
  },
  data() {
    return {
      imagePreview: null,
      editedProduct: {
        name: '',
        description: '',
        price: 0,
        category: {},
        image: null,
      },
      categories: [],
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.fetchProduct(this.$route.params.id)
    }
    this.loadCategories()
  },
  methods: {
    async fetchProduct(productId) {
      try {
        const response = await api.get(`/products/${productId}`)
        this.editedProduct = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async loadCategories() {
      try {
        const response = await api.get('/categories')
        this.categories = response.data
      } catch (error) {
        console.error(error)
      }
    },
    onImageChange(event) {
      const file = event.target.files[0]
      if (file) {
        // Crie uma URL temporária para pré-visualização da imagem
        this.imagePreview = URL.createObjectURL(file)
        // Atualize o campo de imagem no objeto editedProduct com o arquivo
        this.editedProduct.image = file
      }
    },
    async saveProduct() {
      try {
        const formData = new FormData()
        formData.append('name', this.editedProduct.name)
        formData.append('description', this.editedProduct.description)
        formData.append('price', this.editedProduct.price)
        formData.append('category', this.editedProduct.category.id)
        formData.append('image', this.editedProduct.image)
        this.imagePreview = null

        if (this.$route.params.id) {
          await api.patch(`products/${this.$route.params.id}`, formData)
        } else {
          await api.post('products', formData)
        }
        this.$router.push('/products')
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style scoped>
/* Estilo para o círculo da imagem */
.rounded-circle img {
  object-fit: cover
}

.cont-transp {
  margin-top: 0rem !important;
  background-color: #091d1fc5;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 1px 1px 10px rgba(255, 255, 255, 0.185);
}

</style>
