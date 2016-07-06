// @flow
/* eslint no-eval:0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from 'actions'
import ContentPage from 'components/base/ContentPage.jsx'
import type { HomepageType, ContentPageType } from 'types/everlane'
import type { DispatchType } from 'types/redux'

export class Index extends Component {
  props: {
    fetchHomepage: () => Promise,
    homepage: HomepageType,
  };

  componentWillMount() {
    this.props.fetchHomepage()
  }

  render() {
    const contentPageData: ContentPageType = this.props.homepage.content_page

    return (
      <div className="home__index">
        <ContentPage
          id={contentPageData.id}
          html={contentPageData.compiled_content}
          script={eval(contentPageData.compiled_script)}
          styles={contentPageData.compiled_styles}
        />
      </div>
    )
  }
}

function mapStateToProps(state: Object): Object {
  return {
    homepage: state.data.homepage,
  }
}

function mapDispatchToProps(dispatch: DispatchType, ownProps: Object): Object {
  return {
    fetchHomepage: () => dispatch(actions.fetchHomepage(ownProps.params.id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
