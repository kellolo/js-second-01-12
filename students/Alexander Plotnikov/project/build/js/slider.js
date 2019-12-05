window.onload = function () {
    let d = document

    //  ********************************Adept menu************************************ //
    //  ********************************Adept menu************************************ //
    //  ********************************Adept menu************************************ //

    d.querySelector('.menuTop__iconMemu').addEventListener('click', clickHendler)

    function clickHendler() {

        d.querySelector('.menuTop__nav').classList.toggle('menuTop__nav-activ')
        d.querySelector('.menuTop__iconMemu').classList.toggle('menuTop__iconMemu-activ')
        let iconMenu = d.querySelectorAll('.menuTop__line')
        iconMenu.forEach((el, i) => {
            iconMenu[i].classList.toggle('menuTop__line-activ')
        })
        // close cart
        d.querySelector('.menuTop__CartSvg').classList.remove('menuTop__CartSvg-active')
        d.querySelector('.contCartProducts').classList.remove('contCartProducts-active')


    }

    // ************************* Open cart and close catr *****************************//
    // ************************* Open cart and close catr *****************************//
    // ************************* Open cart and close catr *****************************//

    d.querySelector('.menuTop__CartSvg').addEventListener('click', openCart)

    function openCart() {
        d.querySelector('.menuTop__CartSvg').classList.toggle('menuTop__CartSvg-active')
        d.querySelector('.contCartProducts').classList.toggle('contCartProducts-active')

        // close adapt menu
        d.querySelector('.menuTop__nav').classList.remove('menuTop__nav-activ')
        d.querySelector('.menuTop__iconMemu').classList.remove('menuTop__iconMemu-activ')
        let iconMenu = d.querySelectorAll('.menuTop__line')
        iconMenu.forEach((el, i) => {
            iconMenu[i].classList.remove('menuTop__line-activ')
        })

    }


    // *********************** Slider ************************************ //
    // *********************** Slider ************************************ //
    // *********************** Slider ************************************ //
    let count = 1
    d.querySelector('.slider').addEventListener('click', workClick)

    function workClick(evt) {

        let target = evt.target
        d.querySelector('.slider').removeEventListener('click', workClick)
        clickHandler(target, add)

        function add() {
            d.querySelector('.slider').addEventListener('click', workClick)
        }

        function clickHandler(evt) {
            if (target.dataset['number']) {
                d.querySelectorAll('.bunner').forEach((el, i) => {
                    if (el.dataset['id'] === target.dataset['number']) {
                        d.querySelectorAll('.bunner').forEach(el => {
                            el.classList.remove('bunnerActiv')
                        })
                        d.querySelectorAll('.check').forEach(el => {
                            el.classList.remove('checkActiv')
                        })
                        el.classList.add('bunnerActiv')
                        target.classList.add('checkActiv')
                        count = i + 1
                    }
                })
            }
            if (target.dataset['id'] == 'next') {
                count++
                if (count > [...d.querySelectorAll('.bunner')].length) {
                    count = 1
                }
                d.querySelectorAll('.bunner').forEach(el => {
                    if (el.dataset['id'] == count) {
                        d.querySelectorAll('.bunner').forEach(el => {
                            el.classList.remove('bunnerActiv')
                        })
                        d.querySelectorAll('.check').forEach(el => {
                            el.classList.remove('checkActiv')
                        })
                        el.classList.add('bunnerActiv')
                        d.querySelectorAll('.check').forEach(el => {
                            if (el.dataset['number'] == count) {
                                el.classList.add('checkActiv')
                            }
                        })
                    }
                })
            }
            setTimeout(() => {
                add.call(window)
            }, 610)
        }

    }

    // ************************* Drop menus from block search *************************//
    // ************************* Drop menus from block search *************************//
    // ************************* Drop menus from block search *************************//

    d.querySelector('.search').addEventListener('click', workClickk)

    function workClickk(evt) {
        if (evt.target.parentNode.className === "search__typeSort") {
            d.querySelector('.search__paramasSort').classList.toggle('search__paramasSort-active')
        }
        if (evt.target.parentNode.className === "search__paramasSort search__paramasSort-active") {
            d.querySelector('.search__valueSort').innerHTML = evt.target.innerHTML
            d.querySelector('.search__paramasSort').classList.toggle('search__paramasSort-active')
        }

        if (evt.target.parentNode.className === "search__contShips") {
            d.querySelector('.search__listAreasShips').classList.toggle('search__listAreasShips-active')
        }
        if (evt.target.parentNode.className === "search__listAreasShips search__listAreasShips-active") {
            d.querySelector('.search__areaship').innerHTML = evt.target.innerHTML
            d.querySelector('.search__listAreasShips').classList.toggle('search__listAreasShips-active')
        }
    }

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

    class product {
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

    class contProduct {
        constructor(className) {
            this.className = className;
            this.arrElems = [];
            this.CartElems = [];
        }
        fetchProduct(arrTitle, arrPrice, arrBrand, arrCountry, aarShip, aarImg, arrId) {
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
            this.arrElems = arr
        }
        render() {
            for (let i = 0; i < this.arrElems.length; i++) {
                let Product = new product(
                    this.arrElems[i].name,
                    this.arrElems[i].price,
                    this.arrElems[i].brand,
                    this.arrElems[i].country,
                    this.arrElems[i].ship,
                    this.arrElems[i].img,
                    this.arrElems[i].id)
                d.querySelector(this.className).innerHTML += Product.render()
            }
        }
    }


    class productCart extends product {
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

    class Cart extends contProduct {
        render() {
            let arr = []

            for (let i = 0; i < this.CartElems.length; i++) {
                let Product = new productCart(
                    this.CartElems[i].name,
                    this.CartElems[i].price,
                    this.CartElems[i].brand,
                    this.CartElems[i].country,
                    this.CartElems[i].ship,
                    this.CartElems[i].img,
                    this.CartElems[i].id)
                Product.quantity = this.CartElems[i].quantity

                arr += Product.render()
            }
            d.querySelector(this.className).innerHTML = arr
        }
        addToCart(className) {
            let context = this
            super.fetchProduct(name, price, brand, country, ship, img, id)
            d.querySelector(className).addEventListener('click', clickHendler) //  обработчик добавления элемента в корзину
            d.querySelector(this.className).parentNode.addEventListener('click', clickDell) // обработчки полной очистки корзины

            function calcCart() {
                let allSumm = null
                let allQuantity = null
                // расcчет суммы корзины  и общеого количества корзины
                context.CartElems.forEach(e => {
                    allSumm += e.price * e.quantity
                    allQuantity += e.quantity
                })
                // вывод суммы и общего количества корзины
                d.querySelector('.contCartProducts__allSumm').innerHTML = '$' + allSumm
                d.querySelector('.contCartProducts__allQuantity').innerHTML = allQuantity
                d.querySelector('.menuTop__countCart').innerHTML = allQuantity
            }

            function dell() {
                d.querySelector('.contCartProducts__allSumm').innerHTML = '$' + 0
                d.querySelector('.contCartProducts__allQuantity').innerHTML = 0
                d.querySelector('.menuTop__countCart').innerHTML = 0
                context.CartElems = []
                d.querySelector(context.className).innerHTML = ''
            }

            function clickHendler(evt) {
                if (evt.target.dataset.id) {
                    let id = evt.target.dataset.id
                    let el = context.arrElems.find(item => item.id == id)
                    let elInCart = context.CartElems.find(item => item == el)
                    if (elInCart) {
                        elInCart.quantity++
                        context.render()
                    } else {
                        context.CartElems.push(el)
                        let prodCart = new productCart(el.name, el.price, el.brand, el.country, el.ship, el.img, el.id)
                        d.querySelector(context.className).innerHTML += prodCart.render()
                    }
                    calcCart()
                }

            }

            function clickDell(evt) {
                if (evt.target.className == 'contCartProducts__allClean') {
                    dell()
                }
                if (evt.target.className == 'contCartProducts__add') {
                    let parent = evt.target.parentNode
                    let id = parent.parentNode.dataset.id - 1
                    parent.parentNode.childNodes[7].innerHTML++
                    context.CartElems[id].quantity++
                    parent.parentNode.childNodes[5].innerHTML = '$' + context.CartElems[id].quantity * context.CartElems[id].price
                    calcCart()
                }
                if (evt.target.className == 'contCartProducts__del') {
                    let parent = evt.target.parentNode
                    let id = parent.parentNode.dataset.id - 1
                    parent.parentNode.childNodes[7].innerHTML--
                    context.CartElems[id].quantity--
                    parent.parentNode.childNodes[5].innerHTML = '$' + context.CartElems[id].quantity * context.CartElems[id].price
                    calcCart()
                    if (context.CartElems.length === 0) {
                        context.CartElems = []
                        d.querySelector(context.className).innerHTML = ''
                    }
                    if (context.CartElems[id].quantity == 0) {
                        context.CartElems.splice(id, 1)
                        context.render()
                    }
                }

            }
        }
    }


    let pageShop = new contProduct('.productsPage')
    pageShop.fetchProduct(name, price, brand, country, ship, img, id)
    pageShop.render()

    let Cartt = new Cart('.contCartProducts__bodyCart')
    Cartt.addToCart('.productsPage')


}