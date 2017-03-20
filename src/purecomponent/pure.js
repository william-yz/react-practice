import React from 'react'

export default class Pure extends React.PureComponent { // eslint-disable-line
  render() {
    console.log('here in Pure')
    return (
      <div>
        <ul>
          {this.props.list.map((ele, index) => <li key={index}>{ele}</li>)}
        </ul>
      </div>
    )
  }
}

Pure.propTypes = {
  list: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
}
