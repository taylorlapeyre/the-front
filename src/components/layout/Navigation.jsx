// @flow
import React from 'react'
import MenuItem from 'components/layout/MenuItem.jsx'
import type { MenuType } from 'types/everlane'

function Navigation(props: {
  menus: Array<MenuType>,
  showDropDownMenu: (id: number) => void,
  hideDropDownMenu: (id: number) => void,
}) {
  function renderMenus() {
    return props.menus.map(menu =>
      <MenuItem
        {...menu}
        key={menu.id}
        showDropDownMenu={props.showDropDownMenu}
        hideDropDownMenu={props.hideDropDownMenu}
      >{menu.name}</MenuItem>
    )
  }

  return (
    <nav className="app-navigation">
      {renderMenus()}
    </nav>
  )
}

export default Navigation
