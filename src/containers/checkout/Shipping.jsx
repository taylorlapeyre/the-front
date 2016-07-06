// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from 'actions'
import { browserHistory } from 'react-router'
import { isPresent, mapValidationsToErrors } from 'lib/validate'
import AddressForm from 'components/forms/AddressForm.jsx'
import OrderBalance from 'components/checkout/OrderBalance.jsx'
import { getPrimaryAddress } from 'reducers/session/user'
import { getIsLoading } from 'reducers/requests'
import type { AddressType, OrderPreviewType } from 'types/everlane'
import type { DispatchType } from 'types/redux'

function getErrorsForData(data: Object): Object {
  return mapValidationsToErrors({
    first_name: {
      value: data.first_name,
      validations: [isPresent],
    },
    last_name: {
      value: data.last_name,
      validations: [isPresent],
    },
    street_address: {
      value: data.street_address,
      validations: [isPresent],
    },
    city: {
      value: data.city,
      validations: [isPresent],
    },
    country: {
      value: data.country,
      validations: [isPresent],
    },
    region: {
      value: data.region,
      validations: [isPresent],
    },
    postal_code: {
      value: data.postal_code,
      validations: [isPresent],
    },
  })
}

export class Shipping extends Component {
  handleCreateAddress: (data: Object) => void;

  props: {
    isLoading: boolean,
    primaryAddress: AddressType,
    goToNextStep: () => void,
    saveAddress: (data: Object) => Promise,
    orderBalance: OrderPreviewType,
    createOrderPreview: () => Promise,
  };

  state: {
    errorsForAddressForm: Object,
  };

  constructor(props: Object) {
    super(props)

    this.state = { errorsForAddressForm: {} }
    this.handleCreateAddress = this.handleCreateAddress.bind(this)
  }

  componentDidMount() {
    this.props.createOrderPreview()
  }

  handleCreateAddress(addressData: Object) {
    const errors = getErrorsForData(addressData)
    if (Object.keys(errors).length) {
      this.setState({ errorsForAddressForm: errors })
    } else {
      this.props.saveAddress(addressData).then(this.props.goToNextStep)
    }
  }

  render() {
    return (
      <div className="checkout-shipping-page">
        <h3 className="checkout-shipping-page__title">Enter your address</h3>
        <div className="checkout-shipping-page__content">
          <div className="checkout-shipping-page__form-container">
            <AddressForm
              initialFormData={this.props.primaryAddress}
              onSubmit={this.handleCreateAddress}
              errors={this.state.errorsForAddressForm}
            />
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
    primaryAddress: getPrimaryAddress(state),
    orderBalance: state.checkout.orderBalance,
  }
}

function mapDispatchToProps(dispatch: DispatchType): Object {
  return {
    createOrderPreview: () => dispatch(actions.createOrderPreview()),
    saveAddress: data => dispatch(actions.saveAddress(data)),
    goToNextStep: () => browserHistory.push('/checkout/payment'),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shipping)
