const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// const image = 'https://placehold.it/200x150';
// const cartImage = 'https://placehold.it/100x80';

let products = new Vue ({
    el: '.products',

    data: {
        url: API_URL + '/catalogData.json',
        img: 'https://placehold.it/200x150',
        items: [],
    },

    methods: {
        getItems(url) {
            return fetch(url)
                .then(d => d.json()) //возвращает объект, т.к на входе принимает JSON
        },
    },

    computed: {

    },

    mounted () {
        this.getItems(this.url)
            .then(data => {
                this.items = data
            })
            .finally(() => {console.log(this.items)})
    }
})

let cart = new Vue ({
    el: '.cart-block',

    data: {
        url: API_URL + '/getBasket.json',
        img: 'https://placehold.it/200x150',
        items: [],
    },

    methods: {
        getItems(url) {
            return fetch(url)
                .then(d => d.json()) //возвращает объект, т.к на входе принимает JSON
        },
    },

    mounted() {
        this.getItems(this.url)
        .then(data => {
            this.items = data
        })
        .finally(() => {console.log(this.items)})
    }
    

})

document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
}); 