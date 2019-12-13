window.onload = function () {

    js1()
    valForm()

    let Basket = new Cart('.contCartProducts__bodyCart', `${API}${CartURL}`)
    let PageShop = new Catalog(Basket, '.productsPage', `${API}${CatURL}`)

}

let API = 'https://raw.githubusercontent.com/lotostoi/js-second-01-12/lesson3_is_ready/students/Alexander%20Plotnikov/project/responses/'
let CatURL = 'catalogData.json'
let CartURL = 'getBasket.json'
let AddToCartURL = 'addToBasket.json'
let DeleteFromCartURL = 'deleteFromBasket.json'

let d = document

class BaseItem { // класс для создания товара магазина, часть значений пока не используется
    constructor(obj) {
        this.name = obj.name;
        this.price = obj.price;
        this.brand = obj.brand;
        this.country = obj.country;
        this.ship = obj.ship;
        this.img = obj.img;
        this.id = obj.id;

    }
    render() {
        return `<div class="contItem">
                        <img src="${this.img}" width="198" height="180" alt="imgProduct" class="contItem__img">
                        <span class="contItem__name">${this.name}</span>
                        <span class="contItem__price">$ ${this.price}</span>
                        <button class="contItem__button" 
                        data-id="${this.id}" 
                        data-name ="${this.name}"
                        data-price ="${this.price}"
                        data-brand ="${this.brand}"
                        data-country ="${this.country}"
                        data-ship ="${this.ship}"
                        data-img ="${this.img}">add to cart</button>
                    </div>`
    }
}

class BaseCont { // класс страници магазина
    constructor(className, url) {
        this.className = className;
        this.url = url
        this.Items = []
    }
    init() {
        return folse
    }
    _render() {
        let arr = []
        this.Items.forEach(e => {
            let Prod = new list[this.constructor.name](e)
            arr += Prod.render()
        })
        d.querySelector(this.className).innerHTML = arr
    }

    _fetchJSON(url) {
        return fetch(url)
            .then(data => data.json())
    }
}

class Catalog extends BaseCont {
    constructor(cart, className, url) {
        super(className, url)
        this.Cart = cart
        this._init()
    }
    _init() {
        this._fetchJSON(this.url)
            .then(data => {
                this.Items = data
            })
            .then(() => this._render())
            .then(() => console.log(this))
            .finally(() => {
                this.Cart.addToCartHendler(this.className)
            })

    }
}
class Item extends BaseItem {}

class CartItem extends BaseItem { // класс для товара в корзине
    constructor(obj) {
        super(obj)
        this.quantity = obj.quantity // добавлем параметр количество
    }
    render() {
        return `<div class="contCartProducts__contItem" data-id="${this.id}">
                            <img src="${this.img}" width="198" height="180" alt="imgProduct"
                                class="contCartProducts__img">
                            <span class="contCartProducts__name">${this.name}</span>
                            <span class="contCartProducts__price">$ ${this.price * this.quantity}</span>
                            <span class="contCartProducts__quantity">${this.quantity}</span>
                            <div class="contCartProducts__buttons">
                                <button class="contCartProducts__add">&#9650</button>
                                <button class="contCartProducts__del">&#9660</button>
                            </div>
                    </div>`
    }
}
class Cart extends BaseCont { // класс для корзины

    constructor(cart, className, url) {
        super(cart, className, url)
        this.allSumm = null
        this.allQuantity = null
        this.init()
    }

