import React from 'react'
import { Index } from 'containers/home/Index.jsx'
import homepageResponse from 'data/homepages/show'
import { shallow } from 'enzyme'
import ContentPage from 'components/base/ContentPage.jsx'

describe('components/home/Index', () => {
  let fetchHomepage
  let homepage
  let wrapper

  beforeEach(() => {
    fetchHomepage = jasmine.createSpy('fetchHomepage')
    homepage = homepageResponse.homepage

    wrapper = shallow(<Index fetchHomepage={fetchHomepage} homepage={homepage} />)
  })

  it('will have the right DOM', () => {
    expect(
      wrapper.find('.home__index').length
    ).toBe(1)

    expect(
      wrapper.find(ContentPage).length
    ).toBe(1)
  })

  it('will request homepages when it is laoded', () => {
    expect(fetchHomepage).toHaveBeenCalled()
  })
})
