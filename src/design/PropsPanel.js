import React from 'react'

import { Affix, Card, Input, Radio } from 'antd'

import './style.css'
const { Group: RadioGroup, Button: RadioButton } = Radio


export default function PropsPanel ({ component, updateComponent }) {

  return (
    <Affix>
      <Card
        title="Properties"
        style={{height: '800px'}}
        >
        {component &&
        <div>
          <div className="mt">
            <label>
              Label
              <Input value={component.label} onChange={updateComponent('label')}/>
            </label>
          </div>
          <div className="mt">
            <label>
              Span
              <RadioGroup onChange={updateComponent('span')} value={component.span}>
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