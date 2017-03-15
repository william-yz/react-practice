import React from 'react'

import { Button } from 'antd'

export default ({ addTodo }) => {
  return (
    <Button type="primary" onClick={addTodo} >Add</Button>
  )
}
