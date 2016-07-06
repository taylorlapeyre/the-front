// @flow
import React from 'react'
import { connect } from 'react-redux'
import Cart from 'components/checkout/Cart.jsx'
import FlatButton from 'components/base/FlatButton.jsx'
import actions from 'actions'
import type { LineItemType } from 'types/everlane'
import type { DispatchType } from 'types/redux'

export function HoverCart({ lineItems, hideHoverCart, changeLineItemQuantity }: {
  lineItems: Array<LineItemType>,
  hideHoverCart: () => void,
  changeLineItemQuantity: (options: { id: number, quantity: number }) => Promise,
}) {
  const checkoutButton = lineItems.length && (
    <FlatButton to="/checkout/preview" color="dark-grey" className="hover-cart__checkout-button">
      Go To Checkout
    </FlatButton>
  )

  return (
    <div className="hover-cart" onMouseLeave={hideHoverCart}>
      <Cart lineItems={lineItems} changeLineItemQuantity={changeLineItemQuantity} />
      {checkoutButton}
    </div>
  )
}

function mapStateToProps(state: Object): Object {
  return {
    lineItems: state.checkout.lineItems,
  }
}

function mapDispatchToProps(dispatch: DispatchType): Object {
  return {
    hideHoverCart: () => dispatch(actions.hideHoverCart()),
    changeLineItemQuantity: ({ id, quantity }) => (
      dispatch(actions.changeLineItemQuantity({ id, quantity }))
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HoverCart)
