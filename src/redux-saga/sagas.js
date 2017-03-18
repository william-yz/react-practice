import { put, call, take, fork, cancel, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import request from './request'

export function* loadTodos() {
  while (true) {
    yield take('LOAD_TODOS')
    yield put({ type: 'START_LOADING' })
    const { success, result: todos } = yield call(request.getTodoList)
    if (success) {
      yield put({ type: 'RECEIVE_TODOS', payload: todos })
    }
    yield put({ type: 'STOP_LOADING' })
  }
}

export function* saveTodo() {
  while (true) {
    const { payload: todo } = yield take('SAVE_TODO')
    yield put({ type: 'START_LOADING' })
    const { success, result: todos } = yield call(request.saveTodo, todo)
    if (success) {
      yield put({ type: 'RECEIVE_TODOS', payload: todos })
    }
    yield put({ type: 'STOP_LOADING' })
  }
}

export function* realRemove(id, delayMs) {
  yield delay(delayMs)
  const { result: newTodos } = yield call(request.removeTodo, { id })
  yield put({ type: 'RECEIVE_TODOS', payload: newTodos })
}

export function* cancelTask(task) {
  yield take('REDO_REMOVE')
  yield cancel(task)
  const { todos } = yield select()
  const newTodos = todos.map(todo => ({ ...todo, deleted: false }))
  yield put({ type: 'RECEIVE_TODOS', payload: newTodos })
}

export function* tempRemove() {
  while (true) {
    const { payload: { id } } = yield take('REMOVE_TODO')
    const { todos } = yield select()
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, deleted: true }
      }
      return todo
    })
    yield put({ type: 'RECEIVE_TODOS', payload: newTodos })
    const realRemoveTask = yield fork(realRemove, id, 10000)
    yield fork(cancelTask, realRemoveTask)
  }
}

export function* removeTodo() {
  yield call(tempRemove)
}

export function* toggleComplate() {
  while (true) {
    const { payload: todo } = yield take('TOGGLE_COMPLATE')
    yield put({ type: 'START_LOADING' })
    const { success, result: todos } = yield call(request.toggleComplate, todo)
    if (success) {
      yield put({ type: 'RECEIVE_TODOS', payload: todos })
    }
    yield put({ type: 'STOP_LOADING' })
  }
}
export default function* () {
  yield [
    fork(loadTodos),
    fork(saveTodo),
    fork(removeTodo),
    fork(toggleComplate),
  ]
}
