import request from './request'

export const getTodoList = () => (dispatch) => {
  dispatch({
    type: 'START_LOADING',
  })
  return request.getTodoList()
      .then(({ result: todos }) => {
        dispatch({
          type: 'RECEIVE_TODOS',
          payload: todos,
        })
        dispatch({
          type: 'STOP_LOADING',
        })
      })
}

export const saveTodo = todo => (dispatch) => {
  dispatch({
    type: 'START_LOADING',
  })
  return request.saveTodo(todo)
      .then(({ result: todos }) => {
        dispatch({
          type: 'RECEIVE_TODOS',
          payload: todos,
        })
        dispatch({
          type: 'STOP_LOADING',
        })
      })
}

export const removeTodo = todo => (dispatch) => {
  dispatch({
    type: 'START_LOADING',
  })
  return request.removeTodo(todo)
      .then(({ result: todos }) => {
        dispatch({
          type: 'RECEIVE_TODOS',
          payload: todos,
        })
        dispatch({
          type: 'STOP_LOADING',
        })
      })
}

export const toggleComplate = todo => (dispatch) => {
  dispatch({
    type: 'START_LOADING',
  })
  return request.toggleComplate(todo)
      .then(({ result: todos }) => {
        dispatch({
          type: 'RECEIVE_TODOS',
          payload: todos,
        })
        dispatch({
          type: 'STOP_LOADING',
        })
      })
}
