import React from 'react'
import { shallow } from 'enzyme'

import Link from '../Link'

test('Link changes the class when hovered', () => {
  const link = shallow(<Link page="cccccc">abc</Link>)
  expect(link.prop('href')).toBe('cccccc')
  expect(link.prop('className')).toBe('normal')
  expect(link.text()).toBe('abc')
  link.setProps({
    page: 'bbb',
  })
  expect(link.prop('href')).toBe('bbb')
  link.setProps({
    page: undefined,
  })
  expect(link.prop('href')).toBe('#')

  link.simulate('mouseEnter')
  expect(link.prop('className')).toBe('hovered')
  link.simulate('mouseLeave')
  expect(link.prop('className')).toBe('normal')
})
