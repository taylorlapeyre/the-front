import React from 'react'
import { mount, shallow } from 'enzyme'
import { Payment } from 'containers/checkout/Payment.jsx'
import OrderBalance from 'components/checkout/OrderBalance.jsx'
import SecureCreditCardForm from 'containers/forms/SecureCreditCardForm.jsx'

describe('containers/checkout/Payment.jsx', () => {
  let saveCreditCard
  let createOrderPreview
  let goToNextStep

  const orderBalance = {
    total: '$1',
    subtotal: '$2',
  }

  function renderShallow() {
    return shallow(
      <Payment
        isLoading={false}
        saveCreditCard={saveCreditCard}
        orderBalance={orderBalance}
        createOrderPreview={createOrderPreview}
        goToNextStep={goToNextStep}
      />
    )
  }

  function fullyMount() {
    return mount(
      <Payment
        isLoading={false}
        saveCreditCard={saveCreditCard}
        orderBalance={orderBalance}
        createOrderPreview={createOrderPreview}
        goToNextStep={goToNextStep}
      />
    )
  }

  beforeEach(() => {
    createOrderPreview = jasmine.createSpy('createOrderPreview')
    goToNextStep = jasmine.createSpy('goToNextStep')
    saveCreditCard = jasmine.createSpy('saveCreditCard').and.returnValue({
      then: fn => fn(),
    })
  })

  it('renders a SecureCreditCardForm', () => {
    const wrapper = renderShallow()
    expect(wrapper.find(SecureCreditCardForm).length).toBe(1)
  })

  it('renders an OrderBalance', () => {
    const wrapper = renderShallow()
    const orderBalanceNode = wrapper.find(OrderBalance).first()
    expect(orderBalanceNode).not.toBeUndefined()
    expect(orderBalanceNode.prop('total')).toEqual(orderBalance.total)
  })

  it('creates a new order preview when it is mounted', () => {
    fullyMount()
    expect(createOrderPreview).toHaveBeenCalled()
  })

  it('creates a credit card and goes to the next step', () => {
    const wrapper = renderShallow()
    const creditCardForm = wrapper.find(SecureCreditCardForm).first()

    creditCardForm.simulate('submit', 'a-secure-nonce')

    expect(saveCreditCard).toHaveBeenCalledWith('a-secure-nonce')
    expect(goToNextStep).toHaveBeenCalled()
  })
})
