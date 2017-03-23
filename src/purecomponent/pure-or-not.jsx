import React from 'react'

const PureOrNot = ({ list }) => {
  console.log('here in PureOrNot')
  return (
    <div>
      <ul>
        {list.map((ele, index) => <li key={index}>{ele}</li>)}
      </ul>
    </div>
  )
}

PureOrNot.propTypes = {
  list: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
}

export default PureOrNot
