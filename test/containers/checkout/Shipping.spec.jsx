import React from 'react'
import { mount, shallow } from 'enzyme'
import { Shipping } from 'containers/checkout/Shipping.jsx'
import OrderBalance from 'components/checkout/OrderBalance.jsx'
import AddressForm from 'components/forms/AddressForm.jsx'

describe('containers/checkout/Shipping.jsx', () => {
  let saveAddress
  let createOrderPreview
  let goToNextStep
  let primaryAddress

  primaryAddress = {
    street_address: '145 Fell St.',
  }

  const orderBalance = {
    total: '$1',
    subtotal: '$2',
  }

  function renderShallow() {
    return shallow(
      <Shipping
        isLoading={false}
        primaryAddress={primaryAddress}
        saveAddress={saveAddress}
        orderBalance={orderBalance}
        createOrderPreview={createOrderPreview}
        goToNextStep={goToNextStep}
      />
    )
  }

  function fullyMount() {
    return mount(
      <Shipping
        isLoading={false}
        primaryAddress={primaryAddress}
        saveAddress={saveAddress}
        orderBalance={orderBalance}
        createOrderPreview={createOrderPreview}
        goToNextStep={goToNextStep}
      />
    )
  }

  beforeEach(() => {
    createOrderPreview = jasmine.createSpy('createOrderPreview')
    goToNextStep = jasmine.createSpy('goToNextStep')
    saveAddress = jasmine.createSpy('saveAddress').and.returnValue({
      then: fn => fn(),
    })
  })

  it('renders an AddressForm with the primary address filled in', () => {
    const wrapper = renderShallow()
    expect(wrapper.find(AddressForm).length).toBe(1)
    expect(wrapper.find(AddressForm).first().prop('initialFormData')).toEqual(primaryAddress)
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

  it('shows form errors when improper data is submitted', () => {
    const badAddressData = { street_address: '', first_name: '' }
    const wrapper = renderShallow()
    const addressForm = wrapper.find(AddressForm).first()

    addressForm.simulate('submit', badAddressData)

    const errors = wrapper.find(AddressForm).first().prop('errors')
    expect(errors.street_address).toEqual(['Required'])
    expect(errors.first_name).toEqual(['Required'])
  })

  it('creates an address and goes to the next step when proper data is submitted', () => {
    const goodAddressData = {
      street_address: '2170 Folsom St',
      first_name: 'Brian',
      last_name: 'Case',
      postal_code: '94102',
      city: 'San Francisco',
      region: 'California',
      country: 'US',
    }
    const wrapper = renderShallow()
    const addressForm = wrapper.find(AddressForm).first()

    addressForm.simulate('submit', goodAddressData)

    expect(saveAddress).toHaveBeenCalledWith(goodAddressData)
    expect(goToNextStep).toHaveBeenCalled()
  })
})
