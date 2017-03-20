/* eslint-disable */
import React from 'react'

import { Store } from '../redux'

export class Provider extends React.Component {
  getChildContext() {
    return {
      store: this.props.store,
    }
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

Provider.propTypes = {
  children: React.PropTypes.node.isRequired,
  store: React.PropTypes.instanceOf(Store).isRequired,
}

Provider.childContextTypes = {
  store: React.PropTypes.instanceOf(Store),
}

const emptyFn = () => ({})
export const connect = (mapStateToProps = emptyFn, mapDispatchToProps = emptyFn) =>
  function withConnect(WrappedComponent) {
    class ConnectedComponent extends React.PureComponent {
      constructor(...args) {
        super(...args)
        this.state = mapStateToProps(this.context.store.getState())
      }
      render() {
        this.context.store.subscribe((store) => {
          const newProps = mapStateToProps(store.getState())
          const shoudUpdate = Object.keys(newProps)
            .some(propKey => this.state[propKey] !== newProps[propKey])
          if (shoudUpdate) {
            this.setState(newProps)
          }
        })
        const dispatchProps = mapDispatchToProps(this.context.store.dispatch.bind(this.context.store))
        return (<WrappedComponent
          {...this.props}
          dispatch={this.context.store.dispatch.bind(this.context.store)}
          {...this.state}
          {...dispatchProps}
        />)
      }
    }
    ConnectedComponent.contextTypes = {
      store: React.PropTypes.instanceOf(Store),
    }
    return ConnectedComponent
  }
