window.onload = function () {
    js1()
    let d = document
    let cart = new Vue({
        el: '#mainCart',
        data: {
            API: 'https://raw.githubusercontent.com/lotostoi/js-second-01-12/lesson3_is_ready/students/Alexander%20Plotnikov/project/responses/',
            CartURL: 'getBasket.json',
            AddToCartURL: 'addToBasket.json',
            DeleteFromCartURL: 'deleteFromBasket.json',
            dataItems: [],
            classActive: false,
            classActiveMenu: false
        },
        methods: {
            getData(url) {
                return fetch(url)
                    .then(data => data.json())
            },
            openCloseCart() {
                this.classActive = !this.classActive
                this.classActiveMenu = false

            },
            openMenu() {
                this.classActiveMenu = !this.classActiveMenu
                this.classActive = false
            },
            addToCart(evt) {
                this.getData(`${this.API}${this.AddToCartURL}`)
                    .then(data => {
                        if (data.result == 1) {
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
                            let el = this.dataItems.find(item => item.id === obj.id)
                            if (el) {
                                el.quantity++
                            } else {
                                this.dataItems.push(obj)
                            }
                        }
                    })
            },
            addItemInCart(evt) {
                let par = evt.target.parentNode
                let id = par.parentNode.dataset['id']
                let chengeItem = this.dataItems.find(item => item.id === id)
                let chengeItemIndex = this.dataItems.findIndex(item => item.id === id)
                if (chengeItem) {
                    if (evt.target.className === 'contCartProducts__add') {
                        this.getData(`${this.API}${this.AddToCartURL}`)
                            .then(data => {
                                if (data.result == 1) {
                                    chengeItem.quantity++
                                }
                            })
                    }
                    if (evt.target.className === 'contCartProducts__del') {
                        this.getData(`${this.API}${this.DeleteFromCartURL}`)
                            .then(data => {
                                if (data.result == 1) {
                                    chengeItem.quantity--
                                    if (chengeItem.quantity === 0) {
                                        this.dataItems.splice(chengeItemIndex, 1)
                                    }
                                }
                            })
                    }
                }
            },
            delAllCart() {
                this.getData(`${this.API}${this.DeleteFromCartURL}`)
                    .then(data => {
                        if (data.result == 1) {
                            this.dataItems = []
                            this.classActive = !this.classActive
                        }
                    })
            }
        },
        computed: {
            Sum: function () {
                let summ = null
                this.dataItems.forEach(e => {
                    summ += +e.price * e.quantity
                })

                return summ
            },
            Quantity: function () {
                let quat = null
                this.dataItems.forEach(e => {
                    quat += +e.quantity
                })
                if (this.dataItems.length === 0) {
                    quat = 0
                }
                return quat
            }
        },
        mounted() {
            this.getData(`${this.API}${this.CartURL}`)
                .then(data => {
                    this.dataItems = data.contents
                })
        }
    })

    let bodyShop = new Vue({
        el: '#bodyShop',
        data: {
            API: 'https://raw.githubusercontent.com/lotostoi/js-second-01-12/lesson3_is_ready/students/Alexander%20Plotnikov/project/responses/',
            CatURL: 'catalogData.json',
            dataItems: [],
            cart: cart
        },
        methods: {
            getData(url) {
                return fetch(url)
                    .then(data => data.json())
            },
            handler(evt) {
                this.cart.addToCart(evt)
            }
        },
        mounted() {
            this.getData(`${this.API}${this.CatURL}`)
                .then(data => {
                    this.dataItems = data
                })
        }
    })

    let validForm = new Vue({
        el: '#validForm',
        data: {
            arrRegExp: {
                name: /^[a-zа-яё ']+$/i,
                phone: /^\+7\(\d{3}\)\d{3}\-\d{4}$/,
                mail: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
            },
            fields: {
                name: '',
                phone: '',
                mail: '',
                text: ''
            },
            flag: {
                name: true,
                phone: true,
                mail: true
            },
            fl: false,
            flagSend: false
        },
        methods: {
            printArr() {
                let arr = {}
                for (const key in this.arrRegExp) {
                    if (this.arrRegExp.hasOwnProperty(key)) {
                        const element = this.arrRegExp[key]
                        arr[key] = element.test(this.fields[key])
                    }
                }
                this.flag = arr
                let result = true
                for (const key in this.flag) {
                    if (this.flag[key] === false) {
                      
                        result = false
                    }
                }
                if (!result) {
                    this.fl = true
                } else {
                    this.fl = false
                    for (let k in this.fields) {
                        this.fields[k] = ''
                    }
                        // отправляем файл на сервер
                        
                        //*********************** */
                        this.flagSend = true
                }
            },
            realTimeValid() {
                if (this.fl) { this.fl = true }
                else { this.fl = false }
                if (this.fl === true) {
                    let arr = {}
                    if (!this.resultValid) {
                        for (const key in this.arrRegExp) {
                            if (this.arrRegExp.hasOwnProperty(key)) {
                                const element = this.arrRegExp[key]
                                arr[key] = element.test(this.fields[key])
                            }
                        }
                        this.flag = arr
                    }
                }
            },
            closeSend() {
                this.flagSend = false
            }
        }
    })
}

