let app = new Vue({
    el: '#app',
    data: {
        //  catUrl: 'https://raw.githubusercontent.com/ShutovAndrey/Study/master/StudyDB.json',
        catUrl: '/catalog',
        // cartUrl: 'https://raw.githubusercontent.com/ShutovAndrey/Study/master/getBasket.json',
        cartUrl: '/cart',
        catItems: [],
        cartItems: [],
        cartShown: false,
        sum: '',
        qua: ''
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(d => d.json())
        },

        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json());
        }

    },
    computed: {
        getSum() {
            let sum = 0
            let qua = 0
            this.cartItems.forEach(el => {
                sum += el.price * el.quantity
                qua += el.quantity
            })
            return {
                sum,
                qua
            }
        }

    },
    mounted() {
        this.getJson(this.catUrl)
            .then(items => {
                this.catItems = items
            });

        this.getJson(this.cartUrl)
            .then(items => {
                this.cartItems = items
            })
        //console.log(this)
    }
})
