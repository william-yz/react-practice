import Game, { NONE, STRIKE, SRARE, ONCE } from './game'

let game
/**
 * 两轮前一次打中10个
 */

beforeEach(() => {
  game = new Game()
  game.throw(10)
})
test('前一轮没有投中6/3,第一次投球打中8个: 状态由NONE变为ONCE, 总分36', () => {
  game.throw(6)
  game.throw(3)
  expect(game.getState()).toBe(NONE)

  game.throw(8)
  expect(game.getState()).toBe(ONCE)
  expect(game.getScore()).toBe(36)
})

test('前一轮没有投中10个,第一次投球打中8个:状态由NONE变为ONCE, 总分44; 第二次投中1个: 状态由ONCE变为NONE, 总分37', () => {
  game.throw(6)
  game.throw(3)
  game.throw(8)
  expect(game.getState()).toBe(ONCE)

  game.throw(1)
  expect(game.getState()).toBe(NONE)
  expect(game.getScore()).toBe(37)
})

test('前一轮没有投中10个,第一次投球打中8个:状态由NONE变为ONCE, 总分36; 第二次投中2个: 状态由ONCE变为SRARE, 总分38, 局数+1', () => {
  game.throw(6)
  game.throw(3)

  const prevRound = game.getRound()
  game.throw(8)
  expect(game.getState()).toBe(ONCE)

  game.throw(2)
  const currentRound = game.getRound()
  expect(game.getState()).toBe(SRARE)
  expect(game.getScore()).toBe(38)
  expect(currentRound - prevRound).toBe(1)
})

test('前一轮没有投中6/3,第一次投球打中10个: 状态由NONE变为STRIKE, 总分38,轮数+1', () => {
  game.throw(6)
  game.throw(3)

  const prevRound = game.getRound()
  expect(game.getState()).toBe(NONE)

  game.throw(10)
  const currentRound = game.getRound()
  expect(game.getState()).toBe(STRIKE)
  expect(game.getScore()).toBe(38)
  expect(currentRound - prevRound).toBe(1)
})

test('前一轮一投投中10个,这一轮第一次投球打中8个: 状态由STRIKE变为ONCE, 总分54', () => {
  game.throw(10)
  expect(game.getState()).toBe(STRIKE)
  game.throw(8)
  expect(game.getState()).toBe(ONCE)
  expect(game.getScore()).toBe(54)
})

test('前一轮一投投中10个,这一轮第一次投球打中8个: 状态由STRIKE变为ONCE, 总分54； 第二次投中2个, 状态由ONCE变为SRARE, 总分58,轮数+1', () => {
  game.throw(10)
  const prevRound = game.getRound()
  expect(game.getState()).toBe(STRIKE)
  game.throw(8)
  expect(game.getState()).toBe(ONCE)
  game.throw(2)
  const currRound = game.getRound()
  expect(game.getState()).toBe(SRARE)
  expect(game.getScore()).toBe(58)
  expect(currRound - prevRound).toBe(1)
})

test('前一轮一投投中10个,这一轮第一次投球打中8个: 状态由STRIKE变为ONCE, 总分54； 第二次投中1个, 状态由ONCE变为NONE, 总分56,轮数+1', () => {
  game.throw(10)
  const prevRound = game.getRound()
  expect(game.getState()).toBe(STRIKE)
  game.throw(8)
  expect(game.getState()).toBe(ONCE)
  game.throw(1)
  const currRound = game.getRound()
  expect(game.getState()).toBe(NONE)
  expect(game.getScore()).toBe(56)
  expect(currRound - prevRound).toBe(1)
})

test('前一轮一投投中10个,这一轮第一次投球打中10个: 状态由STRIKE变为STRIKE, 总分60,轮数+1', () => {
  game.throw(10)
  const prevRound = game.getRound()
  expect(game.getState()).toBe(STRIKE)
  game.throw(10)
  const currRound = game.getRound()
  expect(game.getState()).toBe(STRIKE)
  expect(game.getScore()).toBe(60)
  expect(currRound - prevRound).toBe(1)
})


test('前一轮两投投中2/8,这一轮第一次投球打中8个: 状态由SRARE变为ONCE, 总分46', () => {
  game.throw(2)
  game.throw(8)
  expect(game.getState()).toBe(SRARE)
  game.throw(8)
  expect(game.getState()).toBe(ONCE)
  expect(game.getScore()).toBe(46)
})

test('前一轮两投投中2/8,这一轮第一次投球打中8个: 状态由SRARE变为ONCE, 总分46； 第二次投中2个, 状态由ONCE变为SRARE, 总分48,轮数+1', () => {
  game.throw(2)
  game.throw(8)
  const prevRound = game.getRound()
  expect(game.getState()).toBe(SRARE)
  game.throw(8)
  expect(game.getState()).toBe(ONCE)
  game.throw(2)
  const currRound = game.getRound()
  expect(game.getState()).toBe(SRARE)
  expect(game.getScore()).toBe(48)
  expect(currRound - prevRound).toBe(1)
})

test('前一轮两投投中2/8,这一轮第一次投球打中8个: 状态由SRARE变为ONCE, 总分54； 第二次投中1个, 状态由ONCE变为NONE, 总分47,轮数+1', () => {
  game.throw(2)
  game.throw(8)
  const prevRound = game.getRound()
  expect(game.getState()).toBe(SRARE)
  game.throw(8)
  expect(game.getState()).toBe(ONCE)
  game.throw(1)
  const currRound = game.getRound()
  expect(game.getState()).toBe(NONE)
  expect(currRound - prevRound).toBe(1)
  expect(game.getScore()).toBe(47)
})

test('前一轮两投投中2/8,这一轮第一次投球打中10个: 状态由SRARE变为STRIKE, 总分50,轮数+1', () => {
  game.throw(2)
  game.throw(8)
  const prevRound = game.getRound()
  expect(game.getState()).toBe(SRARE)
  game.throw(10)
  const currRound = game.getRound()
  expect(game.getState()).toBe(STRIKE)
  expect(currRound - prevRound).toBe(1)
  expect(game.getScore()).toBe(50)
})
