Vue.component('catalog', {
  template: `
    <div class="products">
      <p v-show="searchMsgShown" class="search-message">{{searchErrMsg}}</p>
      <template v-if="items.length > 0">
        <catalog-item v-for="product of filtered" :key="product.id_product" :item="product"></catalog-item>
      </template>
      <p v-else class="server-error">Нет ответа от сервера</p>
    </div>
  `,
  data() {
    return {
      url: '/catalog',
      searchMsgShown: false,
      searchErrMsg: 'Такого товара в нашем каталоге нет :(',
      items: [],
      filtered: []
    }
  },
  methods: {
    filter(str) {
      let reg = new RegExp(str, 'i');
      this.filtered = this.items.filter(item => reg.test(item.product_name));
    }
  },
  mounted() {
    this.$root.getJSON(this.url)
        .then(data => {
          this.items = data;
          this.filtered = data;
        });
  }
});