"use strict";

class Game {
    constructor() {
        this.newFigure = true;
        this.clockGenerator = null;
        this.score = 0;
        this.trt = 0;
        this.efficiency = 0;
        this.linesCounter = 0;
        this.deleteCounter = 0;
        this.speed = 100;
    }

    init(settings, board, figureStack, status, menu) {
        this.settings = settings;
        this.board = board;
        this.stack = figureStack;
        this.status = status;
        this.menu = menu;
        this.figure = new Figure();
        this.stopGame = false;
        this.scoreField = document.querySelector('.score');
        this.efficiencyField = document.querySelector('.efficiency');
    }

    run() {
        // события для кнопок и клавиатуры
        this.menu.addButtonListeners(this.start.bind(this), this.pause.bind(this));
        document.addEventListener('keydown', this.pressKeyHandler.bind(this))

    }

    start() {
        // проверка на то что игра была закончена, а не просто на паузе
        if (this.stopGame) {
            this.clearGame();
            this.stopGame = false;
        }

        if (this.status.isPaused()) {
            this.status.setPlaying();
            // во время паузы фигура и стек скрываются, что бы пользователь не жульничал и не увеличивал себе время на
            // поиск места куда пристроить фигурку. Возвращаем стек назад. Фигура автоматически отрисуется на следующем
            // ходу
            if(this.figure && this.stack) {
                this.board.drawFigureStack(this.stack);
            }

            this.clockGenerator = setInterval(this.doTick.bind(this), this.speed);
        }
    }

    pause() {
        if (this.status.isPlaying()) {
            this.status.setPaused();
            this.board.clearFigureStack();
            this.board.clearFigure();
            clearInterval(this.clockGenerator);
        }
    }

    doTick() {
        // если фигура только появилась на доске, прежде чем делать шаг вниз нужно проверить ее на коллизии
        if (!this.newFigure) {
            this.figure.stepDown(this.figure);
        } else {
            this.board.drawNextFigure(this.figure);
        }
        // проверка коллизий, если метод вернул истину, значит была коллизия со стеком или дном поля
        // так что мы удаляем из списка текущую фигуру и помещаем в конец новую.
        if (this.checkCollisions(this.figure)) {
            this.figure.figureList.shift();
            this.figure.figureList.push(this.figure.getFigure());
            this.board.clearNextFigure();
            this.board.drawNextFigure(this.figure);
            this.newFigure = true;
        } else {
            this.board.clearFigure();
        }

        // проверяем новая ли сейчас фигура. Новой она может быть либо на старте игры, либо после отработкии коллизии
        if (this.newFigure) {
            // если обработчик коллизий поставил stopGame истину, занчит поле заполнилось до потолка и из метода можно
            // выходить что бы лишнюю фигуру не рисовать
            if (this.stopGame) {
                return;
            }
            // восстанавливаем нормальную скорость игры, если вдруг перед этим пользователь использовал ускоренное
            // падение фигуры
            this.speed = this.settings.startSpeed;
            this.pause();
            this.start();
            // ставим фигуру по центру поля. Относительно по центру конечно. Там как не ставь, некоторые фигуры будут
            // чуть смещены влево, а другие вправо из-за их зеркальной симметрии
            this.figure.centerFigure(this.figure.figureList[0]);
            this.board.drawFigure(this.figure);
            this.newFigure = false;

        } else {
            this.board.drawFigure(this.figure);
        }
    }

    // обработчик коллизий. Тут можно много чего оптимизировать. Но тогда я боюсь никогда не закончу. Я для теста делал
    // таймер на скорость выполнения тика, весь ход с проверкой столкновений и отрисовкой занимает меньше 1 миллисекунды
    // так что смысла особо и нет.
    checkCollisions(figure) {
        let collision = false;
        // для текущей фигуры проверяем совпадает ли хоть одна из ее координат с координатами фигур в стеке. Если да то
        // это считается коллизией и все текущие клетки фигуры добавляются в стек.
        for (let element = 0; element < figure.figureList[0].cells.length; element++) {
            if (this.stack.isInStack(figure.figureList[0].cells[element])) {
                figure.figureList[0].cells.forEach((cell) => {
                    this.stack.addToStack(cell);
                });
                collision = true;
                // если была коллизия проверяем стек на полные строки. Если они будут то соответсвующие методы удалят их
                // из стека. Если нет то они просто ничего не возвратят.
                let lines = this.stack.getLines();
                let completeLines = this.stack.checkLines(lines);
                let del = this.stack.deleteCompleteLines.bind(this);
                del(completeLines);
                //Обновим статистику. Метод выполнится, если stack.checkLines вернет заполненные строки.
                this.updateStatistics(completeLines);
                // если одна из клеток фигуры пересеклась со стеком, нет смысла проверять остальные клетки,
                // выходим из цикла
                break;
            }
        }

        // если была коллизия, удаляем текущую фигуру с доски, а так же текущий стек и рисуем
        // обновленный стек с добавленной фигурой
        if (collision) {
            this.board.clearFigure();
            this.board.clearFigureStack();
            this.board.drawFigureStack(this.stack);
            let stackHeight = this.figure.getFirstCell(this.stack.stack);
            // так же здесь проверка на заполненость стека. Если фигуры нагромоздились до потолка - game over.
            if (stackHeight.minY <= 1) {
                this.gameOver();
            }
            return true;
        }

        // если мы не попали в стек, а в начале игры его еще нет, то возможно мы уже достигли дна. Если у фигуры есть
        // клетка с координатами > 20 то дно достигнуто и мы добавляем эту фигуру в стек упавших фигур. Плюс проверка
        // стека на полные строки и отрисовка.
        if (this.figure.getFirstCell().maxY > 20) {
            figure.figureList[0].cells.forEach((cell) => {
                this.stack.addToStack(cell);
            });
            let lines = this.stack.getLines();
            let completeLines = this.stack.checkLines(lines);
            let del = this.stack.deleteCompleteLines.bind(this);
            del(completeLines);
            this.updateStatistics(completeLines);
            this.board.clearFigure();
            this.board.clearFigureStack();
            this.board.drawFigureStack(this.stack);

            return true;
        }

    }

