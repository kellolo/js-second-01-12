class Burger {
    constructor(size, stuffing, spice) {
        this.sizePrice = +this._inputRadioPrice (size)
        this.stuffingPrice = +this._inputRadioPrice (stuffing)
        this.spicePrice = +this._inputCheckPrice (spice)

        this.sizeCal = +this._inputCalories(size)
        this.stuffingCal = +this._inputCalories(stuffing)
        this.spiceCal = +this._inputCalories(spice)

        this.price = this.sizePrice + this.stuffingPrice + this.spicePrice
        this.calories = this.sizeCal + this.stuffingCal + this.spiceCal
 
    }

    _inputRadioPrice (domElementName) {
        return document.querySelector (`input[name="${domElementName}"]:checked`).dataset.price
    }

    _inputCalories (domElementName) {
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
        return document.querySelector('.price').innerText = +this.price;
    }

    setCalories() {
        return document.querySelector('.calories').innerText = +this.calories;
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

