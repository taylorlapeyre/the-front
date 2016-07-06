import React from 'react'
import EverlaneNowForm from 'components/forms/EverlaneNowForm.jsx'
import Input from 'components/base/Input.jsx'
import { shallow } from 'enzyme'

describe('components/forms/EverlaneNowForm', () => {
  let wrapper
  let errors
  let onSubmit

  beforeEach(() => {
    errors = { phoneNumber: ['foo', 'bar'] }
    onSubmit = jasmine.createSpy('onSubmit')
    wrapper = shallow(<EverlaneNowForm errors={errors} onSubmit={onSubmit} />)
  })

  it('will submit the inputted data', () => {
    wrapper.find(Input)
           .findWhere(i => i.prop('label') === 'Mobile Number*')
           .simulate('change', { target: { value: '5042362750' } })
    wrapper.find(Input)
           .findWhere(i => i.prop('label') === 'Delivery Instructions')
           .simulate('change', { target: { value: 'Ring the doorbell' } })
    wrapper.find(Input)
           .findWhere(i => i.prop('label') === 'Include a Handwritten Note')
           .simulate('change', { target: { value: 'A picture of a jaguar eating a popsicle' } })

    wrapper.simulate('submit', { preventDefault: x => x })
    expect(onSubmit).toHaveBeenCalledWith({
      phoneNumber: '5042362750',
      instructions: 'Ring the doorbell',
      note: 'A picture of a jaguar eating a popsicle',
    })
  })

  it('will show errors correctly', () => {
    expect(
      wrapper.find(Input)
             .findWhere(i => i.prop('label') === 'Mobile Number*')
             .prop('error')
    ).toEqual('foo, bar')
  })
})
