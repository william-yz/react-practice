import { Game } from './game'

test('投一球，击中5个球，得到5分', () => {
    const expected = 5
    const game = new Game()

    game.throw(5)

    const result = game.getScore(5)

    expect(result).toEqual(expected)
})

test('投一球，击中5个球，再投一球，击中5个球，得到10分', () => {
    const expected = 5
    const game = new Game()

    game.throw(5)
    game.throw(5)

    const result = game.getScore()

    expect(result).toEqual(expected)
})