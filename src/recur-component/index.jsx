import React from 'react'
import Tree from './Tree'

const data = [{
  name: 'node1',
  children: [{
    name: 'node2',
    children: [{
      name: 'node4',
    }],
  }, {
    name: 'node3',
  }],
}]

const Recur = () => (
  <div>
    <Tree data={data} />
  </div>
)
export default Recur
