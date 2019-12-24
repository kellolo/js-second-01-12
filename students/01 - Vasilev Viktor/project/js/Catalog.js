Vue.component ('catalog', {
	template: `
		<div class="products">
      <CatalogItem v-if="products.length"
							     v-for="product in products"
							     :key="product.id_product"
							     :product="product"
       />
       <div v-if="!products.length">Нет данных</div>
    </div>
	`,
	props: ['products'],
	data () {
		return {
			POSTUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json',
		};
	},
	methods: {
	},
});
