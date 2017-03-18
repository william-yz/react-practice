import { browserHistory as history } from 'react-router'

export default {
  ...history,
  push(...args) {
    history.push(...args)
  },
}
