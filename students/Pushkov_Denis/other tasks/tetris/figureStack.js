"use strict";
class FigureStack {
    constructor(){
        this.stack = [];
    }

    // добавление фигуры в стек. На самом деле, поскольку шаг вниз фигуры и проверка на коллизии происходит
    // до ее отрисовки, необходимо это учитывать и декрементировать координаты клетки по оси у, прежде чем добавить ее в
    // стек.
    addToStack(cell) {
        cell.y--;
        cell.type = 'figureStack';
        this.stack.push(cell);
    }

    // проверка клетки на нахождение в стеке.
    isInStack(cell) {
        let collision = false;
        this.stack.forEach((element) => {
            if (element.x === cell.x && element.y === cell.y) {
                collision = true;
            }
        });
        return collision;
    }

    // получем массив из 20 линий. В каждой линии массив из координат х. Индекс массива идет как у координата.
    getLines(){
        let lines = [];
        for (let i = 0; i < 20; i++) {
            lines.push([]);
        }

        this.stack.forEach((element) => {
            lines[element.y - 1].push(element.x);
        });
        return lines;
    }

    // Проверяем массив линий и если есть заполненые, возвращаем в виде коллекции объектов со свойствами у координаты
    // и массивом х координат.
    checkLines(lines){
        let completeLines = [];
        lines.forEach((line, index) => {
            if( line.length === 10) {
                completeLines.push({lineY: index + 1, lineX: line});
            }
        });
        return completeLines;
    }

    // удаляем заполненные линии из стека и сдвигаем все клетки выше удаленных на 1 вниз.
    deleteCompleteLines(completeLines){

        completeLines.forEach((line) => {
            line.lineX.forEach((cellX) => {
                let i = 0;
                for (i; this.stack.stack[i].x !== cellX || this.stack.stack[i].y !== line.lineY; i++) {}
                this.stack.stack.splice(i, 1);
            });
            this.stack.stack.forEach((cell) => {
                if (cell.y < line.lineY) {
                    cell.y++;
                }
            })
        })

    }


}