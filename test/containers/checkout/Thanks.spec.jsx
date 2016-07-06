/* eslint max-len:0 */
import React from 'react'
import { shallow } from 'enzyme'
import { Thanks } from 'containers/checkout/Thanks.jsx'
import OrderDetailsTable from 'components/checkout/OrderDetailsTable.jsx'

describe('containers/checkout/Thanks.jsx', () => {
  let cancelOrder
  let fetchMostRecentOrder

  function renderShallow(numberOfLineItems = 0) {
    const order = {
      line_items: Array(numberOfLineItems),
      number: 'an order number',
    }

    return shallow(
      <Thanks
        mostRecentOrder={order}
        fetchMostRecentOrder={fetchMostRecentOrder}
        cancelOrder={cancelOrder}
      />
    )
  }

  beforeEach(() => {
    cancelOrder = jasmine.createSpy('cancelOrder')
    fetchMostRecentOrder = jasmine.createSpy('fetchMostRecentOrder')
  })

  it('will fetch the most recent order if it has no line items', () => {
    renderShallow()
    expect(fetchMostRecentOrder).toHaveBeenCalled()
  })

  it('will not fetch the most recent order if it has no line items', () => {
    renderShallow(4)
    expect(fetchMostRecentOrder).not.toHaveBeenCalled()
  })

  it('will not render anything if the order has not been fetched yet', () => {
    const wrapper = renderShallow()
    expect(wrapper.prop('children')).toBeUndefined()
  })

  it('will render when the order is fetched', () => {
    const wrapper = renderShallow(4)
    expect(wrapper.prop('children').length).toBeGreaterThan(0)
  })

  it('will render an OrderDetailsTable with the most recent order', () => {
    const wrapper = renderShallow(4)

    expect(wrapper.find(OrderDetailsTable).length).toBe(1)
  })

  it('will cancel the order when the cancel button is clicked', () => {
    const wrapper = renderShallow(4)

    wrapper.find(OrderDetailsTable).first().simulate('cancelOrder', { preventDefault: f => f })

    expect(cancelOrder).toHaveBeenCalledWith('an order number')
  })
})
