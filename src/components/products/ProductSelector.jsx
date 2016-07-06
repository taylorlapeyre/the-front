// @flow
import React from 'react'
import classnames from 'classnames'
import type { ProductType } from 'types/everlane'

export function ProductOption({ id, active, color, onClick }: {
  id: number,
  active: boolean,
  color: { name: string, hexCode: string },
  onClick: (id: number) => void,
}) {
  function handleClick(event: Event) {
    event.preventDefault()
    onClick(id)
  }

  const className: string = classnames('product-selector__color', {
    'product-selector__color--active': active,
  })

  return (
    <div
      className={className}
      style={{ backgroundColor: color.hexCode }}
      onClick={handleClick}
      role="radio"
      tabIndex={id}
      aria-label={color.name}
    />
  )
}

function ProductSelector(props: {
  onSelectProduct: (id: string) => Promise,
  currentProductId: number,
  products: Array<ProductType>,
}) {
  const colors = props.products.map(product => (
    <ProductOption
      {...product}
      key={product.id}
      onClick={props.onSelectProduct}
      active={props.currentProductId === product.id}
    />
  ))

  return (
    <div className="product-selector">
      {colors}
    </div>
  )
}

export default ProductSelector
