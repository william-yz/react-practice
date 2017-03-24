import { put, call, take } from 'redux-saga/effects'
import { loadTodos } from '../sagas'

import request from '../request'

test('loadTodos', () => {
  const interator = loadTodos()
  // success
  expect(interator.next().value).toEqual(take('LOAD_TODOS'))
  expect(interator.next().value).toEqual(put({ type: 'START_LOADING' }))
  expect(interator.next().value).toEqual(call(request.getTodoList))
  expect(interator.next({ success: true, result: [] }).value).toEqual(put({ type: 'RECEIVE_TODOS', payload: [] }))
  expect(interator.next().value).toEqual(put({ type: 'STOP_LOADING' }))

  // fail
  expect(interator.next().value).toEqual(take('LOAD_TODOS'))
  expect(interator.next().value).toEqual(put({ type: 'START_LOADING' }))
  expect(interator.next().value).toEqual(call(request.getTodoList))
  expect(interator.next({ success: false, result: [] }).value).toEqual(put({ type: 'STOP_LOADING' }))
})

