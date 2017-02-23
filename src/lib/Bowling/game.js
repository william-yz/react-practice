export const NONE = 'NONE'
export const STRIKE = 'STRIKE'
export const SRARE = 'SRARE'

export default class Game {

    constructor () {
        this.score = 0
        this.round = 1
        this.state = NONE
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

    getState = () => {
        return this.state
    }
}

