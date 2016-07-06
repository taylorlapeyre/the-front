// @flow
/* eslint react/no-danger: 0 */

import React, { Component } from 'react'

class ContentPage extends Component {
  props: {
    id: number,
    html: string,
    styles: string,
    script: () => void,
  };

  componentDidMount() {
    if (this.props.script) {
      this.props.script()
    }
  }

  componentDidUpdate() {
    if (this.props.script) {
      this.props.script()
    }
  }

  createStyle() {
    return { __html: this.props.styles }
  }

  createHTML() {
    return { __html: this.props.html }
  }

  render() {
    return (
      <div className="content-page" id={`content_page_${this.props.id}`}>
        <style dangerouslySetInnerHTML={this.createStyle()}></style>
        <div dangerouslySetInnerHTML={this.createHTML()}></div>
      </div>
    )
  }
}

export default ContentPage
