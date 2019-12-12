'use strict';

window.onload = () => {
    document.querySelector('#result-button').addEventListener('click', function() {
        let burger = new Burger('size', 'stuff', 'toping');
        burger.showSun('#price', '#cals')
    })
}

class Burger {
    constructor(size, stuff, toping) {
        this.size = size;
        this.stuff = stuff;
        this.toping = toping;
    }

    showSum(price, cals) {
        document.querySelector(price).innerText = this._calc('price')
        document.querySelector(cals).innerText = this._calc('calories')
    }

    _calc(parameterPropName) {

    }
}

class Parameter {
    constructor (domEl){
        this.name = domEl.value
        this.price  = +domEl.dataset['price']
        this.calories = +domEl.dataset['cals']
    }
}