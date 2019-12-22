Vue.component("products", {
    template: `
                <div class="product-item">
                    <img src="https://placehold.it/200x150" alt="Some img">
                    <div class="desc">
                        <h3>{{ item.product_name }}</h3>
                        <p>{{ item.price }} $</p>
                        <button class="buy-btn" @click="addProduct (item)">Купить</button>
                    </div>
                </div>

    `,
    props: {
        item: {
            type: Object,
        }
    },
    data() {
        return {
            addUrl: 'https://raw.githubusercontent.com/ShutovAndrey/Study/master/addToBasket.json',
        }
    },
    methods: {
                addProduct (pr) {
            this.$root.getJson (this.addUrl)
                .then (ans => {
                    if (ans.result) {
                        let find = this.$root.cartItems.find (item => item.id_product === pr.id_product) 

                        if (find) {
                            find.quantity++
                        } else {
                            this.$root.cartItems.push (Object.assign ({}, pr, {quantity: 1}))
                        }
                    }
                })
        }

    },

})
