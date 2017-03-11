import React from 'react'

import _ from 'lodash'
import { Affix, Card, Input, Button } from 'antd'

const dragstart = _.curry((type, event) => {
  event.dataTransfer.setData('type', type)
})

export default function ComponentsPanel () {
  return (
    <Affix>
      <Card
        title="Components"
        style={{height: '800px'}}
        >
        <div
          draggable="true"
          onDragStart={dragstart('Text')}>
          <label>
            Text
            <Input 
              disabled={true}
            />
          </label>
        </div>
        <div
          draggable="true"
          onDragStart={dragstart('Button')}>
            <Button>
              Button
            </Button>
        </div>
      </Card>
    </Affix>
  )
}