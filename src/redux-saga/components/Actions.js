import React, { PropTypes } from 'react'

import { Button } from 'antd'

export default function Actions({ addTodo, redo, someoneIsEditting, redoabled }) {
  return (
    <span>
      <Button type="primary" disabled={someoneIsEditting} onClick={addTodo} >Add</Button>
        &nbsp;
      <Button type="primary" disabled={someoneIsEditting || !redoabled} onClick={redo} >Redo</Button>
    </span>
  )
}

Actions.propTypes = {
  addTodo: PropTypes.func.isRequired,
  redo: PropTypes.func.isRequired,
  someoneIsEditting: PropTypes.bool.isRequired,
  redoabled: PropTypes.bool.isRequired,
}
