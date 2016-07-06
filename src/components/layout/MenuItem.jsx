// @flow
import React from 'react'
import { Link } from 'react-router'
import DropDownMenu from 'components/layout/DropDownMenu.jsx'
import type { MenuType } from 'types/everlane'

function MenuItem(props: {
  id: number,
  expanded?: bool,
  hideDropDownMenu: (id: number) => void,
  showDropDownMenu: (id: number) => void,
  children: any,
  submenus: Array<MenuType>,
  url: string,
}) {
  function handleMouseEnter(event: Event) {
    event.preventDefault()

    if (props.submenus.length) {
      props.showDropDownMenu(props.id)
    }
  }

  function handleMouseLeave(event: Event) {
    event.preventDefault()

    if (props.submenus.length) {
      props.hideDropDownMenu(props.id)
    }
  }

  function renderDropDown() {
    if (props.expanded) {
      const onMouseLeave = props.hideDropDownMenu.bind(this, props.id)
      return <DropDownMenu {...props} onMouseLeave={onMouseLeave} />
    }

    return null
  }

  return (
    <div className="top-level-menu-item" onMouseLeave={handleMouseLeave}>
      <Link
        to={props.url}
        className="top-level-menu-link"
        onMouseEnter={handleMouseEnter}
        aria-label={props.children}
      >{props.children}</Link>
      {renderDropDown()}
    </div>
  )
}

export default MenuItem
