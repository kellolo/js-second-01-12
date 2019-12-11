window.onload = () => {
    document.querySelector('#add-button').addEventListener('click', function () {
        let burger = new Burger('size', 'add', 'spice')
        burger.totalSum('#total-price', '#total-cals')

    })
}
class Burger {
    constructor(size, add, spice) {
        this.size = new Params(this._select(size))
        this.add = new Params(this._select(add))
        this.spice = this._getArray(spice)
    }

    _select(attrName) {
        return document.querySelector(`input[name = "${attrName}"]:checked`)
    }
    _selectAll(attrName) {
        return [...document.querySelectorAll(`input[name = "${attrName}"]:checked`)]
    }

    _getArray(attrName) {
        let arr = []
        this._selectAll(attrName).forEach(item => {
            arr.push(new Params(item))
        })
        return arr
    }
    _calc(propName) {
        let result = this.size[propName] + this.add[propName]
        this.spice.forEach(top => {
            result += top[propName]
        })
        return result
    }

    totalSum(price, cals) {
        document.querySelector(price).innerText = this._calc('price')
        document.querySelector(cals).innerText = this._calc('cals')
    }
}

class Params {
    constructor(elem) {
        this.name = elem.value
        this.price = +elem.dataset['price']
        this.cals = +elem.dataset['cals']
    }

}