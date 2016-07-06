// @flow
import React from 'react'
import { Link } from 'react-router'
import type { MenuType } from 'types/everlane'

function ThirdLevelMenu(props: { url: string, name: string }) {
  return (
    <div className="drop-down-menu__third-level-menu">
      <Link to={props.url}>{props.name}</Link>
    </div>
  )
}

function SecondLevelMenu(props: { url: string, name: string, submenus: Array<MenuType> }) {
  const thirdLevelMenus = props.submenus.map(m => <ThirdLevelMenu key={m.id} {...m} />)

  return (
    <div className="drop-down-menu__second-level-menu">
      <p className="drop-down-menu__menu-header">
        <Link to={props.url}>{props.name}</Link>
      </p>
      {thirdLevelMenus}
    </div>
  )
}

function DropDownMenu(props: { submenus: Array<MenuType>, onMouseLeave: () => void }) {
  const handleMouseLeave = (event) => {
    event.preventDefault()

    if (props.onMouseLeave) {
      props.onMouseLeave()
    }
  }

  return (
    <div onMouseLeave={handleMouseLeave} className="drop-down-menu">
      {props.submenus.map(menu => <SecondLevelMenu key={menu.id} {...menu} />)}
    </div>
  )
}

export default DropDownMenu
