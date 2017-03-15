
let id = 0

const g = (function* () {
  while(true)
    yield id ++
})()

const nextId = () => g.next().value

const reducers = {
  'RECEIVE_TODOS': (state, todos) => {
    return {
      ...state,
      todos: todos.map((todo, index) => {
        return {...todos[index], editting: false}
      })
    }
  },
  'ADD_TODO': (state, { content }) => {
    return {
      ...state,
      todos: [...state.todos, {
          id: 'temp-' + nextId(),
          content: content,
          editting: true,
          complated: false
        }]}
  },
  'INPUTTING_TODO': (state, { id, content }) => {
    return {
      ...state,
      todos: state.todos.map(todo => {
        if (todo.id === id) {
          return {...todo, content}
        } else {
          return todo
        }
      })}
  },
  'EDIT_TODO': (state, { id }) => {
    return {
      ...state,
      todos: state.todos.map(todo => {
        if (todo.id === id) {
          return {...todo, editting: true}
        } else {
          return todo
        }
      })}
  },
  'START_LOADING': (state) => {
    return {
      ...state,
      loading: true
    }
  },
  'STOP_LOADING': (state) => {
    return {
      ...state,
      loading: false
    }
  }
}


export default (state = {
  todos: [],
  loading: false
}, {type, payload}) => {
  return reducers[type] ? reducers[type](state, payload) : state
}