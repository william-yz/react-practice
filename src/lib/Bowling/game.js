// 上一轮没有打中10个
export const NONE = 'None'
// 上一轮一次打中10个
export const STRIKE = 'Strike'
// 上一轮两次打中10个
export const SRARE = 'Srare'
// 本轮已经投过一次
export const ONCE = 'Once'

export const FSM = {
    init: NONE,
    events: {
        fromNoneToOnce (pins) {
            this.score += pins
            this.scoreboard[this.round - 1] = pins
            this.state = ONCE
        },
        // fromOnceToSpare (pins) {
        // },
        fromNoneToStrike (pins) {
            this.score += pins
            this.scoreboard[this.round - 1] = pins
            this.state = STRIKE
        },
        // fromOnceToNone (pins) {
        // },
        // fromSrareToOnce (pins) {
        // },
        // fromSrareToStrike (pins) {
        // },
        // fromStrikeToOnce (pins) {
        // },
        // fromSrareToStrike (pins) {
        // },
        fromOnceToOnce (pins) {
            this.score += pins
            this.scoreboard[this.round - 1] += pins
            const currentRountScore = this.scoreboard[this.round - 1]
            if (currentRountScore === 10) {
                this.state = SRARE
            } else {
                this.state = NONE
            }
        }
    }
}

export default class Game {

    constructor () {
        this.score = 0
        this.scoreboard = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        this.round = 1
        this.state = NONE
        this.FSM = FSM
        this.prevState = NONE
    }

    throw = (pins) => {
        if (pins === 10) {
            this.setState(STRIKE, pins)
        } else {
            this.setState(ONCE, pins)
        }
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

    setState = (state, pins = 0) => {
        const handler = this.FSM.events[`from${this.state}To${state}`]
        if (handler) {
            handler.call(this, pins)
        } else {
            throw new Error(`Can not change from ${this.state} to ${state}`)
        }
    }
}

