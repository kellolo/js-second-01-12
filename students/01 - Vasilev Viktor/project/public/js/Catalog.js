Vue.component ('catalog', {
	template: `
		<div class="products">
      <catalog-item v-if="filteredProducts.length"
							     v-for="product in filteredProducts"
							     :key="product.id_product"
							     :product="product"
       />
       <div v-if="!filteredProducts.length">Нет данных</div>
    </div>
	`,
	data () {
		return {
			products: [],
			filteredProducts: [],
		};
	},
	methods: {
		fetchProducts() {
			return fetch('/products')
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
	}
});
