Vue.component('cart', {
    data() {
        return {
            showCart: false,
            cartUrl: '/getBasket.json',
            imgCart: 'https://placehold.it/100x150',
            cartItems: []
        }
    },

    methods: {
        addProduct(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product)
                        if (find) {
                            find.quantity++
                        } else {
                            let prod = Object.assign({ quantity: 1 }, product)
                            this.cartItems.push(prod)
                        }
                    }
                })
        },
        remove(product) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result) {
                        if (product.quantity > 1) {
                            product.quantity--
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1)
                        }
                    }
                })
        }
    },
    mounted() {
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el)
                }
            });
    },
    template: `<div>
                <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
                <div class="cart-block" v-show="showCart">
                    <p v-if="!cartItems.length">Корзина пуста</p>
                    <cart-item v-for="item of cartItems" :key="item.id_product" :cart-item="item" :img="imgCart" @remove="remove"></cart-item>
                </div>
                
            </div>`
})

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `<div class="cart-item">
                <div class="product-bio">
                <img :src="img" :alt="cartItem.product_name">
                <div class="desc">
                <p class="product-title">{{cartItem.product_name}}</p>
                <p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
                <p class="product-single-price">{{cartItem.price}}</p>
                </div>
                </div>
                <div class="right-block">
                <p class="product-price">{{cartItem.quantity * cartItem.price}}</p>
                <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                </div>
                </div>`
})