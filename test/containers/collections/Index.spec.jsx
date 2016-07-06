import React from 'react'
import { Index } from 'containers/collections/Index.jsx'
import collectionResponse from 'data/collections/show'
import { shallow } from 'enzyme'
import DisplayGroup from 'components/collections/DisplayGroup.jsx'

describe('components/collections/Index', () => {
  let fetchCollection
  let addLineItem
  let collection
  let params

  beforeEach(() => {
    fetchCollection = jasmine.createSpy('fetchCollection')
    addLineItem = jasmine.createSpy('addLineItem')
    collection = collectionResponse.collection
    params = {
      permalink: collection.permalink,
    }
  })

  it('will render each of its display groups', () => {
    const wrapper = shallow(
      <Index
        fetchCollection={fetchCollection}
        addLineItem={addLineItem}
        collection={collection}
        params={params}
      />
    )

    expect(
      wrapper.find(DisplayGroup).length
    ).toBe(collection.collections.length)
  })

  it('will always attempt to fetch the collection', () => {
    params = {
      permalink: 'not the same permalink',
    }

    shallow(
      <Index
        fetchCollection={fetchCollection}
        addLineItem={addLineItem}
        collection={collection}
        params={params}
      />
    )

    expect(fetchCollection).toHaveBeenCalled()
  })
})
