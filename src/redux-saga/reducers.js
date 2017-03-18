
let idid = 0

const g = (function* () {
  while (true) {
    yield idid
    idid += 1
  }
}())

const nextId = () => g.next().value

const reducers = {
  RECEIVE_TODOS: (state, todos) => ({
    ...state,
    todos: todos.map((todo, index) => ({ ...todos[index], editting: false })),
  }),
  ADD_TODO: (state, { content }) => ({
    ...state,
    todos: [...state.todos, {
      id: `temp-${nextId()}`,
      content,
      editting: true,
      complated: false,
      deleted: false,
    }] }),
  INPUTTING_TODO: (state, { id, content }) => ({
    ...state,
    todos: state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, content }
      }
      return todo
    }) }),
  EDIT_TODO: (state, { id }) => ({
    ...state,
    todos: state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, editting: true }
      }
      return todo
    }) }),
  START_LOADING: state => ({
    ...state,
    loading: true,
  }),
  STOP_LOADING: state => ({
    ...state,
    loading: false,
  }),
}


export default (state = {
  todos: [],
  loading: false,
}, { type, payload }) => (reducers[type] ? reducers[type](state, payload) : state)
