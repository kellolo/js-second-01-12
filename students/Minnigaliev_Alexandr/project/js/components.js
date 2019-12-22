Vue.component ('product-item', {
    template: `
    <div class="product-item" >
        <img :src="img" alt="Some img">
        <div class="desc">
            <h3>{{ item.product_name }}</h3>
            <p>{{ item.price }} $</p>
            <button class="buy-btn" @click="addProduct (item)">Купить</button>
        </div>
    </div>
    `,
    props: ['item', 'img'],
    methods: {
        addProduct (item) {
            this.$root.addProduct (item)
        }
    }

})

Vue.component ('cart-item', {
    template: `
    <div class="cart-item">
        <div class="product-bio">
            <img :src="img" alt="Some image">
            <div class="product-desc">
                <p class="product-title">{{ item.product_name }}</p>
                <p class="product-quantity">Quantity: {{ item.quantity }}</p>
                <p class="product-single-price">$ {{item.price}} each</p>
            </div>
        </div>
        <div class="right-block">
            <p class="product-price">$ {{ item.quantity * item.price }}</p>
            <button class="del-btn" @click="delProduct (item)">&times;</button>
        </div>
    </div>
    `,
    props: ['item', 'img'],
    methods: {
        delProduct (item) {
            this.$root.delProduct (item)
        }
    }

})