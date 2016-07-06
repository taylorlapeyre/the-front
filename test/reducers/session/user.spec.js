import reducer from 'reducers/session/user'

describe('reducers/session/user', () => {
  it('will return null as its default state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(null)
  })

  describe('RECEIVE_USER', () => {
    it('blows away the state with whatever the payload is', () => {
      const state = null
      const action = { type: 'RECEIVE_USER', payload: 1 }
      expect(reducer(state, action)).toEqual(1)
    })
  })

  describe('REMOVE_USER', () => {
    it('replaces the state with null', () => {
      const state = { an: 'object' }
      const action = { type: 'REMOVE_USER' }
      expect(reducer(state, action)).toEqual(null)
    })
  })
})
