// @flow
import { get, post, patch } from 'lib/network'
import { apiUrl } from 'settings'
import * as sync from 'actions/synchronous'
import find from 'lodash/find'
import {
  setVisitorFingerprint,
  setUserAuthToken,
  removeUserAuthToken,
} from 'lib/session'
import type { DispatchType, ThunkType } from 'types/redux'
import type {
  VariantType,
  AddressType,
  LineItemType,
  ShippingOptionType,
  CreditCardType,
  EverlaneNowDetailsType,
} from 'types/everlane'

/**
 * Fetch menus that sit at the top of the screen in the header
 */
export function fetchMenus(): ThunkType {
  return (dispatch: DispatchType) => {
    dispatch(sync.requestMenus())
    return get(`${apiUrl}/menus`)
             .then(response => dispatch(sync.receiveMenus(response.data)))
  }
}

/**
 * Fetch the homepage that is currently active for this session
 * @param {number} id - the id of the homepage to fetch
 */
export function fetchHomepage(id: number): ThunkType {
  return (dispatch: DispatchType) => {
    dispatch(sync.requestHomepage(id))
    return get(`${apiUrl}/homepages/${id}`)
             .then(response => dispatch(sync.receiveHomepage(response.data)))
  }
}

/**
 * Fetch an everlane collection from the api
 * @param {number} id - the permalink of the collection to fetch
 */
export function fetchCollection(permalink: string): ThunkType {
  return (dispatch: DispatchType) => {
    dispatch(sync.requestCollection(permalink))
    return get(`${apiUrl}/collections/${permalink}`)
             .then(response => dispatch(sync.receiveCollection(response.data)))
  }
}

/**
 * Fetch a single product, for the product page
 * @param {number} id - the permalink of the product to fetch
 */
export function fetchProduct(permalink: string): ThunkType {
  return (dispatch: DispatchType) => {
    dispatch(sync.requestProduct(permalink))
    return get(`${apiUrl}/products/${permalink}`)
             .then(response => dispatch(sync.receiveProduct(response.data)))
  }
}

/**
 * Add a new line item to this visitor.
 * @param {object} variant - an object with a `sku`
 * @param {number} price - the price of the line item (may differ from the price of the variant)
 */
export function addLineItem({ variant, price }: {
  variant: VariantType,
  price: number
}): ThunkType {
  return (dispatch: DispatchType) => {
    dispatch(sync.requestLineItems())
    return post(`${apiUrl}/line_items`, { variant, price })
             .then(response => dispatch(sync.receiveLineItems(response.data)))
  }
}

/**
 * Change the quantity of a line item. If the quantity is zero, remove it.
 * @param {number} id - the ID of the line item
 * @param {number} quantity - the new quantity
 */
export function changeLineItemQuantity({ id, quantity }: {
  id: number,
  quantity: number
}): ThunkType {
  return (dispatch: DispatchType) => {
    dispatch(sync.requestLineItems())
    return patch(`${apiUrl}/line_items/${id}`, { quantity })
             .then(response => dispatch(sync.receiveLineItems(response.data)))
  }
}

/**
 * Create a new Visitor for the current session and save it to the state tree.
 */
export function createVisitor(): ThunkType {
  return (dispatch: DispatchType) => {
    dispatch(sync.requestVisitor())
    return post(`${apiUrl}/visitors`).then(response => {
      dispatch(sync.receiveVisitor(response.data))
      setVisitorFingerprint(response.data.session_id)
    })
  }
}

/**
 * Fetch the visitor that is associated with the given session ID
 * @param {string} fingerprint - the identifying ID of the session
 */
export function fetchVisitor(fingerprint: string): ThunkType {
  return (dispatch: DispatchType) => {
    dispatch(sync.requestVisitor())
    return get(`${apiUrl}/visitors`, { fingerprint })
             .then(response => dispatch(sync.receiveVisitor(response.data)))
  }
}

/**
 * Set and save the current visitor's email address
 * @param {string} email - the email to save to the visitor
 */
export function setVisitorEmail(email: string): ThunkType {
  return (dispatch: DispatchType) => {
    dispatch(sync.updateVisitor({ email }))
    dispatch(sync.requestVisitor())
    return patch(`${apiUrl}/visitors`, { email })
             .then(response => dispatch(sync.receiveVisitor(response.data)))
  }
}

