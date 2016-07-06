// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from 'actions'
import DisplayGroup from 'components/collections/DisplayGroup.jsx'
import { getCollectionByPermalink } from 'reducers/data/collections'
import type { CollectionType } from 'types/everlane'

export class Index extends Component {
  props: {
    fetchCollection: () => Promise,
    addLineItem: () => Promise,
    collection: ?CollectionType,
    params: { permalink: string },
  };

  componentWillMount() {
    this.props.fetchCollection()
  }

  getDisplayGroups(): Array<Object> {
    if (this.props.collection) {
      return this.props.collection.collections.map(subCollection =>
        subCollection.product_groups[0]
      )
    }

    return []
  }

  render() {
    const displayGroups = this.getDisplayGroups().map(displayGroup =>
      <DisplayGroup
        {...displayGroup}
        key={displayGroup.id}
        addLineItem={this.props.addLineItem}
      />
    )

    return (
      <div className="collection">
        {displayGroups}
      </div>
    )
  }
}

function mapStateToProps(state: Object, ownProps: Object): Object {
  return {
    collection: getCollectionByPermalink(state, ownProps.params.permalink),
    params: ownProps.params,
  }
}

function mapDispatchToProps(dispatch: () => void, ownProps: Object): Object {
  return {
    fetchCollection: () => dispatch(actions.fetchCollection(ownProps.params.permalink)),
    addLineItem: ({ variant, price }) => dispatch(actions.addLineItem({ variant, price })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
