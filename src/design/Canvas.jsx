import React, { PropTypes } from 'react'
import { Row, Col, Card, Button } from 'antd'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

import componentRender from './componentRender'

const autoLayout = span => ({
  xs: 24 * span,
  sm: 12 * span,
  md: 6 * span,
  lg: 6 * span,
  xl: 6 * span,
})

const SortableItem = SortableElement(
  ({ component, componentIndex, changeCurrentComponent, currentComponentIndex }) =>
    <Col
      {...autoLayout(component.span)}
      onClick={changeCurrentComponent(componentIndex)}
      style={{ backgroundColor: currentComponentIndex === componentIndex ? '#EEEEEE' : 'white' }}
    >
      {componentRender(component)}
    </Col>,
)

const SortableList = SortableContainer(
  ({ components, changeCurrentComponent, currentComponentIndex }) => (
    <Row gutter={24}>
      {
          components.map((component, index) => (
            <SortableItem
              component={component}
              componentIndex={index}
              index={index}
              key={index}
              changeCurrentComponent={changeCurrentComponent}
              currentComponentIndex={currentComponentIndex}
            />
          ))
        }
    </Row>))

export default function Canvas({
  components,
  addComponent,
  changeCurrentComponent,
  currentComponentIndex,
  save,
  preview,
  onSortEnd }) {
  const ondrop = (event) => {
    const type = event.dataTransfer.getData('type')
    addComponent(type)
  }
  return (
    <Card
      title="Canvas"
      style={{ height: '800px' }}
      onDragOver={e => e.preventDefault()}
      onDrop={ondrop}
      extra={(<div><Button onClick={save}>Save</Button>
        <Button onClick={preview}>Preview</Button></div>)}
    >
      <SortableList
        components={components}
        changeCurrentComponent={changeCurrentComponent}
        currentComponentIndex={currentComponentIndex}
        axis="xy"
        onSortEnd={onSortEnd}
      />
    </Card>
  )
}

Canvas.propTypes = {
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
  addComponent: PropTypes.func.isRequired,
  changeCurrentComponent: PropTypes.func.isRequired,
  currentComponentIndex: PropTypes.number.isRequired,
  save: PropTypes.func.isRequired,
  preview: PropTypes.func.isRequired,
  onSortEnd: PropTypes.func.isRequired,
}
