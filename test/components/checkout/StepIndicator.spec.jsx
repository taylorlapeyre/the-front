import React from 'react'
import StepIndicator from 'components/checkout/StepIndicator.jsx'
import { shallow } from 'enzyme'

describe('components/checkout/StepIndicator', () => {
  let wrapper
  const possibleSteps = ['account', 'shipping', 'billing', 'confirm']

  it('will render all of the possibleSteps', () => {
    wrapper = shallow(
      <StepIndicator possibleSteps={possibleSteps} currentStep="billing" />
    )

    for (let i = 0; i < possibleSteps.length; i++) {
      expect(wrapper.text()).toContain(possibleSteps[i])
    }
  })

  it('will show all of the steps up to (and including) the current step as completed', () => {
    wrapper = shallow(
      <StepIndicator possibleSteps={possibleSteps} currentStep="billing" />
    )

    for (let i = 0; i <= possibleSteps.indexOf('billing'); i++) {
      expect(
        wrapper.find('.step-indicator__dot').at(i).hasClass('step-indicator__dot--completed')
      ).toBe(true)
    }
  })
})
