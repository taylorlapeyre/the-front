import React, { Component } from 'react'
import FlatButton from 'components/base/FlatButton.jsx'
import Input from 'components/base/Input.jsx'
import type { EverlaneNowDetailsType } from 'types/everlane'

class EverlaneNowForm extends Component {
  props: {
    onSubmit: () => void,
    errors: Object
  };

  static defaultProps = {
    errors: {},
  }

  state: EverlaneNowDetailsType;

  handleSubmit: () => void;

  constructor(props: Object) {
    super(props)

    this.state = { phoneNumber: '', instructions: '', note: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.props.onSubmit(this.state)
  }

  renderPhoneNumberInput() {
    const onChange = (event) => (
      this.setState({ phoneNumber: event.target.value })
    )

    const error = this.props.errors.phoneNumber ? this.props.errors.phoneNumber.join(', ') : null

    return (
      <Input
        label="Mobile Number*"
        type="text"
        placeholder="(555) 555-5555"
        error={error}
        value={this.state.phoneNumber}
        onChange={onChange}
      />
    )
  }

  renderInstructionsInput() {
    const onChange = (event) => (
      this.setState({ instructions: event.target.value })
    )

    return (
      <Input
        label="Delivery Instructions"
        type="text"
        placeholder="Buzz me at the front door"
        value={this.state.instructions}
        onChange={onChange}
      />
    )
  }

  renderNoteInput() {
    const onChange = (event) => (
      this.setState({ note: event.target.value })
    )

    return (
      <Input
        label="Include a Handwritten Note"
        type="textarea"
        placeholder="Hi Alex - Thanks for dinner!"
        value={this.state.note}
        onChange={onChange}
      />
    )
  }

  render() {
    return (
      <form className="everlane-now-form" onSubmit={this.handleSubmit}>
        {this.renderPhoneNumberInput()}
        {this.renderInstructionsInput()}
        {this.renderNoteInput()}
        <FlatButton type="submit" color="dark-grey">
          Save
        </FlatButton>
      </form>
    )
  }
}

export default EverlaneNowForm
