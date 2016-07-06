import reducer from 'reducers/requests'

describe('reducers/requests', () => {
  it('has an initial state of 0', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(0)
  })

  it('will increment its state when on a REQUEST action', () => {
    const action = { type: 'REQUEST_PRODUCT', payload: { id: 1 } }
    expect(reducer(0, action)).toEqual(1)
  })

  it('will decrement its state when on a RECEIVE action', () => {
    const action = { type: 'RECEIVE_PRODUCT', payload: { id: 1 } }
    expect(reducer(1, action)).toEqual(0)
  })

  it('will not decrement its state on a RECEIVE action if meta.ignoreLoad is true', () => {
    const action = { type: 'RECEIVE_PRODUCT', payload: { id: 1 }, meta: { ignoreLoad: true } }
    expect(reducer(1, action)).toEqual(1)
  })

  it('will not decrement its state on a REQUEST action if meta.ignoreLoad is true', () => {
    const action = { type: 'REQUEST_PRODUCT', payload: { id: 1 }, meta: { ignoreLoad: true } }
    expect(reducer(0, action)).toEqual(0)
  })
})
