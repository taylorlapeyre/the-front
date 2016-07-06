/* eslint max-len:0 */

import React from 'react'
import MenuItem from 'components/layout/MenuItem.jsx'
import { Link } from 'react-router'
import DropDownMenu from 'components/layout/DropDownMenu.jsx'
import menuResponse from 'data/menus/index'
import { shallow } from 'enzyme'

describe('components/layout/MenuItem', () => {
  let wrapper
  let submenus
  let showDropDownMenu
  let hideDropDownMenu

  beforeEach(() => {
    submenus = menuResponse.menus[0].submenus
    showDropDownMenu = jasmine.createSpy('showDropDownMenu')
    hideDropDownMenu = jasmine.createSpy('hideDropDownMenu')
  })

  it('links to the correct place', () => {
    wrapper = shallow(
      <MenuItem
        id={1}
        submenus={[]}
        url={"/foobar"}
        showDropDownMenu={showDropDownMenu}
        hideDropDownMenu={hideDropDownMenu}
      >"Hello World"</MenuItem>
    )

    expect(wrapper.find(Link).length).toBe(1)
    expect(wrapper.find(Link).first().prop('to')).toBe('/foobar')
  })

  it('renders a DropDownMenu when expanded', () => {
    wrapper = shallow(
      <MenuItem
        expanded
        id={1}
        submenus={[]}
        url={"/foobar"}
        showDropDownMenu={showDropDownMenu}
        hideDropDownMenu={hideDropDownMenu}
      >"Hello World"</MenuItem>
    )

    expect(wrapper.find(DropDownMenu).length).toBe(1)
  })

  it('does not render a DropDownMenu when not expanded', () => {
    wrapper = shallow(
      <MenuItem
        id={1}
        submenus={[]}
        url={"/foobar"}
        showDropDownMenu={showDropDownMenu}
        hideDropDownMenu={hideDropDownMenu}
      >"Hello World"</MenuItem>
    )

    expect(wrapper.find(DropDownMenu).length).toBe(0)
  })

  it('dispatches a showDropDownMenu action when a mouse hovers over its Link and it has submenus', () => {
    wrapper = shallow(
      <MenuItem
        id={1}
        submenus={submenus}
        url={"/foobar"}
        showDropDownMenu={showDropDownMenu}
        hideDropDownMenu={hideDropDownMenu}
      >"Hello World"</MenuItem>
    )

    const fakeEvent = { preventDefault: f => f }

    wrapper.find(Link).first().simulate('mouseenter', fakeEvent)
    expect(showDropDownMenu).toHaveBeenCalledWith(1)
  })

  it('dispatches a hideDropDownMenu action when a mouse leaves it', () => {
    wrapper = shallow(
      <MenuItem
        id={1}
        submenus={submenus}
        url={"/foobar"}
        showDropDownMenu={showDropDownMenu}
        hideDropDownMenu={hideDropDownMenu}
      >"Hello World"</MenuItem>
    )

    const fakeEvent = { preventDefault: f => f }

    wrapper.simulate('mouseleave', fakeEvent)
    expect(hideDropDownMenu).toHaveBeenCalledWith(1)
  })
})
