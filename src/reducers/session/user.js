// @flow
import assign from 'lodash/assign'
import find from 'lodash/find'
import type { ActionType } from 'types/redux'
import type { UserType } from 'types/everlane'

export default function user(state: ?UserType = null, action: ActionType): ?UserType {
  switch (action.type) {

    case 'RECEIVE_USER': {
      return action.payload
    }

    case 'REMOVE_USER': {
      return null
    }

    case 'RECEIVE_ADDRESSES': {
      if (state) {
        return assign({}, state, { addresses: action.payload })
      }

      return state
    }

    case 'RECEIVE_CREDIT_CARDS': {
      if (state) {
        return assign({}, state, { creditCards: action.payload })
      }

      return state
    }

    default:
      return state
  }
}

export function getPrimaryAddress(state: Object): ?Object {
  if (state.session.user) {
    return find(state.session.user.addresses, { primary: true })
  }

  return null
}

export function getPrimaryCreditCard(state: Object): ?Object {
  if (state.session.user) {
    return find(state.session.user.creditCards, { primary: true })
  }

  return null
}
