// @flow
import React, { Component } from 'react'
import FlatButton from 'components/base/FlatButton.jsx'
import Input from 'components/base/Input.jsx'

class SignInForm extends Component {
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
  };

  constructor(props: Object) {
    super(props)
    this.state = {
      email: this.props.initialEmail || '',
      password: '',
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

  render() {
    return (
      <form className="sign-in-form">
        {this.renderEmailField()}
        {this.renderPasswordField()}
        <FlatButton fullWidth onClick={this.handleSubmit} color="dark-grey">Log In</FlatButton>
      </form>
    )
  }
}

export default SignInForm
