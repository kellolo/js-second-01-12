class List {
    constructor(url, container) {
        this.container = container
        this.url = url
        this.data = []
        this.allProducts = []
        this._init()
    }

    handleDta(data) {
        this.data = [...data]
        this._render()
    }

    _init() {
        return false
    }
    _render() {
        const block = document.querySelector(this.container)
        for (let el of this.data) {
            const product = new lists[this.constructor.name](el)
            this.allProducts.push(product)
            block.insertAdjacentHTML('beforeend', product.render())
        }
    }

    getItem(id) {
        return this.allProducts.find(el => id_product === id)
    }

    calcSum() {
        return this.allProducts.reduce((accum, item) => accum + item.price, 0)
    }

    getJson(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => console.log(error))
    }
}

const lists = {
    Cart: CartItem,
    Products: ProductItem
}