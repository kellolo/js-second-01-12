const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


let app = new Vue ({
    el: '#app',

    data: {
        catUrl: API_URL + '/catalogData.json',
        cartUrl: API_URL + '/getBasket.json',
        addUrl: API_URL + '/addToBasket.json',
        delUrl: API_URL + '/deleteFromBasket.json',
        catImg: 'https://placehold.it/200x150',
        cartImg: 'https://placehold.it/100x80',
        catItems: [],
        cartItems: [],
        cartShown: false
    },

    methods: {
        getItems(url) {
            return fetch(url)
                .then(d => d.json()) //возвращает объект, т.к на входе принимает JSON
        },

        addItem(product) {
            this.getItems(this.addUrl)
                .then(ans => {
                    if (ans.result) {
                        let find = this.cartItems.find (item => item.id_product === product.id_product) 

                        if (find) {
                            find.quantity++
                        } else {
                            this.cartItems.push (Object.assign ({}, product, {quantity: 1}))
                        }
                    }
                })
        },

        delItem(product) {
            this.getItems(this.delUrl)
                .then(ans => {
                    if (ans.result) {
                        let find = this.cartItems.find (item => item.id_product === product.id_product) 

                        if (find.quantity > 1) {
                            find.quantity--
                        } else {
                            this.cartItems.splice (this.cartItems.indexOf (find), 1)
                        }
                    }
                })
        }
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

    mounted () {
        this.getItems(this.catUrl)
            .then(data => {
                this.catItems = data
            })
            .finally(() => {console.log(this.catItems)})

        this.getItems(this.cartUrl)
            .then(data => {
                this.cartItems = data.contents
            })
            .finally(() => {console.log(this.cartItems)})
    }
})
