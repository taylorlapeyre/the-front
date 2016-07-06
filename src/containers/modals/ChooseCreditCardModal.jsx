// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from 'actions'
import Modal from 'components/base/Modal.jsx'
import FlatButton from 'components/base/FlatButton.jsx'
import CreditCard from 'components/checkout/CreditCard.jsx'
import type { CreditCardType } from 'types/everlane'
import type { DispatchType } from 'types/redux'

// TODO: Write specs
class ChooseCreditCardModal extends Component {
  chooseCreditCard: (creditCard: CreditCardType) => void;

  props: {
    creditCards: Array<CreditCardType>,
    hideModal: () => void,
    setCreditCardAsPrimary: (creditCard: CreditCardType) => Promise,
    onChooseCreditCard: (creditCard: CreditCardType) => void,
  };

  constructor(props: Object) {
    super(props)
    this.chooseCreditCard = this.chooseCreditCard.bind(this)
  }

  chooseCreditCard(creditCard) {
    event.preventDefault()
    this.props.setCreditCardAsPrimary(creditCard).then(this.props.hideModal)
    if (this.props.onChooseCreditCard) {
      this.props.onChooseCreditCard(creditCard)
    }
  }

  renderCreditCards() {
    return this.props.creditCards.map(creditCard => {
      const boundChooseCreditCard = this.chooseCreditCard.bind(this, creditCard)

      return (
        <div className="choose-address-modal__address">
          <CreditCard
            {...creditCard}
            action={boundChooseCreditCard}
            actionText="Select as default"
          />
        </div>
      )
    })
  }

  render() {
    return (
      <Modal {...this.props} onRequestClose={this.props.hideModal}>
        <div className="choose-credit-card-modal">
          <h3 className="choose-credit-card-modal__title">Choose a new credit card</h3>
          <div className="choose-credit-card-modal__content">
            {this.renderCreditCards()}
          </div>
          <FlatButton to="/checkout/payment" onClick={this.props.hideModal} color="dark-grey">
            Add A New Credit Card
          </FlatButton>
        </div>
      </Modal>
    )
  }
}

function mapStateToProps(state: Object): Object {
  return {
    creditCards: state.session.user.creditCards,
  }
}

function mapDispatchToProps(dispatch: DispatchType): Object {
  return {
    hideModal: () => dispatch(actions.hideModal()),
    setCreditCardAsPrimary: creditCard => dispatch(actions.setCreditCardAsPrimary(creditCard)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCreditCardModal)
