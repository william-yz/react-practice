import React from 'react'
import { Provider } from 'react-redux'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import reducers from './reducers'

import App from './App'

const store = createStore(reducers,
  applyMiddleware(thunk, createLogger()))

const Saga = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default Saga