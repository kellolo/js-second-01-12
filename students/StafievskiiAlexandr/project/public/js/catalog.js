Vue.component('catalog', { 
  template: `
    <div class="products">
      <template v-if="items.length == 0">Нет данных</template>
      <template v-else>
        <cat-item v-for="item in items" :key="item.id_product" :product="item" class="product-item"></cat-item>
      </template>
    </div>
  `, 
  data() {
    return {
      catalogDataUrl: "/catalogData", 
      items: [],
    }
  }, 
  methods: {
    catAddProduct(prod) {
      this.$root.$refs.cart.addToBasket(prod);
    }
  },
  created() {
    fetch(this.catalogDataUrl)
      .then(d => d.json())
      .then(data => {
        this.items = data;
      });
  }
});

 