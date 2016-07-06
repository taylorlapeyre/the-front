// @flow
import React from 'react'
import classnames from 'classnames'

function StepIndicator({ possibleSteps, currentStep }: {
  possibleSteps: Array<string>,
  currentStep: string,
}) {
  const indexOfCurrentStep: number = possibleSteps.indexOf(currentStep)

  const dots = possibleSteps.map((step: string, index: number) => {
    const style = { width: `calc(100% / ${possibleSteps.length})` }

    const className = classnames('step-indicator__dot', {
      'step-indicator__dot--completed': index <= indexOfCurrentStep,
    })

    return (
      <li key={step} className={className} style={style}>
        <span className="step-indicator__dot-number">{index + 1}</span>
        <span className="step-indicator__dot-title">{step}</span>
      </li>
    )
  })

  return <ol className="step-indicator">{dots}</ol>
}

export default StepIndicator
