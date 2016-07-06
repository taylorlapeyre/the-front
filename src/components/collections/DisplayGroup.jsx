// @flow
import React from 'react'
import Product from 'components/collections/Product.jsx'
import type { ProductType } from 'types/everlane'

function DisplayGroup(props: {
  products: Array<ProductType>,
  title: string,
  addLineItem: (variant: Object, price: number) => Promise
}) {
  const products = props.products.map((product: ProductType) =>
    <Product key={product.id} addLineItem={props.addLineItem} {...product} />
  )

  return (
    <div className="display-group">
      <h3 className="display-group__title">
        {props.title}
      </h3>
      {products}
    </div>
  )
}

export default DisplayGroup
