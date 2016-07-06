import * as asyncActions from 'actions/asynchronous'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { apiUrl } from 'settings'
import * as storage from 'lib/storage'

window.REAL_XHR = true

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions/asynchronous', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  describe('#fetchMenus', () => {
    const exampleResponseData = { menus: [{ foo: 'bar' }] }

    it('dispatches REQUEST_MENUS and RECEIVE_MENUS with the right data', (done) => {
      jasmine.Ajax.stubRequest(`${apiUrl}/menus`).andReturn({
        responseText: JSON.stringify(exampleResponseData),
      })

      function request() {
        return { type: 'REQUEST_MENUS' }
      }

      function success() {
        return { type: 'RECEIVE_MENUS', payload: exampleResponseData.menus }
      }

      const store = mockStore({ data: { menus: [] } })
      const req = store.dispatch(asyncActions.fetchMenus())

      expect(jasmine.Ajax.requests.mostRecent().url).toEqual(`${apiUrl}/menus`)
      expect(store.getActions()).toContain(request())
      req
        .then(() => expect(store.getActions()).toContain(success()))
        .then(done)
        .catch(done)
    })
  })

  describe('#fetchHomepage', () => {
    const exampleResponseData = { homepage: { id: 1 } }

    it('dispatches REQUEST_HOMEPAGE and RECEIVE_HOMEPAGE with the right data', (done) => {
      jasmine.Ajax.stubRequest(`${apiUrl}/homepages/undefined`).andReturn({
        responseText: JSON.stringify(exampleResponseData),
      })

      function request() {
        return { type: 'REQUEST_HOMEPAGE', payload: { id: exampleResponseData.id } }
      }

      function success() {
        return { type: 'RECEIVE_HOMEPAGE', payload: exampleResponseData.homepage }
      }

      const store = mockStore({ data: { homepage: {} } })
      const req = store.dispatch(asyncActions.fetchHomepage(exampleResponseData.id))

      expect(jasmine.Ajax.requests.mostRecent().url).toEqual(`${apiUrl}/homepages/undefined`)
      expect(store.getActions()).toContain(request())
      req
        .then(() => expect(store.getActions()).toContain(success()))
        .then(done)
        .catch(done)
    })
  })

  describe('#fetchCollection', () => {
    const exampleResponseData = { collection: { permalink: 'fake-collection' } }

    it('dispatches REQUEST_COLLECTION and RECEIVE_COLLECTION with the right data', (done) => {
      jasmine.Ajax.stubRequest(`${apiUrl}/collections/fake-collection`).andReturn({
        responseText: JSON.stringify(exampleResponseData),
      })

      function request() {
        return {
          type: 'REQUEST_COLLECTION',
          payload: { permalink: exampleResponseData.collection.permalink },
        }
      }

      function success() {
        return { type: 'RECEIVE_COLLECTION', payload: exampleResponseData.collection }
      }

      const store = mockStore({ data: { collection: {} } })
      const req = store.dispatch(
        asyncActions.fetchCollection(exampleResponseData.collection.permalink)
      )

      expect(jasmine.Ajax.requests.mostRecent().url).toEqual(
        `${apiUrl}/collections/fake-collection`
      )
      expect(store.getActions()).toContain(request())
      req
        .then(() => expect(store.getActions()).toContain(success()))
        .then(done)
        .catch(done)
    })
  })

  describe('#fetchProduct', () => {
    const exampleResponseData = { product: { id: 1, permalink: 'fake-permalink' } }

    it('dispatches REQUEST_PRODUCT and RECEIVE_PRODUCT with the right data', (done) => {
      jasmine.Ajax.stubRequest(`${apiUrl}/products/fake-permalink`).andReturn({
        responseText: JSON.stringify(exampleResponseData),
      })

      function request() {
        return {
          type: 'REQUEST_PRODUCT',
          payload: { permalink: exampleResponseData.product.permalink },
        }
      }

      function success() {
        return { type: 'RECEIVE_PRODUCT', payload: exampleResponseData.product }
      }

      const store = mockStore({ data: { product: {} } })
      const req = store.dispatch(asyncActions.fetchProduct(exampleResponseData.product.permalink))

      expect(jasmine.Ajax.requests.mostRecent().url).toEqual(`${apiUrl}/products/fake-permalink`)
      expect(store.getActions()).toContain(request())
      req
        .then(() => expect(store.getActions()).toContain(success()))
        .then(done)
        .catch(done)
    })
  })

  describe('#addLineItem', () => {
    const exampleResponseData = { cart: { line_items: [{ id: 1 }] } }

    it('dispatches REQUEST_LINE_ITEMS and RECEIVE_LINE_ITEMS with the right data', (done) => {
      jasmine.Ajax.stubRequest(`${apiUrl}/line_items`).andReturn({
        responseText: JSON.stringify(exampleResponseData),
      })

      function request() {
        return { type: 'REQUEST_LINE_ITEMS', meta: undefined }
      }

      function success() {
        return {
          type: 'RECEIVE_LINE_ITEMS',
          payload: { lineItems: exampleResponseData.cart.line_items },
          meta: undefined,
        }
      }

      const store = mockStore({ data: { product: {} } })
      const req = store.dispatch(asyncActions.addLineItem({ variant: { id: 1 }, price: 120 }))

      expect(jasmine.Ajax.requests.mostRecent().url).toEqual(`${apiUrl}/line_items`)
      expect(jasmine.Ajax.requests.mostRecent().method).toEqual('POST')
      expect(store.getActions()).toContain(request())
      req
        .then(() => expect(store.getActions()).toContain(success()))
        .then(done)
        .catch(done)
    })
  })

  describe('#changeLineItemQuantity', () => {
    const exampleResponseData = { cart: { line_items: [{ id: 1 }] } }

    it('dispatches REQUEST_LINE_ITEMS and RECEIVE_LINE_ITEMS with the right data', (done) => {
      jasmine.Ajax.stubRequest(`${apiUrl}/line_items/1`).andReturn({
        responseText: JSON.stringify(exampleResponseData),
      })

      function request() {
        return { type: 'REQUEST_LINE_ITEMS', meta: undefined }
      }

      function success() {
        return {
          type: 'RECEIVE_LINE_ITEMS',
          payload: { lineItems: exampleResponseData.cart.line_items },
          meta: undefined,
        }
      }

      const store = mockStore({ data: { product: {} } })
      const req = store.dispatch(asyncActions.changeLineItemQuantity({ id: 1, quantity: 10 }))

      expect(jasmine.Ajax.requests.mostRecent().url).toEqual(`${apiUrl}/line_items/1`)
      expect(jasmine.Ajax.requests.mostRecent().method).toEqual('PATCH')
      expect(store.getActions()).toContain(request())
      req
        .then(() => expect(store.getActions()).toContain(success()))
        .then(done)
        .catch(done)
    })
  })

  describe('#createVisitor', () => {
    const exampleResponseData = { foo: 'bar' }

    it('dispatches REQUEST_VISITOR and RECEIVE_VISITOR with the right data', (done) => {
      spyOn(storage, 'saveDataToBrowser')

      jasmine.Ajax.stubRequest(`${apiUrl}/visitors`).andReturn({
        responseText: JSON.stringify(exampleResponseData),
      })

      function request() {
        return { type: 'REQUEST_VISITOR' }
      }

      function success() {
        return { type: 'RECEIVE_VISITOR', payload: exampleResponseData }
      }

      const store = mockStore({ session: { visitor: {} } })
      const req = store.dispatch(asyncActions.createVisitor())

      expect(jasmine.Ajax.requests.mostRecent().url).toEqual(`${apiUrl}/visitors`)
      expect(jasmine.Ajax.requests.mostRecent().method).toEqual('POST')
      expect(store.getActions()).toContain(request())
      req
        .then(() => expect(store.getActions()).toContain(success()))
        .then(() => expect(storage.saveDataToBrowser).toHaveBeenCalled())
        .then(done)
        .catch(done)
    })
  })

  describe('#fetchVisitor', () => {
    const exampleResponseData = { session_id: 'foobar' }

    it('dispatches REQUEST_VISITOR and RECEIVE_VISITOR with the right data', (done) => {
      jasmine.Ajax.stubRequest(`${apiUrl}/visitors?fingerprint=${exampleResponseData.session_id}`)
      .andReturn({
        responseText: JSON.stringify(exampleResponseData),
      })

      function request() {
        return { type: 'REQUEST_VISITOR' }
      }

      function success() {
        return { type: 'RECEIVE_VISITOR', payload: exampleResponseData }
      }

      const store = mockStore({ session: { visitor: {} } })
      const req = store.dispatch(asyncActions.fetchVisitor('foobar'))

      expect(jasmine.Ajax.requests.mostRecent().url).toEqual(
        `${apiUrl}/visitors?fingerprint=${exampleResponseData.session_id}`
      )
      expect(store.getActions()).toContain(request())
      req
        .then(() => expect(store.getActions()).toContain(success()))
        .then(done)
        .catch(done)
    })
  })

  describe('#fetchUser', () => {
    const exampleResponseData = { id: 1 }

    it('dispatches REQUEST_USER and RECEIVE_USER with the right data', (done) => {
      jasmine.Ajax.stubRequest(`${apiUrl}/users`).andReturn({
        responseText: JSON.stringify(exampleResponseData),
      })

      function request() {
        return { type: 'REQUEST_USER' }
      }

      function success() {
        return { type: 'RECEIVE_USER', payload: exampleResponseData }
      }

      const store = mockStore({ session: { user: {} } })
      const req = store.dispatch(asyncActions.fetchUser())

      expect(jasmine.Ajax.requests.mostRecent().url).toEqual(`${apiUrl}/users`)
      expect(store.getActions()).toContain(request())
      req
        .then(() => expect(store.getActions()).toContain(success()))
        .then(done)
        .catch(done)
    })
  })

  describe('#signUp', () => {
    const exampleResponseData = { id: 2 }

    it('dispatches REQUEST_USER and RECEIVE_USER with the right data', (done) => {
      spyOn(storage, 'saveDataToBrowser')

      jasmine.Ajax.stubRequest(`${apiUrl}/users`).andReturn({
        responseText: JSON.stringify(exampleResponseData),
      })

      function request() {
        return { type: 'REQUEST_USER' }
      }

      function success() {
        return { type: 'RECEIVE_USER', payload: exampleResponseData }
      }

      const store = mockStore({ session: { user: {} } })
      const req = store.dispatch(asyncActions.signUp({ email: '' }))

      expect(jasmine.Ajax.requests.mostRecent().url).toEqual(`${apiUrl}/users`)
      expect(jasmine.Ajax.requests.mostRecent().method).toEqual('POST')
      expect(store.getActions()).toContain(request())
      req
        .then(() => expect(store.getActions()).toContain(success()))
        .then(() => expect(storage.saveDataToBrowser).toHaveBeenCalled())
        .then(done)
        .catch(done)
    })
  })

  describe('#signIn', () => {
    const exampleResponseData = { id: 2 }

    it('dispatches REQUEST_SESSION and RECEIVE_USER with the right data', (done) => {
      spyOn(storage, 'saveDataToBrowser')

      jasmine.Ajax.stubRequest(`${apiUrl}/sessions`).andReturn({
        responseText: JSON.stringify(exampleResponseData),
      })

      function request() {
        return { type: 'REQUEST_SESSION' }
      }

      function success() {
        return { type: 'RECEIVE_USER', payload: exampleResponseData }
      }

      const store = mockStore({ session: { user: {} } })
      const req = store.dispatch(asyncActions.signIn({ email: '' }))

      expect(jasmine.Ajax.requests.mostRecent().url).toEqual(`${apiUrl}/sessions`)
      expect(jasmine.Ajax.requests.mostRecent().method).toEqual('POST')
      expect(store.getActions()).toContain(request())
      req
        .then(() => expect(store.getActions()).toContain(success()))
        .then(() => expect(storage.saveDataToBrowser).toHaveBeenCalled())
        .then(done)
        .catch(done)
    })
  })

  describe('#signOut', () => {
    const exampleResponseData = { id: 2 }

    it('dispatches REMOVE_USER and removes the auth token', () => {
      spyOn(storage, 'removeDataFromBrowser')

      jasmine.Ajax.stubRequest(`${apiUrl}/sessions`).andReturn({
        responseText: JSON.stringify(exampleResponseData),
      })

      function removeUser() {
        return { type: 'REMOVE_USER' }
      }

      const store = mockStore({ session: { user: {} } })
      store.dispatch(asyncActions.signOut())

      expect(store.getActions()).toContain(removeUser())
      expect(storage.removeDataFromBrowser).toHaveBeenCalled()
    })
  })
})
