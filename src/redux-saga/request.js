
const c = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
const uid = (i = 8, result = '') => 
  i > 0 ? uid(i - 1, result + c[Math.floor(Math.random() * c.length)]) : result

const getTodoFromLocalStorage = () => {
  return JSON.parse(window.localStorage.getItem('todo-list')) || []
}

const update = ({id, content, complated}) => {
  const todos = getTodoFromLocalStorage()
  const newTodos = todos.map(todo => {
    if (todo.id === id) {
      return {...todo, content, complated}
    } else {
      return todo
    }
  })
  window.localStorage.setItem('todo-list', JSON.stringify(newTodos))
  return newTodos
}

const insert = ({content, complated}) => {
  const todos = getTodoFromLocalStorage()
  todos.push({id: uid(), content, complated})
  window.localStorage.setItem('todo-list', JSON.stringify(todos))
  return todos
}
export default {
  getTodoList () {
    return new Promise(resovle => {
      setTimeout(() => {
        resovle({
          success: true,
          result: getTodoFromLocalStorage()
        })
      }, 1000)
    })
  },

  saveTodo ({id, content, complated}) {
    return new Promise(resovle => {
      setTimeout(() => {
        debugger
        if (id.startsWith('temp-')) {
          resovle({
            success: true,
            result: insert({content, complated})
          })
        } else {
          resovle({
            success: true,
            result: update({id, content, complated})
          })
        }
      }, 1000)
    })
  },

  removeTodo ({id}) {
    return new Promise(resovle => {
      setTimeout(() => {
        const todos = getTodoFromLocalStorage()
        const newTodos = todos.filter(todo => todo.id !== id)
        window.localStorage.setItem('todo-list', JSON.stringify(newTodos))
        resovle({
          success: true,
          result: newTodos
        })
      }, 1000)
    })
  },

  toggleComplate ({id}) {
    return new Promise(resovle => {
      setTimeout(() => {
        const todos = getTodoFromLocalStorage()
        const newTodos = todos.map(todo => {
          if (todo.id === id) {
            return {...todo, complated: !todo.complated}
          } else {
            return todo
          }
        })
        window.localStorage.setItem('todo-list', JSON.stringify(newTodos))
        resovle({
          success: true,
          result: newTodos
        })
      }, 1000)
    })
  }
}