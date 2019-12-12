"use strict";
window.addEventListener('load', () => {
    const board = new Board();
    const settings = new Settings();
    const menu = new Menu();
    const game = new Game();
    // сначала фигура создавалась сдесь, но по ходу дела выяснилось что фигур нужно чуть больше чем одна :)
    // по этому они создаются в объекте game
    // const figure = new Figure();
    const figureStack = new FigureStack();
    const  status = new Status();

    settings.init();
    board.init(settings);
    board.drawBoard();
    game.init(settings, board, figureStack, status, menu);

    game.run();
});