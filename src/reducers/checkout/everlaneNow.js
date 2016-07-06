// @flow

import type { ActionType } from 'types/redux'
import type { EverlaneNowDetailsType } from 'types/everlane'

const initialState: EverlaneNowDetailsType = {
  phoneNumber: '',
  instructions: '',
  note: '',
}

function everlaneNow(
  state: EverlaneNowDetailsType = initialState,
  action: ActionType): EverlaneNowDetailsType {
  if (action.type === 'SET_EVERLANE_NOW_DETAILS') {
    return action.payload
  }

  return state
}

export default everlaneNow
