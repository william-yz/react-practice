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
      components: [],
      currentComponentIndex: {}
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