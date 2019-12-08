class Burger {
    constructor(size, stuffing, spice) {
        this.sizePrice = +this._inputRadioPrice (size)
        this.stuffingPrice = +this._inputRadioPrice (stuffing)
        this.spicePrice = +this._inputCheckPrice (spice)

        this.sizeCal = +this._inputRadioCalories(size)
        this.stuffingCal = +this._inputRadioCalories(stuffing)
        this.spiceCal = +this._inputCheckCal(spice)
    }

    _inputRadioPrice (domElementName) {
        return document.querySelector (`input[name="${domElementName}"]:checked`).dataset.price
    }

    _inputRadioCalories (domElementName) {
        return document.querySelector (`input[name="${domElementName}"]:checked`).dataset.calories
    }


    _inputCheckPrice (domElementName) {
        let spice = []
        let arr = [...document.querySelectorAll (`input[name="${domElementName}"]:checked`)]
        arr.forEach (el => {
            spice.push (el.dataset.price)
        })
        return spice
    }

    _inputCheckCal (domElementName) {
        let spice = []
        let arr = [...document.querySelectorAll (`input[name="${domElementName}"]:checked`)]
        arr.forEach (el => {
            spice.push (el.dataset.calories)
        })
        return spice
    }

    setPrice() {
        return document.querySelector('.price').innerText = this.sizePrice + this.stuffingPrice + this.spicePrice;
    }

    setCalories() {
        return document.querySelector('.calories').innerText = this.calories = this.sizeCal + this.stuffingCal + this.spiceCal;
    }
}

let burgers = [];

let okBtn = document.querySelector('#ok-btn')
okBtn.addEventListener('click', cookBurger);

function cookBurger() {
    let burger = new Burger('size', 'stuffing', 'spice');
    burger.setPrice();
    burger.setCalories();
    console.log(burgers);
    console.log(burger.setPrice());

}

