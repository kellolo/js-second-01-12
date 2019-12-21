//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
let dataFromWeb = null

let url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'


//Каталог товаров
class Catalog {
    constructor(container) {
        this.container = container;
        this.items = [];
        this._init();
    }
    _init() {

        //fetch
        this.fetchRequest(url)
            .then(dJSON => dJSON.json())
            .then(data => {
                dataFromWeb = data;
            })
            .finally(() => {
                this.items = dataFromWeb;
                this._render();
            })

        //promise
        // this.promise(url)
        //     .then(response => {
        //         this.items = JSON.parse(response);
        //     })
        //     .catch(error => {
        //         console.log (`Promise rejected ${error}`);
        //     })
        //     .finally (() => {
        //         this._render();
        //     })


    }
    _render() {
        let block = document.querySelector(this.container);
        let htmlStr = '';
        this.items.forEach(item => {
            let prod = new CatalogItem(item);
            htmlStr += prod.render();
        });
        block.innerHTML = htmlStr;
    }

    fetchRequest(url) {
        return fetch(url)
    }

    promise(url) {

        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = function () {
                if (this.status == 200) {
                    resolve(this.response);
                } else {
                    var error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };
            xhr.onerror = function () {
                reject(new Error("Network Error"));
            };
            xhr.send();
        });
    }
}

class CatalogItem {
    constructor(obj) {
        this.product_name = obj.product_name
        this.price = obj.price
        this.id_product = obj.id_product
        this.img = image
    }
    render() {
        return `
            <div class="product-item" data-id="${this.id_product}">
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
            </div>
        `
    }
}
let catalog = new Catalog('.products')

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
