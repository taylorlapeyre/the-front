import reducer from 'reducers/session/visitor'

describe('reducers/session/visitor', () => {
  it('will return null as its default state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(null)
  })

  describe('RECEIVE_VISITOR', () => {
    it('blows away the state with whatever the payload is', () => {
      const state = null
      const action = { type: 'RECEIVE_VISITOR', payload: 1 }
      expect(reducer(state, action)).toEqual(1)
    })
  })
})
