// @flow
import { Element } from 'react'
import assign from 'lodash/assign'
import last from 'lodash/last'
import without from 'lodash/without'
import type { ActionType } from 'types/redux'

type ModalStateType = {
  currentModal: ?Element,
  nextModalsToShow: Array<Element>,
}

const initialState: ModalStateType = {
  currentModal: null,
  nextModalsToShow: [],
}

export default function modals(
  state: ModalStateType = initialState,
  action: ActionType): ModalStateType {
  switch (action.type) {
    case 'SHOW_MODAL': {
      if (state.currentModal === action.payload) {
        return state
      }

      if (state.currentModal === null) {
        return assign({}, state, { currentModal: action.payload })
      }

      return assign({}, state, {
        nextModalsToShow: [...state.nextModalsToShow, action.payload],
      })
    }

    case 'HIDE_MODAL': {
      if (state.currentModal) {
        const nextModal = last(state.nextModalsToShow) || null
        return assign({}, state, {
          currentModal: nextModal,
          nextModalsToShow: without(state.nextModalsToShow, nextModal),
        })
      }

      return state
    }

    default:
      return state
  }
}
