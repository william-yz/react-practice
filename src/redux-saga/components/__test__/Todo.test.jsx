import React from 'react'
import renderer from 'react-test-renderer'

import Todo from '../Todo'

test('Todo case 1', () => {
  const props = {
    save: jest.fn(),
    edit: jest.fn(),
    input: jest.fn(),
    removeTodo: jest.fn(),
    editting: true,
    content: 'abcd',
    complated: false,
    otherIsEditting: false,
  }
  const component = renderer.create(
    <Todo
      {...props}
    />)
  const actions = component.toJSON()
  expect(actions).toMatchSnapshot()
})

test('Todo case 2', () => {
  const props = {
    save: jest.fn(),
    edit: jest.fn(),
    input: jest.fn(),
    removeTodo: jest.fn(),
    editting: false,
    content: 'abcd',
    complated: false,
    otherIsEditting: false,
  }
  const component = renderer.create(
    <Todo
      {...props}
    />)
  const actions = component.toJSON()
  expect(actions).toMatchSnapshot()
})

test('Todo case 3', () => {
  const props = {
    save: jest.fn(),
    edit: jest.fn(),
    input: jest.fn(),
    removeTodo: jest.fn(),
    editting: false,
    content: 'abcd',
    complated: true,
    otherIsEditting: false,
  }
  const component = renderer.create(
    <Todo
      {...props}
    />)
  const actions = component.toJSON()
  expect(actions).toMatchSnapshot()
})
