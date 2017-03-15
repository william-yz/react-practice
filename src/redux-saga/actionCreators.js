import request from './request'

export const getTodoList = () => {
  return dispatch => {
    dispatch({
      type: 'START_LOADING'
    })
    return request.getTodoList()
      .then(({success, result: todos}) => {
        dispatch({
          type: 'RECEIVE_TODOS',
          payload: todos
        })
        dispatch({
          type: 'STOP_LOADING'
        })
      })
  }
}

export const saveTodo = (todo) => {
  return dispatch => {
    dispatch({
      type: 'START_LOADING'
    })
    return request.saveTodo(todo)
      .then(({success, result: todos}) => {
        dispatch({
          type: 'RECEIVE_TODOS',
          payload: todos
        })
        dispatch({
          type: 'STOP_LOADING'
        })
      })
  }
}

export const removeTodo = (todo) => {
  return dispatch => {
    dispatch({
      type: 'START_LOADING'
    })
    return request.removeTodo(todo)
      .then(({success, result: todos}) => {
        dispatch({
          type: 'RECEIVE_TODOS',
          payload: todos
        })
        dispatch({
          type: 'STOP_LOADING'
        })
      })
  }
}

export const toggleComplate = (todo) => {
  return dispatch => {
    dispatch({
      type: 'START_LOADING'
    })
    return request.toggleComplate(todo)
      .then(({success, result: todos}) => {
        dispatch({
          type: 'RECEIVE_TODOS',
          payload: todos
        })
        dispatch({
          type: 'STOP_LOADING'
        })
      })
  }
}