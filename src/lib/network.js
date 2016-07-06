// @flow

/* eslint no-console:0 */

import xr from 'xr'
import { apiUrl } from 'settings'
import fakeMenuData from 'data/menus'
import fakeHomepageData from 'data/homepages/show'
import fakeCollectionData from 'data/collections/show'
import fakeLineItemData from 'data/line_items/update'
import fakeProductData from 'data/products/show'
import fakeVisitorCreateData from 'data/visitors/create'
import fakeVisitorUpdateData from 'data/visitors/update'
import fakeVisitorShowData from 'data/visitors/show'
import fakeSessionData from 'data/sessions/create'
import fakeUserIndexData from 'data/users/index'
import fakeUserCreateData from 'data/users/create'
import fakeUserEmailAvailabilityData from 'data/users/availability'
import fakeAddressCreateData from 'data/addresses/create'
import fakeAddressUpdateData from 'data/addresses/update'
import fakeCreditCardCreateData from 'data/credit_cards/create'
import fakeCreditCardUpdateData from 'data/credit_cards/update'
import fakeOrderPreviewData from 'data/orders/preview'
import fakeShippingOptionsData from 'data/shipping_options/index'
import fakeGiftCodeRedemptionData from 'data/giftcards/redeem'
import fakeOrderData from 'data/orders/create'

function createFakeRequest(
  fakeResponseData: Object,
  url: string,
  methodName: string = 'GET'): Promise {
  const timeToLoad = (() => {
    if (url.includes(`${apiUrl}/collections`)) {
      return 2000 // Collection API is super slow
    }

    return 500 + (500 * Math.random())
  })()

  // Resolve with fake data after 500-1000ms
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`%c Fake XHR finished loading: ${methodName} "${url}"`, 'color: LightSlateGrey')
      resolve({ data: fakeResponseData })
    }, timeToLoad)
  })
}

// We should probably be using `fetch`, but polyfills in webpack are kinda weird
// right now so this is the second best thing!
export function get(url: string, params: ?Object) {
  if (window.REAL_XHR) {
    const req = xr.get(url, params)
    return req
  }

  if (url.includes(`${apiUrl}/homepages`)) {
    return createFakeRequest(fakeHomepageData, url, 'GET')
  }

  if (url === `${apiUrl}/menus`) {
    return createFakeRequest(fakeMenuData, url, 'GET')
  }

  if (url.includes(`${apiUrl}/products`)) {
    return createFakeRequest(fakeProductData, url, 'GET')
  }

  if (url.includes(`${apiUrl}/collections`)) {
    return createFakeRequest(fakeCollectionData, url, 'GET')
  }

  if (url === `${apiUrl}/users`) {
    return createFakeRequest(fakeUserIndexData, url, 'GET')
  }

  if (url.includes(`${apiUrl}/visitors`)) {
    return createFakeRequest(fakeVisitorShowData, url, 'GET')
  }

  if (url === `${apiUrl}/line_items`) {
    return createFakeRequest(fakeLineItemData, url, 'GET')
  }

  if (url === `${apiUrl}/users/availability`) {
    return createFakeRequest(fakeUserEmailAvailabilityData, url, 'GET')
  }

  if (url === `${apiUrl}/shipping_options`) {
    return createFakeRequest(fakeShippingOptionsData, url, 'GET')
  }

  if (url === `${apiUrl}/orders/last_purchased`) {
    return createFakeRequest(fakeOrderData, url, 'GET')
  }

  throw new Error(`lib/network#get could not find a fake response to return for ${url}`)
}

export function post(url: string, data: ?Object) {
  if (window.REAL_XHR) {
    return xr.post(url, data)
  }

  if (url === `${apiUrl}/line_items`) {
    return createFakeRequest(fakeLineItemData, url, 'POST')
  }

  if (url === `${apiUrl}/visitors`) {
    return createFakeRequest(fakeVisitorCreateData, url, 'POST')
  }

  if (url === `${apiUrl}/users`) {
    return createFakeRequest(fakeUserCreateData, url, 'POST')
  }

  if (url === `${apiUrl}/sessions`) {
    return createFakeRequest(fakeSessionData, url, 'POST')
  }

  if (url === `${apiUrl}/addresses`) {
    return createFakeRequest(fakeAddressCreateData, url, 'POST')
  }

  if (url === `${apiUrl}/credit_cards`) {
    return createFakeRequest(fakeCreditCardCreateData, url, 'POST')
  }

  if (url === `${apiUrl}/orders/preview`) {
    return createFakeRequest(fakeOrderPreviewData, url, 'POST')
  }

  if (url === `${apiUrl}/redeem`) {
    return createFakeRequest(fakeGiftCodeRedemptionData, url, 'POST')
  }

  if (url === `${apiUrl}/orders`) {
    return createFakeRequest(fakeOrderData, url, 'POST')
  }

  if (url === `${apiUrl}/orders/cancel`) {
    return createFakeRequest({}, url, 'POST')
  }

  throw new Error(`lib/network#post could not find a fake response to return for ${url}`)
}

export function patch(url: string, data: ?Object) {
  if (window.REAL_XHR) {
    return xr.patch(url, data)
  }

  if (url.includes(`${apiUrl}/line_items`)) {
    return createFakeRequest(fakeLineItemData, url, 'PATCH')
  }

  if (url === `${apiUrl}/visitors`) {
    return createFakeRequest(fakeVisitorUpdateData, url, 'PATCH')
  }

  if (url.includes(`${apiUrl}/addresses`)) {
    return createFakeRequest(fakeAddressUpdateData, url, 'PATCH')
  }

  if (url.includes(`${apiUrl}/credit_cards`)) {
    return createFakeRequest(fakeCreditCardUpdateData, url, 'PATCH')
  }

  throw new Error(`lib/network#patch could not find a fake response to return for ${url}`)
}
