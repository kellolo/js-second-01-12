'use strict';

Vue.component('cart-item', {
    template: `
        <div class="cart-item">
            <div class="product-bio">
                <img :src="this.$root.cartImg" alt="Cart image">
                <div class="product-desc">
                    <p class="product-title">{{ purchase.product_name }}</p>
                    <p class="product-quantity">Quantity: {{ purchase.quantity }}</p>
                    <p class="product-single-price">{{ purchase.price }}</p>
                </div>
            </div>
            <div class="right-block">
                <p class="product-price">{{ purchase.quantity * purchase.price }}</p>
                <button class="del-btn" @click="removeCartItem(purchase)">&times;</button>
            </div>
        </div>
    `,

    props: ['purchase'],

    methods: {
        removeCartItem(purchase) {
            this.$root.removeItem(purchase);
        }
    }
})