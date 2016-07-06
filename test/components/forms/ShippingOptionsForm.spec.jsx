import React from 'react'
import ShippingOptionsForm from 'components/forms/ShippingOptionsForm.jsx'
import RadioGroup from 'components/base/RadioGroup.jsx'
import { shallow } from 'enzyme'

describe('components/forms/ShippingOptionsForm', () => {
  let wrapper
  let onChange
  let onChooseEverlaneNowOption
  const shippingOptions = [{ cart_params: { delivery: true } }]

  beforeEach(() => {
    onChange = jasmine.createSpy('onChange')
    onChooseEverlaneNowOption = jasmine.createSpy('onChooseEverlaneNowOption')
    wrapper = shallow(
      <ShippingOptionsForm
        onChange={onChange}
        onChooseEverlaneNowOption={onChooseEverlaneNowOption}
        shippingOptions={shippingOptions}
      />
    )
  })

  it('will call onChange whenever an option is selected', () => {
    wrapper.find(RadioGroup).first().simulate('change', { target: { value: 0 } })

    expect(onChange).toHaveBeenCalledWith(0)
  })

  it('will call onChooseEverlaneNowOption whenever an option with `delivery` is selected', () => {
    wrapper.find(RadioGroup).first().simulate('change', { target: { value: 0 } })

    expect(onChooseEverlaneNowOption).toHaveBeenCalled()
  })
})