/**
 * Fetch the user that is associated with the stored auth token
 */
export function fetchUser(): ThunkType {
  return (dispatch: DispatchType) => {
    dispatch(sync.requestUser())
    return get(`${apiUrl}/users`)
             .then(response => dispatch(sync.receiveUser(response.data)))
  }
}

/**
 * Create a new User account with the given user data, and save the returned auth token.
 * @param {object} user - an object with at least a `password` and `email` field
 */
export function signUp(user: { email: string, password: string}): ThunkType {
  return (dispatch: DispatchType) => {
    dispatch(sync.requestUser())
    return post(`${apiUrl}/users`, { user }).then(response => {
      dispatch(sync.receiveUser(response.data))
      setUserAuthToken(response.data.auth_token)
    })
  }
}

/**
 * Given a username and password, obtain that user's auth token and data and save it to the
 * state tree. Also, store the user's auth token in a cookie.
 * @param {object} data - an object with at least a `password` and `email` field
 */
export function signIn(data: { email: string, password: string}): ThunkType {
  return (dispatch: DispatchType) => {
    dispatch(sync.requestSession())
    return post(`${apiUrl}/sessions`, { data }).then(response => {
      dispatch(sync.receiveUser(response.data))
      setUserAuthToken(response.data.auth_token)
    })
  }
}

/**
 * Not actually asynchronous! Removes the current user's auth token and removes the user data
 * from the state tree.
 * TODO: move the sign in/up/out cookie storage to middleware.
 */
export function signOut(): ThunkType {
  return (dispatch: DispatchType) => {
    removeUserAuthToken()
    dispatch(sync.removeUser())
  }
}

/**
 * Fetch the current Visitor's line items and save them to the state tree.
 * @param {object} options - an object that may include an `ignoreLoad` boolean.
 */
export function fetchLineItems(options: Object = {}) {
  return (dispatch: DispatchType) => {
    dispatch(sync.requestLineItems(options))
    return get(`${apiUrl}/line_items`)
             .then(response => dispatch(sync.receiveLineItems(response.data, options)))
  }
}

/**
 * Determine whether the current visitor's email is associated with a user account.
 */
export function determineIfVisitorEmailIsTaken(): ThunkType {
  return (dispatch: DispatchType, getState: () => Object) => {
    dispatch(sync.requestVisitorEmailAvailability())
    return get(`${apiUrl}/users/availability`, {
      email: getState().session.visitor.email,
    }).then(response =>
       dispatch(sync.receiveVisitorEmailAvailability(response.data.availability))
    )
  }
}

/**
 * Given an address, associate it with the current user and save it to the database.
 * @param {object} data - an address object.
 */
export function saveAddress(data: Object): ThunkType {
  return (dispatch: DispatchType) => {
    dispatch(sync.requestAddAddress(data))
    return post(`${apiUrl}/addresses`, { data })
            .then(response => dispatch(sync.receiveAddresses(response.data)))
  }
}

/**
 * Create a new credit ard object in our database and return a secure representation
 * of it for display purposes.
 * @param {object} nonce - a Braintre-generated nonce that represents the credit
 * card data of the user
 */
export function saveCreditCard(nonce: string): ThunkType {
  return (dispatch: DispatchType) => {
    dispatch(sync.requestAddCreditCard(nonce))
    return post(`${apiUrl}/credit_cards`, { nonce })
             .then(response => dispatch(sync.receiveCreditCards(response.data)))
  }
}

/**
 * Create a new order "preview" for the given address, shipping method, and line items.
 */
export function createOrderPreview() {
  return (dispatch: DispatchType, getState: () => Object) => {
    const state: Object = getState()
    const addresses: ?Array<AddressType> = state.session.user && state.session.user.addresses

    const data: {
      shipping_option: ?ShippingOptionType,
      line_items: Array<LineItemType>,
      address: ?AddressType,
    } = {
      shipping_option: find(state.checkout.shippingOptions, { selected: true }),
      line_items: state.checkout.lineItems,
      address: find(addresses, { primary: true }),
    }

    dispatch(sync.requestOrderPreview())
    return post(`${apiUrl}/orders/preview`, data)
             .then(response => dispatch(sync.receiveOrderPreview(response.data)))
  }
}

