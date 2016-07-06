import React from 'react'
import PurchaseButton from 'components/products/PurchaseButton.jsx'
import FlatButton from 'components/base/FlatButton.jsx'
import { shallow } from 'enzyme'

describe('components/products/PurchaseButton', () => {
  let wrapper

  it('will render a FlatButton', () => {
    wrapper = shallow(<PurchaseButton orderableState="shippable" />)
    expect(wrapper.find(FlatButton).length).toBe(1)
  })

  it('will be dark grey and say Add To Bag when shippable', () => {
    wrapper = shallow(<PurchaseButton orderableState="shippable" />)
    expect(wrapper.find(FlatButton).prop('color')).toBe('dark-grey')
    expect(wrapper.find(FlatButton).first().prop('children')).toEqual('Add To Bag')
  })

  it('will be grey and say Waitlist when waitlistable', () => {
    wrapper = shallow(<PurchaseButton orderableState="waitlistable" />)
    expect(wrapper.find(FlatButton).prop('color')).toBe('grey')
    expect(wrapper.find(FlatButton).first().prop('children')).toEqual('Waitlist')
  })

  it('will be grey and say Preorder when preorderable', () => {
    wrapper = shallow(<PurchaseButton orderableState="preorderable" />)
    expect(wrapper.find(FlatButton).prop('color')).toBe('grey')
    expect(wrapper.find(FlatButton).first().prop('children')).toEqual('Preorder')
  })

  it('will be disabled and say Sold Out when sold-out', () => {
    wrapper = shallow(<PurchaseButton orderableState="sold-out" />)
    expect(wrapper.find(FlatButton).prop('disabled')).toBe(true)
    expect(wrapper.find(FlatButton).first().prop('children')).toEqual('Sold Out')
  })

  it('will be disabled and say Add To Bag when the orderable state is undefined', () => {
    wrapper = shallow(<PurchaseButton />)
    expect(wrapper.find(FlatButton).prop('disabled')).toBe(true)
    expect(wrapper.find(FlatButton).first().prop('children')).toEqual('Add To Bag')
  })
})
