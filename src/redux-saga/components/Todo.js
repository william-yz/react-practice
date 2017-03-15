import React from 'react'

import { Input, Icon } from 'antd'
import './Todo.css'

export default ({ save, edit, input, removeTodo, editting, content, complated, otherIsEditting }) => {
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
        <div className="editable-cell-input-wrapper" style={{textDecoration: complated ? 'line-through' : 'none'}}>
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
