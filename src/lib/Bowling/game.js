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
    fromNoneToOnce() {
      this.currRoundState = NONE
      this.state = ONCE
    },
    fromNoneToStrike() {
      this.prevState = NONE
      this.state = STRIKE
      this.round += 1
    },
    fromSrareToOnce() {
      this.currRoundState = SRARE
      this.state = ONCE
    },
    fromStrikeToStrike() {
      this.prevState = STRIKE
      this.state = STRIKE
      this.round += 1
    },
    fromStrikeToOnce() {
      this.currRoundState = STRIKE
      this.state = ONCE
    },
    fromSrareToStrike() {
      this.prevState = SRARE
      this.state = STRIKE
      this.round += 1
    },
        // 第二次投球
    fromOnceToOnce(currentRoundScore) {
      if (currentRoundScore === 10) {
        this.prevState = this.currRoundState
        this.state = SRARE
        this.round += 1
      } else if (this.round === 10) {
        this.state = END
      } else {
        this.prevState = this.currRoundState
        this.state = NONE
        this.round += 1
      }
    },
  },
}

export default class Game {

  constructor() {
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

  getScore = () => this.scoreboard.reduce((prev, curr) => prev + curr)

  getRound = () => this.round

  getState = () => this.state

  setState = (state, pins = 0) => {
    const handler = this.FSM.events[`from${this.state}To${state}`]
    if (handler) {
      const currentRoundScore = this.addScore(pins)
      handler.call(this, currentRoundScore)
    } else {
      throw new Error(`Can not change from ${this.state} to ${state}`)
    }
  }

  calculatePrevScore = (pins) => {
        // 再算上一轮的分数
    switch (this.state) {
      case NONE:
        break
            // 如果是第一次投,且上一投是SPARE或者是STRIKE,就把分数加到上一投中
      case SRARE:
      case STRIKE:
        this.scoreboard[this.round - 2] += pins
        break
            // 如果是第二次投,且上一投是STRIKE,才把分数加到上一投中
      case ONCE:
        if (this.currRoundState === STRIKE) {
          this.scoreboard[this.round - 2] += pins
        }
        break
      default:
        break
    }
  }

  calculateLastScore = (pins) => {
        // 上上一投是STRIKE,上一投也是STRIKE,就要把这次投加到上上投中
    if (this.prevState === STRIKE && this.state === STRIKE) {
      this.scoreboard[this.round - 3] += pins
    }
  }

  display = () => {
    console.log(this.scoreboard)
  }

  addScore = (pins) => {
    this.scoreboard[this.round - 1] += pins
    this.calculatePrevScore(pins)
    this.calculateLastScore(pins)
    this.scoreboard = this.scoreboard.slice(0, 10)
    return this.scoreboard[this.round - 1]
  }

  addToPrevScoreboard = () => {

  }
}
