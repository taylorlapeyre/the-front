// @flow
import assign from 'lodash/assign'
import type { ActionType } from 'types/redux'
import type { VisitorType } from 'types/everlane'

export default function visitor(state: ?VisitorType = null, action: ActionType): ?VisitorType {
  switch (action.type) {
    case 'RECEIVE_VISITOR': {
      return action.payload
    }

    case 'UPDATE_VISITOR': {
      return assign({}, state, action.payload)
    }

    case 'RECEIVE_VISITOR_EMAIL_AVAILABILITY': {
      return assign({}, state, { emailIsAvailable: action.payload })
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