    init() {
        this._fetchJSON(this.url)
            .then(data => {
                this.Items = data.contents
            })
            .finally(() => {
                this._render()
                this._calcCart()
            })
    }
    _calcCart() { // метод для расчета общей суммы ккорзины, и общего количества товаров
        let allSumm = 0
        let allQuantity = 0
        // расcчет суммы корзины  и общеого количества корзины
        this.Items.forEach(e => {
            allSumm += e.price * +e.quantity
            allQuantity += +e.quantity
            this.allSumm = allSumm
            this.allQuantity = allQuantity
        })
        // вывод суммы и общего количества корзины
        d.querySelector('.contCartProducts__allSumm').innerHTML = '$' + allSumm
        d.querySelector('.contCartProducts__allQuantity').innerHTML = allQuantity
        d.querySelector('.menuTop__countCart').innerHTML = allQuantity
    }
    addToCartHendler(className) {
        let cont = this
        //  обработчик добавления элемента в корзину
        d.querySelector(className).addEventListener('click', this.addToCart(cont))
        // обработчки очистки корзины и регулировки количества отдельных товаров
        d.querySelector(this.className).parentNode.addEventListener('click', this._chengeContentCart(cont))
    }
    addToCart(cont) {
        return function (evt) {
            fetch(`${API}${AddToCartURL}`)
                .then(data => data.json())
                .then(data => { 
                    if (data.result === 1) {
                        if (evt.target.dataset.id) {
                            let id = evt.target.dataset.id
                            let el = cont.Items.find(item => item.id == id)
                            if (el) {
                                el.quantity++
                                cont._render()
                            } else {
                                let obj = {
                                    name: evt.target.dataset['name'],
                                    price: evt.target.dataset['price'],
                                    brand: evt.target.dataset['brand'],
                                    country: evt.target.dataset['country'],
                                    ship: evt.target.dataset['ship'],
                                    img: evt.target.dataset['img'],
                                    id: evt.target.dataset['id'],
                                    quantity: 1
                                }
                                cont.Items.push(obj)
                                let prodCart = new CartItem(obj)
                                d.querySelector(cont.className).innerHTML += prodCart.render()
                            }
                            cont._calcCart()
                        }
                    }
                })
                .catch(() => {
                    console.log('Error 404.')
                })

        }
    }
    _chengeContentCart(cont) {
        return function (evt) {
            if (evt.target.className == 'contCartProducts__allClean') {
                fetch(`${API}${DeleteFromCartURL}`)
                    .then(data => data.json())
                    .then(data => {
                        if (data.result) {
                            cont._dellCart()
                        }
                    })
                    .catch(() => {
                        console.log('Error 404.')
                    })
            }
            if (evt.target.className == 'contCartProducts__add') {
                fetch(`${API}${AddToCartURL}`)
                    .then(data => data.json())
                    .then(data => {
                        if (data.result) {
                            let parent = evt.target.parentNode
                            let id = parent.parentNode.dataset.id
                            parent.parentNode.childNodes[7].innerHTML++
                            cont.Items.forEach(e => {
                                if (e.id == id) {
                                    e.quantity = e.quantity++
                                    parent.parentNode.childNodes[5].innerHTML = '$' + e.quantity * e.price
                                }
                            })
                            cont._calcCart()
                        }
                    })
                    .catch(() => {
                        console.log('Error 404.')
                    })
            }
            if (evt.target.className == 'contCartProducts__del') {
                fetch(`${API}${AddToCartURL}`)
                    .then(data => data.json())
                    .then(() => {
                        let parent = evt.target.parentNode
                        let id = parent.parentNode.dataset.id
                        parent.parentNode.childNodes[7].innerHTML--
                        cont.Items.forEach((e, i) => {
                            if (e.id == id) {
                                if (e.quantity == 1) {
                                    cont.Items.splice(i, 1)
                                    if (e.length === 0) {
                                        cont._dellCart()
                                    }
                                    cont._render()
                                } else {
                                    e.quantity--
                                    parent.parentNode.childNodes[5].innerHTML = '$' + e.quantity * e.price
                                }
                            }
                        })
                        cont._calcCart()
                    })
                    .catch(() => {
                        console.log('Error 404.')
                    })
            }
        }
    }
    _calcCart() { // метод для расчета общей суммы ккорзины, и общего количества товаров
        let allSumm = 0
        let allQuantity = 0
        // расcчет суммы корзины  и общеого количества корзины
        this.Items.forEach(e => {
            allSumm += e.price * +e.quantity
            allQuantity += +e.quantity
            this.allSumm = allSumm
            this.allQuantity = allQuantity
        })
        // вывод суммы и общего количества корзины
        d.querySelector('.contCartProducts__allSumm').innerHTML = '$' + allSumm
        d.querySelector('.contCartProducts__allQuantity').innerHTML = allQuantity
        d.querySelector('.menuTop__countCart').innerHTML = allQuantity
    }
    _dellCart() {
        d.querySelector('.contCartProducts__allSumm').innerHTML = '$' + 0
        d.querySelector('.contCartProducts__allQuantity').innerHTML = 0
        d.querySelector('.menuTop__countCart').innerHTML = 0
        this.Items = []
        d.querySelector(this.className).innerHTML = ''
    }
}
let list = {
    Catalog: Item,
    Cart: CartItem
}