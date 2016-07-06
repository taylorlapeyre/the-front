import React from 'react'
import AccountBar from 'components/layout/AccountBar.jsx'
import LoginModal from 'containers/modals/LoginModal.jsx'
import { shallow } from 'enzyme'

describe('components/layout/AccountBar', () => {
  let wrapper
  let showModal
  let signOut
  let showHoverCart
  let hideHoverCart
  let numberOfLineItems

  beforeEach(() => {
    numberOfLineItems = 2
    showHoverCart = jasmine.createSpy('showHoverCart')
    hideHoverCart = jasmine.createSpy('hideHoverCart')
    signOut = jasmine.createSpy('signOut')
    showModal = jasmine.createSpy('showModal')
  })

  it('shows the login modal when the register link is clicked', () => {
    wrapper = shallow(
      <AccountBar
        numberOfLineItems={numberOfLineItems}
        showHoverCart={showHoverCart}
        hideHoverCart={hideHoverCart}
        showModal={showModal}
        signOut={signOut}
      />
    )

    wrapper.find('a').first().simulate('click', { preventDefault: x => x })
    expect(showModal).toHaveBeenCalled()
    expect(showModal.calls.mostRecent().args[0].type).toEqual(LoginModal)
  })

  it('shows the user\'s first name and a sign out link when a user is present', () => {
    wrapper = shallow(
      <AccountBar
        numberOfLineItems={numberOfLineItems}
        showHoverCart={showHoverCart}
        hideHoverCart={hideHoverCart}
        user={{ first_name: 'Taylor' }}
        showModal={showModal}
        signOut={signOut}
      />
    )

    expect(wrapper.contains('Taylor')).toBe(true)
    expect(wrapper.contains('Sign Out')).toBe(true)
  })

  it('calls signOut when the user clicks the sign out button', () => {
    wrapper = shallow(
      <AccountBar
        numberOfLineItems={numberOfLineItems}
        showHoverCart={showHoverCart}
        hideHoverCart={hideHoverCart}
        user={{ email: 'taylor@everlane.com' }}
        showModal={showModal}
        signOut={signOut}
      />
    )

    wrapper.findWhere(n => n.prop('children') === 'Sign Out').simulate('click')
    expect(signOut).toHaveBeenCalled()
  })
})
