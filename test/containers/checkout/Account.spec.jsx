import React from 'react'
import { shallow } from 'enzyme'
import { Account } from 'containers/checkout/Account.jsx'
import EmailForm from 'components/forms/EmailForm.jsx'
import SignInForm from 'components/forms/SignInForm.jsx'
import SignUpForm from 'components/forms/SignUpForm.jsx'

describe('containers/checkout/Account.jsx', () => {
  let determineIfVisitorEmailIsTaken
  let setVisitorEmail
  let signIn
  let signUp
  let goToNextStep

  beforeEach(() => {
    const fakePromise = { then: fn => fn() }

    determineIfVisitorEmailIsTaken = (
      jasmine.createSpy('determineIfVisitorEmailIsTaken').and.returnValue({
        then: fn => fn({ availability: false }),
      })
    )
    setVisitorEmail = jasmine.createSpy('setVisitorEmail').and.returnValue(fakePromise)
    signIn = jasmine.createSpy('signIn').and.returnValue(fakePromise)
    signUp = jasmine.createSpy('signUp').and.returnValue(fakePromise)
    goToNextStep = jasmine.createSpy('goToNextStep')
  })

  function renderShallow({ emailIsAvailable }) {
    const visitor = {
      email: 'taylor@me.com',
      emailIsAvailable,
    }

    return shallow(
      <Account
        visitor={visitor}
        determineIfVisitorEmailIsTaken={determineIfVisitorEmailIsTaken}
        setVisitorEmail={setVisitorEmail}
        signIn={signIn}
        signUp={signUp}
        goToNextStep={goToNextStep}
      />
    )
  }

  it('renders an EmailForm on render', () => {
    const wrapper = renderShallow({ emailIsAvailable: undefined })
    expect(wrapper.find(EmailForm).length).toBe(1)
  })

  it("collects the visitor's email when the EmailForm is submitted", () => {
    const wrapper = renderShallow({ emailIsAvailable: undefined })
    wrapper.find(EmailForm).first().simulate('submit', 'fake@email.com')
    expect(setVisitorEmail).toHaveBeenCalledWith('fake@email.com')
  })

  it('determines if the email is taken when the EmailForm is submitted', () => {
    const wrapper = renderShallow({ emailIsAvailable: undefined })
    wrapper.find(EmailForm).first().simulate('submit', 'fake@email.com')
    expect(determineIfVisitorEmailIsTaken).toHaveBeenCalledWith('fake@email.com')
  })

  it("does not take action if the EmailForm doesn't have a valid email", () => {
    const wrapper = renderShallow({ emailIsAvailable: undefined })
    wrapper.find(EmailForm).first().simulate('submit', 'not an email')
    expect(setVisitorEmail).not.toHaveBeenCalledWith('not an email')
  })

  it('renders a SignInForm when the visitor email is taken', () => {
    const wrapper = renderShallow({ emailIsAvailable: false })
    expect(wrapper.find(SignInForm).length).toBe(1)
  })

  it('shows errors for the SignInForm when it is submitted with bad data', () => {
    const badLogInData = { email: '', password: '' }
    const wrapper = renderShallow({ emailIsAvailable: false })
    wrapper.find(SignInForm).first().simulate('submit', badLogInData)

    const errors = wrapper.find(SignInForm).first().prop('errors')

    expect(errors.email).toContain('Please enter a valid email')
    expect(errors.password).toContain('Required')
  })

  it('signs in the user and goes to the next step when proper data is submitted', () => {
    const goodLogInData = { email: 'taylor@everlane.com', password: 'keep it secret' }
    const wrapper = renderShallow({ emailIsAvailable: false })
    wrapper.find(SignInForm).first().simulate('submit', goodLogInData)

    expect(signIn).toHaveBeenCalledWith(goodLogInData)
    expect(goToNextStep).toHaveBeenCalled()
  })

  it('renders a SignUpForm when the visitor email is available', () => {
    const wrapper = renderShallow({ emailIsAvailable: true })
    expect(wrapper.find(SignUpForm).length).toBe(1)
  })

  it('shows errors for the SignUpForm when it is submitted with bad data', () => {
    const badSignUpData = { email: '', password: '' }
    const wrapper = renderShallow({ emailIsAvailable: true })
    wrapper.find(SignUpForm).first().simulate('submit', badSignUpData)

    const errors = wrapper.find(SignUpForm).first().prop('errors')

    expect(errors.email).toContain('Please enter a valid email')
    expect(errors.password).toContain('Required')
  })

  it('signs up the user and goes to the next step when proper data is submitted', () => {
    const goodSignUpData = { email: 'taylor@everlane.com', password: 'keep it secret' }
    const wrapper = renderShallow({ emailIsAvailable: true })
    wrapper.find(SignUpForm).first().simulate('submit', goodSignUpData)

    expect(signUp).toHaveBeenCalledWith(goodSignUpData)
    expect(goToNextStep).toHaveBeenCalled()
  })
})
