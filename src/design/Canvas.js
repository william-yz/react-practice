import React from 'react'
import { Row, Col, Card } from 'antd'

import componentRender from './componentRender'

const autoLayout = (span) => {
  return {
    xs: 24 * span,
    sm: 12 * span,
    md: 6 * span,
    lg: 6 * span,
    xl: 6 * span
  }
}
export default function Canvas ({ components, addComponent, changeCurrentComponent, currentComponentIndex }) {
  const ondrop = (event) => {
    const type = event.dataTransfer.getData('type')
    addComponent(type)
  }
  return (
    <Card
      title="Canvas"
      style={{height: '800px'}}
      onDragOver={e => e.preventDefault()}
      onDrop={ondrop}
      >
      <Row gutter={24}>
          {components.map((component, index) => (
            <Col 
              {...autoLayout(component.span)}
              key={index}
              onClick={changeCurrentComponent(index)}
              style={{backgroundColor: currentComponentIndex === index ? '#EEEEEE' : 'white'}}
              >
              {componentRender(component)}
            </Col>
          ))}
      </Row>
    </Card>
  )
}