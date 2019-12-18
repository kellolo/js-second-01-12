const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
	el: '#app',
	data: {
		products: [],
		cartItems: [],
		isCartDisplaying: false,
		image: 'https://placehold.it/200x150',
		cartImage: 'https://placehold.it/100x80',
		query: '',
	},
	methods: {
		fetchProducts() {
			return fetch(`${API}/catalogData.json`)
				.then(response => response.json())
				.then(products => this.products = products);
		},

		fetchCart() {
			return fetch(`${API}/getBasket.json`)
				.then(response => response.json())
				.then(cartItems => this.cartItems = cartItems.contents);
		},

		addProductToCart(product) {
			fetch(`${API}/addToBasket.json`)
				.then(response => response.json())
				.then(data => {
          if (data.result) {
						console.log(`Товар ${product.product_name} добавлен в корзину`);
					}
				});
		},

		deleteCartItem(item) {
			fetch(`${API}/deleteFromBasket.json`)
				.then(response => response.json())
        .then(data => {
					if (data.result) {
						console.log(`Товар ${item.product_name} удален из корзины`);
					}
				});
		},

		cartButtonHandler() {
			this.isCartDisplaying = !this.isCartDisplaying;
		},

		buyButtonHandler(product) {
      this.addProductToCart(product);
		},

		deleteCartItemButtonHandler(item) {
			this.deleteCartItem(item);
		},
	},
	computed: {
		filterProducts() {
			return this.products.filter(product => {
				const regexp = new RegExp(this.query, 'i');

				return regexp.test(product.product_name);
			});
		},
	},
	mounted() {
		this.fetchProducts();
		this.fetchCart();
	}
});
