import React from 'react'
import LineItem from 'components/checkout/LineItem.jsx'
import { shallow } from 'enzyme'

describe('components/checkout/LineItem', () => {
  let wrapper
  let changeLineItemQuantity

  beforeEach(() => {
    changeLineItemQuantity = jasmine.createSpy('changeLineItemQuantity')
    wrapper = shallow(
      <LineItem
        is_deliverable
        is_preorder
        id={1000}
        title="My Line Item"
        color="Bluegrey"
        size="Medium"
        quantity={2}
        changeLineItemQuantity={changeLineItemQuantity}
      />
    )
  })

  it('shows its size, color, title, and quantity', () => {
    expect(wrapper.text()).toContain('My Line Item')
    expect(wrapper.text()).toContain('Bluegrey')
    expect(wrapper.text()).toContain('Medium')
    expect(wrapper.text()).toContain('–2+')
  })

  it('will show a message if the line item is 1hd deliverable', () => {
    expect(wrapper.text()).toContain('Same Day Delivery Available')
  })

  it('will show a message if the line item is a preorder', () => {
    expect(wrapper.text()).toContain('Ships on')
  })

  it('will remove itself when its remove icon is clicked', () => {
    wrapper.find('.line-item__x-button').simulate('click', { preventDefault: f => f })
    expect(changeLineItemQuantity).toHaveBeenCalledWith({ id: 1000, quantity: 0 })
  })

  it('will increment its quantity when its + icon is clicked', () => {
    wrapper
      .find('.line-item__quantity-button')
      .findWhere(n => n.prop('children') === '+')
      .simulate('click', { preventDefault: f => f })
    expect(changeLineItemQuantity).toHaveBeenCalledWith({ id: 1000, quantity: 3 })
  })

  it('will decrement its quantity when its – icon is clicked', () => {
    wrapper
      .find('.line-item__quantity-button')
      .findWhere(n => n.prop('children') === '–')
      .simulate('click', { preventDefault: f => f })
    expect(changeLineItemQuantity).toHaveBeenCalledWith({ id: 1000, quantity: 1 })
  })
})
