import React from 'react'
import { Button as AntdButton } from 'antd'


export default function Button ({ label }) {
  return (
    <AntdButton>
      {label}
    </AntdButton>
  )
}