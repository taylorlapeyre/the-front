// @flow
import React from 'react'
import { connect } from 'react-redux'
import StepIndicator from 'components/checkout/StepIndicator.jsx'

export function Index({ children, checkoutStage }: {
  checkoutStage: string,
  children?: ?any,
}) {
  const stepIndicator = checkoutStage !== 'preview' && (
    <StepIndicator
      possibleSteps={['account', 'shipping', 'payment', 'review']}
      currentStep={checkoutStage}
    />
  )

  return (
    <div className="checkout">
      {stepIndicator}
      {children}
    </div>
  )
}

function mapStateToProps(state: Object, ownProps: Object): Object {
  return {
    checkoutStage: ownProps.location.pathname.split('/')[2],
  }
}

export default connect(mapStateToProps)(Index)
