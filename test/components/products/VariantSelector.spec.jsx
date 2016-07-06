import React from 'react'
import VariantSelector, { VariantOption } from 'components/products/VariantSelector.jsx'
import { shallow } from 'enzyme'

describe('components/products/VariantSelector', () => {
  let wrapper
  let handleSelectVariant
  let variants

  beforeEach(() => {
    handleSelectVariant = jasmine.createSpy('handleSelectVariant')
    variants = [
      { id: 1, selected: false, size: 'S', orderable_state: 'shippable' },
      { id: 2, selected: true, size: 'M', orderable_state: 'shippable' },
    ]

    wrapper = shallow(
      <VariantSelector onSelectVariant={handleSelectVariant} variants={variants} />
    )
  })

  it('has the right root class', () => {
    expect(wrapper.find('.variant-selector').length).toBe(1)
  })

  it('should show all of the sizes', () => {
    for (let i = 0; i < variants.length; i++) {
      expect(
        wrapper.find(VariantOption).at(i).prop('size')
      ).toBe(variants[i].size)
    }
  })

  it('should highlight the selected variant', () => {
    expect(
      wrapper.find(VariantOption).at(1).prop('selected')
    ).toBe(true)
  })

  it('should select a new variant when one is clicked', () => {
    wrapper.find(VariantOption).first().prop('onClick')(1)
    expect(handleSelectVariant).toHaveBeenCalledWith(1)
  })
})
