<template>
    <div class="basket">
        <button class="basket__button" type="button" @click="cartShown = !cartShown"><img src="src/assets/cart.svg" alt="cart"></button>
        <div class="basket__block" v-show="cartShown">
            <p class="basket__info">In your basket:{{ getSum.qua }} items </p>
            <shop-item v-for="item in items" :shop-item="item" :key="item.id"></shop-item>
            <p class="basket__pay">Total: $ {{ getSum.sum }} </p>
        </div>
    </div>
</template>

<script>
    import shopItem from "@/components/shopItem";

    export default {
        name: "cart",
        components: { shopItem },
        data () {
            return {
                items: [],
                cartShown: false,
                url:'./db/userCart.json',
            }
        },
        methods: {
            addProduct(pr) {
                let find = this.items.find (item => item.id === pr.id);
                if (find) {
                    this.$parent.putJson ('/cart' + pr.id, { q: 1})
                        .then (d => {
                            if (d.result) {
                                find.quantity++
                            }
                        })
                } else {
                    let p = Object.assign({}, pr, {quantity: 1});
                    this.$parent.postJson ('/cart', p)
                        .then (d => {
                            if(d.result) {
                                this.items.push (p)
                            }
                        })
                }
            },
            delProduct (pr) {
                let find = this.items.find (item => item.id === pr.id)
                if (find.quantity > 1) {
                    this.$parent.putJson ('/cart/' + pr.id, {q: -1})
                        .then (d => {
                            if (d.result) {
                                find.quantity--
                            }
                        })
                } else {
                    this.$parent.deleteJson ('/cart/' + pr.id)
                        .then (d => {
                            if(d.result) {
                                this.items.splice (this.items.indexOf (pr), 1)
                            }
                        })
                }
            }
        },
        mounted () {
            this.$parent.getJson ('/cart')
                .then (data => {
                    this.items = data.contents
                })
        },
        computed: {
            getSum () {
                let sum = 0
                let qua = 0
                this.items.forEach(el => {
                    sum += el.price * el.quantity;
                    qua += el.quantity
                });
                return {sum, qua}
            }
        }
    }
</script>

<style lang="sass" scoped>
    .basket
        margin-left: 800px
        &__button
            border: none
            background-color: #f8f9fa
        &__info
            font-size: 10px
            color: darkgreen
        &__pay
            font-size: 14px
            color: darkgreen
</style>