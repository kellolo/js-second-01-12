"use strict";
class Figure {
    constructor() {
        // possibleDirections не пригодились в итоге. Если пользователь двигает фигура, куда не следует просто
        // ничего не произойдет. Фигура упрется в стену или стек.
        this.possibleDirections = ['down', 'up', 'left', 'right'];
        this.figureList = [];
        // добавлем две фигуры, текущую, ту что использует игрок и следующую в очереди. Она отображается справа от поля
        for (let i = 0; i < 2; i++) {
            this.figureList.push(this.getFigure());
        }
    }

    // список возможных фигур с заранее прописанными координатами.
    sType() {
        let figure = [
            {x: 2, y: 1, color: 'green'},
            {x: 3, y: 1, color: 'green'},
            {x: 1, y: 2, color: 'green'},
            {x: 2, y: 2, color: 'green'},
        ];
        return figure;
    }

    zType() {
        let figure = [
            {x: 1, y: 1, color: 'red'},
            {x: 2, y: 1, color: 'red'},
            {x: 2, y: 2, color: 'red'},
            {x: 3, y: 2, color: 'red'},
        ];
        return figure;
    }

    tType() {
        let figure = [
            {x: 1, y: 1, color: 'violet'},
            {x: 2, y: 1, color: 'violet'},
            {x: 3, y: 1, color: 'violet'},
            {x: 2, y: 2, color: 'violet'},
        ];
        return figure;
    }

    iType() {
        let figure = [
            {x: 1, y: 1, color: 'lightblue'},
            {x: 1, y: 2, color: 'lightblue'},
            {x: 1, y: 3, color: 'lightblue'},
            {x: 1, y: 4, color: 'lightblue'},
        ];
        return figure;
    }

    lType() {
        let figure = [
            {x: 1, y: 1, color: 'orange'},
            {x: 1, y: 2, color: 'orange'},
            {x: 1, y: 3, color: 'orange'},
            {x: 2, y: 3, color: 'orange'},
        ];
        return figure;
    }

    jType() {
        let figure = [
            {x: 2, y: 1, color: 'blue'},
            {x: 2, y: 2, color: 'blue'},
            {x: 1, y: 3, color: 'blue'},
            {x: 2, y: 3, color: 'blue'},
        ];
        return figure;
    }

    oType() {
        let figure = [
            {x: 1, y: 1, color: 'yellow'},
            {x: 2, y: 1, color: 'yellow'},
            {x: 1, y: 2, color: 'yellow'},
            {x: 2, y: 2, color: 'yellow'},
        ];
        return figure;
    }

    // фигура изначально имеет координаты в левом верхнем углу. Этот метод центрирует фигуру, прежде чем вывести ее на
    // экран пользователя.
    centerFigure(figure) {
        figure.cells.forEach((cell) => {
            cell.x += 4;
        })
    }

    // инкрементируем фигуру по y оси.
    stepDown(figure) {
        figure.figureList[0].cells.forEach((element) => {
            element.y++
        })
    }

    // метод  возвращает случайную фигуру в виде объекта.
    getFigure() {
        let figure = {};
        let random = Math.floor(Math.random() * 7);
        switch (random) {
            case 0:
                figure.type = 'figure';
                figure.figureType = 'sType';
                figure.cells = this.sType();
                break;
            case 1:
                figure.type = 'figure';
                figure.figureType = 'zType';
                figure.cells = this.zType();
                break;
            case 2:
                figure.type = 'figure';
                figure.figureType = 'tType';
                figure.cells = this.tType();
                break;
            case 3:
                figure.type = 'figure';
                figure.figureType = 'iType';
                figure.cells = this.iType();
                break;
            case 4:
                figure.type = 'figure';
                figure.figureType = 'lType';
                figure.cells = this.lType();
                break;
            case 5:
                figure.type = 'figure';
                figure.figureType = 'jType';
                figure.cells = this.jType();
                break;
            case 6:
                figure.type = 'figure';
                figure.figureType = 'oType';
                figure.cells = this.oType();
                break;
        }
        return figure;
    }

