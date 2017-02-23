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
    const prevScore = game.getScore()
    game.throw(8)
    const currScore = game.getScore()
    expect(game.getState()).toBe(ONCE)
    expect(currScore - prevScore).toBe(8)
})

test('前一次没有投中，第一次投球打中8个：状态由NONE变为ONCE, 得分加8分; 第二次投中1个: 状态由ONCE变为NONE, 得分加1分', () => {
    const game = new Game()
    game.throw(8)
    const prevScore = game.getScore()
    expect(game.getState()).toBe(ONCE)
    game.throw(1)
    const currScore = game.getScore()
    expect(game.getState()).toBe(NONE)
    expect(currScore - prevScore).toBe(1)
})

test('前一次没有投中，第一次投球打中8个：状态由NONE变为ONCE, 得分加8分; 第二次投中2个: 状态由ONCE变为SRARE, 得分加2分, 局数+1', () => {
    const game = new Game()
    const prevRound = game.getRound()
    game.throw(8)
    const prevScore = game.getScore()
    expect(game.getState()).toBe(ONCE)
    game.throw(2)
    const currScore = game.getScore()
    const currentRound = game.getRound()
    expect(game.getState()).toBe(SRARE)
    expect(currScore - prevScore).toBe(2)
    expect(currentRound - prevRound).toBe(1)
})

test('前一次没有投中，第一次投球打中10个： 状态由NONE变为STRIKE, 得分加10分，轮数+1', () => {
    const game = new Game()
    expect(game.getState()).toBe(NONE)
    const prevScore = game.getScore()
    game.throw(10)
    const currScore = game.getScore()
    expect(game.getState()).toBe(STRIKE)
    expect(currScore - prevScore).toBe(10)
    expect(game.getRound()).toBe(2)
})

test('前一次没有投中，第一次投球打中10个： 状态由NONE变为STRIKE, 得分加10分', () => {
    const game = new Game()
    expect(game.getState()).toBe(NONE)
    const prevScore = game.getScore()
    game.throw(10)
    const currScore = game.getScore()
    expect(game.getState()).toBe(STRIKE)
    expect(currScore - prevScore).toBe(10)
})

test('前一次一投投中10个，这一轮第一次投球打中8个： 状态由STRIKE变为ONCE, 得分加16分', () => {
    const game = new Game()
    game.throw(10)
    expect(game.getState()).toBe(STRIKE)
    game.throw(8)
    expect(game.getState()).toBe(ONCE)
    expect(game.getScore()).toBe(10 + 16)
})

test('前一次一投投中10个，这一轮第一次投球打中8个： 状态由STRIKE变为ONCE, 得分加16分； 第二次投中2个， 状态由ONCE变为SRARE, 得分再加4分,轮数+1', () => {
    const game = new Game()
    game.throw(10)
    expect(game.getRound()).toBe(2)
    expect(game.getState()).toBe(STRIKE)
    game.throw(8)
    expect(game.getState()).toBe(ONCE)
    expect(game.getScore()).toBe(10 + 16)
    game.throw(2)
    expect(game.getState()).toBe(SRARE)
    expect(game.getScore()).toBe(10 + 16 + 4)
    expect(game.getRound()).toBe(3)
})

test('前一次一投投中10个，这一轮第一次投球打中8个： 状态由STRIKE变为ONCE, 得分加16分； 第二次投中1个， 状态由ONCE变为NONE, 得分再加2分,轮数+1', () => {
    const game = new Game()
    game.throw(10)
    expect(game.getRound()).toBe(2)
    expect(game.getState()).toBe(STRIKE)
    game.throw(8)
    expect(game.getState()).toBe(ONCE)
    expect(game.getScore()).toBe(10 + 16)
    game.throw(1)
    expect(game.getState()).toBe(NONE)
    expect(game.getScore()).toBe(10 + 16 + 2)
    expect(game.getRound()).toBe(3)
})

test('前一次一投投中10个，这一轮第一次投球打中10个： 状态由STRIKE变为STRIKE, 得分加20分,轮数+1', () => {
    const game = new Game()
    game.throw(10)
    expect(game.getRound()).toBe(2)
    expect(game.getState()).toBe(STRIKE)
    game.throw(10)
    expect(game.getState()).toBe(STRIKE)
    expect(game.getScore()).toBe(10 + 20)
})

test('前一次一投投中10个，这一轮第一次投球打中10个： 状态由STRIKE变为STRIKE, 得分加20分,轮数+1', () => {
    const game = new Game()
    game.throw(10)
    expect(game.getRound()).toBe(2)
    expect(game.getState()).toBe(STRIKE)
    game.throw(10)
    expect(game.getState()).toBe(STRIKE)
    expect(game.getScore()).toBe(10 + 20)
})