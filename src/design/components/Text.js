import React from 'react'
import { Input } from 'antd'


export default function Text ({ label }) {
  return (
    <label>
      {label}
      <Input />
    </label>
  )
}