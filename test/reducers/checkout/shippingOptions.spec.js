/* eslint max-len:0 */

import reducer from 'reducers/checkout/shippingOptions'

describe('reducers/checkout/shippingOptions', () => {
  it('has an initial state of an empty array', () => {
    expect(reducer(undefined, { type: undefined })).toEqual([])
  })

  describe('RECEIVE_SHIPPING_OPTIONS', () => {
    it('blows away the state with whatever the payload is and sets the first result as selected by default', () => {
      const state = []
      const action = {
        type: 'RECEIVE_SHIPPING_OPTIONS',
        payload: [{ name: 'foo' }, { name: 'bar' }],
      }
      expect(reducer(state, action)).toEqual(
        [{ name: 'foo', selected: true }, { name: 'bar', selected: false }]
      )
    })

    it('will maintain the selected shipping option', () => {
      const state = [{ selected: false }, { selected: true }]
      const action = { type: 'RECEIVE_SHIPPING_OPTIONS', payload: [{}, {}] }
      expect(reducer(state, action)).toEqual(state)
    })
  })

  describe('CHOOSE_SHIPPING_OPTION', () => {
    it('will update the option with the given index to be `selected`', () => {
      const state = [{ selected: true }, { selected: false }]
      const action = { type: 'CHOOSE_SHIPPING_OPTION', payload: 1 }
      expect(reducer(state, action)).toEqual([{ selected: false }, { selected: true }])
    })
  })
})
