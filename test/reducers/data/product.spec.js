import reducer from 'reducers/data/product'

describe('reducers/data/product', () => {
  describe('RECEIVE_PRODUCT', () => {
    it('blows away the state with whatever the payload is', () => {
      const state = { hello: 'world' }
      const action = { type: 'RECEIVE_PRODUCT', payload: { foo: 'bar' } }
      expect(reducer(state, action)).toEqual({ foo: 'bar' })
    })
  })

  describe('SELECT_VARIANT', () => {
    it('sets the variant with the given ID to selected, and unselects all others', () => {
      const state = { variants: [{ id: 1 }, { id: 2 }, { id: 3 }] }
      const action = { type: 'SELECT_VARIANT', payload: { id: 2 } }
      expect(reducer(state, action)).toEqual({ variants: [
        { id: 1, selected: false },
        { id: 2, selected: true },
        { id: 3, selected: false },
      ] })
    })
  })
})
