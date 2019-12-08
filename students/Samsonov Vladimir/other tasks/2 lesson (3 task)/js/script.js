class Burger {
    constructor(size, stuffing, spice) {
        this.size = this._inputRadio (size);
        this.stuffing = this._inputRadio (stuffing);
        this.spice = this._inputCheck (spice);
 
    }

    _inputRadio (domElementName) {
        return document.querySelector (`input[name="${domElementName}"]:checked`).value
    }

    _inputCheck (domElementName) {
        let spice = []
        let arr = [...document.querySelectorAll (`input[name="${domElementName}"]:checked`)]
        arr.forEach (el => {
            spice.push (el.value)
        })
        return spice
    }

}
let burgers = [];

let okBtn = document.querySelector('#ok-btn')
okBtn.addEventListener('click', cookBurger);

function cookBurger() {
    let burger = new Burger('size', 'stuffing', 'spice');
    burgers.push (burger)
    console.log(burger);

}

