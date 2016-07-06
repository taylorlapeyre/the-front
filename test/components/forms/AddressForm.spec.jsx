import React from 'react'
import AddressForm from 'components/forms/AddressForm.jsx'
import Input from 'components/base/Input.jsx'
import { shallow } from 'enzyme'

describe('components/forms/AddressForm', () => {
  let wrapper
  let errors
  let onSubmit

  beforeEach(() => {
    errors = { street_address: ['foo', 'bar'] }
    onSubmit = jasmine.createSpy('onSubmit')
    wrapper = shallow(<AddressForm errors={errors} onSubmit={onSubmit} />)
  })

  it('will submit the inputted data', () => {
    wrapper.find(Input)
           .findWhere(i => i.prop('label') === 'Full Name')
           .simulate('change', { target: { value: 'Taylor Lapeyre' } })
    wrapper.find(Input)
           .findWhere(i => i.prop('label') === 'Street Address')
           .simulate('change', { target: { value: '2170 Folsom St.' } })
    wrapper.find(Input)
           .findWhere(i => i.prop('label') === 'City')
           .simulate('change', { target: { value: 'San Francisco' } })
    wrapper.find(Input)
           .findWhere(i => i.prop('label') === 'Country')
           .simulate('change', { target: { value: 'US' } })
    wrapper.find(Input)
           .findWhere(i => i.prop('label') === 'Region')
           .simulate('change', { target: { value: 'California' } })
    wrapper.find(Input)
           .findWhere(i => i.prop('label') === 'Postal Code')
           .simulate('change', { target: { value: '94102' } })

    wrapper.simulate('submit', { preventDefault: x => x })
    expect(onSubmit).toHaveBeenCalledWith({
      first_name: 'Taylor',
      last_name: 'Lapeyre',
      street_address: '2170 Folsom St.',
      city: 'San Francisco',
      region: 'California',
      country: 'US',
      postal_code: '94102',
    })
  })

  it('will show errors correctly', () => {
    expect(
      wrapper.find(Input)
             .findWhere(i => i.prop('label') === 'Street Address')
             .prop('error')
    ).toEqual('foo, bar')
  })
})
