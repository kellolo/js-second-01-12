Vue.component ('itemcat', {
    template: `
    <div class="product-item">
        <img :src="image" alt="Some img">
        <div class="desc">
            <h3>{{ item.product_name }}</h3>
            <p>{{ item.price }} $</p>
            <button class="buy-btn" @click="$root.$refs.cart.addProduct (item)">Купить</button>
        </div>
    </div>
    `,
    props: {
        image: {
            type: String,
            default: () => 'https://placehold.it/200x150'
        },
        item: {
            type: Object,
            default: () => ({})
        }
    }
})