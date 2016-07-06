/* eslint global-require:0 */

import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from 'containers/Root.jsx'
import { bootstrapStoreWithSessionData } from 'lib/session'
import { bootstrapStoreWithLineItems } from 'lib/polling'
import store from 'store'
import '../style/base.scss'

function renderApplication() {
  render(
    <AppContainer>
      <Root store={store} />
    </AppContainer>,
    document.getElementById('app-container')
  )

  // Hot reloading stuff!
  if (module.hot) {
    module.hot.accept('containers/Root.jsx', () => {
      const NextRoot = require('./containers/Root.jsx').default

      render(
        <AppContainer>
          <NextRoot store={store} />
        </AppContainer>,
        document.getElementById('app-container')
      )
    })
  }
}

bootstrapStoreWithLineItems(store)
bootstrapStoreWithSessionData(store).then(renderApplication)
