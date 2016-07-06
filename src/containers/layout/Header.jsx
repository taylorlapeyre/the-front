import React, { Element } from 'react'
import { connect } from 'react-redux'
import Logo from 'components/base/Logo.jsx'
import Navigation from 'components/layout/Navigation.jsx'
import AccountBar from 'components/layout/AccountBar.jsx'
import HoverCart from 'containers/layout/HoverCart.jsx'
import classnames from 'classnames'
import actions from 'actions'
import type { UserType, MenuType } from 'types/everlane'
import type { DispatchType } from 'types/redux'

export function Header(props: {
  user: UserType,
  menus: Array<MenuType>,
  numberOfLineItems: number,
  transparent: boolean,
  showNavigation: boolean,
  hoverCartIsActive: boolean,
  showHoverCart: () => void,
  hideHoverCart: () => void,
  showDropDownMenu: (id: number) => void,
  hideDropDownMenu: (id: number) => void,
  showModal: (modal: Element) => void,
  signOut: () => Promise,
}) {
  const className: string = classnames('app-header', {
    'app-header--transparent': props.transparent,
  })

  const navigation = props.showNavigation && (
    <Navigation
      showDropDownMenu={props.showDropDownMenu}
      hideDropDownMenu={props.hideDropDownMenu}
      menus={props.menus}
    />
  )

  return (
    <header className={className}>
      <AccountBar
        user={props.user}
        numberOfLineItems={props.numberOfLineItems}
        showModal={props.showModal}
        showHoverCart={props.showHoverCart}
        hideHoverCart={props.hideHoverCart}
        signOut={props.signOut}
      />
      {props.hoverCartIsActive && <HoverCart />}
      <div className="app-header__logo-container">
        <Logo linkTo="/" />
      </div>
      {navigation}
    </header>
  )
}

function mapStateToProps(state: Object, ownProps: Object): Object {
  return {
    user: state.session.user,
    menus: state.data.menus,
    numberOfLineItems: state.checkout.lineItems.length,
    overlayed: ownProps.transparent,
    hoverCartIsActive: state.checkout.hoverCart,
  }
}

function mapDispatchToProps(dispatch: DispatchType): Object {
  return {
    showDropDownMenu: (id) => dispatch(actions.showDropDownMenu(id)),
    hideDropDownMenu: (id) => dispatch(actions.hideDropDownMenu(id)),
    showHoverCart: () => dispatch(actions.showHoverCart()),
    hideHoverCart: () => dispatch(actions.hideHoverCart()),
    showModal: (modal) => dispatch(actions.showModal(modal)),
    signOut: () => dispatch(actions.signOut()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
