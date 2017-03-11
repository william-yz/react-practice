import { browserHistory as history } from 'react-router'

export default {
  ...history,
  push () {
    console.log(arguments)
    history.push.apply(history, arguments)
  }
}