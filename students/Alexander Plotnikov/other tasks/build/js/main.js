window.onload = function () {

    let d = document

    d.querySelector('.contener').addEventListener('click', clickHendler)

    function clickHendler(evt) {
        if (evt.target.className === 'Burg__button') {
            let par = evt.target.parentNode.childNodes
            console.log(par)
            let name = par[1].innerHTML
            let index = par[5].value
            let filling = d.querySelector(`.${par[5].className} > option[value=${index}]`).innerHTML
            let seasoning = ''
            if (par[7].childNodes[1].checked) {
                seasoning = 'с приправой'
            } else {
                seasoning = 'без приправы'
            }
            let mayon = ''
            if (par[9].childNodes[1].checked) {
                mayon = 'с майонезом'
            } else {
                mayon = 'без майонеза'
            }
            let ord = new Order(name, filling, seasoning, mayon)
            d.querySelector('.contOders').innerHTML += ord.render()
        }
        if (evt.target.className === 'button') {
            d.querySelector('.contOders').innerHTML = `
                                                     <div class="contOders__title">
                                                                <p> Название</p>
                                                                <p> Начинка</p>
                                                                <p> Приправа </p>
                                                                <p> Майонез</p>
                                                                <p> Цена</p>
                                                                <p> Каллорийность</p>
                                                        </div>`
        }
    }


    class Order {
        constructor(name, filling, seasoning, mayon) {
            this.name = name,
                this.filling = filling,
                this.seasoning = seasoning,
                this.mayonnaise = mayon,
                this.price = this._calcPrice(),
                this.calorie = this._calcCalorie()
        }
        render() {
            return ` <div class="contOders__oder" data-id="1">
                            <p> ${this.name} </p>
                            <p> ${this.filling}</p>
                            <p> ${this.seasoning} </p>
                            <p> ${this.mayonnaise} </p>
                            <p> ${this.price} руб</p>
                            <p> ${this.calorie} каллорий</p>
                     </div> `
        }
        _calcPrice() {
            let price1 = 0
            let price2 = 0
            let price3 = 0
            let price4 = 0
            let price5 = 0
            this.name === 'Big Burger' ? price1 = 100 : price1 = 50
            if (this.filling === 'С сыром') {
                price2 = 10
            } else if ((this.filling === 'С салатом')) {
                price2 = 20
            } else {
                price2 = 15
            }
            this.mayonnaise === 'с майонезом' ? price3 = 20 : price3 = 0
            this.seasoning === 'с приправой' ? price3 = 15 : price3 = 0
            return price1 + price2 + price3 + price4 + price5
        }
        _calcCalorie() {
            let cal1 = 0
            let cal2 = 0
            let cal3 = 0
            let cal4 = 0
            let cal5 = 0
            this.name === 'Big Burger' ? cal1 = 40 : cal1 = 20
            if (this.filling === 'С сыром') {
                cal2 = 20
            } else if ((this.filling === 'С салатом')) {
                cal2 = 5
            } else {
                cal2 = 10
            }
            this.mayonnaise === 'с майонезом' ? cal3 = 5 : cal3 = 0
            return cal1 + cal2 + cal3 + cal4 + cal5
        }
    }


}