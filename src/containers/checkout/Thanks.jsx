// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from 'actions'
import OrderDetailsTable from 'components/checkout/OrderDetailsTable.jsx'
import type { OrderType } from 'types/everlane'
import type { DispatchType } from 'types/redux'

export class Thanks extends Component {
  handleCancelOrder: (event: Object) => void;

  props: {
    mostRecentOrder: OrderType,
    fetchMostRecentOrder: () => Promise,
    cancelOrder: (orderNumber: number) => Promise,
  };

  constructor(props: Object) {
    super(props)

    this.handleCancelOrder = this.handleCancelOrder.bind(this)
  }

  componentWillMount() {
    if (!this.props.mostRecentOrder.line_items.length) {
      this.props.fetchMostRecentOrder()
    }
  }

  handleCancelOrder(event: Object) {
    event.preventDefault()
    this.props.cancelOrder(this.props.mostRecentOrder.number)
  }

  render() {
    if (!this.props.mostRecentOrder.line_items.length) {
      return <div />
    }

    return (
      <div className="checkout-thanks-page">
        <p className="checkout-thanks-page__thanks-message">
          We hope you enjoy.
          Feel free to reach out to us at
          &nbsp;<a href="mailto:support@everlane.com">support@everlane.com</a>
          &nbsp;for returns, questions, or feedback.
        </p>
        <div className="checkout-thanks-page__order-details-table-container">
          <OrderDetailsTable
            order={this.props.mostRecentOrder}
            onCancelOrder={this.handleCancelOrder}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: Object): Object {
  return {
    mostRecentOrder: state.data.mostRecentOrder,
  }
}

function mapDispatchToProps(dispatch: DispatchType): Object {
  return {
    fetchMostRecentOrder: () => dispatch(actions.fetchMostRecentOrder()),
    cancelOrder: orderId => dispatch(actions.cancelOrder(orderId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Thanks)
