import Game, { NONE, STRIKE, SRARE, ONCE } from './game'

let game
/**
 * 两轮前没有打中10个
 */
beforeEach(() => {
    game = new Game()
    expect(game.getScore()).toBe(0)
    expect(game.getRound()).toBe(1)
    expect(game.getState()).toBe(NONE)

    game.throw(6)
    game.throw(3)
})

test('前一轮没有投中10个，第一次投球打中8个： 状态由NONE变为ONCE, 得分加8分', () => {
    expect(game.getState()).toBe(NONE)
    const prevScore = game.getScore()
    game.throw(8)

    const currScore = game.getScore()
    expect(game.getState()).toBe(ONCE)
    expect(currScore - prevScore).toBe(8)
})

test('前一轮没有投中10个，第一次投球打中8个：状态由NONE变为ONCE, 得分加8分; 第二次投中1个: 状态由ONCE变为NONE, 得分加1分', () => {
    game.throw(8)
    const prevScore = game.getScore()
    expect(game.getState()).toBe(ONCE)

    game.throw(1)
    const currScore = game.getScore()
    expect(game.getState()).toBe(NONE)
    expect(currScore - prevScore).toBe(1)
})

test('前一轮没有投中10个，第一次投球打中8个：状态由NONE变为ONCE, 得分加8分; 第二次投中2个: 状态由ONCE变为SRARE, 得分加2分, 局数+1', () => {
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

test('前一轮没有投中10个，第一次投球打中10个： 状态由NONE变为STRIKE, 得分加10分，轮数+1', () => {
    const prevRound = game.getRound()
    const prevScore = game.getScore()
    expect(game.getState()).toBe(NONE)
    
    game.throw(10)
    const currentRound = game.getRound()
    const currScore = game.getScore()
    expect(game.getState()).toBe(STRIKE)
    expect(currScore - prevScore).toBe(10)
    expect(currentRound - prevRound).toBe(1)
})

test('前一轮没有投中10个，第一次投球打中10个： 状态由NONE变为STRIKE, 得分加10分', () => {
    expect(game.getState()).toBe(NONE)
    const prevScore = game.getScore()
    game.throw(10)
    const currScore = game.getScore()
    expect(game.getState()).toBe(STRIKE)
    expect(currScore - prevScore).toBe(10)
})

test('前一轮一投投中10个，这一轮第一次投球打中8个： 状态由STRIKE变为ONCE, 得分加16分', () => {
    game.throw(10)
    const prevScore = game.getScore()
    expect(game.getState()).toBe(STRIKE)
    game.throw(8)
    const currScore = game.getScore()
    expect(game.getState()).toBe(ONCE)
    expect(currScore - prevScore).toBe(16)
})

test('前一轮一投投中10个，这一轮第一次投球打中8个： 状态由STRIKE变为ONCE, 得分加16分； 第二次投中2个， 状态由ONCE变为SRARE, 得分再加4分,轮数+1', () => {
    game.throw(10)
    const prevRound = game.getRound()
    const prevScore = game.getScore()
    expect(game.getState()).toBe(STRIKE)
    game.throw(8)
    expect(game.getState()).toBe(ONCE)
    game.throw(2)
    const currRound = game.getRound()
    const currScore = game.getScore()
    expect(game.getState()).toBe(SRARE)
    expect(currScore - prevScore).toBe(16 + 4)
    expect(currRound - prevRound).toBe(1)
})

test('前一轮一投投中10个，这一轮第一次投球打中8个： 状态由STRIKE变为ONCE, 得分加16分； 第二次投中1个， 状态由ONCE变为NONE, 得分再加2分,轮数+1', () => {
    game.throw(10)
    const prevRound = game.getRound()
    expect(game.getState()).toBe(STRIKE)
    game.throw(8)
    expect(game.getState()).toBe(ONCE)
    const prevScore = game.getScore()
    game.throw(1)
    const currRound = game.getRound()
    const currScore = game.getScore()
    expect(game.getState()).toBe(NONE)
    expect(currScore - prevScore).toBe(2)
    expect(currRound - prevRound).toBe(1)
})

test('前一轮一投投中10个，这一轮第一次投球打中10个： 状态由STRIKE变为STRIKE, 得分加20分,轮数+1', () => {
    game.throw(10)
    const prevRound = game.getRound()
    const prevScore = game.getScore()        
    expect(game.getState()).toBe(STRIKE)
    game.throw(10)
    const currRound = game.getRound()
    const currScore = game.getScore()        
    expect(game.getState()).toBe(STRIKE)
    expect(currScore - prevScore).toBe(20)
    expect(currRound - prevRound).toBe(1)
})


test('前一轮两投投中10个，这一轮第一次投球打中8个： 状态由SRARE变为ONCE, 得分加16分', () => {
    game.throw(2)
    game.throw(8)
    const prevScore = game.getScore()    
    expect(game.getState()).toBe(SRARE)
    game.throw(8)
    const currScore = game.getScore()    
    expect(game.getState()).toBe(ONCE)
    expect(currScore - prevScore).toBe(16)
})

test('前一轮两投投中10个，这一轮第一次投球打中8个： 状态由SRARE变为ONCE, 得分加16分； 第二次投中2个， 状态由ONCE变为SRARE, 得分再加2分,轮数+1', () => {
    game.throw(2)
    game.throw(8)
    const prevRound = game.getRound()
    expect(game.getState()).toBe(SRARE)
    game.throw(8)
    expect(game.getState()).toBe(ONCE)
    const prevScore = game.getScore()
    game.throw(2)
    const currRound = game.getRound()
    const currScore = game.getScore()
    expect(game.getState()).toBe(SRARE)
    expect(currScore - prevScore).toBe(2)
    expect(currRound - prevRound).toBe(1)
})

test('前一轮两投投中10个，这一轮第一次投球打中8个： 状态由SRARE变为ONCE, 得分加16分； 第二次投中1个， 状态由ONCE变为NONE, 得分再加1分,轮数+1', () => {
    game.throw(2)
    game.throw(8)
    const prevRound = game.getRound()
    expect(game.getState()).toBe(SRARE)
    game.throw(8)
    expect(game.getState()).toBe(ONCE)
    const prevScore = game.getScore()
    game.throw(1)
    const currRound = game.getRound()
    const currScore = game.getScore()
    expect(game.getState()).toBe(NONE)
    expect(currRound - prevRound).toBe(1)
    expect(currScore - prevScore).toBe(1)
})

test('前一轮两投投中10个，这一轮第一次投球打中10个： 状态由SRARE变为STRIKE, 得分加20分,轮数+1', () => {
    game.throw(2)
    game.throw(8)
    const prevRound = game.getRound()
    const prevScore = game.getScore()
    expect(game.getState()).toBe(SRARE)
    game.throw(10)
    const currRound = game.getRound()
    const currScore = game.getScore()
    expect(game.getState()).toBe(STRIKE)
    expect(currRound - prevRound).toBe(1)
    expect(currScore - prevScore).toBe(20)

})