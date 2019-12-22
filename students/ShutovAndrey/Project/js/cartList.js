Vue.component("cart", {
    template: `
<div>
                         <div class="cart-item" >
                             <div class="product-bio">
                                 <img src="https://placehold.it/100x80" alt="Some image">
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
            delUrl: 'https://raw.githubusercontent.com/ShutovAndrey/Study/master/deleteFromBasket.json',
        }
    },
    methods: {
        delProduct(pr) {
            this.$root.getJson(this.delUrl)
                .then(ans => {
                    if (ans.result) {
                        let find = this.$root.cartItems.find(item => item.id_product === pr.id_product)

                        if (find.quantity > 1) {
                            find.quantity--
                        } else {
                            this.$root.cartItems.splice(this.$root.cartItems.indexOf(find), 1)
                        }
                    }
                })
        },
        
//           getSum() {
//            let sum = 0
//            let qua = 0
//            this.$root.cartItems.forEach(el => {
//                sum += el.price * el.quantity
//                qua += el.quantity
//            })
//            return {
//                sum,
//                qua
//            }
//        }
    },


//    computed: {
//        getSum() {
//            let sum = 0
//            let qua = 0
//            this.$root.cartItems.forEach(el => {
//                sum += el.price * el.quantity
//                qua += el.quantity
//            })
//            return {
//                sum,
//                qua
//            }
//        }
//    },

})
