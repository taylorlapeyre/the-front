// @flow
import React, { Component } from 'react'
import CreditCardForm from 'components/forms/CreditCardForm.jsx'
import { braintreeToken } from 'settings'
import braintree from 'braintree-web'
import {
  isPresent,
  isCreditCardNumber,
  isCreditCardExpiry,
  isCreditCardCVV,
  mapValidationsToErrors,
  isUSPostalCode,
} from 'lib/validate'


/**
 * This is a wrapper function around Braintee's client. Normally I would have no problems
 * just directly using braintree's client API in the component, but:
 *
 * 1. Passing this function into the component's props makes it easier to test
 * 2. Brainteee's API uses callbacks, and we like promises.
 *
 * TODO (maybe): move this into a final lib/braintree home.
 */
function tokenizeCard(cardData: Object): Promise {
  return new Promise((resolve, reject) => {
    const braintreeClient = new braintree.api.Client({ clientToken: braintreeToken })

    braintreeClient.tokenizeCard(cardData, (err, nonce) => {
      if (err) {
        return reject(err)
      }
      return resolve(nonce)
    })
  })
}

function getErrorsForData(data: Object): Object {
  return mapValidationsToErrors({
    number: {
      value: data.number,
      validations: [isPresent, isCreditCardNumber],
    },
    expiration_date: {
      value: data.expiration_date,
      validations: [isPresent, isCreditCardExpiry],
    },
    cvv: {
      value: data.cvv,
      validations: [isPresent, isCreditCardCVV],
    },
    first_name: {
      value: data.first_name,
      validations: [isPresent],
    },
    last_name: {
      value: data.last_name,
      validations: [isPresent],
    },
    postal_code: {
      value: data.postal_code,
      validations: [isPresent, isUSPostalCode],
    },
    country_code_alpha2: {
      value: data.country_code_alpha2,
      validations: [isPresent],
    },
  })
}

class SecureCreditCardForm extends Component {
  handleSubmit: (ccData: Object) => Promise;

  props: {
    onSubmit: (nonce: string) => Promise,
    tokenizeCard: (cardData: Object) => Promise,
  };

  static defaultProps = {
    tokenizeCard,
  };

  state: {
    errorsForCreditCardForm: Object,
  };

  constructor(props: Object) {
    super(props)

    this.state = { errorsForCreditCardForm: {} }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(creditCardData: Object) {
    const errors = getErrorsForData(creditCardData)

    if (Object.keys(errors).length) {
      this.setState({ errorsForCreditCardForm: errors })
    } else {
      this.props.tokenizeCard(creditCardData).then(nonce => this.props.onSubmit(nonce))
    }
  }

  render() {
    return (
      <div className="secure-credit-card-form">
        <div className="secure-credit-card-form__safety-info">
          <p>Braintree</p>
          <p>Secure 256-bit ssl encrypted payment</p>
        </div>
        <CreditCardForm
          onSubmit={this.handleSubmit}
          errors={this.state.errorsForCreditCardForm}
        />
      </div>
    )
  }
}

export default SecureCreditCardForm
