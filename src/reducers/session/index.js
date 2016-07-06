import { combineReducers } from 'redux'
import user from 'reducers/session/user'
import visitor from 'reducers/session/visitor'

export default combineReducers({
  user,
  visitor,
})
