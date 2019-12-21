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

        price = document.querySelector(`input[name="${el}"]:checked`).dataset.price;

        return price;
    }

    _getAddonPrice(el) {
        let price = null;

        let arr = [...document.querySelectorAll(`input[name='${el}']:checked`)];
        arr.forEach((item) => {
            price += +item.dataset.price;
        })

        return price;
    }

    _getSizeCalories(el) {
        let calories = null;

        calories = document.querySelector(`input[name="${el}"]:checked`).dataset.calories;

        return calories;
    }

    _getFillingCalories(el) {
        let calories = null;

        calories = document.querySelector(`input[name="${el}"]:checked`).dataset.calories;

        return calories;
    }

    _getAddonCalories(el) {
        let calories = null;

        let arr = [...document.querySelectorAll(`input[name='${el}']:checked`)];
        arr.forEach((item) => {
            calories += +item.dataset.calories;
        })

        return calories;
    }

    setPrice() {
        return document.querySelector('.price').innerText = this.price;
    }

    setCalories() {
        return document.querySelector('.calories').innerText = this.calories;
    }
}

window.addEventListener('load', () => newBurger());

let btn = document.getElementById('btn-add');
btn.addEventListener('click', newBurger);

function newBurger() {
    let burger = new Burger('size', 'filling', 'addon');
    burger.setPrice();
    burger.setCalories();
}
