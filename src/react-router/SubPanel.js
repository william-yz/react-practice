import React, { PropTypes } from 'react'

const style = {
  marginLeft: '10px',
  border: '1px solid black',
  width: '600px',
  height: '750px',
}

export default function SubPanel({ params }) {
  return (
    <div style={style}>
      {params['index-1']}
    </div>
  )
}
SubPanel.propTypes = {
  params: PropTypes.shape({
    'index-1': PropTypes.string,
  }).isRequired,
}
