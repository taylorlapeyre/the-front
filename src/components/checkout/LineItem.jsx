// @flow
import React from 'react'

function LineItem(props: {
  id: number,
  title: string,
  is_deliverable: bool,
  is_preorder: bool,
  restock_date: string,
  image_url: string,
  size: string,
  color: string,
  total: string,
  isSyncing: bool,
  quantity: number,
  changeLineItemQuantity: (options: { id: number, quantity: number }) => Promise,
}) {
  function handleRemove(event: Object) {
    event.preventDefault()
    props.changeLineItemQuantity({ id: props.id, quantity: 0 })
  }

  function handleIncrement(event: Object) {
    event.preventDefault()
    props.changeLineItemQuantity({ id: props.id, quantity: props.quantity + 1 })
  }

  function handleDecrement(event: Object) {
    event.preventDefault()
    props.changeLineItemQuantity({ id: props.id, quantity: props.quantity - 1 })
  }

  const sameDayDeliveryAnnotation = props.is_deliverable && (
    <div classame="line-item__info line-item__info--same-day-delivery">
      Same Day Delivery Available
    </div>
  )

  const preorderAnnotation = props.is_preorder && (
    <div classame="line-item__info line-item__info--preorder">
      Ships on {props.restock_date}
    </div>
  )

  return (
    <div className="line-item">
      <button
        className="line-item__x-button"
        onClick={handleRemove}
        onKeyDown={handleRemove}
      >
        &times;
      </button>
      <img src={props.image_url} className="line-item__image" alt={props.title} />
      <p className="line-item__info">{props.title}</p>
      {sameDayDeliveryAnnotation}
      {preorderAnnotation}
      <p className="line-item__info">Size: &nbsp; {props.size}</p>
      <p className="line-item__info">Color: &nbsp; {props.color}</p>
      <p className="line-item__info line-item__info--right">{props.total}</p>
      <p className="line-item__info">
        <a href="" className="line-item__quantity-button" onClick={handleDecrement}>–</a>
        <span className={props.isSyncing ? 'syncing-quantity' : null}>
          {props.quantity}
        </span>
        <a href="" className="line-item__quantity-button" onClick={handleIncrement}>+</a>
      </p>
    </div>
  )
}

export default LineItem
