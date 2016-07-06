// @flow
import assign from 'lodash/assign'
import find from 'lodash/find'
import type { ActionType } from 'types/redux'
import type { ShippingOptionType } from 'types/everlane'

const initialState: Array<ShippingOptionType> = []

export default function shippingOptions(
  state: Array<ShippingOptionType> = initialState,
  action: ActionType): Array<ShippingOptionType> {
  switch (action.type) {
    case 'RECEIVE_SHIPPING_OPTIONS': {
      let selectedOptionIndex = 0

      if (state.length) {
        selectedOptionIndex = state.findIndex(option => option.selected)
      }

      return action.payload.map((option, index) => {
        if (index === selectedOptionIndex) {
          return assign({}, option, { selected: true })
        }

        return assign({}, option, { selected: false })
      })
    }

    case 'CHOOSE_SHIPPING_OPTION': {
      return state.map((option, index) => {
        if (index === Number(action.payload)) {
          return assign({}, option, { selected: true })
        }

        return assign({}, option, { selected: false })
      })
    }

    default: {
      return state
    }
  }
}

export function getChosenShippingOption(state: Object): ?ShippingOptionType {
  return find(state.checkout.shippingOptions, { selected: true })
}

export function getIsChosenShippingOptionEverlaneNow(state: Object): boolean {
  const chosen = getChosenShippingOption(state)
  return chosen ? chosen.cart_params.delivery : false
}
