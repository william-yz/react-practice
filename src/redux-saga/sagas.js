import { put, call, takeEvery } from 'redux-saga/effects'
import request from './request'

function* loadTodos () {
  yield takeEvery('LOAD_TODOS', function* () {
    yield put({type: 'START_LOADING'})
    const {success, result: todos} = yield call(request.getTodoList)
    if (success) {
      yield put({type: 'RECEIVE_TODOS', payload: todos})
    }
    yield put({type: 'STOP_LOADING'})
  })
}

function* saveTodo () {
  yield takeEvery('SAVE_TODO', function* ({payload: todo}) {
    yield put({type: 'START_LOADING'})
    const {success, result: todos} = yield call(request.saveTodo, todo)
    if (success) {
      yield put({type: 'RECEIVE_TODOS', payload: todos})
    }
    yield put({type: 'STOP_LOADING'})
  })
}

function* removeTodo () {
  yield takeEvery('REMOVE_TODO', function* ({payload: todo}) {
    yield put({type: 'START_LOADING'})
    const {success, result: todos} = yield call(request.removeTodo, todo)
    if (success) {
      yield put({type: 'RECEIVE_TODOS', payload: todos})
    }
    yield put({type: 'STOP_LOADING'})
  })
}

function* toggleComplate () {
  yield takeEvery('TOGGLE_COMPLATE', function* ({payload: todo}) {
    yield put({type: 'START_LOADING'})
    const {success, result: todos} = yield call(request.toggleComplate, todo)
    if (success) {
      yield put({type: 'RECEIVE_TODOS', payload: todos})
    }
    yield put({type: 'STOP_LOADING'})
  })
}
export default function* () {
  yield [
    call(loadTodos),
    call(saveTodo),
    call(removeTodo),
    call(toggleComplate)
  ]
}