'use strict';

const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';

const API = 'https://raw.githubusercontent.com/malashenok/JS_advanced/master/online-store-api/response';


let products = new Vue({
    el: '.products',

    data: {
        items: [],
        url: API + '/catalogData.json',
        img: image
    },

    methods: {
        getResopnse(url) {
            return fetch(url);
        },

        addItem(item) {
            this.getResopnse(API + '/addToBasket.json')
                .then(d => d.json())
                .then(response => {
                    if (response.result) {
                        console.log(`Товар ${item.id_product} добавлен в корзину`);
                    }
                })
        }
    },
    computed: {

    },

    mounted() {
        this.getResopnse(this.url)
            .then(d => d.json())
            .then(data => { this.items = data })
    }
});

let cart = new Vue({
    el: '.cart',

    data: {
        items: [],
        url: API + '/getBasket.json',
        image: cartImage,
        cartShown: false
    },

    methods: {
        getResopnse(url) {
            return fetch(url);
        },
        removeItem(item) {
            this.getResopnse(API + '/deleteFromBasket.json')
                .then(d => d.json())
                .then(response => {
                    if (response.result) {
                        console.log(`Товар ${item.id_product} удален из корзины`);
                    }
                })
        }

    },
    computed: {
        getTotalSum() {
            return this.items.amount;
        },

        getItemsCount() {
            return this.items.countGoods;
        }
    },
    mounted() {
        this.getResopnse(this.url)
            .then(d => d.json())
            .then(data => { this.items = data })
    }
});