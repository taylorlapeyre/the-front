// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from 'actions'
import { browserHistory } from 'react-router'
import SecureCreditCardForm from 'containers/forms/SecureCreditCardForm.jsx'
import OrderBalance from 'components/checkout/OrderBalance.jsx'
import { getIsLoading } from 'reducers/requests'
import type { OrderPreviewType } from 'types/everlane'
import type { DispatchType } from 'types/redux'

export class Payment extends Component {
  handleCreateCreditCard: (nonce: string) => Promise;

  props: {
    isLoading: boolean,
    goToNextStep: () => void,
    saveCreditCard: (nonce: string) => Promise,
    orderBalance: OrderPreviewType,
    createOrderPreview: () => Promise,
  };

  constructor(props: Object) {
    super(props)
    this.handleCreateCreditCard = this.handleCreateCreditCard.bind(this)
  }

  componentDidMount() {
    this.props.createOrderPreview()
  }

  handleCreateCreditCard(nonce: string) {
    this.props.saveCreditCard(nonce).then(this.props.goToNextStep)
  }

  render() {
    return (
      <div className="checkout-payment-page">
        <h3 className="checkout-payment-page__title">Enter your credit card</h3>
        <div className="checkout-payment-page__content">
          <div className="checkout-payment-page__form-container">
            <SecureCreditCardForm onSubmit={this.handleCreateCreditCard} />
          </div>
          <div className="checkout-shipping-page__order-balance-container">
            <OrderBalance {...this.props.orderBalance} isLoading={this.props.isLoading} />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: Object): Object {
  return {
    isLoading: getIsLoading(state),
    orderBalance: state.checkout.orderBalance,
  }
}

function mapDispatchToProps(dispatch: DispatchType): Object {
  return {
    createOrderPreview: () => dispatch(actions.createOrderPreview()),
    saveCreditCard: data => dispatch(actions.saveCreditCard(data)),
    goToNextStep: () => browserHistory.push('/checkout/review'),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment)
