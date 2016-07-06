// @flow

import cookies from 'js-cookie'

export function saveDataToBrowser(key: string, data: any): string {
  return cookies.set(key, data)
}

export function getDataFromBrowser(key: string): string {
  return cookies.get(key)
}

export function removeDataFromBrowser(key: string): string {
  return cookies.remove(key)
}
