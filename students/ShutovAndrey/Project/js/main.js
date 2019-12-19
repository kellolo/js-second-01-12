const API = 'https://raw.githubusercontent.com/ShutovAndrey/Study/master';
//const image = 'https://placehold.it/200x150';
let products = new Vue({
    el: '.products',
    data: {
        url: '/StudyDB.json',
        items: [],
        //   img: 'https://placehold.it/200x150',
        // хранилище внутр данных
    },
    methods: {
        // методы
        getProductList(url) {
            return fetch(url)
                .then(d => d.json())
        },

        addProduct(evt) {
            let approveFromServer;
            this.getJSON(API + '/addToBasket.json')
                .then(d => {
                    approveFromServer = d.result
                })
                .finally(() => {
                    if (approveFromServer) {
                    //    console.log(`Товар ${evt.item.product_name} добавлен в корзину`);
                        evt.item.quantity = 1;
                        let abb = cart.items.find(item => item.id_product == evt.item.id_product);
                        if (abb) {
                            abb.quantity++;
                        } else {
                            cart.items.push(evt.item);                  
                        }
                         cart.quantity++;
                    }
                })
        },


        getJSON(url) {
            return fetch(url)
                .then(d => d.json()) //не Джейсон
        }
    },

    // хуки
    mounted() {
        this.getProductList(API + this.url)
            .then(data => {
                this.items = data
            })

    }
})


let cart = new Vue({
    el: '.cart',
    data: {
        url: '/getBasket.json',
        items: [],
        quantity: null,
        cartShown: false,
        amount: null,
        //    img: 'https://placehold.it/200x150',
        // хранилище внутр данных
    },
    methods: {
        // методы
        getCartList(url) {
            return fetch(url)
                .then(d => d.json())
        },
    },
//ну и вот тут в общем я забуксовал. ругается на ремувпродукт. 
    removeProduct(prod) {
        return fetch(API + '/deleteFromBasket.json')
            .then(d => d.json()) //не Джейсон
            .then(d => {
                if (d.result) {
                    //  console.log (`Товар ${evt.item.product_name} удален из корзины`)
                    console.log(prod)
                }
            })
    },


    // хуки
    mounted() {
        this.getCartList(API + this.url)
            .then(data => {
                this.items = data.contents,
                    this.amount = data.amount,
                    this.quantity = data.countGoods
            })

    }
})
