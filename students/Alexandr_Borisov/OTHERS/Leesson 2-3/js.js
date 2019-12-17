class Hamburger {
	constructor() {
		this.size = document.querySelectorAll(".size input");;
		this.topping = document.querySelectorAll(".topping input");
		this.stuffing = document.querySelectorAll(".stuffing input");
		this.totalPrice = 0;
		this.totalCalories = 0;
		this.init();
	}

	init() {
		this.calculatePrice();
		this.calculateCalories();
	}

	renderPrice() {
		document.querySelector(".price").innerText = `Цена: ${this.totalPrice} руб.`;
	}

	renderCalories() {
		document.querySelector(".calories").innerText = `Калорийность: ${this.totalCalories} Кал.`;
	}

	calculatePrice() {
		this.totalPrice = 0;

		if (this.topping.length != 0) {
			for (let i = 0; i < this.topping.length; i++) {
				if (this.topping[i].checked)
					this.totalPrice += +this.topping[i].dataset.price;
			}
		}
		if (this.stuffing.length != 0) {
			for (let i = 0; i < this.stuffing.length; i++) {
				if (this.stuffing[i].checked)
					this.totalPrice += +this.stuffing[i].dataset.price;
			}
		}
		if (this.size.length != 0) {
			for (let i = 0; i < this.size.length; i++) {
				if (this.size[i].checked)
					this.totalPrice += +this.size[i].dataset.price;
			}
		}
	}

	calculateCalories() {
		this.totalCalories = 0;

		if (this.topping.length != 0) {
			for (let i = 0; i < this.topping.length; i++) {
				if (this.topping[i].checked)
					this.totalCalories += +this.topping[i].dataset.calories;
			}
		}
		if (this.stuffing.length != 0) {
			for (let i = 0; i < this.stuffing.length; i++) {
				if (this.stuffing[i].checked)
					this.totalCalories += +this.stuffing[i].dataset.calories;
			}
		}
		if (this.size.length != 0) {
			for (let i = 0; i < this.size.length; i++) {
				if (this.size[i].checked)
					this.totalCalories += +this.size[i].dataset.calories;
			}
		}
	}
}

let burger = null;
const burgerElement = document.querySelector(".burger")

function сalculation() {
	if (!burger) {
		burger = new Hamburger("big", "cheese");
		burger.renderPrice();
		burger.renderCalories();
	} else {
		burger.init();
		burger.renderPrice();
		burger.renderCalories();
	}
}

burgerElement.addEventListener("click", сalculation);
burgerElement.addEventListener('change', сalculation);