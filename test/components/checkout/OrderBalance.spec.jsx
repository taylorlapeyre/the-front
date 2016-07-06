import React from 'react'
import OrderBalance from 'components/checkout/OrderBalance.jsx'
import { shallow } from 'enzyme'

describe('components/checkout/OrderBalance', () => {
  let wrapper
  const adjustments = [
    { label: 'Shipping', amount: '$10' },
    { label: 'Tax', amount: '$15' },
  ]

  it('will render with just "Loading..." when isLoading is true', () => {
    wrapper = shallow(
      <OrderBalance isLoading total="$100" />
    )

    expect(wrapper.text()).toContain('Loading...')
    expect(wrapper.text()).not.toContain('$100')
  })

  it('will render its subtotal and total', () => {
    wrapper = shallow(
      <OrderBalance total="$100" subtotal="$125" />
    )

    expect(wrapper.text()).toContain('$100')
    expect(wrapper.text()).toContain('$125')
  })

  it('will render all of the adjustments', () => {
    wrapper = shallow(
      <OrderBalance total="$100" subtotal="$125" adjustments={adjustments} />
    )

    for (let i = 0; i < adjustments.length; i++) {
      expect(wrapper.text()).toContain(adjustments[i].label)
    }
  })
})
