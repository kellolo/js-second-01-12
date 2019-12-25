Vue.component ('catalog', {
	template: `
		<div class="products">
      <CatalogItem v-if="filteredProducts.length"
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
			GETProductsUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json',
			POSTUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json',
		};
	},
	methods: {
		fetchProducts() {
			return fetch(this.GETProductsUrl)
				.then(response => response.json())
				.then(products => {
					this.products = products;
					this.filteredProducts = products;
				});
		},

		filterProducts(query) {
			this.filteredProducts = this.products.filter(product => {
				const regexp = new RegExp(query, 'i');

				return regexp.test(product.product_name);
			});
		},
	},
	mounted() {
		this.fetchProducts();
	}
});