    // привязка обработчиков к кнопкам
    pressKeyHandler(event) {
        // тут же удалим стадартное действие стрелок, что бы окно пролистывалось во время игры. Если игра на паузе,
        // управление не работает.
        event.preventDefault();
        switch (event.key) {
            case "ArrowUp":
                if (this.status.isPaused()) {
                    break;
                }
                this.rotateFigure();
                break;
            case "ArrowDown":
                // ускоренное падение фигур. Меням скорость игры на 1мс и перезапускаем.
                if (this.status.isPaused()) {
                    break;
                }
                this.speed = 1;
                this.pause();
                this.start();
                break;
            case "ArrowLeft":
                if (this.status.isPaused()) {
                    break;
                }
                this.shiftFigure('left');
                break;
            case "ArrowRight":
                if (this.status.isPaused()) {
                    break;
                }
                this.shiftFigure('right');
                break;
        }

    }

    // сдвиг фигуры влево-вправо.
    shiftFigure(direction) {
        if (this.figure.shiftDirection(direction, this.stack)) {
            return;
        }
        this.board.clearFigure();
        this.board.drawFigure(this.figure);
    }

    // поворот фигуры
    rotateFigure() {
        this.figure.flip(this.stack);
        this.board.clearFigure();
        this.board.drawFigure(this.figure);
    }

    // игра окончена ставим на паузу и меняем флаг stopGame. Он нужен для перезапуска игры.
    gameOver() {
        if (this.status.isPlaying()) {
            this.status.setPaused();
            clearInterval(this.clockGenerator);
            this.stopGame = true;
        }
        alert('Вы проиграли!\nДля новой игры нажмите кнопку старт.')
    }

    // очищаем достку от старых фигур, стека и обнуляем статистику. Зоздаем новый стек и фигуры.
    clearGame() {
        this.board.clearFigureStack();
        this.stack = new FigureStack();
        this.board.clearFigure();
        this.board.clearNextFigure();
        this.efficiencyField.innerHTML = '0';
        this.scoreField.innerHTML = '0';
        this.score = 0;
        this.efficiency = 0;
        this.deleteCounter = 0;
        this.trt = 0;
        this.linesCounter = 0;
        for (let i = 0; i < 2; i++) {
            this.figure.figureList.shift();
            this.figure.figureList.push(this.figure.getFigure());
        }
    }

    // обновляем статистику, количество очков и эффективность.
    updateStatistics(completeLines){

        if (completeLines.length > 0) {
            this.linesCounter += completeLines.length;
            this.deleteCounter++;
            // считаем тетрисы, количество раз когда закрывается сразу 4 линии. Хотя оно в итоге не пригодилось
            if (completeLines.length === 4) {
                this.trt++;
            }
            // чем больше линий закрыто за раз, тем больше очков.
            // 1 линия по 100 за линию
            // 2 линии по 200 за линию и т.д.
            switch (completeLines.length) {
                case 1:
                    this.score += 100;
                    break;
                case 2:
                    this.score += 400;
                    break;
                case 3:
                    this.score += 900;
                    break;
                case 4:
                    this.score += 1600;
                    break;
            }
            // очень "хитрая" формула расчета эффективности. Минимальная эффективность 25% если закрывать по одной линии
            // максимум 100% если закрывать только тетрисами.
            this.efficiency = Math.floor(this.linesCounter / this.deleteCounter / 4 * 100);
            this.efficiencyField.innerHTML = this.efficiency + '%';
            this.scoreField.innerHTML = this.score;
        }
    }
}

