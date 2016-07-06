import type { ActionType } from 'types/redux'

export default function mostRecentOrder(state: Object = {}, action: ActionType): Object {
  switch (action.type) {

    case 'RECEIVE_MOST_RECENT_ORDER': {
      return action.payload
    }

    default:
      return state
  }
}
