import { combineReducers } from 'redux'
import lineItems from 'reducers/checkout/lineItems'
import shippingOptions from 'reducers/checkout/shippingOptions'
import hoverCart from 'reducers/checkout/hoverCart'
import orderBalance from 'reducers/checkout/orderBalance'
import everlaneNow from 'reducers/checkout/everlaneNow'

export default combineReducers({
  lineItems,
  shippingOptions,
  hoverCart,
  orderBalance,
  everlaneNow,
})
