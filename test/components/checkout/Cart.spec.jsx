/* eslint max-len:0 */
import React from 'react'
import Cart, { LineItemSection } from 'components/checkout/Cart.jsx'
import LineItem from 'components/checkout/LineItem.jsx'
import { shallow } from 'enzyme'

describe('components/checkout/Cart', () => {
  let wrapper
  let lineItems
  let changeLineItemQuantity

  beforeEach(() => {
    lineItems = [
      { id: 1, quantity: 2, orderable_state: 'preorder', is_preorder: true, is_sf_deliverable: false },
      { id: 2, quantity: 1, orderable_state: 'shippable', is_preorder: false, is_sf_deliverable: true },
    ]
    changeLineItemQuantity = jasmine.createSpy('changeLineItemQuantity')
  })

  it('renders all of its line items without sections when you dont give a shipping option', () => {
    wrapper = shallow(
      <Cart lineItems={lineItems} changeLineItemQuantity={changeLineItemQuantity} />
    )
    expect(wrapper.find(LineItem).length).toBe(2)
    expect(wrapper.find(LineItemSection).length).toBe(0)
  })

  it('displays a helpful message when there are no line items', () => {
    lineItems = []
    wrapper = shallow(
      <Cart lineItems={lineItems} changeLineItemQuantity={changeLineItemQuantity} />
    )
    expect(wrapper.find(LineItem).length).toBe(0)
    expect(wrapper.find('.cart__no-line-items-message').length).toBe(1)
  })

  it('displays a preorder, virtual, and "Your Shipping Option" section when a shipping option is provided', () => {
    wrapper = shallow(
      <Cart
        shippingOption={{ description: 'Standard Shipping', cart_params: { delivery: false } }}
        lineItems={lineItems}
        changeLineItemQuantity={changeLineItemQuantity}
      />
    )
    expect(wrapper.find(LineItemSection).length).toBe(3)
    expect(wrapper.find(LineItemSection).first().prop('title')).toEqual('Standard Shipping')
    expect(wrapper.find(LineItemSection).at(1).prop('title')).toEqual('On Preorder')
    expect(wrapper.find(LineItemSection).last().prop('title')).toEqual('Digital')
  })

  it('will only show shippable line items in the section of "Your Shipping Option"', () => {
    wrapper = shallow(
      <Cart
        shippingOption={{ description: 'Standard Shipping', cart_params: { delivery: false } }}
        lineItems={lineItems}
        changeLineItemQuantity={changeLineItemQuantity}
      />
    )

    expect(
      wrapper.find(LineItemSection).first().prop('lineItems')
    ).toContain(lineItems[1])
  })

  it('will show an "everlane now" section when the shipping option is everlane now (in addition to all other sections)', () => {
    wrapper = shallow(
      <Cart
        shippingOption={{ description: '1-Hour Delivery', cart_params: { delivery: true } }}
        lineItems={lineItems}
        changeLineItemQuantity={changeLineItemQuantity}
      />
    )

    expect(wrapper.find(LineItemSection).length).toBe(4)
    expect(wrapper.find(LineItemSection).first().prop('title')).toEqual('1-Hour Delivery')
    expect(wrapper.find(LineItemSection).at(1).prop('title')).toEqual('Standard Shipping')
    expect(wrapper.find(LineItemSection).at(2).prop('title')).toEqual('On Preorder')
    expect(wrapper.find(LineItemSection).last().prop('title')).toEqual('Digital')
  })

  it('will filter everlane now items by `is_sf_deliverable`', () => {
    wrapper = shallow(
      <Cart
        shippingOption={{ description: '1-Hour Delivery', cart_params: { delivery: true } }}
        lineItems={lineItems}
        changeLineItemQuantity={changeLineItemQuantity}
      />
    )

    expect(
      wrapper.find(LineItemSection).first().prop('lineItems')
    ).toContain(lineItems[1])
  })
})
