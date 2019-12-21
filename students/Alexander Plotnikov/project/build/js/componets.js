Vue.component('product', {
    props: ['item'],
    template: ` 
    <div class="contItem">
            <img v-bind:src="item.img" width="198" height="180" alt="imgProduct" class="contItem__img">
            <span class="contItem__name">{{ item.name }}</span>
            <span class="contItem__price">$ {{ item.price }}</span>
            <button class="contItem__button" v-on:click="addToCart"
                v-bind:data-id="item.id">
                add to cart</button>
    </div>
    `,
    methods: {
        addToCart() {
            let find = this.$root.cartItems.find(el => el.id == this.item.id)
            if (find) {
                find.quantity++
            } else {
                this.item.quantity = '1'
                this.$root.cartItems.push(Object.assign({}, this.item))
            }
        }
    }
})



Vue.component('cart', {
    props: ['catalog', 'sum', 'quantity', 'openmenu'],
    template: `   
     <div class="menuTop__contCart">
        <div v-on:click="openCart = !openCart; openmenu = false" class="menuTop__CartSvg"
            :class="{'menuTop__CartSvg-active':openCart}">
            <svg width="19" height="17">
                <path
                    d="M18.000,4.052 L17.000,7.040 C16.630,7.878 16.105,9.032 15.000,9.032 L5.360,9.032 L5.478,10.028 L18.000,10.028 L17.000,12.019 L4.352,12.019 L3.709,12.095 L2.522,2.061 L1.000,2.061 C0.448,2.061 -0.000,1.615 -0.000,1.066 C-0.000,0.515 0.352,0.008 0.905,0.008 L4.291,-0.006 L4.545,2.145 C4.670,2.096 4.812,2.061 5.000,2.061 L17.000,2.061 C18.105,2.061 18.000,2.953 18.000,4.052 ZM6.000,13.015 C7.105,13.015 8.000,13.906 8.000,15.007 C8.000,16.107 7.105,16.998 6.000,16.998 C4.895,16.998 4.000,16.107 4.000,15.007 C4.000,13.906 4.895,13.015 6.000,13.015 ZM14.000,13.015 C15.105,13.015 16.000,13.906 16.000,15.007 C16.000,16.107 15.105,16.998 14.000,16.998 C12.896,16.998 12.000,16.107 12.000,15.007 C12.000,13.906 12.896,13.015 14.000,13.015 Z" />
            </svg>
        </div>
        <span class="menuTop__spanCart">Cart</span>
        <span class="menuTop__countCart">{{ quantity }}</span>
        <div class="contCartProducts" :class="{'contCartProducts-active':openCart}" id="contCartProducts">
            <div class="contCartProducts__bodyCart">
                <div v-for="product in catalog"  :prod="product"   :key="product.id" :data-id="product.id" class="contCartProducts__contItem">
                    <img v-bind:src="product.img" width="198" height="180" alt="imgProduct"
                        class="contCartProducts__img">
                    <span class="contCartProducts__name">{{product.name}}</span>
                    <span class="contCartProducts__price">$ {{product.price * product.quantity}}</span>
                    <span class="contCartProducts__quantity">{{product.quantity}}</span>
                    <div class="contCartProducts__buttons" :data-id="product.id">
                        <button @click="addItemInCart($event)"
                            class="contCartProducts__add">&#9650</button>
                        <button @click="addItemInCart($event)"
                            class="contCartProducts__del">&#9660</button>
                    </div>        
                </div>
                <div class="contCartProducts__rethult">
                    <span class="contCartProducts__span">Итого:</span>
                    <span class="contCartProducts__allSumm">$ {{sum}}</span>
                    <span class="contCartProducts__allQuantity">{{quantity}}</span>
                    <button @click=" cleanCart" class="contCartProducts__allClean">X</button>
                </div>
             </div>
         </div>
     </div>    
        `,

    data() {
        return {
            openCart: false
        }
    },
    methods: {
        cleanCart() {
            this.$root.cartItems = []
            this.openCart = false
        },
        addItemInCart(evt) {
            let par = evt.target.parentNode
            let find = this.$root.cartItems.find(item => item.id == par.dataset['id'])
            if (evt.target.className === 'contCartProducts__add') {
                this.$root.getData(`${this.$root.API}${this.$root.AddToCartURL}`)
                    .then(data => {
                        if (data.result == 1) {
                            find.quantity++
                        }
                    })
            }
            if (evt.target.className === 'contCartProducts__del') {
                this.$root.getData(`${this.$root.API}${this.$root.DeleteFromCartURL}`)
                    .then(data => {
                        if (data.result == 1) {
                            find.quantity--
                            if (find.quantity === 0) {

                                this.$root.cartItems.splice(this.$root.cartItems.findIndex(index => index.id == find.id), 1)
                            }
                        }
                    })
            }
        }
    }
})

