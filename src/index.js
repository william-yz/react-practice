import React from 'react'  // 引入React
import { render } from 'react-dom' // 引入render方法
import { Router, Route, browserHistory } from 'react-router'

import App from './App'

import Runtime from './runtime'
import Design from './design'
render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/runtime" component={Runtime}/>
      <Route path="/design" component={Design}/>
    </Route>
  </Router>,
  document.getElementById('root')
)
