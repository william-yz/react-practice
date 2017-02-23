import Game, { NONE, STRIKE, SRARE, ONCE } from './game'

test('开局有0分，是第一轮, 状态是上一轮没有中', () => {
    const game = new Game()

    expect(game.getScore()).toBe(0)
    expect(game.getRound()).toBe(1)
    expect(game.getState()).toBe(NONE)
})

test('投一球，击中5个球，得到5分', () => {
    const expected = 5
    const game = new Game()

    game.throw(5)

    const result = game.getScore(5)

    expect(result).toEqual(expected)
})

test('投一球，击中5个球，再投一球，击中5个球，得到10分', () => {
    const expected = 10
    const game = new Game()

    game.throw(5)
    game.throw(5)

    const result = game.getScore()

    expect(result).toEqual(expected)
})

test('前一次没有投中，第一次投球打中8个： 状态由NONE表位ONCE, 得分加8分', () => {
    const game = new Game()
    expect(game.getState()).toBe(NONE)
    const prevStore = game.getScore()
    game.throw(8)
    const currStore = game.getScore()
    expect(game.getState()).toBe(ONCE)
    expect(currStore - prevStore).toBe(8)
})