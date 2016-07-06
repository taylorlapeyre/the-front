// @flow
import React, { Component } from 'react'
import FlatButton from 'components/base/FlatButton.jsx'
import Input from 'components/base/Input.jsx'
import pick from 'lodash/pick'

class AddressForm extends Component {
  handleSubmit: (event: Object) => void;

  props: {
    onSubmit: (addressData: Object) => void,
    initialFormData: Object,
    errors: Object,
  };

  state: {
    full_name: string,
    first_name: string,
    last_name: string,
    street_address: string,
    extended_address: string,
    city: string,
    country: string,
    company: string,
    region: string,
    postal_code: string,
  };

  static defaultProps = {
    initialFormData: {},
  };

  constructor(props: Object) {
    super(props)

    this.state = pick(props.initialFormData, [
      'first_name',
      'last_name',
      'street_address',
      'extended_address',
      'city',
      'country',
      'region',
      'postal_code',
    ])

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.props.onSubmit(this.state)
  }

  renderFullNameInput() {
    const onChange = (event: Object) => {
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

  renderStreetAddressInput() {
    const onChange = (event: Object) => { this.setState({ street_address: event.target.value }) }

    const error = this.props.errors.street_address
      ? this.props.errors.street_address.join(', ')
      : null

    return (
      <Input
        type="text"
        label="Street Address"
        placeholder="123 Main St."
        error={error}
        value={this.state.street_address}
        onChange={onChange}
      />
    )
  }

  renderExtendedAddressInput() {
    const onChange = (event: Object) => { this.setState({ extended_address: event.target.value }) }

    return (
      <Input
        type="text"
        label="Apt"
        placeholder="Apt. 306"
        value={this.state.extended_address}
        onChange={onChange}
      />
    )
  }

  renderCompanyInput() {
    const onChange = (event: Object) => { this.setState({ company: event.target.value }) }

    return (
      <Input
        type="text"
        label="Company"
        placeholder="Everlane"
        value={this.state.company}
        onChange={onChange}
      />
    )
  }

  renderCityInput() {
    const onChange = (event: Object) => { this.setState({ city: event.target.value }) }

    const error = this.props.errors.city ? this.props.errors.city.join(', ') : null

    return (
      <Input
        type="text"
        label="City"
        placeholder="San Francisco"
        error={error}
        value={this.state.city}
        onChange={onChange}
      />
    )
  }

  renderCountryInput() {
    const onChange = (event: Object) => { this.setState({ country: event.target.value }) }

    const error = this.props.errors.country ? this.props.errors.country.join(', ') : null

    return (
      <Input
        type="text"
        label="Country"
        placeholder="US"
        error={error}
        value={this.state.country}
        onChange={onChange}
      />
    )
  }

  renderRegionInput() {
    const onChange = (event: Object) => { this.setState({ region: event.target.value }) }

    const error = this.props.errors.region ? this.props.errors.region.join(', ') : null

    return (
      <Input
        type="text"
        label="Region"
        placeholder="Califonia"
        error={error}
        value={this.state.region}
        onChange={onChange}
      />
    )
  }

  renderPostalCodeInput() {
    const onChange = (event: Object) => { this.setState({ postal_code: event.target.value }) }

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
      <form className="address-form" onSubmit={this.handleSubmit}>
        {this.renderFullNameInput()}
        {this.renderStreetAddressInput()}

        <div style={{ display: 'flex' }}>
          <div style={{ width: '30%', paddingRight: 10 }}>
            {this.renderExtendedAddressInput()}
          </div>
          <div style={{ width: '80%', paddingLeft: 10 }}>
            {this.renderCompanyInput()}
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%', paddingRight: 10 }}>
            {this.renderCityInput()}
          </div>
          <div style={{ width: '50%', paddingLeft: 10 }}>
            {this.renderRegionInput()}
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%', paddingRight: 10 }}>
            {this.renderPostalCodeInput()}
          </div>
          <div style={{ width: '50%', paddingLeft: 10 }}>
            {this.renderCountryInput()}
          </div>
        </div>

        <FlatButton fullWidth color="dark-grey" type="submit">Save Address</FlatButton>
      </form>
    )
  }
}

export default AddressForm
