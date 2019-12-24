Vue.component ('basket-item', {
    template: '#basket-item-template',
    props: ['shopItem'],
});

Vue.component ('catalog-item',{
    template: '#catalog-item-template',
    props: ['catalogItem'],
});

let app = new Vue ({
    el: '#app',
    data: {
        catalogUrl: 'https://raw.githubusercontent.com/AlenaJalakas/shop/master/catalog.json',
        basketUrl: 'https://raw.githubusercontent.com/AlenaJalakas/shop/master/basketPreview.json',
        addUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json',
        delUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/deleteFromBasket.json',
        catalog: [],
        basket: [],
        basketShown: false,
        counter: 0
    },

    methods: {
        getJson (url) {
            return fetch(url)
                .then(d => d.json())
        },
        addProduct (pr) {
            this.getJson(this.addUrl)
                .then(ans => {
                    if (ans.result) {
                        let find = this.basket.find (item => item.id === pr.id)

                        if (find) {
                            find.quantity++
                        } else {
                            this.basket.push(Object.assign({}, pr, {quantity: 1}))
                        }
                    }
                })
        },
        delProduct (pr) {
            this.getJson(this.delUrl)
                .then(ans => {
                    if (ans.result) {
                        let find = this.basket.find(item => item.id === pr.id)

                        if (find.quantity > 1) {
                            find.quantity--
                        } else {
                            this.basket.splice (this.basket.indexOf(find), 1)
                        }
                    }
                })
        },
        increment() {
            this.counter++
        },
        decrement() {
            this.counter--
        }
    },
    computed: {
        getSum () {
            let sum = 0
            let qua = 0
            this.basket.forEach(el => {
                sum += el.price * el.quantity
                qua += el.quantity
            })
            return {sum, qua}
        }
    },

    mounted () {
        this.getJson(this.catalogUrl)
            .then(items => {
                this.catalog = items
            })
        this.getJson(this.basketUrl)
            .then(items => {
                this.basket = items.contents
            })
    }
});


