import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import MainPanel from './MainPanel'
import SubPanel from './SubPanel'

const range = (rangeSize) => {
  const arr = []
  for (let i = 0; i < rangeSize; i += 1) {
    arr.push(i)
  }
  return arr
}

const produceRoutes = layers => range(layers + 1).map((layer) => {
  const path = range(layer).map(i => `/panel-:layer${i}`).join('')
  const getComponents = (nextState, callback) => {
    const f = props => (
      <div style={{ display: '-webkit-box' }}>
        {range(layer).map(key => <SubPanel key={key} {...props} />)}
      </div>
        )
    callback(null, f)
  }
  return {
    path,
    getComponents,
  }
})


const routes = produceRoutes(5)

const Demo = () => (
  <Router history={browserHistory}>
    <Route path="/" component={MainPanel} childRoutes={routes} />
  </Router>
  )

export default Demo
