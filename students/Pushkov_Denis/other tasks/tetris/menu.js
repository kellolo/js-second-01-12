class Menu {
    constructor() {
        this.startButton = document.querySelector('.start');
        this.pauseButton = document.querySelector('.pause');
    }

    addButtonListeners (startButtonHandler, pauseButtonHandler) {
        this.startButton.addEventListener('click', startButtonHandler);
        this.pauseButton.addEventListener('click', pauseButtonHandler);
    }
}