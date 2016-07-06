// @flow
import React, { Component } from 'react'

class Gallery extends Component {
  handleImageClick: (index: number) => void;

  props: {
    images: Array<string>,
  };

  state: {
    currentImageIndex: number,
  };

  constructor(props: Object) {
    super(props)

    this.state = { currentImageIndex: 0 }
    this.handleImageClick = this.handleImageClick.bind(this)
  }

  handleImageClick(index: number) {
    event.preventDefault()
    this.setState({ currentImageIndex: index })
  }

  renderSmallImages() {
    return this.props.images.map((image: string, index: number) => {
      const onClick = this.handleImageClick.bind(this, index)
      return (
        <img
          key={index}
          src={image}
          alt={image}
          onClick={onClick}
          role="img"
          tabIndex={index}
          className="product-gallery__small-image"
        />
      )
    })
  }

  render() {
    const bigImage: string = this.props.images[this.state.currentImageIndex]

    return (
      <div className="product-gallery">
        <img alt={bigImage} className="product-gallery__big-image" src={bigImage} />
        <div className="product-gallery__side-images">
          {this.renderSmallImages()}
        </div>
      </div>
    )
  }
}

export default Gallery
