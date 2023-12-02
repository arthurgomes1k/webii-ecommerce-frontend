<template>
  <button @click="navigateToRoute" class="btn btn-primary">
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: {
    routePath: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      default: "Button Text"
    }
  },
  methods: {
    navigateToRoute() {
      this.$emit("navigate", this.routePath)
    }
  }
}
</script>

<style scoped>
/* Estilos específicos do botão aqui, se necessário */
</style>
