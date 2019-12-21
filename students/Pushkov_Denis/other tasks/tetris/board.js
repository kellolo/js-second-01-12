"use strict";
class Board {
    constructor() {
        this.gameBoard = document.querySelector('.game-board');
        this.nextFigure = document.querySelector('.next-figure');
    }

    init(settings) {
        this.settings = settings;
    }

    // отрисовка поля игры и маленького окошечка, в котором показана следующая фигура
    // тут в принципе ничего интересного. Каждой клетке присваивается уникальный id с ее координатами
    drawBoard() {
        this.gameBoard.innerHTML = '';
        let boardHTML = '';
        for (let y = 1; y <= this.settings.boardHeight; y++) {
            boardHTML += `<tr class="board-y">`;
            for (let x = 1; x <= this.settings.boardWidth; x++) {
                boardHTML += `<td class="board-x" id="${x}${y}"></td>`;
            }
            boardHTML += `</tr>`;
        }
        this.gameBoard.insertAdjacentHTML("afterbegin", boardHTML);

        this.nextFigure.innerHTML = '';
        let nextFigureHTML = '';

        for (let y = 1; y <= 4; y++) {
            nextFigureHTML += `<tr class="board-y nf">`;
            for (let x = 1; x <= 3; x++) {
                nextFigureHTML += `<td class="board-x nf" id="nf${x}${y}"></td>`;
            }
            nextFigureHTML += `</tr>`;
        }
        this.nextFigure.insertAdjacentHTML("afterbegin", nextFigureHTML);

    }

    // метод возвращает клетку по указанным координатам
    // я не стал тут делать условие и добавлять еще параметр где искать клетку, в игровом поле или в поле новой фигуры
    // и просто сделал для новой фигуры отдельный метод
    getCell(x, y) {
        let coordinates = String(x) + String(y);
        // Почему не работает следующий вариант
        // return this.gameBoard.getElementById(coordinates);
        // пишет что getElementById is not a function
        return document.getElementById(coordinates);
    }

    getCellNF(x, y) {
        let coordinates = 'nf' + String(x) + String(y);
        return document.getElementById(coordinates);
    }

    // отрисовка фигур. объект фигуры содержит массив из двух фигур, та что чейчас в игре и следующей
    // в каждой фигуре есть массив ее текущих координат, просто проходим по всем клеткам и добавляем
    // в поле в этих местах необходимые классы.
    // с удалением и того проще, просто отсеиваем все ячейки поля которые имееют клас фигуры и обнуляем классы.
    drawFigure(figure) {
        if (!this.gameBoard.innerHTML) {
            throw new Error('game-board is not exist')
        }
        figure.figureList[0].cells.forEach((element) => {
            this.getCell(element.x, element.y).classList.add(element.color, figure.figureList[0].type);
        })
    }

    clearFigure() {
        this.gameBoard.querySelectorAll('.figure').forEach((element) => {
            element.className = 'board-x';
        })
    }

    drawNextFigure(figure){
        if (!this.nextFigure.innerHTML) {
            throw new Error('game-board is not exist')
        }
        figure.figureList[1].cells.forEach((element) => {
            this.getCellNF(element.x, element.y).classList.add(element.color, figure.figureList[1].type);
        })
    }

    clearNextFigure(){
        this.nextFigure.querySelectorAll('.figure').forEach((element) => {
            element.className = 'board-x nf';
        })
    }

    // аналогично с уже упавшими фигурами, они все собираются в одну кучу, как одна большая фигура.
    clearFigureStack(){
        this.gameBoard.querySelectorAll('.figureStack').forEach((element) => {
            element.className = 'board-x';
        })
    }

    drawFigureStack(figureStack) {
        if (!this.gameBoard.innerHTML) {
            throw new Error('game-board is not exist')
        }
        figureStack.stack.forEach((element) => {
            this.getCell(element.x, element.y).classList.add(element.color, element.type);
        })
    }

}