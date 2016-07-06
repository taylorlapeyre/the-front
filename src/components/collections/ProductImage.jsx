// @flow
import React, { Component } from 'react'

class ProductImage extends Component {
  props: {
    src: string,
    alternateSrc: string
  };

  state: {
    hovered: boolean
  };

  handleMouseEnter: () => void;
  handleMouseLeave: () => void;

  constructor(props: { src: string, alternateSrc: string}) {
    super(props)

    this.state = { hovered: false }

    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleMouseLeave() {
    this.setState({ hovered: false })
  }

  handleMouseEnter() {
    this.setState({ hovered: true })
  }

  render() {
    const src = this.state.hovered ? this.props.src : this.props.alternateSrc

    return (
      <div
        className="product__image"
        style={{ backgroundImage: `url(${src})` }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />
    )
  }
}

export default ProductImage
