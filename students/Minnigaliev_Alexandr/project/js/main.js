//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
// const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
// const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
// const ids = [1, 2, 3, 4, 5, 6, 7, 8];
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'


// lists.Catalog ===> ссылка на КЛАСС  
class List { //super for Catalog and Cart
    constructor (url, container) {
        this.container = container
        this.url = url
        this.items = []
        this._init ()
    }
    _init () {
        return false
        // здесь удобно навешивать листенеры на кнопки
    }
    getJSON (url) {
        return fetch (url)
                .then (d => d.json ()) //не Джейсон
    }
    _render () {
        let block = document.querySelector (this.container)
        let htmlStr = ''
        this.items.forEach (item => {
            let prod = new lists [this.constructor.name] (item)
            htmlStr += prod.render()
        })
        block.innerHTML = htmlStr
    }
}

class Item { //super for CatalogItem and CartItem
    constructor (obj, img = image) {
        this.product_name = obj.product_name
        this.price = obj.price
        this.id_product = obj.id_product
        this.img = img
    }
    render () {
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

class Catalog extends List {
    constructor (cart, url = '/catalogData.json', container = '.products') {
        super (url, container)
        this.cart = cart
    }
    _addListeners () {
        document.querySelector('.products').addEventListener ('click', (evt) => {
            if (evt.target.classList.contains ('buy-btn')) {
                this.cart.addProduct (evt.target);
            }
        })
    }
    _init () {
        this.getJSON (API + this.url)
            .then (data => { this.items = data })
            .then (() => { this._render () })
            .finally (() => { this._addListeners () })
    }
}

class CatalogItem extends Item {} //уже готово

class Cart extends List {
    constructor (url = '/getBasket.json', container = '.cart-block') {
        super (url, container)
    }
    _addListeners () {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.cart-block').classList.toggle('invisible');
        })

        document.querySelector('.cart-block').addEventListener ('click', (evt) => {
            if (evt.target.classList.contains ('del-btn')) {
                this.removeProduct (evt.target);
            }
        })
    }

    _init () {
        this.getJSON (API + this.url)
            .then (data => { this.items = data.contents })
            .then (() => { this._render () })
            .finally (() => { this._addListeners () })
    }

    addProduct (prod) {
        let approveFromServer
        this.getJSON (API + '/addToBasket.json')
            .then (d => {approveFromServer = d.result})
            .finally (() => {
                if (approveFromServer) {
                    console.log (`Товар ${prod.dataset.name} добавлен в корзину`)
                }
            })
    }

    removeProduct (prod) {
        this.getJSON (API + '/deleteFromBasket.json')
        .then (d => {
            if (d.result) {
                console.log (`Товар ${prod.dataset.id} удален из корзины`)
            }
        })
    }
}
 
class CartItem extends Item{
    constructor (obj, img = cartImage) {
        super (obj, img)
        this.quantity = 1
    }
    render () {
        return `
            <div class="cart-item" data-id="${this.id_product}">
                <div class="product-bio">
                    <img src="${this.img}" alt="Some image">
                    <div class="product-desc">
                        <p class="product-title">${this.product_name}</p>
                        <p class="product-quantity">Quantity: ${this.quantity}</p>
                        <p class="product-single-price">$${this.price} each</p>
                    </div>
                </div>
                <div class="right-block">
                    <p class="product-price">${this.quantity * this.price}</p>
                    <button class="del-btn" data-id="${this.id_product}">&times;</button>
                </div>
            </div>
        `
    }
}


const lists = {
    Catalog: CatalogItem,
    Cart: CartItem
}

let cart = new Cart ()
let catalog = new Catalog (cart)
//глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)
// var userCart = [];
// var list = fetchData ();

//кнопка скрытия и показа корзины
// document.querySelector('.btn-cart').addEventListener('click', () => {
//     document.querySelector('.cart-block').classList.toggle('invisible');
// });
// //кнопки удаления товара (добавляется один раз)
// document.querySelector('.cart-block').addEventListener ('click', (evt) => {
//     if (evt.target.classList.contains ('del-btn')) {
//         removeProduct (evt.target);
//     }
// })
//кнопки покупки товара (добавляется один раз)


//создание массива объектов - имитация загрузки данных с сервера
// function fetchData () {
//     let arr = [];
//     for (let i = 0; i < items.length; i++) {
//         arr.push (createProduct (i));
//     }
//     return arr
// };



//создание товара
// function createProduct (i) {
//     return {
//         id_product: ids[i],
//         product_name: items[i],
//         price: prices[i],
//         img: image,
//     }
// };

//рендер списка товаров (каталога)
// function renderProducts () {
//     //let arr = [];
//     let str = ''
//     for (item of list) {
//         str += item.createTemplate()
//     }
//     document.querySelector('.products').innerHTML = str;
// }

// renderProducts ();

//CART

// Добавление продуктов в корзину
// function addProduct (product) {
//     let productId = +product.dataset['id']; //data-id="1"
//     let find = userCart.find (element => element.id === productId); //товар или false
//     if (!find) {
//         userCart.push ({
//             name: product.dataset ['name'],
//             id: productId,
//             img: cartImage,
//             price: +product.dataset['price'],
//             quantity: 1
//         })
//     }  else {
//         find.quantity++
//     }
//     renderCart ()
// }

//удаление товаров
// function removeProduct (product) {
//     let productId = +product.dataset['id'];
//     let find = userCart.find (element => element.id === productId);
//     if (find.quantity > 1) {
//         find.quantity--;
//     } else {
//         userCart.splice(userCart.indexOf(find), 1);
//         document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
//     }
//     renderCart ();
// }

//перерендер корзины
// function renderCart () {
//     let allProducts = '';
//     for (el of userCart) {
//         allProducts += `<div class="cart-item" data-id="${el.id}">
//                             <div class="product-bio">
//                                 <img src="${el.img}" alt="Some image">
//                                 <div class="product-desc">
//                                     <p class="product-title">${el.name}</p>
//                                     <p class="product-quantity">Quantity: ${el.quantity}</p>
//                                     <p class="product-single-price">$${el.price} each</p>
//                                 </div>
//                             </div>
//                             <div class="right-block">
//                                 <p class="product-price">${el.quantity * el.price}</p>
//                                 <button class="del-btn" data-id="${el.id}">&times;</button>
//                             </div>
//                         </div>`
//     }

//     document.querySelector(`.cart-block`).innerHTML = allProducts;
// }
