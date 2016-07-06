// @flow
import React from 'react'
import type { OrderType } from 'types/everlane'

function OrderDetailsTable({ order, onCancelOrder }: {
  order: OrderType,
  onCancelOrder: (event: Object) => void
}) {
  const address = order.shipping_address

  const lineItems = order.line_items.map(lineItem =>
    <span key={lineItem.id}>lineItem.title<br /></span>
  )

  return (
    <table className="order-details-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Recipient</th>
          <th>Order Information</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{order.completed_at}</td>
          <td>
            {address.full_name}<br />
            {address.street_address}<br />
            {address.extended_address}
            {address.extended_address && <br />}
            {address.city}<br />
            {address.region_code},&nbsp;
            {address.postal_code},&nbsp;
            {address.country}
          </td>
          <td>
            {order.number}
            {lineItems}
          </td>
          <td>
            ${order.total}<br />
            <button className="order-details-table__cancel-link" onClick={onCancelOrder}>
              Cancel order
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default OrderDetailsTable
