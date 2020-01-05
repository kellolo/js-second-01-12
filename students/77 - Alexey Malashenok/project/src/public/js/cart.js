import item from './cart-item'

let cart = {
    components: { item },
    template: `
    <div class="cart-block-main">
        <button class="btn-cart" type="button" @click="cartShown = !cartShown">Корзина</button>
        <div class="cart-block" v-show="cartShown">
            <p>Всего товаров: {{ getSum.qua }} </p>
            <item v-for="prod of items" :key="prod.id_product" :item="prod"></item>
            <p>Общая ст-ть: $ {{ getSum.sum }} </p>
        </div>
    </div>
    `,
    data () {
        return {
            items: [],
            cartShown: false
        }
    },
    methods: {
        addProduct (pr) {
            let find = this.items.find (item => item.id_product === pr.id_product)
            if (find) {
                this.$parent.putJson ('/cart/' + pr.id_product, {q: 1})
                .then ((d) => {
                    d.result ? find.quantity++ : console.log ('error')
                })
            } else {
                let p = Object.assign ({}, pr, {quantity: 1})
                this.$parent.postJson ('/cart', p)
                .then ((d) => {
                    d.result ? this.items.push (p) : console.log ('error')
                })
            }
        },
        delProduct (pr) {
            let find = this.items.find (item => item.id_product === pr.id_product)
            if (find.quantity > 1) {
                this.$parent.putJson ('/cart/' + pr.id_product, {q: -1})
                .then ((d) => {
                    d.result ? find.quantity-- : console.log ('error')
                })
            } else {
                this.$parent.deleteJson ('/cart/' + pr.id_product)
                .then ((d) => {
                    d.result ? this.items.splice (this.items.indexOf (pr), 1) : console.log ('error')
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
                sum += el.price * el.quantity
                qua += el.quantity
            })
            return {sum, qua}
        }
    }
}

export default cart