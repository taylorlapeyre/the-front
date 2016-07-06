// @flow
import React, { Component } from 'react'

export class Modal extends Component {
  props: {
    width: number,
    top: number,
    modalBackgroundColor: string,
    onRequestClose: () => void,
    backgroundClass: string,
    closeIcon: string,
    children?: ?any,
  };

  static defaultProps = {
    width: 600,
    top: 90,
    modalBackgroundColor: 'white',
    backgroundClass: 'modal__background--default',
    closeIcon: '×',
  };

  background: HTMLElement;
  closeIcon: HTMLElement;
  handleRequestClose: (event: Object) => void;

  constructor(props: Object) {
    super(props)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  handleRequestClose(event: Object) {
    event.preventDefault()
    if ((event.target === this.background) || (event.target === this.closeIcon)) {
      this.props.onRequestClose()
    }
  }

  render() {
    const modalStyles = {
      backgroundColor: this.props.modalBackgroundColor,
      width: this.props.width,
      top: 90,
      left: `calc(50% - ${this.props.width / 2}px)`,
    }

    const backgroundClassName = `modal__background ${this.props.backgroundClass}`

    return (
      <div
        className={backgroundClassName}
        role="banner"
        tabIndex={-1}
        onClick={this.handleRequestClose}
        ref={ref => this.background = ref}
      >
        <div role="dialog" className="modal" style={modalStyles}>
          <div
            className="modal__close-icon"
            role="link"
            tabIndex={1}
            onClick={this.handleRequestClose}
            ref={ref => this.closeIcon = ref}
          >
            {this.props.closeIcon}
          </div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Modal
