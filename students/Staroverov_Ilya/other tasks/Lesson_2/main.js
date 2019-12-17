let calcBtn = document.querySelector('#calc');
let total = document.querySelector('#total');

class Burger {
    constructor(inputs) {
        this.inputs = inputs;
    }
    calculate() {
        let totalSum = 0;
        let totalCalories = 0;

        for (let elem of this.inputs) {
            totalSum += +elem.dataset.price;
            totalCalories += +elem.dataset.calories;
        }

        return { totalSum, totalCalories };
    }
}

calcBtn.addEventListener('click', () => {
    let burger = new Burger(document.querySelectorAll('input:checked'));
    let sum = burger.calculate().totalSum;
    let calories = burger.calculate().totalCalories;
    total.textContent = `Total sum = $${sum}, calories = ${calories}`;
});
