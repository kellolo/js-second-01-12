let app = new Vue({
    el: "#app",
    data: {
        search: '',
        isVisibleCart: false,
        catalogtUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json',
        cartUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json',
        catalogItems: [],
        cartItems: [],
        serverError: ''
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(res => res.ok ? res : this.serverError = res.status)
                .then(d => d.json())
        },
        toggleCart() {
            this.isVisibleCart = this.isVisibleCart ? false : true;
        },
    },
    computed: {
        getSum() {
            let summary = 0,
                quantity = 0;

            this.cartItems.forEach(item => {
                summary += item.price * item.quantity;
                quantity += item.quantity;
            })
            return {
                summary,
                quantity
            };

        },
        getSearch() {
            return this.catalogItems.filter(item => item.product_name.indexOf(this.search) !== -1);
        }
    },
    mounted() {
        this.getJson(this.catalogtUrl)
            .then(items => {
                this.catalogItems = items;
            })
        this.getJson(this.cartUrl)
            .then(items => {
                this.cartItems = items.contents;
            })
    }
});