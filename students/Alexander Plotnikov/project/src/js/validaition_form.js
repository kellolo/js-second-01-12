function valForm() {
    let d = document

    class Form {
        constructor(classNameForm) {
            this.classNameForm = classNameForm,
                this.name = null,
                this.phone = null,
                this.mail = null,
                this.button = null,
                this.regExpName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u
        }
        init() {
            this._addHendlerValid()
        }
        _createArrElem(cont) {
            let arr = []
            let colection = [...d.querySelectorAll('.feedBack__Input')]
            colection.forEach(e => {
                if (e.dataset['id']) {
                    let obj = {}
                    obj.data_id = e.dataset['id']
                    if (e.dataset['id'] === 'Name') {
                        if (!cont.regExpName.test(e.value)) {
                            d.querySelector("[data-id='Name']").classList.add('feedBack__Input-activ')  
                            d.querySelector("[data-id='Name']").placeholder = 'Имя введено не верно'
                        }
                        else {
                            d.querySelector("[data-id='Name']").classList.remove('feedBack__Input-activ') 
                            d.querySelector("[data-id='Name']").placeholder = 'Имя'

                        }
                    }
                    obj.value = e.value
                    e.value = ''
                    arr.push(obj)
                }
            })
            console.log(arr)
            return arr
        }
        _addHendlerValid() {
            let cont = this
            d.querySelector('.feedBack__button').addEventListener('click', () => cont._createArrElem(cont))
        }
    }


    let Forma = new Form('.feedBack__form')
    Forma.init()
    // console.log(Forma.arrFields)





















}