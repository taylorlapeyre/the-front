import reducer from 'reducers/modals'

describe('reducers/modals', () => {
  describe('SHOW_MODAL', () => {
    it('will set the currentModal if it is null', () => {
      const state = { currentModal: null, nextModalsToShow: [] }
      const action = { type: 'SHOW_MODAL', payload: 'LOGIN_MODAL' }
      expect(reducer(state, action)).toEqual({
        currentModal: 'LOGIN_MODAL',
        nextModalsToShow: [],
      })
    })

    it('will add it to the nextModalsToShow if a modal is currently active', () => {
      const state = { currentModal: 'AD_MODAL', nextModalsToShow: [] }
      const action = { type: 'SHOW_MODAL', payload: 'LOGIN_MODAL' }
      expect(reducer(state, action)).toEqual({
        currentModal: 'AD_MODAL',
        nextModalsToShow: ['LOGIN_MODAL'],
      })
    })

    it('will do nothing if that modal is already active', () => {
      const state = { currentModal: 'LOGIN_MODAL', nextModalsToShow: [] }
      const action = { type: 'SHOW_MODAL', payload: 'LOGIN_MODAL' }
      expect(reducer(state, action)).toEqual(state)
    })
  })

  describe('HIDE_MODAL', () => {
    it('will set the currentModal to the next modal in nextModalsToShow', () => {
      const state = { currentModal: 'LOGIN_MODAL', nextModalsToShow: ['AD_MODAL'] }
      const action = { type: 'HIDE_MODAL' }
      expect(reducer(state, action)).toEqual({
        currentModal: 'AD_MODAL',
        nextModalsToShow: [],
      })
    })

    it('will set the currentModal to null if the nextModalsToShow is empty', () => {
      const state = { currentModal: 'LOGIN_MODAL', nextModalsToShow: [] }
      const action = { type: 'HIDE_MODAL' }
      expect(reducer(state, action)).toEqual({
        currentModal: null,
        nextModalsToShow: [],
      })
    })
  })
})