Vue.component('search', {
    template: `
                 <div class="menuBottom__search">
                    <a href="#" class="menuBottom__suppots">Support</a>
                    <form action="#" class="menuBottom__form">
                        <button type="button" @click="findWord" class="menuBottom__button">
                            <svg width="13" height="13" class="menuBottom__searchSvg">
                                <path
                                    d="M12.614,12.611 C12.113,13.110 11.302,13.110 10.801,12.611 L8.158,9.967 C6.087,11.222 3.360,10.971 1.571,9.182 C-0.531,7.079 -0.531,3.670 1.571,1.568 C3.674,-0.536 7.083,-0.536 9.185,1.568 C10.974,3.357 11.225,6.084 9.971,8.154 L12.614,10.799 C13.115,11.297 13.115,12.109 12.614,12.611 ZM7.735,3.018 C6.433,1.716 4.323,1.716 3.022,3.018 C1.720,4.319 1.720,6.430 3.022,7.731 C4.323,9.034 6.433,9.034 7.735,7.731 C9.037,6.430 9.037,4.319 7.735,3.018 Z" />
                            </svg>
                        </button>
                        <input  v-model="searchWord" class="menuBottom__input" type="search" name="search" id="search"
                            placeholder="Input product's name ..."> 
                    </form>
                </div>
           `,
    data() {
        return {
            searchWord: '',
            API: 'https://raw.githubusercontent.com/lotostoi/js-second-01-12/lesson3_is_ready/students/Alexander%20Plotnikov/project/responses/',
            CatURL: 'catalogData.json',
            catalog: []
        }
    },
    methods: {
        getData(url) {
            return fetch(url)
                .then(data => data.json())
        },
        findWord() {
            let regExp = new RegExp(`${this.searchWord}`, 'i')
            let arrObj = this.catalog
            let arr = []
            for (const key in arrObj) {
                if (arrObj.hasOwnProperty(key)) {
                    const el = arrObj[key]

                    let flag = false
                    for (const key in el) {
                        if (el.hasOwnProperty(key)) {
                            const props = el[key]
                            if (regExp.test(props)) {
                                flag = true
                            }
                        }
                    }
                    if (flag) {
                        arr.push(el)
                        flag = false
                    }
                }
            }
            if (arr.length > 0) {
                this.$root.dataItems = arr
            }
        }
    },
    mounted() {
        this.getData(`${this.API}${this.CatURL}`)
            .then(data => {
                this.catalog = data
            })
    }
})

Vue.component('feed-back-form', {
    template: `
        <section class="feedBack" id="validForm">
            <h2 class="feedBack__h2">Форма обратной связи</h2>
            <form class="feedBack__form">
                <div class="feedBack__contForParams">
                    <label for="userName" class="feedBack__lName">Ваше Имя:</label>
                    <span v-show="!flag.name" class="feedBack__hint">Имя содержит
                        только буквы</span>
                    <input @input='realTimeValid()' v-model="fields.name" type="text"
                        :class="{'feedBack__Input':true,'feedBack__Input-active': !flag.name }" placeholder="Имя">
                </div>
                <div class="feedBack__contForParams">
                    <label for="userPhone" class="feedBack__lName">Телефон:</label>
                    <span v-show="!flag.phone" class="feedBack__hint">+7(000)000-0000</span>
                    <input @input='realTimeValid()' v-model="fields.phone" type="text"
                        :class="{'feedBack__Input':true,'feedBack__Input-active': !flag.phone }"
                        placeholder="Телефон">
                </div>
                <div class="feedBack__contForParams">
                    <label for="userMail" class="feedBack__lName">E-mail:</label>
                    <span v-show="!flag.mail" class="feedBack__hint">mymail@mail.ru,
                        или my.mail@mail.ru, или
                        my-mail@mail.ru.
                    </span>
                    <input @input='realTimeValid()' v-model="fields.mail" type="text"
                        :class="{'feedBack__Input':true,'feedBack__Input-active': !flag.mail }" placeholder="Email">
                </div>
                <div class="feedBack__contForParams">
                    <label for="userText" class="feedBack__lName">Сообщение:</label>
                    <textarea v-model="fields.text" id="userText" data-id="Text" class="feedBack__Input"
                        placeholder="Сообщение"></textarea>
                </div>
                <button @click="printArr()" type="button" class="feedBack__button-active" id="formBut">Send</button>
                <div class="feedBack__darck" id="off"></div>
            </form>
            <div v-show="flagSend" class="feedBack__modelWind">
                <p>Ваше сообщение отправлено!</p>
                <p>Мы свяжемся с вами в ближашее время!</p>
                <span @click="closeSend()" id="cloesModelWind">&#10008;</span>
            </div>
        </section>         
    `,
    data() {
        return {
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
        }
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
            if (this.fl) {
                this.fl = true
            } else {
                this.fl = false
            }
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