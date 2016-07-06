// @flow
import React, { Component } from 'react'
import FlatButton from 'components/base/FlatButton.jsx'
import Input from 'components/base/Input.jsx'

class CreditCardForm extends Component {
  handleSubmit: (event: Object) => void;

  props: {
    onSubmit: (data: Object) => Promise,
    errors: Object,
  };

  state: {
    full_name: string,
    number: string,
    expiration_date: string,
    expiration_month: string,
    expiration_year: string,
    cvv: string,
    first_name: string,
    last_name: string,
    postal_code: string,
    country_code_alpha2: string,
  };

  constructor(props: Object) {
    super(props)

    this.state = {
      number: '4111111111111111',
      expiration_date: '',
      expiration_month: '',
      expiration_year: '',
      cvv: '',
      full_name: '',
      first_name: '',
      last_name: '',
      postal_code: '',
      country_code_alpha2: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event: Object) {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }

  renderFullNameInput() {
    const onChange = event => {
      event.preventDefault()
      const [first_name, last_name] = event.target.value.split(' ')
      this.setState({ first_name, last_name })
    }

    const error = this.props.errors.last_name ? this.props.errors.last_name.join(', ') : null

    return (
      <Input
        type="text"
        label="Full Name"
        placeholder="Evelyn Grey"
        error={error}
        value={this.state.full_name}
        onChange={onChange}
      />
    )
  }

  renderNumberInput() {
    const onChange = event => {
      event.preventDefault()
      this.setState({ number: event.target.value })
    }

    const error = this.props.errors.number ? this.props.errors.number.join(', ') : null

    return (
      <Input
        type="text"
        label="Number"
        placeholder="1234 1234 1234 1234"
        error={error}
        value={this.state.number}
        onChange={onChange}
      />
    )
  }

  renderExpirationInput() {
    const onChange = event => {
      event.preventDefault()
      this.setState({ expiration_date: event.target.value })
    }

    const error = this.props.errors.expiration_date
      ? this.props.errors.expiration_date.join(', ')
      : null

    return (
      <Input
        type="text"
        label="Expiration Date"
        placeholder="07/14"
        error={error}
        value={this.state.expiration_date}
        onChange={onChange}
      />
    )
  }

  renderSecurityCodeInput() {
    const onChange = event => {
      event.preventDefault()
      this.setState({ cvv: event.target.value })
    }

    const error = this.props.errors.cvv ? this.props.errors.cvv.join(', ') : null

    return (
      <Input
        type="password"
        label="CVV"
        placeholder="123"
        error={error}
        value={this.state.cvv}
        onChange={onChange}
      />
    )
  }

  renderCountryInput() {
    const onChange = event => {
      event.preventDefault()
      this.setState({ country_code_alpha2: event.target.value })
    }

    const error = this.props.errors.country_code_alpha2
      ? this.props.errors.country_code_alpha2.join(', ')
      : null

    return (
      <Input
        type="text"
        label="Country"
        placeholder="US"
        error={error}
        value={this.state.country_code_alpha2}
        onChange={onChange}
      />
    )
  }

  renderPostalCodeInput() {
    const onChange = event => {
      event.preventDefault()
      this.setState({ postal_code: event.target.value })
    }

    const error = this.props.errors.postal_code ? this.props.errors.postal_code.join(', ') : null

    return (
      <Input
        type="text"
        label="Postal Code"
        placeholder="94102"
        error={error}
        value={this.state.postal_code}
        onChange={onChange}
      />
    )
  }

  render() {
    return (
      <form className="credit-card-form" onSubmit={this.handleSubmit}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '80%', paddingRight: 10 }}>
            {this.renderFullNameInput()}
          </div>
          <div style={{ width: '30%', paddingLeft: 10 }}>
            {this.renderCountryInput()}
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '80%', paddingRight: 10 }}>
            {this.renderNumberInput()}
          </div>
          <div style={{ width: '30%', paddingLeft: 10 }}>
            {this.renderSecurityCodeInput()}
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%', paddingRight: 10 }}>
            {this.renderExpirationInput()}
          </div>
          <div style={{ width: '50%', paddingLeft: 10 }}>
            {this.renderPostalCodeInput()}
          </div>
        </div>
        <FlatButton fullWidth color="dark-grey" type="submit">Save Credit Card</FlatButton>
      </form>
    )
  }
}

export default CreditCardForm
