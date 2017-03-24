import React, { PropTypes } from 'react'
import './app.css'

export default function App({ children }) {
  return (
    <div>
      { children }
    </div>
  )
}

App.propTypes = {
  children: PropTypes.node,
}
