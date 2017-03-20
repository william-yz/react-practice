import React from 'react'
import NonePure from './none-pure'
import Pure from './pure'
import PureOrNot from './pure-or-not'

let next = 6
class PureComponent extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      list: ['1', '2', '3', '4', '5'],
    }
  }

  handleMutableClick = () => {
    this.state.list.push(`${next}`)
    next += 1
    this.setState({
      list: this.state.list,
    })
  }

  handleImmutableClick = () => {
    this.setState({
      list: [...this.state.list, `${next}`],
    })
    next += 1
  }

  update = () => {
    this.setState({
      list: this.state.list,
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleMutableClick}>Add Element mutable</button>
        <button onClick={this.handleImmutableClick}>Add Element immutable</button>
        <button onClick={this.update}>Update</button>

        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <NonePure list={this.state.list} />
          <Pure list={this.state.list} />
          <PureOrNot list={this.state.list} />
        </div>
      </div>
    )
  }
}

export default PureComponent
