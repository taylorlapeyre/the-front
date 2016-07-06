// @flow
/* eslint react/jsx-no-bind: 0 */

import React from 'react'
import LineItem from 'components/checkout/LineItem.jsx'
import type { LineItemType, ShippingOptionType } from 'types/everlane'

export function LineItemSection({ changeLineItemQuantity, lineItems, title }: {
  lineItems: LineItemType[],
  title: string,
  changeLineItemQuantity: (options: { id: number, quantity: number }) => Promise,
}) {
  if (lineItems.length === 0) {
    return null
  }

  return (
    <div className="cart__shipping-section">
      <h3 className="cart__shipping-section-title">{title}</h3>
      {lineItems.map(lineItem =>
        <LineItem
          {...lineItem}
          key={lineItem.id}
          changeLineItemQuantity={changeLineItemQuantity}
        />
      )}
    </div>
  )
}

function Cart({ lineItems, shippingOption, changeLineItemQuantity }: {
  lineItems: LineItemType[],
  shippingOption?: ShippingOptionType,
  changeLineItemQuantity: (options: { id: number, quantity: number }) => Promise,
}) {
  if (!lineItems.length) {
    return (
      <div className="cart">
        <div className="cart__no-line-items-message">
          Your cart is empty
        </div>
      </div>
    )
  }

  const shippingOptionIsEverlaneNow = shippingOption && shippingOption.cart_params.delivery

  // This line item can be shipped by either standard or expedited shipping today.
  const isShippableLineItem: (li: LineItemType) => boolean = (
    lineItem => lineItem.orderable_state === 'shippable'
  )

  // This line item can be shipped by either standard or expedited shipping at a time in the future.
  const isPreorderLineItem: (li: LineItemType) => boolean = (
    lineItem => lineItem.is_preorder
  )

  // This line item is able to be sent directly to your house in less than an hour.
  const isEverlaneNowLineItem: (li: LineItemType) => boolean = (
    lineItem => lineItem.is_sf_deliverable
  )

  // This line item represents something that is not able to be stored in a warehouse.
  const isVirtualLineItem: (li: LineItemType) => boolean = (
    lineItem => lineItem.is_virtual
  )

  const content = (() => {
    if (shippingOptionIsEverlaneNow) {
      return (
        <div>
          <LineItemSection
            title="1-Hour Delivery"
            lineItems={lineItems.filter(isEverlaneNowLineItem)}
            changeLineItemQuantity={changeLineItemQuantity}
          />
          <LineItemSection
            title="Standard Shipping"
            lineItems={lineItems.filter(lineItem =>
              !isEverlaneNowLineItem(lineItem) && !isPreorderLineItem(lineItem)
            )}
            changeLineItemQuantity={changeLineItemQuantity}
          />
          <LineItemSection
            title="On Preorder"
            lineItems={lineItems.filter(isPreorderLineItem)}
            changeLineItemQuantity={changeLineItemQuantity}
          />
          <LineItemSection
            title="Digital"
            lineItems={lineItems.filter(isVirtualLineItem)}
            changeLineItemQuantity={changeLineItemQuantity}
          />
        </div>
      )
    }

    if (shippingOption) {
      return (
        <div>
          <LineItemSection
            title={shippingOption.description}
            lineItems={lineItems.filter(isShippableLineItem)}
            changeLineItemQuantity={changeLineItemQuantity}
          />
          <LineItemSection
            title="On Preorder"
            lineItems={lineItems.filter(isPreorderLineItem)}
            changeLineItemQuantity={changeLineItemQuantity}
          />
          <LineItemSection
            title="Digital"
            lineItems={lineItems.filter(isVirtualLineItem)}
            changeLineItemQuantity={changeLineItemQuantity}
          />
        </div>
      )
    }

    return lineItems.map((lineItem: LineItemType) =>
      <LineItem key={lineItem.id} {...lineItem} changeLineItemQuantity={changeLineItemQuantity} />
    )
  })()

  return <div className="cart">{content}</div>
}

export default Cart
