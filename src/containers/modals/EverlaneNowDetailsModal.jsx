// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from 'actions'
import EverlaneNowForm from 'components/forms/EverlaneNowForm.jsx'
import Modal from 'components/base/Modal.jsx'
import { mapValidationsToErrors, isPresent, isPhoneNumber } from 'lib/validate'
import type { EverlaneNowDetailsType } from 'types/everlane'
import type { DispatchType } from 'types/redux'

function getErrorsForData(data: Object): Object {
  return mapValidationsToErrors({
    phoneNumber: {
      value: data.phoneNumber,
      validations: [isPresent, isPhoneNumber],
    },
  })
}

// TODO: Write specs
class EverlaneNowDetailsModal extends Component {
  handleSubmit: (details: EverlaneNowDetailsType) => void;
  handleCancel: () => void;

  props: {
    hideModal: () => void,
    onCancel: () => void,
    setEverlaneNowDetails: (details: EverlaneNowDetailsType) => void,
  };

  state: {
    errors: Object,
  };

  constructor(props: Object) {
    super(props)

    this.state = { errors: {} }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleSubmit(everlaneNowDetails: EverlaneNowDetailsType) {
    const errors: Object = getErrorsForData(everlaneNowDetails)

    if (Object.keys(errors).length > 0) {
      this.setState({ errors })
    } else {
      this.props.setEverlaneNowDetails(everlaneNowDetails)
      this.props.hideModal()
    }
  }

  handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel()
    }
    this.props.hideModal()
  }

  render() {
    return (
      <Modal {...this.props} onRequestClose={this.handleCancel}>
        <div className="everlane-now-details-modal">
          <h3 className="everlane-now-details-modal__title">1-hour delivery information</h3>
          <hr className="everlane-now-details-modal__fancy-line-seperator" />
          <p className="everlane-now-details-modal__description">
            We’ll text you when your order is 5 minutes away.<br />
            The items not available for 1-hour delivery will ship later via standard shipping.
          </p>
          <div className="everlane-now-details-modal__content">
            <EverlaneNowForm errors={this.state.errors} onSubmit={this.handleSubmit} />
          </div>
        </div>
      </Modal>
    )
  }
}

function mapDispatchToProps(dispatch: DispatchType): Object {
  return {
    hideModal: () => dispatch(actions.hideModal()),
    setEverlaneNowDetails: details => dispatch(actions.setEverlaneNowDetails(details)),
  }
}

export default connect(null, mapDispatchToProps)(EverlaneNowDetailsModal)
