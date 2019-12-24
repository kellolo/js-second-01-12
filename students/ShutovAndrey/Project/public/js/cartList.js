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
            delUrl: '/delFromBasket',
        }
    },
    methods: {
        delProduct(pr) {
            this.$root.postJson(this.delUrl)
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
        }

    }
});
