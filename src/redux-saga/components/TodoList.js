import React, { PropTypes } from 'react'

import { Timeline } from 'antd'
import { connect } from 'react-redux'

import Todo from './Todo'
import Actions from './Actions'

const style = {
  width: '300px',
}

class TodoList extends React.Component {
  componentDidMount = () => {
    this.props.dispatch({ type: 'LOAD_TODOS' })
  }

  addTodo = (todo = {
    content: '',
    editting: true,
  }) => {
    this.props.dispatch({
      type: 'ADD_TODO',
      payload: todo,
    })
  }
  removeTodo = todo => () => {
    this.props.dispatch({ type: 'REMOVE_TODO', payload: todo })
  }
  save = todo => () => {
    this.props.dispatch({ type: 'SAVE_TODO', payload: todo })
  }
  edit = todo => () => {
    this.props.dispatch({
      type: 'EDIT_TODO',
      payload: todo,
    })
  }

  input = todo => (e) => {
    this.props.dispatch({
      type: 'INPUTTING_TODO',
      payload: { ...todo, content: e.target.value },
    })
  }

  complate = todo => () => {
    this.props.dispatch({ type: 'TOGGLE_COMPLATE', payload: todo })
  }

  redo = () => {
    this.props.dispatch({ type: 'REDO_REMOVE' })
  }

  render() {
    return (
      <div>
        <Timeline>
          {this.props.todos.filter(todo => !todo.deleted).map(todo => (
            <Timeline.Item
              key={todo.id}
              style={style}
              color={todo.complated ? 'green' : 'blue'}
              onDoubleClick={this.complate(todo)}
            >
              <Todo
                {...todo}
                otherIsEditting={this.props.someoneIsEditting}
                save={this.save(todo)}
                input={this.input(todo)}
                edit={this.edit(todo)}
                removeTodo={this.removeTodo(todo)}
              />
            </Timeline.Item>
            ))}
        </Timeline>
        <Actions
          someoneIsEditting={this.props.someoneIsEditting}
          redoabled={this.props.todos.some(todo => todo.deleted)}
          addTodo={this.addTodo}
          redo={this.redo}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ todos }) => ({
  todos,
  someoneIsEditting: todos.some(todo => todo.editting),
})


export default connect(mapStateToProps)(TodoList)

TodoList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  someoneIsEditting: PropTypes.bool.isRequired,
}
