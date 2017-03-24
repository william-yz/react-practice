export class Store {
  constructor(initState, reducer) {
    this.state = initState
    this.reducer = reducer
    this.listeners = []
  }

  getState() {
    return this.state
  }

  dispatch(action) {
    const newState = this.reducer(this.state, action)
    if (newState !== this.state) {
      this.state = newState
      this.listeners.forEach(listener => listener(this))
    }
  }

  subscribe(listener) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(existListener => existListener !== listener)
    }
  }
}

export const createStore = (reducer) => {
  const initState = reducer(undefined, {})
  const store = new Store(initState, reducer)
  return store
}

export const combineReducers = (reducers) => {
  const initState = {}
  Object.keys(reducers).forEach((reducerName) => {
    initState[reducerName] = reducers[reducerName](undefined, {})
  })
  return (state = initState, action) => {
    const newState = {}
    Object.keys(reducers).forEach((reducerName) => {
      newState[reducerName] = reducers[reducerName](state[reducerName], action)
    })
    return newState
  }
}
