Vue.component ('header-component', {
	template: `
    <header>
      <div class="logo">E-shop</div>
      <div class="cart">
        <search-line></search-line>

        <button class="btn-cart"
                type="button"
                @click="cartButtonHandler"
        >Корзина</button>

        <div class="cart-block"
             v-show="isCartDisplaying"
        >
          <cart ref="cart"></cart>
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
