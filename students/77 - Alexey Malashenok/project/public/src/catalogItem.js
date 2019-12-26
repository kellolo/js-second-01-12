'use strict';

Vue.component('catalog-item', {
    template: `
        <div class="product-item">
            <img :src="image" alt="Some img">
            <div class="desc">
                <h3>{{ product.product_name }}</h3>
                <p>{{ product.price}} $</p>
                <button class="buy-btn" @click="$root.$refs.cart.addItem(product)">Купить</button>
            </div>
        </div>`,

    props: {
        image: {
            type: String,
            default: () => 'https://placehold.it/200x150'
        },
        product: {
            type: Object,
            default: () => ({})
        }
    }
})