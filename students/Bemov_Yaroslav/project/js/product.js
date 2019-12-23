Vue.component('product', {
    template: `
    <div class="product-item" data-id="id_product" data-name="product_name">
        <img :src="prodImage" alt="Some img">
        <div class="desc">
            <h3>{{ prod.product_name }}</h3>
            <p>{{ prod.price }} $</p>
            <button class="buy-btn" @click="addProduct (prod)">Купить</button>
        </div>
    </div>
    `,
    props: {
        prod: {
            type: Object
        }
    },
    data() {
        return {
            prodImage: 'https://placehold.it/200x150',
            addToBasketUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json',
        }
    },
    methods: {
        addProduct(pr) {
            this.$root.getJson(this.addToBasketUrl)
                .then(answer => {
                    if (answer.result) {
                        let find = this.$root.cartItems.find(item => item.id_product === pr.id_product);

                        if (find) {
                            find.quantity++;
                        } else {
                            this.$root.cartItems.push(Object.assign({}, pr, {
                                quantity: 1
                            }));
                        }
                    }
                })
        },
    }
});