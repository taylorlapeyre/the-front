import React from 'react'
import { shallow } from 'enzyme'
import SecureCreditCardForm from 'containers/forms/SecureCreditCardForm.jsx'
import CreditCardForm from 'components/forms/CreditCardForm.jsx'

describe('containers/checkout/SecureCreditCardForm.jsx', () => {
  let onSubmit
  let tokenizeCard

  function renderShallow() {
    return shallow(
      <SecureCreditCardForm onSubmit={onSubmit} tokenizeCard={tokenizeCard} />
    )
  }

  beforeEach(() => {
    onSubmit = jasmine.createSpy('onSubmit')
    tokenizeCard = jasmine.createSpy('tokenizeCard').and.returnValue({
      then: fn => fn('a-fake-nonce'),
    })
  })

  it('renders a CreditCardForm with the primary address filled in', () => {
    const wrapper = renderShallow()
    expect(wrapper.find(CreditCardForm).length).toBe(1)
  })

  it('shows form errors when improper data is submitted', () => {
    const badCCData = { number: '', cvv: '' }
    const wrapper = renderShallow()
    const creditCardForm = wrapper.find(CreditCardForm).first()

    creditCardForm.simulate('submit', badCCData)

    const errors = wrapper.find(CreditCardForm).first().prop('errors')
    expect(errors.number).toContain('Please enter a valid credit card number')
    expect(errors.cvv).toContain('Please enter a valid security code')
  })

  it('submits encoded data when valid data is submitted', () => {
    const goodCCData = {
      number: '4111111111111111',
      cvv: '123',
      expiration_date: '07/17',
      first_name: 'Brian',
      last_name: 'Case',
      postal_code: '94102',
      country_code_alpha2: 'US',
    }
    const wrapper = renderShallow()

    wrapper.find(CreditCardForm).first().simulate('submit', goodCCData)
    expect(tokenizeCard).toHaveBeenCalledWith(goodCCData)
    expect(onSubmit).toHaveBeenCalledWith('a-fake-nonce')
  })
})
