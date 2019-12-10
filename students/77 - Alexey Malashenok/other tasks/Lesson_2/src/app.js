'use strict';

class Burger {
    //Конструктор получает на вход NodeList выбранных input
    constructor(inputs) {
        this.inputs = inputs;
    }
    /**
     * Метод рассчитывает стоимость и калории выбранного гамбургера
     * возвращает объект со свойствами равными стоимости и суммы калорий
     * @returns {object} 
     **/
    calculate() {
        let totalSum = 0;
        let totalCalories = 0;

        for(let elem of this.inputs) {
            totalSum += +elem.dataset.price;
            totalCalories += +elem.dataset.calories;
        }
        return { totalSum, totalCalories};
    }
}

let calcBtn = document.querySelector ('#calculate');

//Элемент для вывода суммы и калорий
let message = document.querySelector('#message');

calcBtn.addEventListener ('click', () => {
    //Создаем экземпляр класса 
    let burger = new Burger( document.querySelectorAll('input:checked') );
    
    let sum = burger.calculate().totalSum;
    let calories = burger.calculate().totalCalories;

    message.textContent = `Total sum = $${sum} calories = ${calories}`;
    
});
