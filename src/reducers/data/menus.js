// @flow
import assign from 'lodash/assign'
import type { ActionType } from 'types/redux'
import type { MenuType } from 'types/everlane'

export default function menus(state: Array<MenuType> = [], action: ActionType): Array<MenuType> {
  switch (action.type) {
    case 'RECEIVE_MENUS':
      return action.payload

    case 'SHOW_DROP_DOWN_MENU':
      return state.map((menu: MenuType) => {
        if (menu.id === action.payload.id) {
          return assign({}, menu, { expanded: true })
        }

        return assign({}, menu, { expanded: false })
      })

    case 'HIDE_DROP_DOWN_MENU':
      return state.map((menu: MenuType) => assign({}, menu, { expanded: false }))

    default:
      return state
  }
}
