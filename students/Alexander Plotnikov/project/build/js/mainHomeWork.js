window.onload = function () {

    js1()

    let d = document

    // ********************************* Create HTML *************************************** //
    // ********************************* Create HTML *************************************** //
    // ********************************* Create HTML *************************************** //

    let name = ['product1', 'product2', 'product3', 'product4', 'product5', 'product6', 'product7', 'product8', 'product9', 'product10', 'product11', 'product12'] //list names
    let id = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] //list id
    let brand = ['samsung', 'aplle', 'aser', 'asus', 'boshc', 'philids', 'viteck', 'nokia', 'huawei', 'sony', 'aser', 'samsung'] // brands list
    let price = ['10', '20', '33', '15', '12', '44', '28', '62', '17', '50', '35', '30'] // prices list
    let country = ['USA', 'USA', 'USA', 'USA', 'USA', 'USA', 'USA', 'USA', 'USA', 'USA', 'USA', 'USA'] // countrys list
    let ship = ['free', 'free', 'free', 'free', 'free', 'free', 'free', 'free', 'free', 'free', 'free', 'free'] //ships list
    let img = ['build/img/Photo1.png', 'build/img/Photo1.png', 'build/img/Photo1.png', 'build/img/Photo1.png', 'build/img/Photo1.png', 'build/img/Photo1.png', 'build/img/Photo1.png', 'build/img/Photo1.png', 'build/img/Photo1.png', 'build/img/Photo1.png', 'build/img/Photo1.png', 'build/img/Photo1.png'] // img list

    class Product { // класс для создания товара магазина
        constructor(title, price, brand, country, ship, img, id) {
            this.name = title;
            this.price = price;
            this.brand = brand;
            this.country = country;
            this.ship = ship;
            this.img = img;
            this.id = id;
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
            this.arrElems = this._createPageShopObj(name, price, brand, country, ship, img, id);;
            this.CartElems = [];
        }
        render(mas, ClassProduct) {
            let arr = []
            for (let i = 0; i < mas.length; i++) {
                let Prod = new ClassProduct(
                    mas[i].name,
                    mas[i].price,
                    mas[i].brand,
                    mas[i].country,
                    mas[i].ship,
                    mas[i].img,
                    mas[i].id)
                Prod.quantity = mas[i].quantity
                arr += Prod.render()
            }
            d.querySelector(this.className).innerHTML = arr
        }
        _createPageShopObj(arrTitle, arrPrice, arrBrand, arrCountry, aarShip, aarImg, arrId) {
            let arr = []
            arrTitle.forEach((e, i) => {
                arr.push({
                    name: arrTitle[i],
                    price: arrPrice[i],
                    brand: arrBrand[i],
                    counrty: arrCountry[i],
                    ship: aarShip[i],
                    img: aarImg[i],
                    id: arrId[i],
                    quantity: 1
                })
            })
            return arr
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
            console.log(this.CartElems)
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


    let pageShop = new ContProduct('.productsPage')
    pageShop.render(pageShop.arrElems, Product)
    let Cartt = new Cart('.contCartProducts__bodyCart')
    Cartt.addToCart('.productsPage')


}