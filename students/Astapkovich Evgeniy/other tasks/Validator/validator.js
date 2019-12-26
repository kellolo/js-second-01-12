class Validator {
    constructor (form) {
        this.patterns = {
            name: /^[a-zа-яё-]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/, //+7(000)000-0000
            email: /^[\w._-]+@\w+\.[a-z]{2,4}$/ //mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
        },
        this.errors = {
            name: 'Имя содержит только буквы',
            phone: 'Телефон имеет вид +7(000)000-0000',
            email: 'E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
        },
        this.errorClass = 'error-msg',
        this.form = form,
        this.valid = false,
        this._validateForm ()
    }
    _validateForm () {
        let form = document.getElementById(this.form)
        let errors = [...form.querySelectorAll(`.${this.errorClass}`)]
        for (let err of errors) {
            err.remove ()
        }

        let fFields = [...form.querySelectorAll(`input`)]

        fFields.forEach (field => {this._validateField (field)})

        if (![...form.querySelectorAll(`.invalid`)].length) {
            this.valid = true
        }
    }

    _validateField (f) {
        if (this.patterns [f.name]) {
            if (!this.patterns [f.name].test (f.value)) {
                f.classList.add ('invalid')
                this._addErrMsg (f)
                this._watch (f)
            }
        }
    }

    _addErrMsg (f) {
        let err = `<div class="${this.errorClass}"> ${this.errors [f.name]}</div>`
        f.parentNode.insertAdjacentHTML('beforeend', err)
    }

    _watch (field) {
        field.addEventListener('input', () => {
            let error = field.parentNode.querySelector (`.${this.errorClass}`)
            if (this.patterns [field.name]) { 
                if (this.patterns [field.name].test (field.value)) {
                    field.classList.remove ('invalid')
                    field.classList.add ('valid')
                    if (error) error.remove ()
                } else {
                    field.classList.remove ('valid')
                    field.classList.add ('invalid')
                    if (!error) this._addErrMsg (field)
                }
            }
        })
    }
}