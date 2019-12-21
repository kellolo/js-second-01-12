 function js1() {
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
}