// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import Cart from 'components/checkout/Cart.jsx'
import OrderBalance from 'components/checkout/OrderBalance.jsx'
import FlatButton from 'components/base/FlatButton.jsx'
import actions from 'actions'
import { getIsLoading } from 'reducers/requests'
import type { LineItemType, OrderPreviewType } from 'types/everlane'
import type { DispatchType } from 'types/redux'

export class Preview extends Component {
  props: {
    goBack: () => void,
    isLoading: boolean,
    lineItems: Array<LineItemType>,
    changeLineItemQuantity: (options: { id: number, quantity: number }) => Promise,
    orderBalance: OrderPreviewType,
    createOrderPreview: () => Promise,
  };

  componentDidMount() {
    this.props.createOrderPreview()
  }

  render() {
    return (
      <div className="checkout-preview-page">
        <div className="checkout-preview-page__cart-container">
          <button
            onClick={this.props.goBack}
            className="checkout-preview-page__back-link"
          >
            Back To Shopping
          </button>
          <Cart
            lineItems={this.props.lineItems}
            changeLineItemQuantity={this.props.changeLineItemQuantity}
          />
        </div>
        <div className="checkout-preview-page__order-balance-container">
          <OrderBalance {...this.props.orderBalance} isLoading={this.props.isLoading} />
          <FlatButton to="/checkout/account" fullWidth color="dark-grey">Checkout</FlatButton>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: Object): Object {
  return {
    isLoading: getIsLoading(state),
    lineItems: state.checkout.lineItems,
    orderBalance: state.checkout.orderBalance,
  }
}

function mapDispatchToProps(dispatch: DispatchType): Object {
  return {
    goBack: () => dispatch(goBack()),
    createOrderPreview: () => dispatch(actions.createOrderPreview()),
    changeLineItemQuantity: ({ id, quantity }) => (
      dispatch(actions.changeLineItemQuantity({ id, quantity }))
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
