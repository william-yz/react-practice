import React from 'react'

import { Button } from 'antd'

export default ({ addTodo, redo, someoneIsEditting, redoabled }) => {
  return (
    <span>
      <Button type="primary" disabled={someoneIsEditting} onClick={addTodo} >Add</Button>
      &nbsp;
      <Button type="primary" disabled={someoneIsEditting || !redoabled} onClick={redo} >Redo</Button>
    </span>
  )
}
