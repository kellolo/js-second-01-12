
window.onload= () => {
    js1() 
}


let bodyShop = new Vue({
    el: '#E-Shop',
    data: {
        API: 'https://raw.githubusercontent.com/lotostoi/js-second-01-12/master/students/Alexander%20Plotnikov/project/responses/',
        CatURL: 'catalogData.json',
        CartURL: 'getBasket.json',
        AddToCartURL: 'addToBasket.json',
        DeleteFromCartURL: 'deleteFromBasket.json',
        dataItems: [],
        cartItems: [],
        openCart: false,     
        openMenu: false,
        shearch: ''     
    },
    methods: {
        getData(url) {
            return fetch(url)
                .then(data => data.json())
        }
    },
    mounted() {
        this.getData(`${this.API}${this.CatURL}`)
            .then(data => {
                this.dataItems = data
            })
        this.getData(`${this.API}${this.CartURL}`)
            .then(data => {
                this.cartItems = data.contents
            })
    },
    computed: {
        sum: function () {
            let summ = null
            this.cartItems.forEach(e => {
                summ += +e.price * e.quantity
            })

            return summ
        },
        quantity: function () {
            let quat = null
            this.cartItems.forEach(e => {
                quat += +e.quantity
            })
            if (this.cartItems.length === 0) {
                quat = 0
            }
            return quat
        }
    }
})


