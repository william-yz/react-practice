import React from 'react'
import datas from './data'
import Page from './Page'

export default function Runtime () {
  return (
    <div>
      <Page components={datas}/>
    </div>
  )
}