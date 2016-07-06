// @flow
import React from 'react'

function Address(props: {
  first_name: string,
  last_name: string,
  street_address: string,
  extended_address: string,
  city: string,
  region: string,
  postal_code: string,
  action: () => void,
  actionText: string,
}) {
  const actionLink = props.action && props.actionText && (
    <button onClick={props.action} className="address__action-link">
      {props.actionText}
    </button>
  )

  return (
    <address className="address">
      {props.first_name} {props.last_name}<br />
      {props.street_address}<br />
      {props.extended_address}<br />
      {props.city}, {props.region} {props.postal_code}
      {actionLink}
    </address>
  )
}

export default Address
