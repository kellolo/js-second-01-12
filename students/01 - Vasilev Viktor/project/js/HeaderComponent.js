Vue.component ('HeaderComponent', {
	template: `
    <header>
      <div class="logo">E-shop</div>
      <div class="cart">
        <SearchLine />

        <button class="btn-cart"
                type="button"
                @click="cartButtonHandler"
        >Корзина</button>

        <div class="cart-block"
             v-show="isCartDisplaying"
        >
          <Cart :items="cartItems"
                ref="cart"
          />
        </div>
      </div>
    </header>
	`,
	data() {
		return {
			isCartDisplaying: false,
		};
	},
	methods: {
		cartButtonHandler() {
			this.isCartDisplaying = !this.isCartDisplaying;
		},
	},
});
