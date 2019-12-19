window.onload = function () {

    js1()
   // valForm()

    let Basket = new Cart('.contCartProducts__bodyCart', `${API}${CartURL}`)
    let PageShop = new Catalog(Basket, '.productsPage', `${API}${CatURL}`)
    let Forma = new Form('.feedBack__form', regExpName, regExpPhone, regExpMail)
}

let API = 'https://raw.githubusercontent.com/lotostoi/js-second-01-12/lesson3_is_ready/students/Alexander%20Plotnikov/project/responses/'
let CatURL = 'catalogData.json'
let CartURL = 'getBasket.json'
let AddToCartURL = 'addToBasket.json'
let DeleteFromCartURL = 'deleteFromBasket.json'

let regExpName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u // Имя содержит только буквы.
let regExpPhone = /^\+7\(\d{3}\)\d{3}\-\d{4}$/ //+7(000)000-0000
let regExpMail = /^((([A-Za-z]{2,3}((\.)|(\-)))|й*)[A-Za-z])+@mail.ru$/ // E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.


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


class Form { // класс для формы и ее валидации
    constructor(classNameForm, name, phone, mail) {
        this.classNameForm = classNameForm,
            this.regExpName = name,
            this.regExpPhone = phone,
            this.regExpMail = mail,
            this.fields = [],
            this._init()
    }
    _init() {
        this._addHendlerValid()
        
    }
    _valid(targ) {
        let context = this

        val('Name', this.regExpName)
        val('Phone', this.regExpPhone)
        val('Mail', this.regExpMail)

        function val(name, regExp) {

            if (targ.dataset['id'] === `${name}`) { // Если в элементе массива имя                 
                if (!regExp.test(targ.value)) {
                    d.querySelector(`input[data-id='${name}']`).classList.add('feedBack__Input-active')
                    d.querySelector(`span[data-id='${name}']`).classList.add('feedBack__hint-active')
                    d.querySelector(`input[data-id='${name}']`).dataset['flag'] = false
                } else {
                    d.querySelector(`input[data-id='${name}']`).classList.remove('feedBack__Input-active')
                    d.querySelector(`span[data-id='${name}']`).classList.remove('feedBack__hint-active')
                    d.querySelector(`input[data-id='${name}']`).dataset['flag'] = true
                }
            }
        }

        let flag = [...d.querySelectorAll('input[data-flag]')].find(item => item.dataset['flag'] == 'false')

        if (flag) {
            d.querySelector('#formBut').className = "feedBack__button-block"
            d.querySelector('#off').classList.add('feedBack__darck-active')
        } else {
            d.querySelector('#formBut').className = "feedBack__button-active"
            d.querySelector('#off').classList.remove('feedBack__darck-active')
        }
    }

    _createArrElem(context) {
        return function () {    
            let arr = []
            let colection = [...d.querySelectorAll('.feedBack__Input')]
            colection.forEach((e, i) => {
                if (e.dataset['id']) {
                    let obj = {}
                    obj.field = e.dataset['id']
                    obj.value = e.value
                    arr.push(obj)
                    e.value = ''
                }
            })
            context.fields = arr
            console.log(context)
            d.querySelector('.feedBack__modelWind').classList.add('feedBack__modelWind-active')
            d.querySelector('#cloesModelWind').addEventListener('click', () => {
                d.querySelector('.feedBack__modelWind').classList.remove('feedBack__modelWind-active')
                d.querySelector('#formBut').className = "feedBack__button-block"
                d.querySelector('#off').classList.add('feedBack__darck-active')
            })
        }

    }
    _addHendlerValid() {
        d.querySelector(this.classNameForm).addEventListener('focusout', (evt) => this._valid(evt.target))
        d.querySelector(this.classNameForm).addEventListener('input', (evt) => this._valid(evt.target))
        d.querySelector('#formBut').addEventListener('click', this._createArrElem(this))
    }
}

//let Forma = new Form('.feedBack__form', regExpName, regExpPhone, regExpMail)
