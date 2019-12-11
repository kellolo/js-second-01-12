"use strict";
class Status {
    constructor() {
        this.setPaused();
    }

    /** Это значит что мы играем. */
    setPlaying() {
        this.condition = 'playing';
    }

    /** Это значит что игра на паузе. */
    setPaused() {
        this.condition = 'paused';
    }

    /**
     * @returns {boolean} если мы сейчас играем, тогда true, иначе false.
     */
    isPlaying() {
        return this.condition === 'playing';
    }

    /**
     * @returns {boolean} если сейчас игра на паузе, тогда true, иначе false.
     */
    isPaused() {
        return this.condition === 'paused';
    }
}