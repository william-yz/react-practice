import React from 'react'

const style = {
  marginLeft: '10px',
  border: '1px solid black',
  width: '600px',
  height: '750px'
}

const SubPanel = ({ params }) => {
  return (
    <div style={style}>
      {params['index-1']}
    </div>
  )
}

export default SubPanel