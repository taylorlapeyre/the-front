// @flow
import React from 'react'
import { Link } from 'react-router'

function Logo({ linkTo, fontSize }: {
  fontSize: number,
  linkTo: string,
}) {
  const style = { fontSize }

  if (linkTo) {
    return (
      <h1 className="logo" style={style}><Link to={linkTo}>Everlane</Link></h1>
    )
  }

  return <h1 className="logo" style={style}>Everlane</h1>
}

Logo.defaultProps = {
  fontSize: 40,
}

export default Logo
