import React, { PropTypes } from 'react'
import history from './history'

const style = {
  height: '800px',
}

const go = index => () => {
  const currentLocation = history.getCurrentLocation()
  const curruentPathname = currentLocation.pathname === '/' ? '' : currentLocation.pathname
  history.push({
    pathname: `${curruentPathname}/panel-layer${index}`,
  })
}
const MainPanel = ({ children }) => (
  <div style={style}>
    <button onClick={go(1)}>Panel 1</button>
    <button onClick={go(2)}>Panel 2</button>
    <button onClick={go(3)}>Panel 3</button>
    {children}
  </div>
  )

export default MainPanel

MainPanel.propTypes = {
  children: PropTypes.node.isRequired,
}
