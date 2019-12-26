'use strict';

Vue.component('cart', {

    template: `
        <div class="cart-block-main">
            <button class="btn-cart" type="button" @click="cartShown = !cartShown">Корзина</button>
            <div class="cart-block" v-show="cartShown">            
                <cart-item v-for="item of cartItems" :key="item.id_product" :purchase="item"></cart-item>
                <div class="total-sum">
                <h3>Всего {{ getTotalSum.qnt }} позиции на {{ getTotalSum.sum }} руб.</h3>
                </div>
            </div>
        </div>`,

    data: function () {
        return {
            cartItems: [],
            cartShown: false,
            cartUrl: '/cart',
            addUrl: '/addItem',
            delUrl: '/delItem'
        }
    },

    methods: {

        addItem(item) {
            this.$parent.postRequest(this.addUrl, item)
                .then(d => d.json())
                .then(response => {
                    if (response.result) {
                        let find = this.cartItems.find(elem => elem.id_product === item.id_product);

                        if (find) {
                            find.quantity++;
                        } else {
                            this.cartItems.push(Object.assign({}, item, { quantity: 1 }));
                        }
                    }
                })
        },

        removeItem(item) {
            this.$parent.postRequest(this.delUrl, item)
                .then(d => d.json())
                .then(response => {
                    if (response.result) {
                        let find = this.cartItems.find(elem => elem.id_product === item.id_product);

                        if (find.quantity > 1) {
                            find.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(find), 1);
                        }
                    }
                })
        }
    },

    mounted() {
        this.$parent.getRequest(this.cartUrl)
            .then(d => d.json())
            .then(data => { this.cartItems = data })
    },
    computed: {
        getTotalSum() {
            let sum = 0;
            let qnt = 0;

            this.cartItems.forEach(elem => {
                sum += elem.price * elem.quantity;
                qnt += elem.quantity;
            });
            return { sum, qnt };
        }
    }
})