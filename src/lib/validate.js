// @flow
/* eslint max-len:0, no-control-regex:0 */
import mapValues from 'lodash/mapValues'
const STACK_OVERFLOW_EMAIL_REGEX = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
const STACK_OVERFLOW_NUMBER_REGEX = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
const US_POSTAL_CODE_REGEX = /^\d{5}(?:[-\s]\d{4})?$/
const CREDIT_CARD_NUMBER_REGEX = /\d{16}/
const CREDIT_CARD_EXPIRY_REGEX = /\d{2}\/\d{2}/
const CREDIT_CARD_CVV_REGEX = /(\d{3}|\d{4})/

/**
 * Validation functions - they return a boolean and are independent of error messages
 */

export function isPresent(maybeEmptyString: ?string): boolean {
  if (maybeEmptyString !== null && maybeEmptyString !== undefined) {
    return maybeEmptyString.length > 0
  }

  return false
}

export function isValidEmail(maybeEmail: string): boolean {
  return STACK_OVERFLOW_EMAIL_REGEX.test(maybeEmail)
}

export function isUSPostalCode(maybePostalCode: string): boolean {
  return US_POSTAL_CODE_REGEX.test(maybePostalCode)
}

export function isCreditCardNumber(maybeCreditCardNumber: string): boolean {
  return CREDIT_CARD_NUMBER_REGEX.test(maybeCreditCardNumber)
}

export function isCreditCardExpiry(maybeCreditCardExpiry: string): boolean {
  return CREDIT_CARD_EXPIRY_REGEX.test(maybeCreditCardExpiry)
}

export function isCreditCardCVV(maybeCreditCardExpiry: string): boolean {
  return CREDIT_CARD_CVV_REGEX.test(maybeCreditCardExpiry)
}

export function isPhoneNumber(maybePhoneNumber: string): boolean {
  return STACK_OVERFLOW_NUMBER_REGEX.test(maybePhoneNumber)
}

/**
 * Error message functions - they take data and run validation functions on them,
 * returning all of the error messages appropriate for the data
 */

export function getErrorMessageForValidation(validation: Function): string {
  if (validation === isValidEmail) {
    return 'Please enter a valid email'
  }

  if (validation === isPresent) {
    return 'Required'
  }

  if (validation === isCreditCardNumber) {
    return 'Please enter a valid credit card number'
  }

  if (validation === isCreditCardExpiry) {
    return 'Please enter a valid expiration date. Valid format is "MM/YY"'
  }

  if (validation === isCreditCardCVV) {
    return 'Please enter a valid security code'
  }

  if (validation === isUSPostalCode) {
    return 'Please enter a valid US postal code'
  }

  if (validation === isPhoneNumber) {
    return 'Invalid phone number'
  }

  throw new Error(`No error message found for failed validation '${validation.name}'`)
}

export function getErrorsForField(value: any, validations: Array<Function>): Array<string> {
  return validations.map(validation => {
    if (!validation(value)) {
      return getErrorMessageForValidation(validation)
    }

    return ''
  // Remove empty values
  }).filter(errorMessage => errorMessage)
}

export function mapValidationsToErrors(fieldsToCheck: { [fieldName: string]: any }): {
  [fieldName: string]: Array<string>
} {
  const result = mapValues(fieldsToCheck, ({ value, validations }) => (
    getErrorsForField(value, validations))
  )

  // Remove entries where the errors are []
  const keys = Object.keys(result)
  for (let i = 0; i < keys.length; i++) {
    if (!result[keys[i]].length) {
      delete result[keys[i]]
    }
  }

  return result
}
