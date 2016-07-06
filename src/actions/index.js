import * as syncActions from 'actions/synchronous'
import * as asyncActions from 'actions/asynchronous'
import assign from 'lodash/assign'

const allActions = assign({}, syncActions, asyncActions)

export default allActions
