// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import SignUpForm from 'components/forms/SignUpForm.jsx'
import SignInForm from 'components/forms/SignInForm.jsx'
import EmailForm from 'components/forms/EmailForm.jsx'
import { isValidEmail, isPresent, mapValidationsToErrors } from 'lib/validate'
import actions from 'actions'
import type { VisitorType } from 'types/everlane'
import type { DispatchType } from 'types/redux'

function getErrorsForData(data: { email: string, password: string }) {
  return mapValidationsToErrors({
    email: {
      value: data.email,
      validations: [isValidEmail, isPresent],
    },
    password: {
      value: data.password,
      validations: [isPresent],
    },
  })
}

export class Account extends Component {

  handleCollectEmail: (email: string) => void;
  handleSignIn: (data: { email: string, password: string }) => void;
  handleSignUp: (data: { email: string, password: string }) => void;

  props: {
    visitor: VisitorType,
    determineIfVisitorEmailIsTaken: (email: string) => Promise,
    setVisitorEmail: (email: string) => Promise,
    signIn: (data: { email: string, password: string }) => Promise,
    signUp: (data: { email: string, password: string }) => Promise,
    goToNextStep: () => void,
  };

  state: {
    errorsForSignInForm: {},
    errorsForSignUpForm: {},
  };

  constructor(props: Object) {
    super(props)

    this.state = {
      errorsForSignInForm: {},
      errorsForSignUpForm: {},
    }

    this.handleCollectEmail = this.handleCollectEmail.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
  }

  handleCollectEmail(email: string) {
    if (isValidEmail(email)) {
      this.props.setVisitorEmail(email)
      .then(this.props.determineIfVisitorEmailIsTaken.bind(this, email))
    }
  }

  handleSignUp(data: { email: string, password: string }) {
    const errors = getErrorsForData(data)
    if (Object.keys(errors).length) {
      this.setState({ errorsForSignUpForm: errors })
    } else {
      this.props.signUp(data).then(this.props.goToNextStep)
    }
  }

  handleSignIn(data: { email: string, password: string }) {
    const errors = getErrorsForData(data)
    if (Object.keys(errors).length) {
      this.setState({ errorsForSignInForm: errors })
    } else {
      this.props.signIn(data).then(this.props.goToNextStep)
    }
  }

  renderForm() {
    if (this.props.visitor.emailIsAvailable) {
      return this.renderSignUpForm()
    }

    if (this.props.visitor.emailIsAvailable === false) {
      return this.renderSignInForm()
    }

    return this.renderEmailForm()
  }

  renderSignUpForm() {
    return (
      <div>
        <p className="checkout-account-page__subtitle">
          Welcome to Everlane, please create an account
        </p>
        <SignUpForm onSubmit={this.handleSignUp} errors={this.state.errorsForSignUpForm} />
      </div>
    )
  }

  renderSignInForm() {
    return (
      <div>
        <p className="checkout-account-page__subtitle">
          Welcome back, please log in to your account
        </p>
        <SignInForm onSubmit={this.handleSignIn} errors={this.state.errorsForSignInForm} />
      </div>
    )
  }

  renderEmailForm() {
    return (
      <div>
        <p className="checkout-account-page__subtitle">
          Please enter your email address
        </p>
        <EmailForm onSubmit={this.handleCollectEmail} />
      </div>
    )
  }

  render() {
    const form = this.renderForm()

    return (
      <div className="checkout-account-page">
        <h3 className="checkout-account-page__title">Enter your email</h3>
        {form}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch: DispatchType) {
  return {
    determineIfVisitorEmailIsTaken: (email: string) => (
      dispatch(actions.determineIfVisitorEmailIsTaken(email))
    ),
    setVisitorEmail: (email: string) => dispatch(actions.setVisitorEmail(email)),
    signIn: data => dispatch(actions.signIn(data)),
    signUp: data => dispatch(actions.signUp(data)),
    goToNextStep: () => browserHistory.push('/checkout/shipping'),
  }
}

function mapStateToProps(state) {
  return {
    visitor: state.session.visitor,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
