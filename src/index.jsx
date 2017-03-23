import React from 'react'  // 引入React
import { render } from 'react-dom' // 引入render方法
import { Router, Route, browserHistory } from 'react-router'

import App from './App'

import Runtime from './runtime'
import Design from './design'
import Saga from './redux-saga'
import PureComponent from './purecomponent'
import MyRedux from './my-redux'
import Echarts from './echarts'
import RecurComponent from './recur-component'

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/runtime" component={Runtime} />
      <Route path="/design" component={Design} />
      <Route path="/saga" component={Saga} />
      <Route path="/purecomponent" component={PureComponent} />
      <Route path="/myredux" component={MyRedux} />
      <Route path="/echarts" component={Echarts} />
      <Route path="/recurcomponent" component={RecurComponent} />

    </Route>
  </Router>,
  document.getElementById('root'),
)
