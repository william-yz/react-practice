import React from 'react'
import renderer from 'react-test-renderer'

import Actions from '../Actions'

test('Actions case 1', () => {
  const addTodo = jest.fn()
  const redo = jest.fn()
  const someoneIsEditting = true
  const redoabled = true
  const component = renderer.create(<Actions
    addTodo={addTodo}
    redo={redo}
    someoneIsEditting={someoneIsEditting}
    redoabled={redoabled}
  />)
  const actions = component.toJSON()
  expect(actions).toMatchSnapshot()
})

test('Actions case 2', () => {
  const addTodo = jest.fn()
  const redo = jest.fn()
  const someoneIsEditting = true
  const redoabled = false
  const component = renderer.create(<Actions
    addTodo={addTodo}
    redo={redo}
    someoneIsEditting={someoneIsEditting}
    redoabled={redoabled}
  />)
  const actions = component.toJSON()
  expect(actions).toMatchSnapshot()
})

test('Actions case 3', () => {
  const addTodo = jest.fn()
  const redo = jest.fn()
  const someoneIsEditting = false
  const redoabled = true
  const component = renderer.create(<Actions
    addTodo={addTodo}
    redo={redo}
    someoneIsEditting={someoneIsEditting}
    redoabled={redoabled}
  />)
  const actions = component.toJSON()
  expect(actions).toMatchSnapshot()
})

test('Actions case 4', () => {
  const addTodo = jest.fn()
  const redo = jest.fn()
  const someoneIsEditting = false
  const redoabled = false
  const component = renderer.create(<Actions
    addTodo={addTodo}
    redo={redo}
    someoneIsEditting={someoneIsEditting}
    redoabled={redoabled}
  />)
  const actions = component.toJSON()
  expect(actions).toMatchSnapshot()
})
