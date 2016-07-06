import React from 'react'
import { shallow } from 'enzyme'
import { Index } from 'containers/checkout/Index.jsx'
import StepIndicator from 'components/checkout/StepIndicator.jsx'

describe('containers/checkout/Index.jsx', () => {
  it('renders a StepIndicator with the right step', () => {
    const wrapper = shallow(
      <Index checkoutStage="shipping">
        Hello World!
      </Index>
    )

    expect(wrapper.find(StepIndicator).length).toBe(1)
    expect(wrapper.find(StepIndicator).first().prop('currentStep')).toBe('shipping')
  })

  it('does not render a StepIndicator on the "preview" page', () => {
    const wrapper = shallow(
      <Index checkoutStage="preview">
        Hello World!
      </Index>
    )

    expect(wrapper.find(StepIndicator).length).toBe(0)
  })
})
