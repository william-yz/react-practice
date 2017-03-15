import React from 'react'
import { connect } from 'react-redux'

import { Card, Spin } from 'antd'
import TodoList from './components/TodoList'

const App = ({loading}) => {
  
  return (
    <Card
      title="Todo List">
      <Spin spinning={loading} >
        <TodoList />
      </Spin>
    </Card>
  )
}

export default connect(({loading}) => {
  return {
    loading
  }
})(App)