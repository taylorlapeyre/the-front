// @flow
import React from 'react'
import { Link } from 'react-router'
import ProductImage from 'components/collections/ProductImage.jsx'
import type { ProductType } from 'types/everlane'

function Product(props: ProductType) {
  const images = props.images.square

  return (
    <div className="product">
      <Link to={`/products/${props.permalink}`} aria-label={props.title}>
        <ProductImage src={images[1]} alternateSrc={images[0]} />
      </Link>
      <p className="product__title">
        {props.color.name}
      </p>
    </div>
  )
}

export default Product
