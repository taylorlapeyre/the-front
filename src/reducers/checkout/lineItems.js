// @flow
import type { ActionType } from 'types/redux'
import type { LineItemType } from 'types/everlane'

// This reducer is so thin because we delegate all line item calculation logic
// to the server. Whenever we want to make changes to line items, we make a
// request. The response is the newly calculated line items.
export default function lineItems(
  state: Array<LineItemType> = [],
  action: ActionType): Array<LineItemType> {
  switch (action.type) {
    case 'RECEIVE_LINE_ITEMS':
      return action.payload.lineItems
    default:
      return state
  }
}
