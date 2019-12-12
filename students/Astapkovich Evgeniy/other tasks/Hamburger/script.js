'use strict';

document.querySelector('#result_button').addEventListener('click', function() {
    // console.log(document.querySelector('input[name="size"]:checked'));
    let burger = new Burger('size', 'stuff', 'toping')
    burger.showSum('#price', '#cals')
});
// window.onload = () => {
//     document.querySelector('#result_button').addEventListener('click', function() {
//         // console.log(document.querySelector('input[name="size"]:checked'));
//         let burger = new Burger('size', 'stuff', 'toping')
//         burger.showSum('#price', '#cals')
//     })
// }

class Burger {
    constructor(size, stuff, toping) {
        this.size = new Parameter(this._select(size));
        this.stuff = new Parameter(this._select(stuff));
        this.toping = this._getDomArray(toping);
    }

    _select(attrName) {
        // console.log(document.querySelector(`input[name="${attrName}"]:checked`));
        return document.querySelector(`input[name="${attrName}"]:checked`);
    }

    _getDomArray(attrName) {
        const arr = [];
        this._selectAll(attrName).forEach(item => {
            arr.push(new Parameter(item));
        })
        console.log(arr);
        return arr;
    }

    _selectAll(attrName) {
        return [...document.querySelectorAll(`input[name="${attrName}"]:checked`)]
    }

    _calc(parameterPropName) {
        // return '_calc'
        let result = this.size[parameterPropName] + this.stuff[parameterPropName];
        this.toping.forEach(item => {
            result += item[parameterPropName];
        });
        return result;
    }

    showSum(price, cals) {
        console.log('showsum');
        document.querySelector(price).innerText = this._calc('price')
        document.querySelector(cals).innerText = this._calc('calories')
    }
}

class Parameter {
    constructor (domEl){
        this.name = domEl.value
        this.price  = +domEl.dataset['price']
        this.calories = +domEl.dataset['cals']
    }
}