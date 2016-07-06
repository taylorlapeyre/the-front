// @flow
import React, { Element } from 'react'
import LoginModal from 'containers/modals/LoginModal.jsx'
import type { UserType } from 'types/everlane'

function AccountBar(props: {
  user: ?UserType,
  numberOfLineItems: number,
  showModal: (modal: Element) => void,
  showHoverCart: () => void,
  hideHoverCart: () => void,
  signOut: () => void,
}) {
  function showLoginModal(event) {
    event.preventDefault()
    props.showModal(<LoginModal />)
  }

  const signInLink = (() => {
    if (props.user) {
      return <li className="account-bar__link">{props.user.first_name}</li>
    }

    return (
      <li className="account-bar__link">
        <a href="#" role="link" onClick={showLoginModal}>Register</a>
      </li>
    )
  })()

  const signOutLink = props.user && (
    <li className="account-bar__link">
      <a href="#" role="link" onClick={props.signOut}>Sign Out</a>
    </li>
  )

  const cartLink = (
    <li
      className="account-bar__link"
      onMouseEnter={props.showHoverCart}
    >
      Cart ({props.numberOfLineItems})
    </li>
  )

  return (
    <div className="account-bar__links-container">
      <ul className="account-bar__links">
        {signInLink}
        {signOutLink}
        {cartLink}
      </ul>
    </div>
  )
}

export default AccountBar
