import React from 'react'

import { Card } from 'antd'
import TodoList from './components/TodoList'

const App = () => {
  
  return (
    <Card
      title="Todo List">
      <TodoList />
    </Card>
  )
}

export default App