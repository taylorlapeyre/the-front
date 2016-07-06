import React from 'react'
import { mount, shallow } from 'enzyme'
import { Preview } from 'containers/checkout/Preview.jsx'
import FlatButton from 'components/base/FlatButton.jsx'
import Cart from 'components/checkout/Cart.jsx'
import OrderBalance from 'components/checkout/OrderBalance.jsx'

describe('containers/checkout/Preview.jsx', () => {
  let changeLineItemQuantity
  let createOrderPreview
  let goBack

  const lineItems = [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 },
  ]

  const orderBalance = {
    total: '$1',
    subtotal: '$2',
  }

  function renderShallow() {
    return shallow(
      <Preview
        isLoading={false}
        lineItems={lineItems}
        changeLineItemQuantity={changeLineItemQuantity}
        orderBalance={orderBalance}
        createOrderPreview={createOrderPreview}
        goBack={goBack}
      />
    )
  }

  function fullyMount() {
    return mount(
      <Preview
        isLoading={false}
        lineItems={lineItems}
        changeLineItemQuantity={changeLineItemQuantity}
        orderBalance={orderBalance}
        createOrderPreview={createOrderPreview}
        goBack={goBack}
      />
    )
  }

  beforeEach(() => {
    changeLineItemQuantity = jasmine.createSpy('changeLineItemQuantity')
    createOrderPreview = jasmine.createSpy('createOrderPreview')
    goBack = jasmine.createSpy('goBack')
  })

  it('renders a Cart', () => {
    const wrapper = renderShallow()
    const cart = wrapper.find(Cart).first()
    expect(cart).not.toBeUndefined()
    expect(cart.prop('lineItems')).toEqual(lineItems)
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

  it('includes a link to go back to the previous page', () => {
    const wrapper = renderShallow()
    wrapper
      .findWhere(n => n.prop('children') === 'Back To Shopping')
      .simulate('click')

    expect(goBack).toHaveBeenCalled()
  })

  it('includes a link to the checkout/account page', () => {
    const wrapper = renderShallow()
    expect(wrapper.find(FlatButton).length).toBe(1)
    expect(wrapper.find(FlatButton).first().prop('to')).toEqual('/checkout/account')
  })
})
