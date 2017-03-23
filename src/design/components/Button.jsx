import React, { PropTypes } from 'react'
import { Button as AntdButton } from 'antd'


export default function Button({ label }) {
  return (
    <AntdButton>
      {label}
    </AntdButton>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
}
