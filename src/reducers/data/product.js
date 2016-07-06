import assign from 'lodash/assign'
import type { ProductType } from 'types/everlane'
import type { ActionType } from 'types/redux'

const initialState: ProductType = {
  id: 0,
  display_name: '',
  price: '',
  images: {
    square: [],
  },
  color: {
    name: '',
    hexCode: '',
  },
  products_in_group: [],
  variants: [],
  desktop_content_page: {
    id: 0,
    compiled_content: '',
  },
}

const product = (state : ProductType = initialState, action: ActionType): ProductType => {
  switch (action.type) {

    case 'RECEIVE_PRODUCT':
      return action.payload

    case 'SELECT_VARIANT': {
      const variants = state.variants.map(variant => {
        if (variant.id === action.payload.id) {
          return assign({}, variant, { selected: true })
        }
        return assign({}, variant, { selected: false })
      })

      return assign({}, state, { variants })
    }

    default:
      return state
  }
}

export default product
