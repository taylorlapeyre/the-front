import reducer from 'reducers/data/menus'

describe('reducers/menus', () => {
  it('returns an empty array as its default state', () => {
    expect(reducer(undefined, { type: null })).toEqual([])
  })

  describe('RECEIVE_MENUS', () => {
    it('blows away the state with whatever the payload is', () => {
      const state = ['hello', 'world']
      const action = { type: 'RECEIVE_MENUS', payload: ['foo', 'bar'] }
      expect(reducer(state, action)).toEqual(['foo', 'bar'])
    })
  })

  describe('SHOW_DROP_DOWN_MENU', () => {
    it('will mark a menu as expanded when it exists in the state', () => {
      const state = [{ id: 1 }, { id: 2 }]
      const action = { type: 'SHOW_DROP_DOWN_MENU', payload: { id: 1 } }
      expect(reducer(state, action)).toEqual(
        [{ id: 1, expanded: true }, { id: 2, expanded: false }]
      )
    })
  })

  describe('HIDE_DROP_DOWN_MENU', () => {
    it('will mark all menus as not expanded', () => {
      const state = [{ id: 1, expanded: true }, { id: 2, expanded: true }]
      const action = { type: 'HIDE_DROP_DOWN_MENU', payload: { id: 1 } }
      expect(reducer(state, action)).toEqual(
        [{ id: 1, expanded: false }, { id: 2, expanded: false }]
      )
    })
  })
})
