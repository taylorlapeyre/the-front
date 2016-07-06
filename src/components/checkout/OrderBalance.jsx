// @flow
import React from 'react'

function OrderBalance({ total, subtotal, adjustments = [], isLoading }: {
  total: string,
  subtotal: string,
  adjustments: Array<{label: string, amount: string}>,
  isLoading: boolean,
}) {
  if (isLoading) {
    return (
      <div className="order-balance">
        <div className="order-balance__item">
          <div className="order-balance__title">Loading...</div>
        </div>
      </div>
    )
  }

  const adjustementItems = adjustments.map(({ label, amount }) => (
    <div className="order-balance__item" key={label}>
      <div className="order-balance__item-title">{label}</div>
      <div className="order-balance__item-value">{amount}</div>
    </div>
  ))

  return (
    <div className="order-balance">
      <div className="order-balance__item">
        <div className="order-balance__title">Order Summary</div>
      </div>

      <div className="order-balance__item">
        <div className="order-balance__item-title">Subtotal</div>
        <div className="order-balance__item-value">{subtotal}</div>
      </div>

      {adjustementItems}

      <div className="order-balance__item">
        <div className="order-balance__item-title">Total</div>
        <div className="order-balance__item-value">{total}</div>
      </div>
    </div>
  )
}

export default OrderBalance
