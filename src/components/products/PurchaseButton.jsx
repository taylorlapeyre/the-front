// @flow
import React from 'react'
import FlatButton from 'components/base/FlatButton.jsx'

type PossibleOrderableStateType = 'sold-out' | 'shippable' | 'waitlistable' | 'preorderable'

function PurchaseButton(props: { orderableState: PossibleOrderableStateType }) {
  function getButtonText(): string {
    const orderableStateToText = {
      shippable: 'Add To Bag',
      waitlistable: 'Waitlist',
      preorderable: 'Preorder',
      'sold-out': 'Sold Out',
    }

    if (props.orderableState) {
      return orderableStateToText[props.orderableState]
    }

    return 'Add To Bag'
  }

  function getButtonColor(): 'dark-grey' | 'grey' {
    if (props.orderableState === 'shippable') {
      return 'dark-grey'
    }

    return 'grey'
  }

  function isDisabled(): boolean {
    return !props.orderableState || props.orderableState === 'sold-out'
  }

  return (
    <FlatButton
      {...props}
      className="purchase-button"
      disabled={isDisabled()}
      color={getButtonColor()}
    >{getButtonText()}</FlatButton>
  )
}

export default PurchaseButton