    // Часто используемый метод. По началу как видно из названия возвращал первую верхнюю клетку, но по мере разработки
    // разросся и возвращает крайние координаты со всех сторон фигуры.
    getFirstCell(figure) {
        // если не была передана какая-то конкретная фигура, используется текущая фигура.
        let figureArr = figure ? figure : this.figureList[0].cells;
        let maxY = 0;
        let maxX = 0;
        let minY = 20;
        let minX = 10;
        figureArr.forEach((cell) => {
            if (cell.y > maxY) {
                maxY = cell.y;
            }
            if (cell.x > maxX) {
                maxX = cell.x;
            }
            if (cell.y < minY) {
                minY = cell.y;
            }
            if (cell.x < minX) {
                minX = cell.x;
            }
        });
        return {maxY: maxY, maxX: maxX, minY: minY, minX: minX};
    }


    // проверки на смещение в стену и стек. Этот и следующий метод исползуются для проверки при смещении фигуры игроком.
    // возвращают истину при совпадении координат смещенной фигуры со стеной или стеком.
    isShiftToWall(direction) {
        for (let element = 0; element < this.figureList[0].cells.length; element++) {
            if ((this.figureList[0].cells[element].x === 1 && direction === 'left') ||
                (this.figureList[0].cells[element].x === 10 && direction === 'right')
            ) {
                return true;
            }
        }
    }


    isShiftToStack(direction, stack) {
        let collision = false;
        for (let element = 0; element < stack.stack.length; element++) {
            this.figureList[0].cells.forEach((cell) => {
                if ((cell.x + (direction === 'left' ? -1 : 1) === stack.stack[element].x) &&
                    (cell.y === stack.stack[element].y)) {
                    collision = true;
                }
            });
            if (collision) {
                return true;
            }
        }
    }

    // смещаем фигуру по х координате. Если проверки не вернут истину, значит столкновений нет и можно инкрементровать
    // клетки фигуры.
    shiftDirection(direction, stack) {
        switch (direction) {
            case 'right':
                if (this.isShiftToWall(direction)) {
                    return true;
                }
                if (this.isShiftToStack(direction, stack)) {
                    return true;
                }
                this.figureList[0].cells.forEach((cell) => {
                    cell.x++;
                });
                break;
            case 'left':
                if (this.isShiftToWall(direction)) {
                    return true;
                }
                if (this.isShiftToStack(direction, stack)) {
                    return true;
                }
                this.figureList[0].cells.forEach((cell) => {
                    cell.x--;
                });
                break;
        }
    }

    // метод для поворота фигуры. Преобразуем фигуру в матрицу 3х3 и переворачиваем матрицу. Затем матрица обратно
    // трансфоримруется в фигуру. Для переворота палки есть отдельный метод.
    flip(stack) {
        let maxXY = this.getFirstCell();
        if (this.figureList[0].figureType === 'iType') {
            this.flipIType(maxXY, stack, this.figureList[0]);
            return;
        }
        let matrix = this.figureToMatrix(this.figureList[0], maxXY);
        matrix = this.rotateMatrix(matrix);
        this.matrixToFigure(matrix, this.figureList[0], maxXY, stack);
    }

    // проверка на коллизию со стеком при перевороте.
    isFlipToStack(figure, stack) {
        let collision = false;
        for (let element = 0; element < stack.stack.length; element++) {
            // вот тут можно было оптимизировать и сделать через for , тогда если клетка попадает в стек можно сразу
            // возвращать true и не проверять остальные клетки.
            figure.forEach((cell) => {
                if ((cell.x === stack.stack[element].x) &&
                    (cell.y === stack.stack[element].y)) {
                    collision = true;
                }
            });
            if (collision) {
                return true;
            }
        }
    }

    // проверка на коллизию со стенами. Если фигура после переворота вылезает за границы игрового поля, просто сдвигаем
    // ее на нужное количество клеток в противоположном направлении. Проверка на стек происходит после проверки на
    // стену, так что если сдвинутая от стены фигура попадает в стек переворот не срабатывает.
    isFlipToWall(figure) {
        let maxX = 10;
        let minX = 1;
        let maxY = 20;


        for (let element = 0; element < figure.length; element++) {
            if (figure[element].x > maxX) {
                maxX = figure[element].x;
            }
            if (figure[element].x < minX) {
                minX = figure[element].x;
            }
            if (figure[element].y > maxY) {
                maxY = figure[element].y;
            }

        }
        figure.forEach((cell) => {
            if (maxX > 10) {
                cell.x -= maxX - 10;
            }
            if (minX < 1) {
                cell.x -= minX - 1;
            }
            if (maxY > 20) {
                cell.y -= maxY - 20;
            }
        })
    }

