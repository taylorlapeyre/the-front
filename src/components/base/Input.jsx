// @flow
import React, { Element } from 'react'
import classnames from 'classnames'

function Input(props: {
  type: string,
  label?: string,
  error?: ?string,
  onChange?: Function,
  button?: Element,
}) {
  // Text Inputs
  if (['text', 'password', 'email', 'textarea'].indexOf(props.type) !== -1) {
    const error = props.error &&
      <span className="input__text-input-error">{props.error}</span>
    const label = props.label &&
      <label className="input__text-input-label">{props.label} {error}</label>

    const className = classnames('input__text-input-field', {
      'input__text-input-field--with-error': error,
    })

    const InputType = props.type === 'textarea' ? 'textarea' : 'input'

    return (
      <fieldset className="input__fieldset">
        {label}
        <InputType
          {...props}
          aria-label={props.label}
          className={className}
        />
        {props.button}
      </fieldset>
    )
  }

  // Radio Inputs
  if (props.type === 'radio') {
    const error = props.error &&
      <span className="input__radio-input-error">{props.error}</span>
    const label = props.label &&
      <label className="input__radio-input-label">{props.label} {error}</label>

    return (
      <div>
        <input
          {...props}
          aria-label={props.label}
          className="input__radio-input-field"
        />
        {label}
      </div>
    )
  }
}

Input.propTypes = {

}

export default Input
