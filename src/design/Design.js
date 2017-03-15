import React from 'react'
import _ from 'lodash'
import { Layout } from 'antd'
import ComponentsPanel from './ComponentsPanel'
import Canvas from './Canvas'
import PropsPanel from './PropsPanel'

const style = {
  backgroundColor: 'white',
  marginLeft: '5px',
  marginRight: '5px'
}

export default class Design extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      components: JSON.parse(window.localStorage.getItem('components')) || [],
      currentComponentIndex: -1
    }
  }

  componentDidMount () {
    window.onkeypress = event => {
      if (event.keyCode === 127 && this.currentComponentIndex !== -1) {
        this.setState({
          components: this.state.components.filter((v, i) => i !== this.state.currentComponentIndex),
          currentComponentIndex: -1
        })
      } 
    }
  }

  addComponent(type) {
    this.setState({
      components: [
        ...this.state.components,
        {
          type,
          span: 1,
          label: 'text'
        }
      ]
    })
  }

  changeCurrentComponent (index) {
    return () => {
      this.setState({
        currentComponentIndex: index
      })
    }
  }

  updateComponent (type, { target }) {
    const component = this.state.components[this.state.currentComponentIndex]
    const newComponent = {
      ...component,
      [type]: target.value
    }
    const newComponents = [...this.state.components]
    newComponents[this.state.currentComponentIndex] = newComponent
    this.setState({
      components: newComponents
    })
  }

  save () {
    window.localStorage.setItem('components', JSON.stringify(this.state.components))
  }

  preview () {
    this.save()
    window.open('/runtime')
  }

  onSortEnd ({oldIndex, newIndex}) {
    if (oldIndex === newIndex) return
    const minIndex = oldIndex > newIndex ? newIndex : oldIndex
    const maxIndex = oldIndex < newIndex ? newIndex : oldIndex

    const head = this.state.components.slice(0, minIndex)
    const min = this.state.components[maxIndex]
    const middle = this.state.components.slice(minIndex + 1, maxIndex)
    const max = this.state.components[minIndex]
    const tail = this.state.components.slice(maxIndex + 1)
    this.setState({
      components: _.concat(head, min, middle, max, tail),
      currentComponentIndex: newIndex
    })
  }
  render () {
    return (
      <Layout>
        <Layout.Sider
          style={style}
        >
          <ComponentsPanel />
        </Layout.Sider>
        <Layout.Content
          style={style}
        >
          <Canvas
            components={this.state.components}
            addComponent={this.addComponent.bind(this)}
            changeCurrentComponent={this.changeCurrentComponent.bind(this)}
            currentComponentIndex={this.state.currentComponentIndex}
            save={this.save.bind(this)}
            preview={this.preview.bind(this)}
            onSortEnd={this.onSortEnd.bind(this)}
            />
        </Layout.Content>
        <Layout.Sider
          style={style}
          width="300"
        >
          <PropsPanel
            component={this.state.components[this.state.currentComponentIndex]}
            updateComponent={_.curry(this.updateComponent.bind(this))}
            />
        </Layout.Sider>
      </Layout>
    )
  }
}