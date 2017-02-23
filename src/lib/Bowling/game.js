export class Game {

    constructor () {
        this.score = 0
        this.round = 1
    }

    throw = (pins) => {
        this.score += pins
    }

    getScore = () => {
        return this.score
    }

    getRound = () => {
        return this.round
    }
}