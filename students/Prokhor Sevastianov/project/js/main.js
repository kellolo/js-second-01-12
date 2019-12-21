//заглушки (имитация базы данных)
const cartImage = 'https://placehold.it/100x80';

//Каталог товаров

let app = new Vue({
    el: '#app',
    data: {
        url: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json',
        container: '.products',
        items: [],
        image: 'https://placehold.it/200x150'
    },
    methods: {

    },
    mounted() {
        console.log(this.items)
        fetch(this.url)
            .then(resp => resp.json())
            .then(data => {
                this.items = data;
                console.log('this.items',this.items)
            })
    }
})

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});
//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('del-btn')) {
        newCart.removeProduct(evt.target);
    }
})
//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('buy-btn')) {
        newCart.addProduct(evt.target);
    }
})


//CART
class Cart {
    constructor() {
        this.userCart = [];
    }
    // Добавление продуктов в корзину
    addProduct(product) {
        let productId = +product.dataset['id']; //data-id="1"
        let find = this.userCart.find(element => element.id === productId); //товар или false
        if (!find) {
            this.userCart.push({
                name: product.dataset['name'],
                id: productId,
                img: cartImage,
                price: +product.dataset['price'],
                quantity: 1
            })
        } else {
            find.quantity++
        }
        this.renderCart()
    }

    //удаление товаров
    removeProduct(product) {
        let productId = +product.dataset['id'];
        let find = this.userCart.find(element => element.id === productId);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            this.userCart.splice(this.userCart.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
        }
        this.renderCart();
    }

    //перерендер корзины
    renderCart() {
        let allProducts = '';
        for (let el of this.userCart) {
            allProducts += `<div class="cart-item" data-id="${el.id}">
                            <div class="product-bio">
                                <img src="${el.img}" alt="Some image">
                                <div class="product-desc">
                                    <p class="product-title">${el.name}</p>
                                    <p class="product-quantity">Quantity: ${el.quantity}</p>
                                    <p class="product-single-price">$${el.price} each</p>
                                </div>
                            </div>
                            <div class="right-block">
                                <p class="product-price">${el.quantity * el.price}</p>
                                <button class="del-btn" data-id="${el.id}">&times;</button>
                            </div>
                        </div>`
        }

        document.querySelector(`.cart-block`).innerHTML = allProducts;
        this._totalPrice();
    }
    _totalPrice() {
        let sum = 0;
        this.userCart.forEach(element =>
            sum += +element.price * +element.quantity
        );
        if (this.userCart.length > 0) {
            document.querySelector(`.cart-block`).insertAdjacentHTML('beforeend', `<span class="total-price">TOTAL PRICE ${sum} $</span>`);
        }
    }
}

let newCart = new Cart();