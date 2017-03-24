import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import { TodoListComponent as TodoList, mapStateToProps } from '../TodoList'

test('TodoList', () => {
  const dispatch = jest.fn()
  const todos = [{
    id: 'temp-1',
    content: 'test',
    editting: true,
    complated: false,
    deleted: false,
  }]
  const someoneIsEditting = true
  const component = renderer.create(
    <TodoList
      dispatch={dispatch}
      todos={todos}
      someoneIsEditting={someoneIsEditting}
    />)
  const todoList = component.toJSON()
  expect(todoList).toMatchSnapshot()
  expect(dispatch.mock.calls).toEqual([[{ type: 'LOAD_TODOS' }]])
})

test('TodoList 1', () => {
  const dispatch = jest.fn()
  const firstTodo = {
    id: 'temp-1',
    content: 'test',
    editting: false,
    complated: false,
    deleted: false,
  }
  const todos = [firstTodo, {
    id: 'temp-2',
    content: 'test',
    editting: true,
    complated: false,
    deleted: true,
  }, {
    id: 'temp-3',
    content: 'test',
    editting: false,
    complated: true,
    deleted: false,
  }]
  const someoneIsEditting = true
  const component = shallow(
    <TodoList
      dispatch={dispatch}
      todos={todos}
      someoneIsEditting={someoneIsEditting}
    />)
  const timelineItem = component.find('TimelineItem')
  expect(timelineItem.length).toBe(2)
  expect(timelineItem.first().prop('color')).toEqual('blue')
  timelineItem.first().prop('onDoubleClick')()
  expect(dispatch.mock.calls.pop()).toEqual([{
    type: 'TOGGLE_COMPLATE',
    payload: firstTodo }])
  expect(timelineItem.get(1).props.color).toEqual('green')
  const todo = component.find('Todo').first()

  todo.prop('save')()
  expect(dispatch.mock.calls.pop()).toEqual([{
    type: 'SAVE_TODO',
    payload: firstTodo }])

  todo.prop('input')({
    target: {
      value: '123',
    },
  })
  expect(dispatch.mock.calls.pop()).toEqual([{
    type: 'INPUTTING_TODO',
    payload: { ...firstTodo, content: '123' },
  }])

  todo.prop('edit')()
  expect(dispatch.mock.calls.pop()).toEqual([{
    type: 'EDIT_TODO',
    payload: firstTodo,
  }])

  todo.prop('removeTodo')()
  expect(dispatch.mock.calls.pop()).toEqual([{
    type: 'REMOVE_TODO',
    payload: firstTodo,
  }])

  const actions = component.find('Actions')
  expect(actions.prop('redoabled')).toBe(true)

  actions.prop('addTodo')()
  expect(dispatch.mock.calls.pop()).toEqual([{
    type: 'ADD_TODO',
    payload: {
      content: '',
      editting: true,
    },
  }])

  actions.prop('redo')()
  expect(dispatch.mock.calls.pop()).toEqual([{
    type: 'REDO_REMOVE',
  }])

  expect(mapStateToProps({
    todos,
  })).toEqual({
    todos,
    someoneIsEditting: true,
  })
})