    // делаем из фигуры матрицу
    figureToMatrix(figure, maxXY) {
        let matrix = [[], [], []];
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                figure.cells.forEach((cell) => {
                    if ((maxXY.maxX - 2 + x === cell.x) &&
                        (maxXY.maxY - 2 + y === cell.y)) {
                        matrix[y][x] = 1;
                    }
                });
                if (matrix[y][x] !== 1) {
                    matrix[y][x] = 0;
                }
            }
        }
        return matrix;
    }

    // поворачиваем матрицу
    rotateMatrix(matrix) {
        let newMatrix = [[], [], []];
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                newMatrix[x][y] = matrix[2 - y][x];
            }
        }
        return newMatrix;
    }

    // преобразуем матрицу в фигуру. Прежде чем изменять координаты реальной фигуры, сначала создается копия, которая
    // проверяется на коллизии со стеком истеной. Если таковые есть, реальная фигура не изменяестя.
    matrixToFigure(matrix, figure, maxXY, stack) {
        // массив для хранения координат перевернутой фигуры
        let figureToCheck = [];
        figure.cells.forEach(() => {
            for (let y = 0; y < 3; y++) {
                let exit = false;
                for (let x = 0; x < 3; x++) {
                    if (matrix[y][x] === 1) {
                        let checkX = maxXY.maxX - 2 + x;
                        let checkY = maxXY.maxY - 2 + y;
                        figureToCheck.push(new Cell(checkX, checkY));
                        matrix[y][x] = 0;
                        exit = true;
                        break;
                    }
                }
                if (exit) {
                    break;
                }
            }

        });

        // проверяем фигуру на переворот в стену.
        this.isFlipToWall(figureToCheck);

        // проверяем фигуру после переворота на попадание в стек. Если попадает в стек ничего не делаем
        // и выходим их метода.
        if (this.isFlipToStack(figureToCheck, stack)) {
            return true;
        }


        // если все проверки пройдены, прописываем координаты реальной фигуре.
        for (let element = 0; element < figureToCheck.length; element++) {
            figure.cells[element].x = figureToCheck[element].x;
            figure.cells[element].y = figureToCheck[element].y;
        }

        // поскольку поворот идет по центральной точке, а фигуры далеко не симметричны относительно центра
        // после двух переворотов фигура смещается относительно начальных ее координат по оси х.
        // Если координаты изменились, просто сдвигаем ее обратно.
        if (this.getFirstCell().maxX < maxXY.maxX) {
            this.shiftDirection('right', stack);
        }

    }

    // переворот палки. Тут попроще, но проверки на коллизии все те же. Квадрат кстати тоже переварачивается, хотя его
    // в принципе можно было вообще исключить и сделать проверку, мол если тип фигуры квадрат -> return
    flipIType(maxXY, stack, figure) {
        let figureToCheck = [];
        if (maxXY.maxX === maxXY.minX) {
            let xDecrement = 1;
            this.figureList[0].cells.forEach(() => {
                let checkX = maxXY.maxX + xDecrement--;
                let checkY = maxXY.maxY;
                figureToCheck.push(new Cell(checkX, checkY));
            });
        } else {
            let yDecrement = 0;
            this.figureList[0].cells.forEach(() => {
                let checkX = maxXY.maxX - 1;
                let checkY = maxXY.maxY + yDecrement--;
                figureToCheck.push(new Cell(checkX, checkY));
            });
        }

        this.isFlipToWall(figureToCheck);

        if (this.isFlipToStack(figureToCheck, stack)) {
            return true;
        }

        for (let element = 0; element < figureToCheck.length; element++) {
            figure.cells[element].x = figureToCheck[element].x;
            figure.cells[element].y = figureToCheck[element].y;
        }
    }
}