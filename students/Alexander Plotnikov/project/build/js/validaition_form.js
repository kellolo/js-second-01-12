function valForm() {
    let d = document
    let rName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u // Имя содержит только буквы.
    let rPhone = /^\+7\(\d{3}\)\d{3}\-\d{4}$/ //+7(000)000-0000
    let rMail = /([A-Za-z]{2}[(\.)|(\-)])*[A-Za-z]+@mail.ru$/ // E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.


    class Form {
        constructor(classNameForm) {
            this.classNameForm = classNameForm,
                this.name = null,
                this.phone = null,
                this.mail = null,
                this.button = null,
                this.regExpName = rName,
                this.regExpPhone = rPhone,
                this.regExpMail = rMail
        }
        init() {
            this._addHendlerValid()
        }
        _valid(targ) {

            val('Name', this.regExpName)
            val('Phone', this.regExpPhone)
            val('Mail', this.regExpMail)

            function val(name, regExp) {

                if (targ.dataset['id'] === `${name}`) { // Если в элементе массива имя                 
                    if (!regExp.test(targ.value)) {
                        d.querySelector(`input[data-id='${name}']`).classList.add('feedBack__Input-active')
                        d.querySelector(`span[data-id='${name}']`).classList.add('feedBack__hint-active')
                    } else {
                        d.querySelector(`input[data-id='${name}']`).classList.remove('feedBack__Input-active')
                        d.querySelector(`span[data-id='${name}']`).classList.remove('feedBack__hint-active')
                    }
                }
            }

        }
        _createArrElem(cont) {
            let arr = []
            let colection = [...d.querySelectorAll('.feedBack__Input')]
            colection.forEach(e => {
                if (e.dataset['id']) {
                    let obj = {}
                    obj.data_id = e.dataset['id']
                    obj.value = e.value
                    e.value = ''
                    arr.push(obj)
                }
            })
            return arr
        }
        _addHendlerValid() {
            d.querySelector('.feedBack__button').addEventListener('click', () => this._createArrElem(this))
            d.querySelector(this.classNameForm).addEventListener('focusout', (evt) => this._valid(evt.target))
            d.querySelector(this.classNameForm).addEventListener('input', (evt) => this._valid(evt.target))
        }
    }


    let Forma = new Form('.feedBack__form')
    Forma.init()
    // console.log(Forma.arrFields)





















}