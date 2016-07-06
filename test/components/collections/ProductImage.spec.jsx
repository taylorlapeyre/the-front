import React from 'react'
import ProductImage from 'components/collections/ProductImage.jsx'
import { shallow } from 'enzyme'

describe('components/collections/ProductImage', () => {
  const [image1, image2] = ['image one', 'image two']
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<ProductImage src={image1} alternateSrc={image2} />)
  })

  it('shows the second image by default', () => {
    expect(
      wrapper.first().prop('style').backgroundImage
    ).toEqual('url(image two)')
  })

  it('shows the first image when hovered over', () => {
    wrapper.find('div').simulate('mouseenter')

    expect(
      wrapper.first().prop('style').backgroundImage
    ).toEqual('url(image one)')

    wrapper.find('div').simulate('mouseleave')

    expect(
      wrapper.first().prop('style').backgroundImage
    ).toEqual('url(image two)')
  })
})
