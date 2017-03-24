import React from 'react'

export default class NonePure extends React.Component { // eslint-disable-line
  render() {
    console.log('here in NonePure')
    return (
      <div>
        <ul>
          {this.props.list.map((ele, index) => <li key={index}>{ele}</li>)}
        </ul>
      </div>
    )
  }
}

NonePure.propTypes = {
  list: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
}
