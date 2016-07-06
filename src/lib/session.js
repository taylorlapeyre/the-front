// @flow

import actions from 'actions'
import { getDataFromBrowser, saveDataToBrowser, removeDataFromBrowser } from 'lib/storage'
import type { StoreType } from 'types/redux'

export function getVisitorFingerprint(): ?string {
  return getDataFromBrowser('visitor_fingerprint')
}

export function getUserAuthToken(): ?string {
  return getDataFromBrowser('user_auth_token')
}

export function setVisitorFingerprint(fingerprint: string): string {
  return saveDataToBrowser('visitor_fingerprint', fingerprint)
}

export function setUserAuthToken(authToken: string): string {
  return saveDataToBrowser('user_auth_token', authToken)
}

export function removeUserAuthToken(): string {
  return removeDataFromBrowser('user_auth_token')
}

/**
 * We have two kinds of session data: visitors and users.
 *
 * We always need a visitor. If this browser has never been to everlane.com,
 * we need to create a new visitor for them.
 *
 * The presence of an auth token determines whether a user is signed in or not.
 * If they are signed in, we fetch their user data. Otherwise, do nothing.
 *
 * @param {object} store - the redux store
 */
export function bootstrapStoreWithSessionData(store: StoreType): Promise {
  const visitorFingerprint: ?string = getVisitorFingerprint()
  const authToken: ?string = getUserAuthToken()

  const requestForVisitor: Promise = (() => {
    if (visitorFingerprint) {
      return store.dispatch(actions.fetchVisitor(visitorFingerprint))
    }

    return store.dispatch(actions.createVisitor())
  })()

  const requestForUser: Promise = (() => {
    if (authToken) {
      return store.dispatch(actions.fetchUser())
    }

    return Promise.resolve()
  })()

  return Promise.all([requestForUser, requestForVisitor])
}
