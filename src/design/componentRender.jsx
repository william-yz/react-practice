import React, { PropTypes } from 'react'

import { Form } from 'antd'
import components from './components'

export default function ComponentRender(props) {
  const Component = components[props.type]
  if (!Component) {
    throw new Error('no such component')
  }

  return (
    <Form.Item >
      <Component {...props} />
    </Form.Item>
  )
}

ComponentRender.propTypes = {
  type: PropTypes.string.isRequired,
}
