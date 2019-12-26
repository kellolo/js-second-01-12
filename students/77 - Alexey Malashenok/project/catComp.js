'use strict';

Vue.component('catalog-item', {
    template: `
        <div class="product-item">
            <img :src="this.$root.catImg" alt="Some img">
            <div class="desc">
                <h3>{{ product.product_name }}</h3>
                <p>{{ product.price}} $</p>
                <button class="buy-btn" @click="addProduct(product)">Купить</button>
            </div>
        </div>
    `,

    props: ['product'],

    methods: {
        addProduct(product) {
            this.$root.addItem(product);
        }
    }
})