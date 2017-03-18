import React, { PropTypes } from 'react'

import { Affix, Card, Input, Radio } from 'antd'

import './style.css'

const { Group: RadioGroup, Button: RadioButton } = Radio


export default function PropsPanel({ component, updateComponent }) {
  return (
    <Affix>
      <Card
        title="Properties"
        style={{ height: '800px' }}
      >
        {component &&
        <div>
          <div className="mt">
            <label htmlFor="temp1">
              Label
              <Input id="temp1" value={component.label} onChange={updateComponent('label')} />
            </label>
          </div>
          <div className="mt">
            <label>
              Span
              <RadioGroup id="temp2" onChange={updateComponent('span')} value={component.span}>
                <RadioButton value={1}>1</RadioButton>
                <RadioButton value={2}>2</RadioButton>
                <RadioButton value={3}>3</RadioButton>
                <RadioButton value={4}>4</RadioButton>
              </RadioGroup>
            </label>
          </div>
        </div>
        }
      </Card>
    </Affix>
  )
}

PropsPanel.propTypes = {
  component: PropTypes.shape({
    label: PropTypes.string.isRequired,
    span: PropTypes.number.isRequired,
  }).isRequired,
  updateComponent: PropTypes.func.isRequired,
}
