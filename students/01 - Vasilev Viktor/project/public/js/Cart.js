Vue.component ('cart', {
	template: `
		<div>
			<cart-item class="cart-item"
								 v-for="item in cartItems" 
								 :key="item.id_product"
								 :item="item"
								 @delete="deleteCartItemButtonHandler"
	    />
		</div>
	`,
	data() {
		return {
			cartItems: [],
			GETCartUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json',
			POSTUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json',
			PATCHUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json',
			DELETEUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/deleteFromBasket.json',
		};
	},
	methods: {
		fetchCart() {
			return fetch(this.GETCartUrl)
				.then(response => response.json())
				.then(cartItems => {
					this.cartItems = cartItems.contents;
				});
		},

		addProductToCart(product) {
			fetch(this.POSTUrl)
				.then(response => response.json())
				.then(data => {
          if (data.result) {
						this.cartItems.push({...product, quantity: 1});
					}
				});
		},

		updateCartItem(cartItem) {
        fetch(this.PATCHUrl)
          .then(response => response.json())
					.then(data => {
						if (data.result) {
							cartItem.quantity++;
						}
          });
      },

		deleteCartItem(item) {
			fetch(this.DELETEUrl)
				.then(response => response.json())
        .then(data => {
					if (data.result) {
						if (item.quantity > 1) {
							item.quantity--;
						} else {
							this.cartItems.splice(this.cartItems.indexOf(item), 1);
						}
					}
				});
		},

		deleteCartItemButtonHandler(item) {
			this.deleteCartItem(item);
		},

		getCurrentCartItem(product) {
			return this.cartItems.find(cartItem => cartItem.id_product === product.id_product);
		},
	},
	mounted() {
		this.fetchCart();
	}
});
