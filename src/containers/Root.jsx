// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from 'routes.jsx'
import type { StoreType } from 'types/redux'

function Root({ store }: { store: StoreType }) {
  const history: History = syncHistoryWithStore(browserHistory, store)

  return (
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
  )
}

export default Root
