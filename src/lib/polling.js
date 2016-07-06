// @flow
import actions from 'actions'
import type { StoreType } from 'types/redux'

let interval: ?number = null

// TODO: Is there a better place for this?
export function bootstrapStoreWithLineItems(store: StoreType): Promise {
  return store.dispatch(actions.fetchLineItems())
}

export function startPollingForLineItemUpdates(store: StoreType) {
  if (!interval) {
    interval = setInterval(() => {
      store.dispatch(actions.fetchLineItems({ ignoreLoad: true }))
    }, 2000)
  }
}

export function stopPollingForLineItemUpdates() {
  if (interval !== null) {
    clearInterval(interval)
    interval = null
  }
}
