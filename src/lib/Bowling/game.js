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
            this.scoreboard[this.round - 1] += pins
            this.prevState = NONE
            this.state = ONCE
        },
        // fromOnceToSpare (pins) {
        // },
        fromNoneToStrike (pins) {
            this.score += pins
            this.scoreboard[this.round - 1] += pins
            this.state = STRIKE
            this.round ++
        },
        // fromOnceToNone (pins) {
        // },
        // fromSrareToOnce (pins) {
        // },
        // fromSrareToStrike (pins) {
        // },
        fromStrikeToOnce (pins) {
            this.score += pins * 2
            this.scoreboard[this.round - 1] += pins
            this.scoreboard[this.round - 2] += pins
            this.prevState = STRIKE
            this.state = ONCE
        },
        // fromSrareToStrike (pins) {
        // },
        // 第二次投球
        fromOnceToOnce (pins) {
            let currentRoundScore
            switch (this.prevState) {
                case NONE:
                    this.score += pins
                    this.scoreboard[this.round - 1] += pins
                    currentRoundScore = this.scoreboard[this.round - 1]
                    break;
                case STRIKE:
                    this.score += pins * 2
                    this.scoreboard[this.round - 1] += pins
                    this.scoreboard[this.round - 2] += pins
                    currentRoundScore = this.scoreboard[this.round - 1]
                default:
                    break;
            }
            
            if (currentRoundScore === 10) {
                this.state = SRARE
            } else {
                this.state = NONE
            }
            this.round ++
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

