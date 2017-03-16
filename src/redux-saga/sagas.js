import { put, call, take } from 'redux-saga/effects'
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

function* removeTodo () {
  while (true) {
    const { payload: todo } = yield take('REMOVE_TODO')
    yield put({type: 'START_LOADING'})
    const {success, result: todos} = yield call(request.removeTodo, todo)
    if (success) {
      yield put({type: 'RECEIVE_TODOS', payload: todos})
    }
    yield put({type: 'STOP_LOADING'})
  }
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
export default function* () {
  yield [
    call(loadTodos),
    call(saveTodo),
    call(removeTodo),
    call(toggleComplate)
  ]
}