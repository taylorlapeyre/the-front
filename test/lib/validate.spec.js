import {
  isValidEmail,
  isPresent,
  isUSPostalCode,
  getErrorsForField,
  mapValidationsToErrors,
  getErrorMessageForValidation,
} from 'lib/validate'

describe('lib/validate', () => {
  describe('isValidEmail', () => {
    it('returns true when the argument is a valid email address', () => {
      const validEmails = ['taylor@everlane.com', 'taylor+1@everlane.com']
      for (let i = 0; i < validEmails.length; i++) {
        expect(isValidEmail(validEmails[i])).toBe(true)
      }
    })

    it('returns false when the argument is not a valid email address', () => {
      const invalidEmails = ['.com', 'taylor+1everlane.com']
      for (let i = 0; i < invalidEmails.length; i++) {
        expect(isValidEmail(invalidEmails[i])).toBe(false)
      }
    })
  })

  describe('isPresent', () => {
    it('returns true when the argument has more than one character', () => {
      expect(isPresent('I exist!')).toBeTruthy()
    })

    it('returns false when the argument has 0 characters', () => {
      expect(isPresent('')).toBeFalsy()
    })
  })

  describe('isUSPostalCode', () => {
    it('returns true when the is a US postal code', () => {
      expect(isUSPostalCode('70125')).toBeTruthy()
    })

    it('returns false when the argument is not a US postal code', () => {
      expect(isUSPostalCode('920234')).toBeFalsy()
    })
  })

  describe('getErrorsForField', () => {
    it('returns the error messages for all failed validations', () => {
      const value = ''
      const validations = [isValidEmail, isPresent]
      expect(getErrorsForField(value, validations)).toEqual([
        getErrorMessageForValidation(isValidEmail),
        getErrorMessageForValidation(isPresent),
      ])
    })

    it('will return an empty array if all validations pass', () => {
      const value = 'taylor@everlane.com'
      const validations = [isValidEmail, isPresent]
      expect(getErrorsForField(value, validations)).toEqual([])
    })
  })

  describe('mapValidationsToErrors', () => {
    it('returns an object mapping keys to errors', () => {
      const fields = {
        email: {
          value: 'taylor',
          validations: [isValidEmail, isPresent],
        },
        password: {
          value: 'everlane123',
          validations: [isPresent],
        },
      }

      expect(mapValidationsToErrors(fields)).toEqual({
        email: [getErrorMessageForValidation(isValidEmail)],
      })
    })
  })

  it('returns an empty object if all validations pass', () => {
    const fields = {
      email: {
        value: 'taylor@everlane.xom',
        validations: [isValidEmail, isPresent],
      },
      password: {
        value: 'everlane123',
        validations: [isPresent],
      },
    }

    expect(mapValidationsToErrors(fields)).toEqual({})
  })
})
