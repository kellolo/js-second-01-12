class CartItem extends Item {
    constructor(el, img = 'http://placeimg.com/100/100/any') {
        super(el, img)
        this.quantity = el.quantity
    }

    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
        <div class="product-bio">
        <img src="${this.img}" alt="${this.product_name}">
        <div class="desc">
        <p class="product-title">${this.product_name}</p>
        <p class="product-quantity">Quantity: ${this.quantity}</p>
        <p class="product-single-price">${this.price} each</p>
        </div>
        </div>
        <div class="right-blok">
        <p class="product-price">$${this.quantity * this.price} $</p>
        <button class="del-btn" data-id="${this.id_product}">&times;</button>
        </div>
        </div>`
    }
}