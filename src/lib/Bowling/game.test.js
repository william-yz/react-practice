import Game, { NONE, STRIKE, SRARE, ONCE } from './game'

test('开局有0分，是第一轮, 状态是上一轮没有中', () => {
    const game = new Game()

    expect(game.getScore()).toBe(0)
    expect(game.getRound()).toBe(1)
    expect(game.getState()).toBe(NONE)
})

test('前一次没有投中，第一次投球打中8个： 状态由NONE变为ONCE, 得分加8分', () => {
    const game = new Game()
    expect(game.getState()).toBe(NONE)
    const prevStore = game.getScore()
    game.throw(8)
    const currStore = game.getScore()
    expect(game.getState()).toBe(ONCE)
    expect(currStore - prevStore).toBe(8)
})

test('前一次没有投中，第一次投球打中10个： 状态由NONE变为STRIKE, 得分加10分', () => {
    const game = new Game()
    expect(game.getState()).toBe(NONE)
    const prevStore = game.getScore()
    game.throw(10)
    const currStore = game.getScore()
    expect(game.getState()).toBe(STRIKE)
    expect(currStore - prevStore).toBe(10)
})