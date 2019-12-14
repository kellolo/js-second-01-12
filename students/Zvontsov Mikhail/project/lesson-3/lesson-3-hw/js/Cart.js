class Cart extends List {
    constructor(url = '/getBasket.json', container = '.cart-block') {
        super(url, container)
        this.getJson()
            .then(data => handleData(data.contents))
    }
    addProduct(prosuct) {
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result) {
                    let find = this.allProducts.find(el => el.id_product === product.id_product)
                    if (find) {
                        find.quantity++
                        this._updateCart(find)
                    } else {
                        let prod = Object.assign({ quantity: 1 }, product)
                        this.data = [prod]
                        this._render()
                    }
                } else {
                    consile.log('ERROR')
                }
            })
    }

    removeProduct(product) {
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result) {
                    if (product.quantity > 1) {
                        product.quantity--
                        this._updateCart(product)
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(product), 1)
                        document.querySelector(`.cart-item[data-id="${product.id_product}"]`).remove()
                    }
                } else {
                    consile.log('ERROR')
                }
            })
    }

    _updateCart(product) {
        const block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`)
        block.querySelector('.product - quantity').textContent = `Quantity: ${product.quantity}`
        block.querySelector('.product - price').textContent = `$${product.quantity * product.price}`
    }

    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.taget.classList.contains('del-btn')) {
                const id = +e.target.dataset['id']
                this.addProduct(this.getItem(id))
            }
        })
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible')
        })
    }

}