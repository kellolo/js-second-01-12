class Burger {
    constructor(size, filling, addon) {
        this.price = +this._getSizePrice(size) + +this._getFillingPrice(filling) + +this._getAddonPrice(addon),
        this.calories = +this._getSizeCalories(size) + +this._getFillingCalories(filling) + +this._getAddonCalories(addon)
    }

    _getSizePrice(el) {
        let price = null;

        price = document.querySelector(`input[name="${el}"]:checked`).dataset.price;

        return price;
    }

    _getFillingPrice(el) {
        let price = null;

        //TODO проверка на checked

        return price;
    }

    _getAddonPrice(el) {
        let price = null;

        //TODO проверка на checked

        return price;
    }

    _getSizeCalories(el) {
        return document.querySelector(`input[name="${el}"]:checked`).dataset.calories;
    }

    _getFillingCalories(el) {
        let price = null;

        //TODO проверка на checked

        return price;
    }

    _getAddonCalories(el) {
        let price = null;

        //TODO проверка на checked

        return price;
    }

    setPrice() {
        return document.querySelector('.price').innerText = this.price;
    }

    setCalories() {
        return document.querySelector('.calories').innerText = this.calories;
    }
}

let btn = document.getElementById('btn-ok');
btn.addEventListener('click', newBurger);

function newBurger() {
    let burger = new Burger('size', 'filling');
    burger.setPrice();
    burger.setCalories();
    console.log(burger);
}
console.log(document.querySelector('.calories'));

//TODO автоматический расчет при переключении опций