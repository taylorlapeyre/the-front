// @flow
import React from 'react'
import ProductSelector from 'components/products/ProductSelector.jsx'
import VariantSelector from 'components/products/VariantSelector.jsx'
import PurchaseButton from 'components/products/PurchaseButton.jsx'
import find from 'lodash/find'

function ProductDetails(props: {
  id: number,
  display_name: string,
  price: number,
  fetchProduct: (id: string) => Promise,
  selectVariant: (id: string) => void,
  addLineItem: (variant: Object, price: ?number) => Promise,
  products_in_group: Array<Object>,
  variants: Array<{ orderable_state: string, selected?: boolean, price: number }>,
  color: { name: string },
}) {
  function getSelectedVariant() {
    return find(props.variants, { selected: true })
  }

  function handleAddToBag(): Promise {
    const selectedVariant = getSelectedVariant()

    if (selectedVariant) {
      return props.addLineItem({
        variant: selectedVariant,
        price: selectedVariant.price,
      })
    }

    return Promise.reject()
  }

  const orderableState = (
    getSelectedVariant() && getSelectedVariant().orderable_state
  )

  return (
    <div className="product-details">
      <h2 className="product-details__title">{props.display_name}</h2>
      <h3 className="product-details__price">${props.price}</h3>

      <p className="product-details__selector-title">Color</p>
      <ProductSelector
        currentProductId={props.id}
        products={props.products_in_group}
        onSelectProduct={props.fetchProduct}
      />

      <p className="product-details__selector-title">Choose Size</p>
      <VariantSelector
        variants={props.variants}
        onSelectVariant={props.selectVariant}
      />

      <PurchaseButton orderableState={orderableState} onClick={handleAddToBag} />
    </div>
  )
}

export default ProductDetails
