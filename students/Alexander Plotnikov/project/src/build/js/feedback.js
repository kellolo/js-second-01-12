export default {
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
            flagSend: false,   
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
}