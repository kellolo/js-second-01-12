class Burger {
    constructor(marks) {
        this.additives = [];
        this.summ = 0;
        this.calories = 0;
        marks.forEach(element => {
            switch (element.getAttribute('name')) {
                case 'size':
                    this.size = element.getAttribute('data-name');
                    this.summ += +element.getAttribute('data-price');
                    this.calories += +element.getAttribute('data-calories');
                    break;
                case 'filling':
                    this.fill = element.getAttribute('data-name');
                    this.summ += +element.getAttribute('data-price');
                    this.calories += +element.getAttribute('data-calories');
                    break;
                case 'additives':
                    this.additives.push(element.getAttribute('data-name'));
                    this.summ += +element.getAttribute('data-price');
                    this.calories += +element.getAttribute('data-calories');
                    break;
            }
        });
    }

    showMe() {
        let additives = showAllListArray(this.additives);
        alert(`Итак, дорогой друг, сверим заказ? 
Вопрос был риторическим.
Ты заказал: бургер ${this.size} ${this.fill}.
${additives}
А теперь самое главное, цена его всего лишь - ${this.summ}$.
Доверься калориям, ведь их почти нет! Какие-то - ${this.calories} калорий..`);
    }
}

let button = document.querySelector('input[type="submit"]');
button.addEventListener("click", () => {
    let myBurger = new Burger(document.querySelectorAll('input:checked'));
    myBurger.showMe();
}); 

/**
 * Перебирает массив и возвращает строку со всеми добавками
 * @param {array} 
 */
function showAllListArray(array) {
    if (array.length === 0) {
        return 'Без добавок.';
    } else {
        let list = 'Добавки ты выбрал следующие: ';
        for (let i = 0; i < array.length; i++) {
            if (array.length === 1) {
                list = 'В качестве добавки будет использоваться ' + array[i] + '.';
                break;
            } else if (i === array.length-1) {
                list += array[i] + '.';
                break;
            } else {
                list += array[i] + ", ";
                continue;
            }
        }
        return list;
    }
    
}