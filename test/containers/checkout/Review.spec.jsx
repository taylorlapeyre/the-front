/* eslint max-len:0 */
import React from 'react'
import { shallow } from 'enzyme'
import { Review } from 'containers/checkout/Review.jsx'
import FlatButton from 'components/base/FlatButton.jsx'
import Cart from 'components/checkout/Cart.jsx'
import OrderBalance from 'components/checkout/OrderBalance.jsx'
import OrderControlPanel from 'containers/checkout/OrderControlPanel.jsx'

describe('containers/checkout/Review.jsx', () => {
  let createOrder
  let createOrderPreview
  let goToThanksPage
  let fetchShippingOptions
  let chooseShippingOption
  let showModal
  let changeLineItemQuantity

  const shippingOptions = [{ expedited: false }, { expedited: true }]
  const chosenShippingOption = { expedited: false }
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
      <Review
        shippingOptions={shippingOptions}
        chosenShippingOption={chosenShippingOption}
        lineItems={lineItems}
        orderBalance={orderBalance}
        createOrder={createOrder}
        createOrderPreview={createOrderPreview}
        goToThanksPage={goToThanksPage}
        chooseShippingOption={chooseShippingOption}
        fetchShippingOptions={fetchShippingOptions}
        showModal={showModal}
        changeLineItemQuantity={changeLineItemQuantity}
      />
    )
  }

  beforeEach(() => {
    createOrder = jasmine.createSpy('createOrder').and.returnValue({ then: f => f() })
    createOrderPreview = jasmine.createSpy('createOrderPreview')
    goToThanksPage = jasmine.createSpy('goToThanksPage')
    fetchShippingOptions = jasmine.createSpy('fetchShippingOptions')
    showModal = jasmine.createSpy('showModal')
    changeLineItemQuantity = jasmine.createSpy('changeLineItemQuantity')
    chooseShippingOption = jasmine.createSpy('chooseShippingOption')
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

  it('will create an order and go to the next page when the puchase button is clicked', () => {
    const wrapper = renderShallow()
    wrapper.find(FlatButton).last().simulate('click')

    expect(createOrder).toHaveBeenCalled()
    expect(goToThanksPage).toHaveBeenCalled()
  })

  it('will refetch the shipping options and order preview when any change happens to the OrderControlPanel', () => {
    const wrapper = renderShallow()
    wrapper.find(OrderControlPanel).simulate('change')
    expect(fetchShippingOptions).toHaveBeenCalled()
    expect(createOrderPreview).toHaveBeenCalled()
  })
})
