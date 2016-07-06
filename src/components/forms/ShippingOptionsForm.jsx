// @flow
import React from 'react'
import RadioGroup from 'components/base/RadioGroup.jsx'
import Input from 'components/base/Input.jsx'
import type { ShippingOptionType } from 'types/everlane'

function shippingOptionIsEverlaneNow(option: ShippingOptionType): boolean {
  return option.cart_params.delivery
}

function ShippingOptionsForm(props: {
  shippingOptions: Array<ShippingOptionType>,
  onChange: (index: string) => void,
  onChooseEverlaneNowOption: () => void,
}) {
  function handleChangeShippingOption(event: Object) {
    const target = event.target
    props.onChange(target.value)
    if (shippingOptionIsEverlaneNow(props.shippingOptions[Number(target.value)])) {
      props.onChooseEverlaneNowOption()
    }
  }

  const options = props.shippingOptions.map(({ selected, description }, index) => (
    <Input
      key={index}
      type="radio"
      value={index}
      checked={selected}
      label={description}
      tabIndex={index}
    />
  ))

  return (
    <form className="shipping-options-form">
      <RadioGroup name="shipping-options" onChange={handleChangeShippingOption}>
        {options}
      </RadioGroup>
    </form>
  )
}

export default ShippingOptionsForm
