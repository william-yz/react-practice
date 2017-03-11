import React from 'react'
import { Input, Row } from 'antd'

const style = {}

export default function Text ({ label }) {
  return (
    <label>
      {label}
      <Input />
    </label>
  )
}