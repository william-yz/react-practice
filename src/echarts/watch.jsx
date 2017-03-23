import React from 'react'

import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/gauge'

const option = {
  toolbox: {
  },
  series: [
    {
      animation: false,
      name: 'second',
      type: 'gauge',
      detail: {
        show: false,
      },
      startAngle: 90,
      endAngle: -269.999,
      min: 0,
      max: 60,
      axisLabel: {
        show: false,
      },
      itemStyle: {
        normal: {
          color: 'blue',
        },
      },
      pointer: {
        length: '90%',
      },
    },
    {
      animation: false,
      name: 'minute',
      type: 'gauge',
      detail: {
        show: false,
      },
      startAngle: 90,
      endAngle: -269.999,
      min: 0,
      max: 60,
      axisLabel: {
        show: false,
      },
      pointer: {
        length: '60%',
      },
      itemStyle: {
        normal: {
          color: 'red',
        },
      },
    },
    {
      animation: false,
      name: 'hour',
      type: 'gauge',
      detail: {
        show: false,
      },
      startAngle: 90,
      endAngle: -269.999,
      min: 0,
      max: 12,
      splitNumber: 12,
      axisLabel: {
        formatter(value) {
          return value === 0 ? '' : value
        },
      },
      pointer: {
        length: '40%',
      },
      itemStyle: {
        normal: {
          color: 'green',
        },
      },
      lineStyle: {
        color: [
          [1, '#337ab7'],
        ],
        width: 6,
      },
    },
  ],

}
export default class Watch extends React.PureComponent {


  componentDidMount = () => {
    this.watch = echarts.init(this.node)
    this.watch.setOption(option)
    this.run()
  }

  setTime = () => {
    const now = new Date()
    const second = now.getSeconds() + (now.getMilliseconds() / 1000)
    const minute = now.getMinutes() + (second / 60)
    const hour = (now.getHours() % 12) + (minute / 60)
    this.watch.setOption({
      series: [{
        data: [{ value: second }],
      },
      {
        data: [{ value: minute }],
      },
      {
        data: [{ value: hour }],
      }],
    })
  }

  run = () => {
    setInterval(this.setTime, 200)
  }

  render() {
    return (
      <div ref={(ref) => { this.node = ref }} style={{ wigth: 600, height: 600 }} />
    )
  }
}
