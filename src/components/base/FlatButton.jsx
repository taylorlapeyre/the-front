// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'

// TODO: Add specs. Also, this should be written as a function, but flow is having some problems
// recognizing `children` at the moment, so this is a workaround.
class FlatButton extends Component {
  handleAction: (event: Event) => void;

  props: {
    color?: ('grey' | 'dark-grey' | 'copper'),
    to?: Object | string,
    onClick?: Function,
    className?: string,
    disabled?: boolean,
    fullWidth?: boolean,
    size?: string,
    children?: any,
  };

  constructor(props: Object) {
    super(props)

    this.handleAction = this.handleAction.bind(this)
  }

  handleAction(event: Event) {
    if (this.props.onClick) {
      this.props.onClick(event)
    }
  }

  render() {
    const className: string = classnames('flat-button', this.props.className, {
      'flat-button--disabled': this.props.disabled,
      'flat-button--grey': this.props.color === 'grey',
      'flat-button--dark-grey': this.props.color === 'dark-grey',
      'flat-button--copper': this.props.color === 'copper',
      'flat-button--full-width': this.props.fullWidth,
      'flat-button--small': this.props.size === 'small',
    })

    if (this.props.to) {
      return (
        <Link {...this.props} className={className}>
          {this.props.children}
        </Link>
      )
    }

    return (
      <button
        {...this.props}
        onClick={this.handleAction}
        onKeyDown={this.handleAction}
        role="button"
        className={className}
      >
        {this.props.children}
      </button>
    )
  }
}

export default FlatButton
