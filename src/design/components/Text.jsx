import React, { PropTypes } from 'react'
import { Input } from 'antd'


export default function Text({ label }) {
  return (
    <label htmlFor="textInputId">
      {label}
      <Input id="textInputId" disabled />
    </label>
  )
}

Text.propTypes = {
  label: PropTypes.string.isRequired,
}
