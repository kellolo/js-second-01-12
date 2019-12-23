let app = new Vue ({
    el: '#app',
    data: {
        catUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json',
        cartUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json',
        addUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json',
        delUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/deleteFromBasket.json',
        catItems: [],
        cartItems: [],
        catImg: 'https://placehold.it/200x150',
        cartImg: 'https://placehold.it/100x80',
        cartShown: false
    },
    methods: {
        getJson (url) {
            return fetch (url)
                    .then (d => d.json ())
        },
        addProduct (pr) {
            this.getJson (this.addUrl)
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
            this.getJson (this.delUrl)
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
        this.getJson (this.catUrl)
            .then (items => {
                this.catItems = items
            })
        
        this.getJson (this.cartUrl)
            .then (items => {
                this.cartItems = items.contents
            })
    }
})
