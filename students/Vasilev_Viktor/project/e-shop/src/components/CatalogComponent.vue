<template>
  <div>
    <div class="products" v-if="filteredProducts.length">
        <CatalogItemComponent v-for="product in filteredProducts"
                              :key="product.id_product"
                              :product="product"
        />
      </div>
    <div v-else>Нет данных</div>
  </div>
</template>

<script>
  import CatalogItemComponent from './CatalogItemComponent.vue'

  export default {
    name: "CatalogComponent",
    data() {
      return {
        products: [],
        filteredProducts: [],
      };
    },
    methods: {
      fetchProducts() {
        return fetch('/api/products')
          .then(response => response.json())
          .then(products => {
            this.products = products;
            this.filteredProducts = products;
          });
      },

      filterProducts(query) {
        const regexp = new RegExp(query, 'i');
        this.filteredProducts = this.products.filter(product => regexp.test(product.product_name));
      },
    },
    mounted() {
      this.fetchProducts();
    },
    components: {
      CatalogItemComponent,
    },
  }
</script>

<style lang="css" scoped>
  .products {
    column-gap: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fit, 200px);
    grid-template-rows: 1fr;
    padding: 40px 80px;
    justify-content: space-between;
  }
</style>