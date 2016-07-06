import { combineReducers } from 'redux'
import homepage from 'reducers/data/homepage'
import menus from 'reducers/data/menus'
import collections from 'reducers/data/collections'
import product from 'reducers/data/product'
import mostRecentOrder from 'reducers/data/mostRecentOrder'

export default combineReducers({
  homepage,
  menus,
  collections,
  product,
  mostRecentOrder,
})
