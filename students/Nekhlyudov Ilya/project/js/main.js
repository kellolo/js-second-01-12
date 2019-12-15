//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
// const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
// const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
// const ids = [1, 2, 3, 4, 5, 6, 7, 8];
const urlCatalog = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'

class CartItem {
    constructor () {
        this.userCart = [];
    }
    
    createProduct (i) {
        return {
            id_product: ids[i],
            product_name: items[i],
            price: prices[i],
            img: image,
        }
    }

    addProduct (product) {
        let productId = +product.dataset['id']; //data-id="1"
        let find = this.userCart.find (element => element.id === productId); //товар или false
        if (!find) {
            this.userCart.push ({
                name: product.dataset ['name'],
                id: productId,
                img: cartImage,
                price: +product.dataset['price'],
                quantity: 1
            })
        }  else {
            find.quantity++;
        }
        cart.render ();
    }

    removeProduct (product) {
        let productId = +product.dataset['id'];
        let find = this.userCart.find (element => element.id === productId);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            this.userCart.splice(this.userCart.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
        }
        cart.render ();
    }
}

let cartItem = new CartItem ();

class Cart {
    render () {
        this.allProducts = '';
        for (let el of cartItem.userCart) {
            this.allProducts += `<div class="cart-item" data-id="${el.id}">
                                <div class="product-bio">
                                    <img src="${el.img}" alt="Some image">
                                    <div class="product-desc">
                                        <p class="product-title">${el.name}</p>
                                        <p class="product-quantity">Quantity: ${el.quantity}</p>
                                        <p class="product-single-price">${el.price} руб. за штуку</p>
                                    </div>
                                </div>
                                <div class="right-block">
                                    <p class="product-price">${el.quantity * el.price}</p>
                                    <button class="del-btn" data-id="${el.id}">&times;</button>
                                </div>
                            </div>`
        }
        if (cartItem.userCart.length !== 0) {
            this.GoodsList ();
            this.allProducts += `<p>Общая стоимость всех товаров - ${this.summOfAll} руб.</p>`;
        }
        document.querySelector(`.cart-block`).innerHTML = this.allProducts;
    }
    
    fetchData (url) {
        return fetch (url)
    }

    GoodsList () {
        this.summOfAll = 0;
        for (let el of cartItem.userCart) {
            this.summOfAll += el.quantity * el.price;
        }
    }
}

let cart = new Cart ();
let showMeCart = false;

class Catalog {
    constructor (container) {
        this.container = container
        this.items = []
        this._init ()
    }
    _init () {
        cart.fetchData (urlCatalog)
            .then (dJSON => dJSON.json ())
            .then (data => {
                this.items = data;
            })
            .finally (() => {
                this._render ();
            })
    }
    _render () {
        let block = document.querySelector (this.container);
        let htmlStr = '';
        this.items.forEach (item => {            
            let prod = new CatalogItem(item);
            htmlStr += prod.render();
        })
        block.innerHTML = htmlStr;
        //кнопка скрытия и показа корзины
        document.querySelector('.btn-cart').addEventListener('click', () => {
            if (showMeCart === false) {
                document.querySelector('.cart-block').classList.toggle('invisible');
                showMeCart = true;
            }
            else {
                document.querySelector('.cart-block').classList.toggle('invisible');
                showMeCart = false;
            }
        });
        //кнопки удаления товара (добавляется один раз)
        document.querySelector('.cart-block').addEventListener ('click', (evt) => {
            if (evt.target.classList.contains ('del-btn')) {
                cartItem.removeProduct (evt.target);
                if (cartItem.userCart.length === 0 && showMeCart === true) {
                    document.querySelector('.cart-block').classList.toggle('invisible');
                    showMeCart = false;
                }
            }
        });
        //кнопки покупки товара (добавляется один раз)
        document.querySelector('.products').addEventListener ('click', (evt) => {
            if (evt.target.classList.contains ('buy-btn')) {
                cartItem.addProduct (evt.target);
                if (showMeCart === false) {
                    document.querySelector('.cart-block').classList.toggle('invisible');
                    showMeCart = true;
                }
            }
        });
    }
}

class CatalogItem {
    constructor (obj) {
        this.product_name = obj.product_name;
        this.price = obj.price;
        this.id_product = obj.id_product;
        this.img = image;
    }
    render () {
        return `
            <div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} руб.</p>
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

let catalog = new Catalog ('.products');