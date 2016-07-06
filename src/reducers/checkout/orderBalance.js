// @flow

import type { ActionType } from 'types/redux'
import type { OrderPreviewType } from 'types/everlane'

const initialState: OrderPreviewType = {
  subtotal: '$0',
  adjustments: [],
  total: '$0',
}

export default function orderBalance(
  state: OrderPreviewType = initialState,
  action: ActionType): OrderPreviewType {
  switch (action.type) {
    case 'RECEIVE_ORDER_PREVIEW':
      return action.payload
    default:
      return state
  }
}