/**
 * Fetch all shipping options that are appropriate for the current primary address and line items.
 */
export function fetchShippingOptions(): ThunkType {
  return (dispatch: DispatchType, getState: () => Object) => {
    // Unset any existing shipping option
    sync.chooseShippingOption(null)

    const state = getState()
    const addresses: ?Array<AddressType> = state.session.user && state.session.user.addresses

    const data: {
      line_items: Array<LineItemType>,
      address: ?AddressType
    } = {
      line_items: state.checkout.lineItems,
      address: find(addresses, { primary: true }),
    }

    dispatch(sync.requestShippingOptions())
    return get(`${apiUrl}/shipping_options`, data)
             .then(response => dispatch(sync.receiveShippingOptions(response.data)))
  }
}

/**
 * Used to select an existing address and set it as the new primary address for
 * a user.
 */
export function setAddressAsPrimary(address: AddressType): ThunkType {
  return (dispatch: DispatchType) => {
    dispatch(sync.requestSetAddressAsPrimary())
    return patch(`${apiUrl}/addresses/${address.id}`, { address })
             .then(response => dispatch(sync.receiveAddresses(response.data)))
  }
}

/**
 * Used to select an existing credit card and set it as the new primary payment method for
 * a user.
 */
export function setCreditCardAsPrimary(credit_card: CreditCardType): ThunkType {
  return (dispatch: DispatchType) => {
    dispatch(sync.requestSetCreditCardAsPrimary())
    return patch(`${apiUrl}/credit_cards/${credit_card.id}`, { credit_card })
             .then(response => dispatch(sync.receiveCreditCards(response.data)))
  }
}


/**
 * Given a possibly correct giftcode, attempt to redeem it and transfer credit to the User.
 */
export function redeemGiftCode(giftCode: string): ThunkType {
  return (dispatch: DispatchType) => {
    dispatch(sync.requestRedeemGiftCode(giftCode))
    return post(`${apiUrl}/redeem`, { token: giftCode.toUpperCase() })
             .then(response => dispatch(sync.receiveGiftCodeRedemption(response.data)))
  }
}

/**
 * "Creating an order" is Everlane-speak for "the user would now like to purchase some clothes."
 * Here, we post to /orders with all of the checkout data we need (a lot).
 */
export function createOrder(): ThunkType {
  return (dispatch: DispatchType, getState: () => Object) => {
    const state = getState()
    const addresses: Array<AddressType> = state.session.user && state.session.user.addresses
    const creditCards: Array<CreditCardType> = state.session.user && state.session.user.credit_cards
    const { shippingOptions, everlaneNow }: {
      shippingOptions: Array<ShippingOptionType>,
      everlaneNow: EverlaneNowDetailsType,
    } = state.checkout
    const { phoneNumber, note, instructions } = everlaneNow

    const data: {
      line_items: Array<LineItemType>,
      address: AddressType,
      credit_card: CreditCardType,
      shipping_option: ShippingOptionType,
      mobile_number: ?string,
      handwritten_note: ?string,
      delivery_instructions: ?string,
    } = {
      line_items: state.checkout.lineItems,
      address: find(addresses, { primary: true }),
      credit_card: find(creditCards, { primary: true }),
      shipping_option: find(shippingOptions, { selected: true }),
      mobile_number: phoneNumber,
      handwritten_note: note,
      delivery_instructions: instructions,
    }

    dispatch(sync.requestCreateOrder())
    return post(`${apiUrl}/orders`, data)
             .then(response => dispatch(sync.receiveMostRecentOrder(response.data)))
  }
}

/**
 * Given a possibly correct giftcode, attempt to redeem it and transfer credit to the User.
 */
export function fetchMostRecentOrder(): ThunkType {
  return (dispatch: DispatchType) => {
    dispatch(sync.requestMostRecentOrder())
    return get(`${apiUrl}/orders/last_purchased`)
             .then(response => dispatch(sync.receiveMostRecentOrder(response.data)))
  }
}

/**
 * Cancel the given order.
 */
export function cancelOrder(orderNumber: string): ThunkType {
  return (dispatch: DispatchType) => {
    dispatch(sync.requestCancelOrder(orderNumber))
    return post(`${apiUrl}/orders/cancel`)
             .then(response => dispatch(sync.receiveCancelOrder(response.data)))
  }
}
