// @flow

import React from 'react'
import { ActionType } from 'types/redux'
import type {
  MenuType,
  HomepageType,
  CollectionType,
  ProductType,
  LineItemType,
  UserType,
  VisitorType,
  AddressType,
  CreditCardType,
  OrderPreviewType,
  ShippingOptionType,
  EverlaneNowDetailsType,
  OrderType,
} from 'types/everlane'

export function requestMenus() {
  return {
    type: 'REQUEST_MENUS',
  }
}

export function receiveMenus(response: { menus: Array<MenuType> }): ActionType {
  return {
    type: 'RECEIVE_MENUS',
    payload: response.menus,
  }
}

export function requestHomepage(id: number): ActionType {
  return {
    type: 'REQUEST_HOMEPAGE',
    payload: {
      id,
    },
  }
}

export function receiveHomepage(response: { homepage: HomepageType }): ActionType {
  return {
    type: 'RECEIVE_HOMEPAGE',
    payload: response.homepage,
  }
}

export function requestCollection(permalink: string): ActionType {
  return {
    type: 'REQUEST_COLLECTION',
    payload: {
      permalink,
    },
  }
}

export function receiveCollection(response: { collection: CollectionType }): ActionType {
  return {
    type: 'RECEIVE_COLLECTION',
    payload: response.collection,
  }
}

export function requestProduct(permalink: string): ActionType {
  return {
    type: 'REQUEST_PRODUCT',
    payload: {
      permalink,
    },
  }
}

export function receiveProduct(response: { product: ProductType }): ActionType {
  return {
    type: 'RECEIVE_PRODUCT',
    payload: response.product,
  }
}

export function requestLineItems(meta: ?Object): ActionType {
  return {
    type: 'REQUEST_LINE_ITEMS',
    meta,
  }
}

export function receiveLineItems(
  response: { cart: { line_items: Array<LineItemType> } },
  meta: ?Object): ActionType {
  return {
    type: 'RECEIVE_LINE_ITEMS',
    payload: {
      lineItems: response.cart.line_items,
    },
    meta,
  }
}

export function showDropDownMenu(id: number): ActionType {
  return {
    type: 'SHOW_DROP_DOWN_MENU',
    payload: {
      id,
    },
  }
}

export function hideDropDownMenu(id: number): ActionType {
  return {
    type: 'HIDE_DROP_DOWN_MENU',
    payload: {
      id,
    },
  }
}

export function selectVariant(id: number): ActionType {
  return {
    type: 'SELECT_VARIANT',
    payload: {
      id,
    },
  }
}

export function requestVisitor(): ActionType {
  return {
    type: 'REQUEST_VISITOR',
  }
}

export function receiveVisitor(response: VisitorType): ActionType {
  return {
    type: 'RECEIVE_VISITOR',
    payload: response,
  }
}

export function updateVisitor(updates: Object): ActionType {
  return {
    type: 'UPDATE_VISITOR',
    payload: updates,
  }
}

export function requestUser(): ActionType {
  return {
    type: 'REQUEST_USER',
  }
}

export function receiveUser(response: UserType): ActionType {
  return {
    type: 'RECEIVE_USER',
    payload: response,
  }
}

export function removeUser(): ActionType {
  return {
    type: 'REMOVE_USER',
  }
}

export function showModal(modal: React.Component): ActionType {
  return {
    type: 'SHOW_MODAL',
    payload: modal,
  }
}

export function hideModal(): ActionType {
  return {
    type: 'HIDE_MODAL',
  }
}

export function requestSession(): ActionType {
  return {
    type: 'REQUEST_SESSION',
  }
}

export function showHoverCart(): ActionType {
  return {
    type: 'SHOW_HOVER_CART',
  }
}

export function hideHoverCart(): ActionType {
  return {
    type: 'HIDE_HOVER_CART',
  }
}

export function requestVisitorEmailAvailability(): ActionType {
  return {
    type: 'REQUEST_VISITOR_EMAIL_AVAILABILITY',
  }
}

export function receiveVisitorEmailAvailability(isAvailable: boolean): ActionType {
  return {
    type: 'RECEIVE_VISITOR_EMAIL_AVAILABILITY',
    payload: isAvailable,
  }
}

export function requestAddAddress(data: Object): ActionType {
  return {
    type: 'REQUEST_ADD_ADDRESS',
    payload: data,
  }
}

export function receiveAddresses(response: { addresses: Array<AddressType> }): ActionType {
  return {
    type: 'RECEIVE_ADDRESSES',
    payload: response.addresses,
  }
}

export function requestAddCreditCard(nonce: string): ActionType {
  return {
    type: 'REQUEST_ADD_CREDIT_CARD',
    payload: nonce,
  }
}

export function receiveCreditCards(response: { credit_cards: Array<CreditCardType> }): ActionType {
  return {
    type: 'RECEIVE_CREDIT_CARDS',
    payload: response.credit_cards,
  }
}

export function requestOrderPreview(): ActionType {
  return {
    type: 'REQUEST_ORDER_PREVIEW',
  }
}

export function receiveOrderPreview(response: { order_preview: OrderPreviewType }): ActionType {
  return {
    type: 'RECEIVE_ORDER_PREVIEW',
    payload: response.order_preview,
  }
}

export function requestShippingOptions(): ActionType {
  return {
    type: 'REQUEST_SHIPPING_OPTIONS',
  }
}

export function receiveShippingOptions(
  response: { shipping_options: Array<ShippingOptionType> }): ActionType {
  return {
    type: 'RECEIVE_SHIPPING_OPTIONS',
    payload: response.shipping_options,
  }
}

export function chooseShippingOption(newOption: ShippingOptionType): ActionType {
  return {
    type: 'CHOOSE_SHIPPING_OPTION',
    payload: newOption,
  }
}

export function requestSetAddressAsPrimary(): ActionType {
  return {
    type: 'REQUEST_SET_ADDRESS_AS_PRIMARY',
  }
}

export function requestSetCreditCardAsPrimary(): ActionType {
  return {
    type: 'REQUEST_SET_CREDIT_CARD_AS_PRIMARY',
  }
}

export function setEverlaneNowDetails(details: EverlaneNowDetailsType): ActionType {
  return {
    type: 'SET_EVERLANE_NOW_DETAILS',
    payload: details,
  }
}

export function requestRedeemGiftCode(giftCode: string): ActionType {
  return {
    type: 'REQUEST_REDEEM_GIFT_CODE',
    payload: giftCode,
  }
}

export function receiveGiftCodeRedemption(): ActionType {
  return {
    type: 'RECEIVE_GIFT_CODE_REDEMPTION',
  }
}

export function requestCreateOrder(): ActionType {
  return {
    type: 'REQUEST_CREATE_ORDER',
  }
}

export function receiveMostRecentOrder(response: { order: OrderType }): ActionType {
  return {
    type: 'RECEIVE_MOST_RECENT_ORDER',
    payload: response.order,
  }
}

export function requestMostRecentOrder(): ActionType {
  return {
    type: 'REQUEST_MOST_RECENT_ORDER',
  }
}

export function requestCancelOrder(orderNumber: string): ActionType {
  return {
    type: 'REQUEST_CANCEL_ORDER',
    payload: orderNumber,
  }
}

export function receiveCancelOrder(response: { order: OrderType }): ActionType {
  return {
    type: 'RECEIVE_CANCEL_ORDER',
    payload: response.order,
  }
}
