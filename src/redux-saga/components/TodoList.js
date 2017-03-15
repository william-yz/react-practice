import React from 'react'

import { Timeline } from 'antd'
import { connect } from 'react-redux'

import Todo from './Todo'
import Actions from './Actions'

const style = {
  width: '300px'
}

const TodoList = ({ todos, dispatch}) => {
  const addTodo = (todo) => {
    dispatch({
      type: 'ADD_TODO',
      payload: todo
    })
  }
  const removeTodo = todo => () => {
    dispatch({
      type: 'REMOVE_TODO',
      payload: todo
    })
  }
  const save = todo => () => {
    dispatch({
      type: 'SAVE_TODO',
      payload: todo
    })
  }
  const edit = todo => () => {
    dispatch({
      type: 'EDIT_TODO',
      payload: todo
    })
  }

  const input = todo => (e) => {
    dispatch({
      type: 'INPUTTING_TODO',
      payload: {...todo, content: e.target.value}
    })
  }

  const complate = todo => () => {
    dispatch({
      type: todo.complated ? 'INCOMPLATE_TODO' : 'COMPLATE_TODO',
      payload: todo
    })
  }
  return (
    <div>
      <Timeline>
        {todos.map((todo, index) => (
          <Timeline.Item
            key={todo.id}
            style={style}
            color={todo.complated ? 'green' : 'blue'}
            onDoubleClick={complate(todo)}
          >
            <Todo {...todo} save={save(todo)} input={input(todo)} edit={edit(todo)} removeTodo={removeTodo(todo)}/>
          </Timeline.Item>
          ))}
      </Timeline>
      <Actions addTodo={addTodo.bind({
        content: '',
        editting: true
      })}/>
    </div>
  )
}

const mapStateToProps = ({todos}) => {
  return {
    todos
  }
}

export default connect(mapStateToProps)(TodoList)