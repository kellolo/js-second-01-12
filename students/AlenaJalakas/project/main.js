Vue.component ('basket-item', {
    template: '#basket-item-template',
    props: ['shopItem'],
});

Vue.component ('basket', {
    template: '#basket-template',
    data () {
        return {
            basket: [],
            basketShown: false,
            url:'server/db/basket.json',
            addUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json',
            delUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/deleteFromBasket.json',
        }
    },
    methods: {
        addProduct(pr) {
            this.$parent.getJson (this.addUrl)
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
            this.$parent.getJson(this.delUrl)
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
        }

    },
    mounted() {
        this.$parent.getJson(this.url)
            .then(data => {
                this.basket = data.contents
            })
    },
    computed: {
        getSum () {
            let sum = 0
            let qua = 0
            this.basket.forEach(el => {
                sum += el.price * el.quantity
                qua += el.quantity
            });
            return {sum, qua}
        }
    }

});
Vue.component('catalog', {
    template: '#catalog-template',
    data() {
        return {
            url: '/catalog',
            catalog: [],
            filtered: [],
        }
    },
    methods: {
        filter (searchString) {
            let reg = new RegExp (searchString, 'i')
            this.filtered = []
            this.catalog.forEach(element => {
                if (reg.test (element.title)) {
                    this.filtered.push(element)
                }
            })
        }
    },
    mounted() {
        this.$parent.getJson (this.url)
            .then(data => {
                this.catalog = data
                this.filtered = data
            })
    }
});

Vue.component ('catalog-item',{
    template: '#catalog-item-template',
    props: ['catalogItem'],
});

Vue.component ('filteritem', {
    template: '#filter-template',
    data() {
        return {
            str: ''
        }
    }
});

let app = new Vue ({
    el: '#app',
    methods: {
        getJson (url) {
            return fetch(url)
                .then(d => d.json())
        },

    }
});


