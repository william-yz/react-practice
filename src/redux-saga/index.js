import React from 'react'
import { Provider } from 'react-redux'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import reducers from './reducers'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()
import App from './App'

const store = createStore(reducers,
  applyMiddleware(thunk, sagaMiddleware, createLogger()))

sagaMiddleware.run(sagas, store.getState)
const Saga = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default Saga