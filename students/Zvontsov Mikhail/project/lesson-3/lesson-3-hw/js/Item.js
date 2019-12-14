class Item {
    constructor(el, img = 'http://placeimg.com/200/150/any') {
        this.product_name = el.product_name
        this.id_product = el.id_product
        this.price = el.price
        this.img = img
    }


    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                    <img src="${this.img}" alt="${this.product_name}">
                    <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn" data-id="${this.id_product}">Купить</button>
                </div>
                </div>`
    }
}