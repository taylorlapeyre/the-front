// @flow
import React, { Children, cloneElement } from 'react'

function RadioGroup(props: {
  children?: any,
  name: string,
}) {
  const childrenWithCorrectName = Children.map(props.children, child => (
    cloneElement(child, { name: props.name })
  ))

  return (
    <fieldset {...props} className="radio-group">
      {childrenWithCorrectName}
    </fieldset>
  )
}

RadioGroup.propTypes = {
  children: React.PropTypes.any,
  name: React.PropTypes.string.isRequired,
}

export default RadioGroup
