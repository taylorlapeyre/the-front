// @flow
import React, { Component, Element } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import actions from 'actions'
import OrderControlPanel from 'containers/checkout/OrderControlPanel.jsx'
import OrderBalance from 'components/checkout/OrderBalance.jsx'
import Cart from 'components/checkout/Cart.jsx'
import FlatButton from 'components/base/FlatButton.jsx'
import { getChosenShippingOption } from 'reducers/checkout/shippingOptions'
import { getIsLoading } from 'reducers/requests'
import type { OrderPreviewType, ShippingOptionType, LineItemType } from 'types/everlane'
import type { DispatchType } from 'types/redux'

export class Review extends Component {
  fetchCheckoutDetails: () => void;
  handleCreateOrder: () => void;

  props: {
    createOrder: () => Promise,
    goToThanksPage: () => void,
    orderBalance: OrderPreviewType,
    isLoading: boolean,
    chooseShippingOption: (option: ShippingOptionType) => void,
    createOrderPreview: () => Promise,
    fetchShippingOptions: () => Promise,
    shippingOptions: Array<ShippingOptionType>,
    chosenShippingOption: ShippingOptionType,
    showModal: (modal: Element) => void,
    lineItems: Array<LineItemType>,
    changeLineItemQuantity: (options: { id: number, quantity: number }) => Promise,
  };

  constructor(props: Object) {
    super(props)

    this.fetchCheckoutDetails = this.fetchCheckoutDetails.bind(this)
    this.handleCreateOrder = this.handleCreateOrder.bind(this)
  }

  componentDidMount() {
    this.fetchCheckoutDetails()
  }

  fetchCheckoutDetails() {
    this.props.createOrderPreview()
    this.props.fetchShippingOptions()
  }

  handleCreateOrder() {
    this.props.createOrder().then(this.props.goToThanksPage)
  }

  render() {
    return (
      <div className="checkout-review-page">
        <h3 className="checkout-review-page__title">Review your order</h3>
        <div className="checkout-review-page__content">
          <div className="checkout-review-page__order-details-container">
            <OrderControlPanel onChange={this.fetchCheckoutDetails} />
            <Cart
              shippingOption={this.props.chosenShippingOption}
              lineItems={this.props.lineItems}
              changeLineItemQuantity={this.props.changeLineItemQuantity}
            />
          </div>
          <div className="checkout-review-page__order-balance-container">
            <OrderBalance {...this.props.orderBalance} isLoading={this.props.isLoading} />
            <FlatButton fullWidth onClick={this.handleCreateOrder} color="dark-grey">
              Purchase
            </FlatButton>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: Object): Object {
  return {
    chosenShippingOption: getChosenShippingOption(state),
    isLoading: getIsLoading(state),
    orderBalance: state.checkout.orderBalance,
    lineItems: state.checkout.lineItems,
  }
}

function mapDispatchToProps(dispatch: DispatchType): Object {
  return {
    createOrder: () => dispatch(actions.createOrder()),
    goToThanksPage: () => browserHistory.push('/checkout/thanks'),
    createOrderPreview: () => dispatch(actions.createOrderPreview()),
    fetchShippingOptions: () => dispatch(actions.fetchShippingOptions()),
    chooseShippingOption: (newOption) => dispatch(actions.chooseShippingOption(newOption)),
    showModal: (modal) => dispatch(actions.showModal(modal)),
    changeLineItemQuantity: ({ id, quantity }) => (
      dispatch(actions.changeLineItemQuantity({ id, quantity }))
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)
