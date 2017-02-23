// 上一轮没有打中10个
export const NONE = 'None'
// 上一轮一次打中10个
export const STRIKE = 'Strike'
// 上一轮两次打中10个
export const SRARE = 'Srare'
// 本轮已经投过一次
export const ONCE = 'Once'

export const END = 'End'

export const FSM = {
    init: NONE,
    events: {
        fromNoneToOnce (pins) {
            this.score += pins
            this.addScore(pins)
            this.currRoundState = NONE
            this.state = ONCE
        },
        fromNoneToStrike (pins) {
            this.score += pins
            this.addScore(pins)
            this.prevState = NONE
            this.state = STRIKE
            this.round ++
        },
        fromSrareToOnce (pins) {
            this.score += pins * 2
            this.addScore(pins)
            this.scoreboard[this.round - 2] += pins
            this.currRoundState = SRARE
            this.state = ONCE
        },
        fromStrikeToStrike (pins) {
            this.score += pins * 2
            this.addScore(pins)
            this.scoreboard[this.round - 2] += pins
            this.prevState = STRIKE
            this.state = STRIKE
            this.round ++
        },
        fromStrikeToOnce (pins) {
            this.score += pins * 2
            this.addScore(pins)
            this.scoreboard[this.round - 2] += pins
            this.currRoundState = STRIKE
            this.state = ONCE
        },
        fromSrareToStrike (pins) {
            this.score += pins * 2
            this.addScore(pins)
            this.scoreboard[this.round - 2] += pins
            this.prevState = SRARE
            this.state = STRIKE
            this.round ++
        },
        // 第二次投球
        fromOnceToOnce (pins) {
            let currentRoundScore
            switch (this.currRoundState) {
                case NONE:
                case SRARE:
                    this.score += pins
                    this.addScore(pins)
                    currentRoundScore = this.scoreboard[this.round - 1]
                    break;
                case STRIKE:
                    this.score += pins * 2
                    this.addScore(pins)
                    this.scoreboard[this.round - 2] += pins
                    currentRoundScore = this.scoreboard[this.round - 1]
                    break;
                default:
                    break;
            }
            
            if (currentRoundScore === 10) {
                if (this.round === 10) {
                    this.state = ONCE
                }
                this.prevState = this.currRoundState
                this.state = SRARE
                this.round ++
            } else {
                if (this.round === 10) {
                    this.state = END
                } else {
                    this.prevState = this.currRoundState
                    this.state = NONE
                    this.round ++
                }
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
        this.currRoundState = NONE
        this.prevState = NONE
    }

    throw = (pins) => {
        if (this.state === END) {
            throw new Error('游戏已经结束')
        }
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

    addScore = (pins) => {
        this.scoreboard[this.round - 1] += pins
    }

    addToPrevScoreboard = () => {

    }
}

