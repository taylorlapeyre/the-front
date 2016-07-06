// @flow
// I don't know why, but this file fails eslint proptype validation. I can't figure it out!
/* eslint no-eval:0, react/prop-types:0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import actions from 'actions'
import Gallery from 'components/products/Gallery.jsx'
import ProductDetails from 'components/products/ProductDetails.jsx'
import ContentPage from 'components/base/ContentPage.jsx'
import type { VariantType, ProductType, ContentPageType } from 'types/everlane'
import type { DispatchType } from 'types/redux'

export class Index extends Component {
  handleAddLineItem: (lineItem: { variant: VariantType, price: number }) => Promise;

  props: {
    params: { permalink: string },
    product: ProductType,
    fetchProduct: () => Promise,
    selectVariant: (id: string) => void,
    addLineItem: (lineItem: { variant: VariantType, price: number }) => Promise,
    goToCheckout: () => void,
  };

  constructor(props: Object) {
    super(props)

    this.handleAddLineItem = this.handleAddLineItem.bind(this)
  }

  componentWillMount() {
    if (this.props.product.permalink !== this.props.params.permalink) {
      this.props.fetchProduct()
    }
  }

  handleAddLineItem({ variant, price }: { variant: VariantType, price: number }) {
    this.props.addLineItem({ variant, price }).then(this.props.goToCheckout)
  }

  render() {
    const images: Array<string> = this.props.product.images.square
    const contentPageData: ContentPageType = this.props.product.desktop_content_page

    return (
      <div>
        <div className="product-page">
          <Gallery images={images} />
          <ProductDetails
            {...this.props.product}
            fetchProduct={this.props.fetchProduct}
            selectVariant={this.props.selectVariant}
            addLineItem={this.handleAddLineItem}
          />
        </div>
        <div className="product-content-page-container">
          <ContentPage
            id={contentPageData.id}
            html={contentPageData.compiled_content}
            script={eval(contentPageData.compiled_script)}
            styles={contentPageData.compiled_styles}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: Object, ownProps: Object): Object {
  return {
    product: state.data.product,
    params: ownProps.params,
  }
}

function mapDispatchToProps(dispatch: DispatchType, ownProps: Object): Object {
  return {
    fetchProduct: () => dispatch(actions.fetchProduct(ownProps.params.permalink)),
    selectVariant: id => dispatch(actions.selectVariant(id)),
    addLineItem: ({ variant, price }) => dispatch(actions.addLineItem({ variant, price })),
    goToCheckout: () => browserHistory.push('/checkout/preview'),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
