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

    let name = [] //list names
    let id = [] //list id
    let brand = [] // brands list
    let price = [] // prices list
    let country = [] // countrys list
    let ship = [] //ships list
    let img = [] // img list

    class Product {
        constructor(title, price, brand, country, ship, img, id) {
            this.name = title;
            this.price = price;
            this.brand = brand;
            this.country = country;
            this.ship = ship;
            this.img = img;
            this.id = id
        }
        render() {
            return `<div class="contItem">
                        <img src="${this.img}" width="198" height="180" alt="imgProduct" class="contItem__img">
                        <span class="contItem__name">${this.name}</span>
                        <span class="contItem__price">${this.price}</span>
                        <button class="contItem__button" id="${this.id}">add to cart</button>
                    </div>`
        }
    }

    class ProductForCart extends Product {
        render() {
            return `<div class="contCartProducts__contItem">
                        <img src="${this.img}" width="198" height="180" alt="imgProduct"
                            class="contCartProducts__img">
                        <span class="contCartProducts__name">${this.name}</span>
                        <span class="contCartProducts__price">${this.price}</span>
                        <span class="contCartProducts__quantity">12</span>
                        <div class="contCartProducts__buttons">
                            <button class="contCartProducts__add">&#9650</button>
                            <button class="contCartProducts__del">&#9660</button>
                        </div>
                   </div>`
        }
    }

    class ContProduct {
        constructor(className) {
            this.className = className;
            this.arrElems = [];
        }

        fetchProduct(url, callback) {
            var xhr = null
            let arr = []
            let context = this
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest()
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject('Microsoft.XMLHTTP')
            }
            xhr.open('GET', url, true)
            xhr.send()
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    let objProduct = JSON.parse(xhr.responseText)
                    objProduct.forEach(el => {
                        arr.push(el)
                    })
                    callback.call(context, arr)
                }
            }

        }
        render(mas) {
            this.arrElems = mas
            for (let i = 0; i < this.arrElems.length; i++) {
                let product = new Product(
                    this.arrElems[i].name + (i + 1),
                    this.arrElems[i].price,
                    this.arrElems[i].brand,
                    this.arrElems[i].country,
                    this.arrElems[i].ship,
                    this.arrElems[i].img,
                    this.arrElems[i].id)
                d.querySelector(this.className).innerHTML += product.render()
            }
        }
    }

    function test(arr) {
        return arr
    }

    class Cart extends ContProduct {
        constructor(className) {
            super(className)
            this.catalogData = [1, 5, 9]

        }
        render(mas) {
            this.arrElems = mas
            let arrProducts = []
            for (let i = 0; i < this.arrElems.length; i++) {
                let productt = new ProductForCart(
                    this.arrElems[i].name + (i + 1),
                    this.arrElems[i].price,
                    this.arrElems[i].brand,
                    this.arrElems[i].country,
                    this.arrElems[i].ship,
                    this.arrElems[i].img,
                    this.arrElems[i].id)
                arrProducts += productt.render()

            }
            d.querySelector(this.className).innerHTML = arrProducts
        }
        get() {
            let context = this
            this.catalogData = super.fetchProduct('./../responses/catalogData.json', test.call(context))
            console.log(this.catalogData)
        }
        test(mas) {
            return mas
        }
    }




    let pageShop = new ContProduct('.productsPage')
    pageShop.fetchProduct('./../responses/catalogData.json', pageShop.render)
    let CartShop = new Cart('.contCartProducts__bodyCart')
    CartShop.fetchProduct('./../responses/getBasket.json', CartShop.render)
    CartShop.get()
    // console.log(CartShop.catalogData)
}