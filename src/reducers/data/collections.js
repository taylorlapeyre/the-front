// @flow
import type { ActionType } from 'types/redux'
import type { CollectionType } from 'types/everlane'

type CollectionsStateType = {
  [permalink: string]: CollectionType
}

export default function collections(
  state: CollectionsStateType = {},
  action: ActionType): CollectionsStateType {
  switch (action.type) {
    case 'RECEIVE_COLLECTION': {
      return { ...state, [action.payload.permalink]: action.payload }
    }

    default: return state
  }
}

export function getCollectionByPermalink(state: Object, permalink: string): ?CollectionsStateType {
  return state.data.collections[permalink]
}
