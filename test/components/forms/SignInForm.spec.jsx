import React from 'react'
import SignInForm from 'components/forms/SignInForm.jsx'
import Input from 'components/base/Input.jsx'
import FlatButton from 'components/base/FlatButton.jsx'
import { shallow } from 'enzyme'

describe('components/forms/SignInForm', () => {
  let wrapper
  let errors
  let onSubmit

  beforeEach(() => {
    errors = { email: ['foo', 'bar'] }
    onSubmit = jasmine.createSpy('onSubmit')
    wrapper = shallow(<SignInForm errors={errors} onSubmit={onSubmit} />)
  })

  it('will submit the inputted data', () => {
    wrapper.find(Input)
           .findWhere(i => i.prop('label') === 'Email Address')
           .simulate('change', { target: { value: 'taylor@everlane' } })
    wrapper.find(Input)
           .findWhere(i => i.prop('label') === 'Password')
           .simulate('change', { target: { value: 'everlane123' } })

    wrapper.find(FlatButton).simulate('click', { preventDefault: x => x })
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'taylor@everlane',
      password: 'everlane123',
    })
  })

  it('will show errors correctly', () => {
    expect(
      wrapper.find(Input)
             .findWhere(i => i.prop('label') === 'Email Address')
             .prop('error')
    ).toEqual('foo, bar')
  })
})
