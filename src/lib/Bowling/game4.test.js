import Game from './game'

test('第十轮 1', () => {
  const game = new Game()
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)

  game.throw(10)
  game.throw(10)
  game.throw(10)
  expect(game.scoreboard).toEqual([30, 30, 30, 30, 30, 30, 30, 30, 30, 30])
})

test('第十轮 2', () => {
  const game = new Game()
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)

  game.throw(8)
  game.throw(2)
  game.throw(10)
  expect(game.scoreboard).toEqual([30, 30, 30, 30, 30, 30, 30, 28, 20, 20])
})

test('第十轮 3', () => {
  const game = new Game()
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)

  game.throw(8)
  game.throw(1)
  expect(game.scoreboard).toEqual([30, 30, 30, 30, 30, 30, 30, 28, 19, 9])
})

test('第十轮 4', () => {
  const game = new Game()
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)

  game.throw(8)
  game.throw(2)
  game.throw(8)
  expect(game.scoreboard).toEqual([30, 30, 30, 30, 30, 30, 30, 28, 20, 18])
})

test('第十轮 5', () => {
  const game = new Game()
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(8)
  game.throw(2)

  game.throw(10)
  game.throw(10)
  game.throw(10)
  expect(game.scoreboard).toEqual([30, 30, 30, 30, 30, 30, 28, 20, 20, 30])
})

test('第十轮 6', () => {
  const game = new Game()
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(8)
  game.throw(2)

  game.throw(10)
  game.throw(8)
  game.throw(2)
  expect(game.scoreboard).toEqual([30, 30, 30, 30, 30, 30, 28, 20, 20, 20])
})

test('第十轮 7', () => {
  const game = new Game()
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(10)
  game.throw(8)
  game.throw(1)

  game.throw(8)
  game.throw(2)
  game.throw(8)
  expect(game.scoreboard).toEqual([30, 30, 30, 30, 30, 30, 28, 19, 9, 18])
})