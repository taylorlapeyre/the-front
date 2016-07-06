// @flow
/* eslint camelcase:0 */

import type { ActionType } from 'types/redux'
import type { HomepageType } from 'types/everlane'

const initialState: HomepageType = {
  content_page: {
    id: -1,
    compiled_content: '',
  },
}

export default function homepage(
  state: HomepageType = initialState,
  action: ActionType): HomepageType {
  let newState

  if (action.type === 'RECEIVE_HOMEPAGE') {
    newState = action.payload
  } else {
    newState = state
  }

  return newState
}
