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

    class product {
        constructor(title, price, brand, country, ship, img) {
            this.name = title;
            this.price = price;
            this.brand = brand;
            this.country = country;
            this.ship = ship;
            this.img = img
        }
        render() {
            return `<div class="contItem">
                        <img src="${this.img}" width="198" height="180" alt="imgProduct" class="contItem__img">
                        <span class="contItem__name">${this.name}</span>
                        <span class="contItem__price">${this.price}</span>
                        <button class="contItem__button">add to cart</button>
                    </div>`
        }
    }

    class contProduct {
        constructor(className) {
            this.className = className;
            this.arrElems = [];
        }

        fetchProduct(url,callback) {
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
                    callback.call(context,arr)
                }
            }

        }
        render(mas) {
            this.arrElems = mas
            for (let i = 0; i < this.arrElems.length; i++) {
                let Product = new product(
                    this.arrElems[i].name + (i + 1),
                    this.arrElems[i].price,
                    this.arrElems[i].brand,
                    this.arrElems[i].country,
                    this.arrElems[i].ship,
                    this.arrElems[i].img)
                d.querySelector(this.className).innerHTML += Product.render()
            }
        }
    }

    let pageShop = new contProduct('.productsPage')
  // pageShop.fetchProduct('http://localhost/jsonFiles/responses/catalogData.json', pageShop.render)
}