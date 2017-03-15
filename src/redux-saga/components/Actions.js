import React from 'react'

import { Button } from 'antd'

export default ({ addTodo, someoneIsEditting }) => {
  return (
    <Button type="primary" disabled={someoneIsEditting} onClick={addTodo} >Add</Button>
  )
}
