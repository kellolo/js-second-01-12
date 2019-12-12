const api = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

class Products {
    constructor(container = '.products') {
        this.container = container
        this.data = []
        this.allProducts = []
        this._getProducts()
            .then(() => this._render())
    }

    _getProducts() {
        return fetch(`${api}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.data = [...data]
            })
            .catch(error => console.log(error))
    }

    _render() {
        const block = document.querySelector(this.container)
        for (let el of this.data) {
            const product = new ProductItem(el)
            this.allProducts.push(product)
            block.insertAdjacentHTML('beforeend', product.render())
        }
    }
}

class ProductItem {
    constructor(el, img = 'https://placehold.it/200x150') {
        this.product_name = el.product_name
        this.id_product = el.id_product
        this.price = el.price
        this.img = img
    }

    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn"
                        data-id="${this.id_product}"
                        data-name="${this.product_name}"
                        data-image="${this.img}"
                        data-price="${this.price}">Купить</button>
                </div>
                </div>`
    }
}

class Cart {
    constructor() {

    }

}

const products = new Products()