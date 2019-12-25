Vue.component("cart", {
    template: `
    <div>
        <button class="btn-cart" type="button" @click="cartShown = !cartShown">Корзина</button>
        <div class="cart-block" v-show="cartShown">
            <p>Всего товаров: {{ getSum.qua }} </p>
            <itemcart v-for="prod of items" :key="prod.id_product" :item="prod"></itemcart>
            <p>Общая ст-ть: $ {{ getSum.sum }} </p>
        </div>
    </div>

    `,
    data() {
        return {
            // delUrl: '/delFromBasket',
            items: [],
            cartShown: false,
            url: '/cart',
            addUrl: '/addToBasket',
            daelUrl:'/delFromBasket',
        }
    },
    methods: {
        addProduct(pr) {
            pr.quantity = 1;
            this.$parent.postJson(this.addUrl, pr)
                .then(ans => {
                    if (ans.result) {
                        let find = this.items.find(item => item.id_product === pr.id_product)

                        if (find) {
                            find.quantity++
                        } else {
                            this.items.push(Object.assign({}, pr, {
                                quantity: 1
                            }))
                        }
                    }
                })
        },
        delProduct(pr) {
           // pr.quantity = 1;
            this.$parent.delJson(this.delUrl, pr.id)
                .then(ans => {
                    if (ans.result) {
                        let find = this.items.find(item => item.id_product === pr.id_product)

                        if (find.quantity > 1) {
                            find.quantity--
                        } else {
                            this.items.splice(this.items.indexOf(find), 1)
                        }
                    }
                })
        }

    },
     mounted () {
        this.$parent.getJson (this.url)
            .then (data => {
                this.items = data
            })
    },
      computed: {
        getSum() {
            let sum = 0
            let qua = 0
            this.items.forEach(el => {
                sum += el.price * el.quantity
                qua += el.quantity
            })
            return {
                sum,
                qua
            }
        }

    },
});
