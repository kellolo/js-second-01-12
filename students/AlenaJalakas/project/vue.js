let catalog = new Vue ({
    el: '#container',
    data: {
        url: 'https://raw.githubusercontent.com/AlenaJalakas/shop/master/catalog.json',
        items: [],
        counter: 0,
    },
    methods: {
        fetchGoods (url) {
            return fetch(url)
                .then(d => d.json())
        },
        increment() {
            this.counter++
        },
        decrement() {
            this.counter--
        }
    },
    computed: {
        getUrl () {
            return `${this.url}`
        }
    },
    mounted () {
        this.fetchGoods(this.getUrl)
            .then(data => {
                this.items = data
            })
            .then()
    }
});

let basket = new Vue ({
    el: '#basket',
    data: {
        url: 'https://raw.githubusercontent.com/AlenaJalakas/shop/master/basketPreview.json',
        items: [],
        amount: 0,
    },
    methods: {
        fetchGoods (url) {
            return fetch(url)
                .then(d => d.json())
        }
    },
    computed: {
        getUrl () {
            return `${this.url}`
        }
    },
    mounted () {
        this.fetchGoods(this.getUrl)
            .then(data => {
                this.items = data.contents
            })
    }
});
