import React from 'react'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'

import MainPanel from './MainPanel'
import SubPanel from './SubPanel'

const range = (range) => {
  let arr = []
  for (let i = 0; i < range; i++) {
    arr.push(i)
  }
  return arr
}

const t = (props) => {
  return (
    <div>
      <SubPanel {...props} />
      <SubPanel {...props} />      
    </div>
  )
}

const getLayerParams = (params, layer) => {
  for (let key in params) {
    // if (key.)
  }
}

const produceRoutes = (layers) => {
  return range(layers + 1).map(layer => {
    const path = range(layer).map(i => `/panel-:layer${i}`).join('')
    const getComponents = (nextState, callback) => {
      const f = (props) => {
        return (
          <div style={{display: '-webkit-box'}}>
            {range(layer).map((key) => <SubPanel key={key} {...props}/>)}
          </div>
        )
      }
      callback(null, f)
    }
    return {
      path,
      getComponents
    }
  })
}



const routes = produceRoutes(5)

const Demo = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={MainPanel} childRoutes={routes} />
    </Router>
  )

}

export default Demo