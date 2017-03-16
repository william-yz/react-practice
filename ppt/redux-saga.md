title: redux-saga
speaker: Yang Zhe
url: https://github.com/ksky521/nodePPT
transition: cards
theme: color
[slide]

# Redex-saga & Generator
## 杨哲

[slide]
# What's redux-saga
- 一个用于管理 Redux 应用异步操作的中间件 {:&.moveIn}
- redux-saga 通过创建 Sagas 将所有的异步操作逻辑收集在一个地方集中处理，可以用来代替 redux-thunk 中间件
- 基于generator
- 易于测试

[slide]
# react/redux 的异步
- 不用中间件(如redux-thunk)能否进行异步操作? {:&.moveIn}
- 实现一个这样的效果[Todo-List](http://192.168.0.119:46413/saga)
 - 因为redux的action是一个普通的js对象

 ```javascript
    function onload (dispatch) {
        dispatch({type: START_LOADING})
        fetch(...).then((datas) => {
            dispatch({type: RECEIVE_DATAS, payload: datas})
            dispatch({type: STOP_LOADIND})
        })
    }
 ```
 - 这个控制流程需要放在component中
 - 当然你可以自己简单写一套代码,让他能方便的分离这段代码
  * 你写出了redux-thunk {:&.moveIn}
[slide]
# react/redux 的异步
- 引入redux-thunk
- 让redux支持action是一个函数
- [gitlib](http://git.ht.com/WFDEV/HongtooJetLab/tree/ASYNC-TODO-LIST/src/redux-saga)

[slide]
# react/redux 的异步
- 使用redux-saga代替redux-thunk
- [gitlib](http://git.ht.com/WFDEV/HongtooJetLab/commit/3f47002555d92dbc51b4282becdc558470bc652b)

[slide]
 # 使用saga
 - Redo {:&.moveIn}
  1. 增加一个用于标记软删除的字段deleted {:&.moveIn}
  2. 点击删除时,把这条的deleted设为true,更新state.
  3. setTimeout -> 真正的删除,then,更新state
  4. 当点击redo时, 拿到这些定时器,clearTimeout,把所有的deleted设为false,更新state
 - [gitlib](http://git.ht.com/WFDEV/HongtooJetLab/blob/yz/src/redux-saga/sagas.js)

[slide]
 # 使用saga
 - 单元测试
 - [gitlib](http://git.ht.com/WFDEV/HongtooJetLab/commit/ddef8ee743f1b705693f857cb3fc1a3e98778d1f)

[slide]
 # ES6 generator

 ```javascript
    function* f () {
      const a = yield 'a'
      console.log(a)
      return a
    }

    const generator = f()
    console.log(generator.next('b').value)
    console.log(generator.next('c').value)
 ```
[slide]
# co
```javascript
function co (fn) {
    const interator = fn()
    let next = interator.next()
    const handler = (next) => {
        if (!next.done) {
            if (next.value instanceof Promise) {
                next.value.then(function () {
                    handler(interator.next.apply(interator, arguments))
                })
            } else {
                handler(interator.next(next.value))
            }
        }
    }
    handler(next)
}

co(function* () {
    const a = yield Promise.resolve(1)
    const b = yield a + 1
    const c = yield b + 1
    const d = yield Promise.resolve(c + 1)
    console.log(d)
})

// output: 5
```
[slide]
  # Ref.
  - [redux-saga](https://redux-saga.github.io/redux-saga/index.html)  
  - [redux-saga-in-chinese](http://leonshi.com/redux-saga-in-chinese/index.html)
  - [Generator](http://www.ruanyifeng.com/blog/2015/04/generator.html)
  - [Redux中间件和异步操作](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)