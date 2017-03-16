import { put, call, take, fork, cancel } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import request from './request'

function* loadTodos () {
  while (true) {
    yield take('LOAD_TODOS')
    yield put({type: 'START_LOADING'})
    const {success, result: todos} = yield call(request.getTodoList)
    if (success) {
      yield put({type: 'RECEIVE_TODOS', payload: todos})
    }
    yield put({type: 'STOP_LOADING'})
  }
}

function* saveTodo () {
  while (true) {
    const { payload: todo } = yield take('SAVE_TODO')
    yield put({type: 'START_LOADING'})
    const {success, result: todos} = yield call(request.saveTodo, todo)
    if (success) {
      yield put({type: 'RECEIVE_TODOS', payload: todos})
    }
    yield put({type: 'STOP_LOADING'})
  }
}

function* realRemove (id, delayMs) {
  yield delay(delayMs)
  const {result: newTodos} = yield call(request.removeTodo, {id})
  yield put({type: 'RECEIVE_TODOS', payload: newTodos})
}

function* cancelTask (task, getState) {
  yield take('REDO_REMOVE')
  yield cancel(task)
  const { todos } = getState()
  const newTodos = todos.map(todo => {
    return {...todo, deleted: false}
  })
  yield put({type: 'RECEIVE_TODOS', payload: newTodos})
}

function* tempRemove (getState) {
  while (true) {
    const { payload: { id } } = yield take('REMOVE_TODO')
    const { todos } = yield call(getState)
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {...todo, deleted: true}
      } else {
        return todo
      }
    })
    yield put({type: 'RECEIVE_TODOS', payload: newTodos})
    const realRemoveTask = yield fork(realRemove, id, 10000)
    yield fork(cancelTask, realRemoveTask, getState)
  }
}

function* removeTodo (getState) {
  yield call(tempRemove, getState)
}

function* toggleComplate () {
  while (true) {
    const { payload: todo } = yield take('TOGGLE_COMPLATE')
    yield put({type: 'START_LOADING'})
    const {success, result: todos} = yield call(request.toggleComplate, todo)
    if (success) {
      yield put({type: 'RECEIVE_TODOS', payload: todos})
    }
    yield put({type: 'STOP_LOADING'})
  }
}
export default function* (getState) {
  yield [
    call(loadTodos),
    call(saveTodo),
    call(removeTodo, getState),
    call(toggleComplate)
  ]
}