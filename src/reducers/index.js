import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import session from 'reducers/session'
import checkout from 'reducers/checkout'
import data from 'reducers/data'
import environment from 'reducers/environment'
import requests from 'reducers/requests'
import modals from 'reducers/modals'

const reducer = combineReducers({
  session,
  checkout,
  data,
  environment,
  requests,
  modals,
  routing: routerReducer,
})

export default reducer
