Vue.component ('cart', {
    template: `
    <div>
        <button class="btn-cart" type="button" @click="cartShown = !cartShown">Корзина</button>
        <div class="cart-block" v-show="cartShown">
            <p>Наименований итого: {{ getSum.qua }}</p>
            <cart-item v-for="cartItem of cartItems" :key="cartItem.id_product" :item="cartItem" :img=cartImg></cart-item>
            <p>Общая стоимость: {{ getSum.sum }}</p>
        </div>

    </div>
    `,

    data () {
        return {
            cartItems: [],
            //cartUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json',
            cartUrl: '/basket',
            //addUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json',
            addUrl: '/add',
            //delUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/deleteFromBasket.json',
            delUrl: '/delete',
            cartImg: 'https://placehold.it/100x80',
            cartShown: false,
        }        
    },

    methods: {
        addProduct (pr) {
            this.$parent.getJson (this.addUrl)
                .then (ans => {                    
                    if (ans.result) {
                        let find = this.cartItems.find (item => item.id_product === pr.id_product)                        
                        if (find) {
                            find.quantity++
                        } else {
                            this.cartItems.push (Object.assign ({}, pr, {quantity: 1}))                            
                        }                        
                    }
                })           
        },

        delProduct (pr) {
            this.$parent.getJson (this.delUrl)
                .then (ans => {
                    if (ans.result) {
                        let find = this.cartItems.find (item => item.id_product === pr.id_product) 

                        if (find.quantity > 1) {
                            find.quantity--
                        } else {
                            this.cartItems.splice (this.cartItems.indexOf (find), 1)
                        }
                    }
                })
        }    
    },

    mounted () {        
        this.$parent.getJson (this.cartUrl)
            .then (data => {
                this.cartItems = data.contents
            })
    },
    
    computed: {
        getSum () {
            let sum = 0
            let qua = 0
            this.cartItems.forEach(el => {
                sum += el.price * el.quantity
                qua += el.quantity
            })
            return {sum, qua}
        }
    },
})