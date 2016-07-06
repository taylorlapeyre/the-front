// @flow
import React, { Component } from 'react'
import FlatButton from 'components/base/FlatButton.jsx'
import Input from 'components/base/Input.jsx'

class GiftCodeForm extends Component {
  handleSubmit: (event: Object) => void;

  props: {
    onSubmit: (giftCodeData: string) => void,
  };

  state: {
    giftCode: string,
  };

  constructor(props: Object) {
    super(props)

    this.state = { giftCode: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event: Object) {
    event.preventDefault()
    this.props.onSubmit(this.state.giftCode)
    this.setState({ giftCode: '' })
  }

  render() {
    const onChange = (event) => (
      this.setState({ giftCode: event.target.value })
    )

    const button = (
      <FlatButton size="small" type="submit">
        Redeem
      </FlatButton>
    )

    return (
      <form className="gift-code-form" onSubmit={this.handleSubmit}>
        <Input
          style={{ width: 180, marginRight: 10 }}
          type="text"
          placeholder="Your Code"
          value={this.state.giftCode}
          onChange={onChange}
          button={button}
        />
      </form>
    )
  }
}

export default GiftCodeForm
