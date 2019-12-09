"use strict";
class Settings {
    init(settings) {
        let defaultSettings = {
            boardWidth: 10,
            boardHeight: 20,
            startSpeed: 500
        };
        Object.assign(defaultSettings, settings);

        if (defaultSettings.boardWidth !== 10) {
            throw new Error('Ширина поля не может отличаться от 10')
        }
        this.boardWidth = defaultSettings.boardWidth;
        if (defaultSettings.boardHeight !== 20) {
            throw new Error('Высота поля не может отличаться от 20')
        }
        this.boardHeight = defaultSettings.boardHeight;
        // if (defaultSettings.startSpeed > 10 || defaultSettings.startSpeed < 1) {
        //     throw new Error('Скорость должна быть в диапазоне от 1  до 10')
        // }
        this.startSpeed = defaultSettings.startSpeed;
    }
}