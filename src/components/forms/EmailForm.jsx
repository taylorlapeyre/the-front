// @flow
import React, { Component } from 'react'
import FlatButton from 'components/base/FlatButton.jsx'
import Input from 'components/base/Input.jsx'

class CollectEmailForm extends Component {
  props: {
    onSubmit: (email: string) => void,
  };

  state: {
    email: string,
  };

  handleSubmit: (event: Object) => void;

  constructor(props: Object) {
    super(props)

    this.state = { email: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event: Object) {
    event.preventDefault()
    this.props.onSubmit(this.state.email)
  }

  render() {
    const onChange = (event) => (
      this.setState({ email: event.target.value })
    )

    return (
      <form className="check-email-form" onSubmit={this.handleSubmit}>
        <Input
          label="Email Address"
          type="email"
          placeholder="evelyn@email.com"
          value={this.state.email}
          onChange={onChange}
        />
        <FlatButton fullWidth color="dark-grey" type="submit">Continue</FlatButton>
      </form>
    )
  }
}

CollectEmailForm.propTypes = {
  onSubmit: React.PropTypes.func,
}

export default CollectEmailForm
