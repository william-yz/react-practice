import React from 'react'
import { Provider, connect } from './react-redux'
import { createStore, combineReducers } from './redux'
import NonePure from './none-pure'
import Pure from './pure'
import PureOrNot from './pure-or-not'

const reducer1 = (state = { a: 1 }) => state
const reducer = (state = {
  list: ['1', '2', '3', '4', '5'],
  other: '',
}, action) => {
  switch (action.type) {
    case 'MUTABLE':
      state.list.push(action.payload)
      return { ...state, list: state.list }
    case 'IMMUTABLE':
      return { ...state, list: [...state.list, action.payload] }
    case 'UPDATE':
      return { ...state, other: 'other' }
    default:
      return state
  }
}
const store = createStore(combineReducers({
  a: reducer,
  b: reducer1,
}))

const next = 6
const mapStateToProps = ({ a: { list } }) => ({
  list,
})
const mapDispatchToProps = dispatch => ({
  handleMutableClick: () => dispatch({ type: 'MUTABLE', payload: `${next}` }),
  handleImmutableClick: () => dispatch({ type: 'IMMUTABLE', payload: `${next}` }),
  update: () => dispatch({ type: 'UPDATE' }),
})
const PureComponent = connect(mapStateToProps, mapDispatchToProps)(
  ({ handleMutableClick, handleImmutableClick, update, list }) => (
    <div>
      <button onClick={handleMutableClick}>Add Element mutable</button>
      <button onClick={handleImmutableClick}>Add Element immutable</button>
      <button onClick={update}>Update</button>

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <NonePure list={list} />
        <Pure list={list} />
        <PureOrNot list={list} />
      </div>
    </div>
))

const App = () => (
  <Provider store={store}>
    <PureComponent />
  </Provider>
)

export default App
