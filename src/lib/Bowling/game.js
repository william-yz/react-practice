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
        fromNoneToOnce () {
        },
        fromOnceToSpare () {
        },
        fromNoneToStrike () {
        },
        fromOnceToNone () {
        },
        fromNoneToOnce () {
        },
        fromNoneToStrike () {
        },
        fromStrikeToOnce () {
        },
        fromSrareToStrike () {
        },
        fromOnceToOnce () {
        }
    }
}

export default class Game {

    constructor () {
        this.score = 0
        this.round = 1
        this.state = NONE
        this.FSM = FSM
    }

    throw = (pins) => {
        if (pins === 10) {
            this.setState(STRIKE)
        } else {
            this.setState(ONCE)
        }
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

    setState = (state) => {
        const handler = this.FSM.events[`from${this.state}To${state}`]
        if (handler) {
            handler.call(this)
        } else {
            throw new Error(`Can not change from ${this.state} to ${state}`)
        }
    }
}

