import React from 'react'
import ProductSelector, { ProductOption } from 'components/products/ProductSelector.jsx'
import { shallow } from 'enzyme'

describe('components/products/ProductSelector', () => {
  let wrapper
  let handleSelectProduct
  let products

  beforeEach(() => {
    handleSelectProduct = jasmine.createSpy('handleSelectProduct')
    products = [
      { id: 2, color: { name: 'Black', hexCode: '#000000' } },
      { id: 3, color: { name: 'White', hexCode: '#ffffff' } },
    ]

    wrapper = shallow(
      <ProductSelector
        onSelectProduct={handleSelectProduct}
        currentProductId={2}
        products={products}
      />
    )
  })

  it('has the right root class', () => {
    expect(wrapper.find('.product-selector').length).toBe(1)
  })

  it('should show all of the colors', () => {
    expect(wrapper.find(ProductOption).length).toBe(2)

    for (let i = 0; i < products.length; i++) {
      expect(
        wrapper.find(ProductOption).at(i).prop('color').hexCode
      ).toBe(products[i].color.hexCode)
    }
  })

  it('will highlight the active product', () => {
    expect(
      wrapper.find(ProductOption).first().prop('active')
    ).toBe(true)
  })

  it('will fetch a new product when a color is clicked', () => {
    wrapper.find(ProductOption).last().prop('onClick')(3)

    expect(handleSelectProduct).toHaveBeenCalledWith(3)
  })
})
