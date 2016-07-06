// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'components/base/Modal.jsx'
import SignInForm from 'components/forms/SignInForm.jsx'
import SignUpForm from 'components/forms/SignUpForm.jsx'
import { isValidEmail, isPresent, mapValidationsToErrors } from 'lib/validate'
import actions from 'actions'
import type { DispatchType } from 'types/redux'

function getErrorsForData(data: Object): Object {
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

// TODO: Write specs
class LoginModal extends Component {
  handleSignIn: (details: { email: string, password: string }) => void;
  handleSignUp: (details: { email: string, password: string }) => void;
  switchForm: (event: Object) => void;

  props: {
    signIn: (details: { email: string, password: string }) => Promise,
    signUp: (details: { email: string, password: string }) => Promise,
    hideModal: () => void,
  }

  state: {
    sign: 'up' | 'in',
    errorsForSignUpForm: Object,
    errorsForSignInForm: Object,
  };

  constructor(props: Object) {
    super(props)
    this.state = { sign: 'up', errorsForSignInForm: {}, errorsForSignUpForm: {} }
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.switchForm = this.switchForm.bind(this)
  }

  switchForm(event: Object) {
    event.preventDefault()
    this.setState({ sign: this.state.sign === 'in' ? 'up' : 'in' })
  }

  handleSignIn(data: { email: string, password: string }) {
    const errors = getErrorsForData(data)
    if (Object.keys(errors).length) {
      this.setState({ errorsForSignInForm: errors })
    } else {
      this.props.signIn(data).then(this.props.hideModal)
    }
  }

  handleSignUp(data: { email: string, password: string }) {
    const errors = getErrorsForData(data)
    if (Object.keys(errors).length) {
      this.setState({ errorsForSignUpForm: errors })
    } else {
      this.props.signUp(data).then(this.props.hideModal)
    }
  }

  render() {
    let form
    if (this.state.sign === 'up') {
      form = <SignUpForm errors={this.state.errorsForSignUpForm} onSubmit={this.handleSignUp} />
    } else if (this.state.sign === 'in') {
      form = <SignInForm errors={this.state.errorsForSignInForm} onSubmit={this.handleSignIn} />
    }

    const linkText: string = (
      this.state.sign === 'in' ? 'New to Everlane?' : 'Already have an account?'
    )

    return (
      <Modal {...this.props} onRequestClose={this.props.hideModal}>
        <div className="login-modal">
          {form}
          <a href="" onClick={this.switchForm} role="link" className="login-modal__switch-link">
            {linkText}
          </a>
        </div>
      </Modal>
    )
  }
}

function mapDispatchToProps(dispatch: DispatchType): Object {
  return {
    signIn: data => dispatch(actions.signIn(data)),
    signUp: data => dispatch(actions.signUp(data)),
    hideModal: () => dispatch(actions.hideModal()),
  }
}

export default connect(null, mapDispatchToProps)(LoginModal)
