// @flow

import { applyMiddleware, createStore } from 'redux'
import reducer from 'reducers'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import type { StoreType } from 'types/redux'

const store: StoreType = createStore(reducer, applyMiddleware(thunk, createLogger()))

export default store
