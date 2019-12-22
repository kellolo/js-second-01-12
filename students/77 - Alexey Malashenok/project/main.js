'use strict';

let app = new Vue({
    el: '.app',

    data: {

        catUrl: 'https://raw.githubusercontent.com/malashenok/JS_advanced/master/online-store-api/response/catalogData.json',
        cartUrl: 'https://raw.githubusercontent.com/malashenok/JS_advanced/master/online-store-api/response/getBasket.json',
        addUrl: 'https://raw.githubusercontent.com/malashenok/JS_advanced/master/online-store-api/response/addToBasket.json',
        delUrl: 'https://raw.githubusercontent.com/malashenok/JS_advanced/master/online-store-api/response/deleteFromBasket.json',

        catItems: [],
        cartItems: [],

        catImg: 'https://placehold.it/200x150',
        cartImg: 'https://placehold.it/100x80',

        cartShown: false

    },

    methods: {
        getResopnse(url) {
            return fetch(url);
        },

        addItem(item) {
            this.getResopnse(this.addUrl)
                .then(d => d.json())
                .then(response => {
                    if (response.result) {
                        let find = this.cartItems.find(elem => elem.id_product === item.id_product);

                        if (find) {
                            find.quantity++;
                        } else {
                            this.cartItems.push(Object.assign({}, item, { quantity: 1 }));
                        }
                    }
                })
        },
        removeItem(item) {
            this.getResopnse(this.delUrl)
                .then(d => d.json())
                .then(response => {
                    if (response.result) {
                        let find = this.cartItems.find(elem => elem.id_product === item.id_product);

                        if (find.quantity > 1) {
                            find.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(find), 1);
                        }
                    }
                    
                })
        }


    },
    computed: {
        getTotalSum() {
            let sum = 0;
            let qnt = 0;

            this.cartItems.forEach(elem => {
                sum += elem.price * elem.quantity;
                qnt += elem.quantity;
            });
            return ({ sum, qnt });
        }
    },

    mounted() {
        this.getResopnse(this.catUrl)
            .then(d => d.json())
            .then(data => { this.catItems = data })

        this.getResopnse(this.cartUrl)
            .then(d => d.json())
            .then(data => { this.cartItems = data.contents })
    }
});
