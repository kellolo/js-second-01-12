const app = new Vue({
	el: '#app',
	// data: {
		// products: [],
		// cartItems: [],
		// isCartDisplaying: false,
		// query: '',
		// GETProductsUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json',
		// GETCartUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json',
	// },
	// methods: {
		// fetchProducts() {
		// 	return fetch(this.GETProductsUrl)
		// 		.then(response => response.json())
		// 		.then(products => {
		// 			this.products = products;
		// 		});
		// },

		// fetchCart() {
		// 	return fetch(this.GETCartUrl)
		// 		.then(response => response.json())
		// 		.then(cartItems => {
		// 			this.cartItems = cartItems.contents;
		// 		});
		// },

		// cartButtonHandler() {
		// 	this.isCartDisplaying = !this.isCartDisplaying;
		// },

		// getFilteredProducts() {
		// 	return this.products.filter(product => {
		// 		const regexp = new RegExp(this.query, 'i');
		//
		// 		return regexp.test(product.product_name);
		// 	});
		// },
	// },
	// computed: {
	// 	filteredProducts() {
	// 		return this.getFilteredProducts();
	// 	},
	// },
	// mounted() {
	// 	this.fetchProducts();
	// 	this.fetchCart();
	// },
});
