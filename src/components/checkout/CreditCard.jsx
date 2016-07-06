// @flow
import React from 'react'

function CreditCard(props: {
  number: string,
  expiration_year: string,
  expiration_month: string,
  first_name: string,
  last_name: string,
  action: () => void,
  actionText: string,
}) {
  const actionLink = props.action && props.actionText && (
    <button onClick={props.action} className="credit-card__action-link">
      {props.actionText}
    </button>
  )

  return (
    <div className="credit-card">
      {props.first_name} {props.last_name}<br />
      {props.number}<br />
      {props.expiration_month}/{props.expiration_year}
      {actionLink}
    </div>
  )
}


export default CreditCard
