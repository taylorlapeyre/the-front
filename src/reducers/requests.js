// @flow
import startsWith from 'lodash/startsWith'
import type { ActionType } from 'types/redux'

export default function requests(state: number = 0, action: ActionType): number {
  if (startsWith(action.type, 'REQUEST')) {
    if (action.meta && action.meta.ignoreLoad) {
      return state
    }

    return state + 1
  }

  if (startsWith(action.type, 'RECEIVE')) {
    if (action.meta && action.meta.ignoreLoad) {
      return state
    }

    return state - 1
  }

  return state
}

export function getIsLoading(state: Object): boolean {
  return state.requests > 0
}
