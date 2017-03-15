
let id = 0

const g = (function* () {
  while(true)
    yield id ++
})()

const nextId = () => g.next().value

const reducers = {
  'ADD_TODO': (state, { content }) => {
    return {
        todos: [...state.todos, {
            id: nextId(),
            content: content,
            editting: true,
            complated: false
          }]}
  },
  'SAVE_TODO': (state, { id, content }) => {
    return {
        todos: state.todos.map(todo => {
          if (todo.id === id) {
            return {...todo, editting: false}
          } else {
            return todo
          }
        })}
  },
  'REMOVE_TODO': (state, { id }) => {
    return {
      todos: state.todos.filter(todo => todo.id !== id)
    }
  },
  'INPUTTING_TODO': (state, { id, content }) => {
    return {
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
      todos: state.todos.map(todo => {
        if (todo.id === id) {
          return {...todo, editting: true}
        } else {
          return todo
        }
      })}
  },
  'COMPLATE_TODO': (state, { id }) => {
    return {
      todos: state.todos.map(todo => {
        if (todo.id === id) {
          return {...todo, complated: true}
        } else {
          return todo
        }
      })}
  },
  'INCOMPLATE_TODO': (state, { id }) => {
    return {
      todos: state.todos.map(todo => {
        if (todo.id === id) {
          return {...todo, complated: false}
        } else {
          return todo
        }
      })}
  }
}


export default (state = {
  todos: []
}, {type, payload}) => {
  return reducers[type] ? reducers[type](state, payload) : state
}