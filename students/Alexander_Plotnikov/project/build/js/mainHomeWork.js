window.onload = function () {

    js1()
    let pageShop = new ContProduct('.productsPage')
    // pageShop.init()
   // pageShop.getCatalogPromis(catURL)
      pageShop.getCatalogFetch(catURL)
}
// ********************************* Create HTML *************************************** //
// ********************************* Create HTML *************************************** //
// ********************************* Create HTML *************************************** //
let d = document

let catURL = 'https://raw.githubusercontent.com/lotostoi/js-second-01-12/lesson3/students/Alexander_Plotnikov/project/responses/catalogData.json'

class Product { // класс для создания товара магазина
    constructor(obj) {
        this.name = obj.title;
        this.price = obj.price;
        this.brand = obj.brand;
        this.country = obj.country;
        this.ship = obj.ship;
        this.img = obj.img;
        this.id = obj.id;
        this.quantity = 1
    }
    render() {
        return `<div class="contItem">
                        <img src="${this.img}" width="198" height="180" alt="imgProduct" class="contItem__img">
                        <span class="contItem__name">${this.name}</span>
                        <span class="contItem__price">$${this.price}</span>
                        <button class="contItem__button" data-id="${this.id}">add to cart</button>
                    </div>`
    }
}

class ContProduct { // класс страници магазина
    constructor(className) {
        this.className = className;
        this.arrElems = []
        this.CartElems = [];
    }
    init() {
        let cont = this
        this._getCatalog(catURL, cont._render(cont, Product))
    }
    _render(cont, classItem) {
        return function () {
            let mas = cont.arrElems
            let arr = []
            for (let i = 0; i < mas.length; i++) {
                let Prod = new classItem(mas[i])
                Prod.quantity = mas[i].quantity
                arr += Prod.render()
            }
            d.querySelector(cont.className).innerHTML = arr
         } 
    }
    _getCatalog(url, callback) {
        let cont = this
        let xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.send()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                cont.arrElems = JSON.parse(xhr.responseText)
                callback()
            }
        }
    }
    getCatalogPromis(url) {
        let cont = this
        let getData = new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open('GET', url, true)
            xhr.send()
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response))
                    }
                    else {
                        reject('error')
                    }
                }
            }
        })
        getData.then(rez => { cont.arrElems = rez })
            .finally(() => {cont._render(cont, Product)()})
    }
    getCatalogFetch(url) {
        let cont = this
        let getData = fetch(url)
        getData.then(rez => {cont.arrElems = rez })
            .catch(rez=> console.log(rez))
            .finally(() => cont._render(cont, Product)())
    }
}

class ProductCart extends Product { // класс товара в корзине
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

class Cart extends ContProduct { // класс для корзины
    addToCart(className) {
        let context = this
        //  обработчик добавления элемента в корзину
        d.querySelector(className).addEventListener('click', this._addToCart(context))
        // обработчки очистки корзины и регулировки количества отдельных товаров
        d.querySelector(this.className).parentNode.addEventListener('click', this._chengeContentCart(context))
    }
    _addToCart(cont) {
        return function (evt) {
            if (evt.target.dataset.id) {
                let id = evt.target.dataset.id
                let el = cont.arrElems.find(item => item.id == id)
                let elInCart = cont.CartElems.find(item => item == el)
                if (elInCart) {
                    elInCart.quantity++
                    cont.render(cont.CartElems, ProductCart)
                } else {
                    cont.CartElems.push(el)
                    let prodCart = new ProductCart(el.name, el.price, el.brand, el.country, el.ship, el.img, el.id)
                    d.querySelector(cont.className).innerHTML += prodCart.render()
                }
                // console.log(cont.CartElems)
                cont._calcCart()

            }
        }
    }
    _chengeContentCart(cont) {
        return function (evt) {
            if (evt.target.className == 'contCartProducts__allClean') {
                cont._dellCart()
            }
            if (evt.target.className == 'contCartProducts__add') {
                let parent = evt.target.parentNode
                let id = parent.parentNode.dataset.id
                parent.parentNode.childNodes[7].innerHTML++
                cont.CartElems.forEach((e, i) => {
                    if (e.id == id) {
                        cont.CartElems[i].quantity++
                        parent.parentNode.childNodes[5].innerHTML = '$' + cont.CartElems[i].quantity * cont.CartElems[i].price
                    }
                })
                cont._calcCart()

            }
            if (evt.target.className == 'contCartProducts__del') {
                let parent = evt.target.parentNode
                let id = parent.parentNode.dataset.id
                parent.parentNode.childNodes[7].innerHTML--
                cont.CartElems.forEach((e, i) => {
                    if (e.id == id) {
                        if (cont.CartElems[i].quantity == 1) {
                            cont.CartElems.splice(i, 1)
                            // console.log(cont.CartElems)
                            if (cont.CartElems.length === 0) {
                                cont._dellCart()
                            }
                            cont.render(cont.CartElems, ProductCart)
                        } else {
                            cont.CartElems[i].quantity--
                            parent.parentNode.childNodes[5].innerHTML = '$' + cont.CartElems[i].quantity * cont.CartElems[i].price
                        }
                    }
                })
                cont._calcCart()
            }
        }
    }
    _calcCart() { // метод для расчета общей суммы ккорзины, и общего количества товаров
        let allSumm = 0
        let allQuantity = 0
        // расcчет суммы корзины  и общеого количества корзины
        // console.log(this.CartElems)
        this.CartElems.forEach(e => {
            allSumm += e.price * e.quantity
            allQuantity += e.quantity
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
        this.CartElems = []
        this.arrElems.forEach(e => {
            e.quantity = 1
        })
        // console.log(this.CartElems)
        d.querySelector(this.className).innerHTML = ''
    }
}




