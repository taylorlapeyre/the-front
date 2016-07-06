// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from 'actions'
import Modal from 'components/base/Modal.jsx'
import FlatButton from 'components/base/FlatButton.jsx'
import Address from 'components/checkout/Address.jsx'
import type { AddressType } from 'types/everlane'
import type { DispatchType } from 'types/redux'

// TODO: Write specs
class ChooseAddressModal extends Component {
  chooseAddress: (address: AddressType) => void;

  props: {
    addresses: Array<AddressType>,
    hideModal: () => void,
    setAddressAsPrimary: (address: AddressType) => Promise,
    onChooseAddress: (address: AddressType) => void,
  };

  constructor(props: Object) {
    super(props)
    this.chooseAddress = this.chooseAddress.bind(this)
  }

  chooseAddress(address: AddressType) {
    event.preventDefault()
    this.props.setAddressAsPrimary(address).then(this.props.hideModal)
    if (this.props.onChooseAddress) {
      this.props.onChooseAddress(address)
    }
  }

  renderAddresses() {
    return this.props.addresses.map(address => {
      const boundChooseAddress = this.chooseAddress.bind(this, address)

      return (
        <div className="choose-address-modal__address">
          <Address {...address} action={boundChooseAddress} actionText="Select as default" />
        </div>
      )
    })
  }

  render() {
    return (
      <Modal {...this.props} onRequestClose={this.props.hideModal}>
        <div className="choose-address-modal">
          <h3 className="choose-address-modal__title">Choose a new address</h3>
          <div className="choose-address-modal__content">
            {this.renderAddresses()}
          </div>
          <FlatButton to="/checkout/shipping" onClick={this.props.hideModal} color="dark-grey">
            Add A New Address
          </FlatButton>
        </div>
      </Modal>
    )
  }
}

function mapStateToProps(state: Object): Object {
  return {
    addresses: state.session.user.addresses,
  }
}

function mapDispatchToProps(dispatch: DispatchType): Object {
  return {
    hideModal: () => dispatch(actions.hideModal()),
    setAddressAsPrimary: address => dispatch(actions.setAddressAsPrimary(address)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseAddressModal)
