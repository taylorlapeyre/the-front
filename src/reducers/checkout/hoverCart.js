// @flow

import type { ActionType } from 'types/redux'

export default function hoverCart(state: boolean = false, action: ActionType): boolean {
  switch (action.type) {

    case 'SHOW_HOVER_CART': {
      return true
    }

    case 'HIDE_HOVER_CART': {
      return false
    }

    default:
      return state
  }
}
