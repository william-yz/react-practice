import React from 'react'

import Page from './Page'

export default function Runtime () {
  const datas = JSON.parse(window.localStorage.getItem('components')) || []
  return (
    <div>
      <Page components={datas}/>
    </div>
  )
}