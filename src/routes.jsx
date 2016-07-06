// @flow
import React from 'react'
import store from 'store'
import { IndexRoute, Route } from 'react-router'
import find from 'lodash/find'
import findLastIndex from 'lodash/findLastIndex'
import Chrome from 'containers/layout/Chrome.jsx'
import HomeIndex from 'containers/home/Index.jsx'
import CollectionIndex from 'containers/collections/Index.jsx'
import ProductIndex from 'containers/products/Index.jsx'
import CheckoutIndex from 'containers/checkout/Index.jsx'
import CheckoutAccount from 'containers/checkout/Account.jsx'
import CheckoutShipping from 'containers/checkout/Shipping.jsx'
import CheckoutPayment from 'containers/checkout/Payment.jsx'
import CheckoutReview from 'containers/checkout/Review.jsx'
import CheckoutPreview from 'containers/checkout/Preview.jsx'
import CheckoutThanks from 'containers/checkout/Thanks.jsx'

function userExists(): boolean {
  return store.getState().session.user !== null &&
         store.getState().session.user !== undefined
}

function userHasAPrimaryAddress(): boolean {
  return find(store.getState().session.user.addresses, { primary: true })
}

function userHasAPrimaryCreditCard(): boolean {
  return find(store.getState().session.user.creditCards, { primary: true })
}

function requireValidCheckoutData(
  nextState: { location: { pathname: string } },
  replace: (nextPath: { pathname: string, state: { nextPathName: string } }) => void) {
  const requirements: { [path: string]: () => boolean } = {
    '/checkout/account': () => (
      !userExists()
    ),
    '/checkout/shipping': () => (
      userExists()
    ),
    '/checkout/payment': () => (
      userExists() && userHasAPrimaryAddress()
    ),
    '/checkout/review': () => (
      userExists() && userHasAPrimaryAddress() && userHasAPrimaryCreditCard()
    ),
  }

  const checkoutRoutes = Object.keys(requirements)
  const intendedRoute = nextState.location.pathname
  const indexOfMostAppropriateRoute = findLastIndex(checkoutRoutes, route => requirements[route]())

  if (requirements[intendedRoute]()) {
    return true
  }

  return replace({
    pathname: checkoutRoutes[indexOfMostAppropriateRoute],
    state: { nextPathName: nextState.location.pathname },
  })
}

const EmptyComponent = ({ children }: { children?: ?any }) =>
  <div>
    <h1>Component not created yet</h1>
    {children}
  </div>

const AccountIndex = EmptyComponent
const AccountWaitlist = EmptyComponent
const AccountReturns = EmptyComponent
const AccountInfo = EmptyComponent
const AccountBilling = EmptyComponent
const AccountAddress = EmptyComponent

const GiftReturnsIndex = EmptyComponent
const GiftReturnsNew = EmptyComponent
const GiftReturnsCreated = EmptyComponent

const ComingSoonIndex = EmptyComponent
const ComingSoonGender = EmptyComponent

const AboutIndex = EmptyComponent
const HelpIndex = EmptyComponent
const ReferralIndex = EmptyComponent
const PaidLandingIndex = EmptyComponent

const PageIndex = EmptyComponent

const pagePermalinks = []

const routes = (
  <Route path="/" component={Chrome}>

    <IndexRoute component={HomeIndex} />

    <Route path="account" component={AccountIndex}>
      <Route path="waitlist" component={AccountWaitlist} />
      <Route path="returns" component={AccountReturns} />
      <Route path="info" component={AccountInfo} />
      <Route path="billing" component={AccountBilling} />
      <Route path="address" component={AccountAddress} />
    </Route>

    <Route path="gift-returns" component={GiftReturnsIndex}>
      <Route path="new" component={GiftReturnsNew} />
      <Route path="created" component={GiftReturnsCreated} />
    </Route>

    <Route path="collections/:permalink" component={CollectionIndex} />
    <Route path="products/:permalink" component={ProductIndex} />

    <Route path="coming-soon" component={ComingSoonIndex}>
      <Route path=":gender" component={ComingSoonGender} />
    </Route>

    <Route path="about" component={AboutIndex} />
    <Route path="help" component={HelpIndex} />
    <Route path="r/:code" component={ReferralIndex} />
    <Route path="land" component={PaidLandingIndex} />

    <Route path="checkout" component={CheckoutIndex}>
      <Route path="preview" component={CheckoutPreview} />
      <Route path="account" component={CheckoutAccount} onEnter={requireValidCheckoutData} />
      <Route path="shipping" component={CheckoutShipping} onEnter={requireValidCheckoutData} />
      <Route path="payment" component={CheckoutPayment} onEnter={requireValidCheckoutData} />
      <Route path="review" component={CheckoutReview} onEnter={requireValidCheckoutData} />
    </Route>
    <Route path="checkout/thanks" component={CheckoutThanks} />

    {pagePermalinks.map((permalink: string) =>
      <Route path={permalink} key={permalink} component={PageIndex} />
    )}

  </Route>
)

export default routes
