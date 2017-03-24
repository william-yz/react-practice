import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { Card, Spin } from 'antd'
import TodoList from './components/TodoList'

const App = ({ loading }) => (
  <Card
    title="Todo List"
  >
    <Spin spinning={loading} >
      <TodoList />
    </Spin>
  </Card>
  )

export default connect(({ loading }) => ({
  loading,
}))(App)

App.propTypes = {
  loading: PropTypes.bool,
}

App.defaultProps = {
  loading: false,
}
