import React from 'react'

class Tree extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  toggle = () => {
    this.setState({
      open: !this.state.open,
    })
  }
  render() {
    return (
      <ul style={{ marginLeft: 10 }}>
        {this.props.data.map((d, index) => (
          <li key={`${this.props.layer}_${index}`}>
            {d.children ? <button onClick={this.toggle}>{this.state.open ? '-' : '+'}</button> : '-'} {d.name}
            {d.children && this.state.open && <Tree data={d.children} />}
          </li>
          ))}
      </ul>
    )
  }
}


const NODE_TYPE = React.PropTypes.shape({
  name: React.PropTypes.string.isRequired,
  children: React.PropTypes.array,
})

Tree.propTypes = {
  data: React.PropTypes.arrayOf(NODE_TYPE).isRequired,
  layer: React.PropTypes.number,
}

Tree.defaultProps = {
  layer: 0,
}
export default Tree
