import React from 'react'
import { Row, Col, Card, Form } from 'antd'

import componentRender from './componentRender'

const autoLayout = (span) => {
  return {
    xs: 24 * span,
    sm: 24 * span,
    md: 6 * span,
    lg: 6 * span,
    xl: 6 * span
  }
}

export default function Page ({ components }) {
  return (
    <Card title="Detail Page" style={{width: '60%', height: '800px'}}>
        <Form>
          <Row gutter={24}>
              {components.map((component, index) => (
                <Col {...autoLayout(component.span)} key={index}>
                  {componentRender(component)}
                </Col>
              ))}
          </Row>
        </Form>
    </Card>
  )
}