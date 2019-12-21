function valForm() {
    let d = document
    let regExpName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u // Имя содержит только буквы.
    let regExpPhone = /^\+7\(\d{3}\)\d{3}\-\d{4}$/ //+7(000)000-0000
    let regExpMail = /^((([A-Za-z]{2,3}((\.)|(\-)))|й*)[A-Za-z])+@mail.ru$/ // E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.

    class Form {
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

    let Forma = new Form('.feedBack__form', regExpName, regExpPhone, regExpMail)






















}