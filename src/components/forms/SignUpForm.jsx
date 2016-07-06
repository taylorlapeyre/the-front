// @flow
import React, { Component } from 'react'
import FlatButton from 'components/base/FlatButton.jsx'
import Input from 'components/base/Input.jsx'

class SignUpForm extends Component {
  handleSubmit: (event: Object) => void;

  props: {
    onSubmit: (loginData: { email: string, password: string}) => void,
    errors: Object,
    initialEmail?: string,
  };

  static defaultProps = {
    errors: {},
  };

  state: {
    email: string,
    password: string,
    full_name: string,
  };

  constructor(props: Object) {
    super(props)
    this.state = {
      email: this.props.initialEmail || '',
      password: '',
      full_name: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event: Object) {
    event.preventDefault()
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state)
    }
  }

  renderEmailField() {
    const onChange = event => this.setState({ email: event.target.value })
    const error = this.props.errors.email ? this.props.errors.email.join(', ') : null

    return (
      <Input
        label="Email Address"
        error={error}
        placeholder="evelyn@email.com"
        autoComplete="email"
        type="email"
        value={this.state.email}
        onChange={onChange}
      />
    )
  }

  renderPasswordField() {
    const onChange = event => this.setState({ password: event.target.value })
    const error = this.props.errors.password ? this.props.errors.password.join(', ') : null

    return (
      <Input
        label="Password"
        error={error}
        placeholder="**********"
        autoComplete="password"
        type="password"
        value={this.state.password}
        onChange={onChange}
      />
    )
  }

  renderFullNameField() {
    const onChange = event => this.setState({ full_name: event.target.value })
    const error = this.props.errors.full_name ? this.props.errors.full_name.join(', ') : null

    return (
      <Input
        label="Full Name"
        error={error}
        placeholder="Evelyn Grey"
        autoComplete="name"
        type="text"
        value={this.state.full_name}
        onChange={onChange}
      />
    )
  }

  render() {
    return (
      <form className="sign-in-form">
        {this.renderEmailField()}
        {this.renderPasswordField()}
        {this.renderFullNameField()}
        <FlatButton fullWidth onClick={this.handleSubmit} color="dark-grey">
          Create Account
        </FlatButton>
      </form>
    )
  }
}

export default SignUpForm
