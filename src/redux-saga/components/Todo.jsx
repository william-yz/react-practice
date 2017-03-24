import React, { PropTypes } from 'react'

import { Input, Icon } from 'antd'
import './Todo.css'

export default function Todo({
  save,
  edit,
  input,
  removeTodo,
  editting,
  content,
  complated,
  otherIsEditting }) {
  return (
    <div className="editable-cell">
      {
          editting ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={content}
                onChange={input}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={save}
              />
            </div>
          :
          <div className="editable-cell-input-wrapper" style={{ textDecoration: complated ? 'line-through' : 'none' }}>
            {content}
            {
              (!complated && !otherIsEditting) && (
                <span>
                  <Icon
                    type="edit"
                    className="editable-cell-icon"
                    onClick={edit}
                  />
                  <Icon
                    type="delete"
                    className="delete-cell-icon"
                    onClick={removeTodo}
                  />
                </span>
              )
            }
          </div>
        }
    </div>
  )
}

Todo.propTypes = {
  save: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  input: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  editting: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  complated: PropTypes.bool.isRequired,
  otherIsEditting: PropTypes.bool.isRequired,
}
