// @flow
import React, { Component, Element } from 'react'
import LoadingIndicator from 'components/base/LoadingIndicator.jsx'
import Header from 'containers/layout/Header.jsx'
import Footer from 'components/layout/Footer.jsx'
import { connect } from 'react-redux'
import actions from 'actions'
import { routesWithOverlayedHeader, routesWithNoNavigation } from 'settings.json'
import { getIsLoading } from 'reducers/requests'
import type { DispatchType } from 'types/redux'

class Chrome extends Component {
  props: {
    currentModal: ?Element,
    isLoading: boolean,
    fetchMenus: () => Promise,
    children?: ?any,
    transparentHeader: boolean,
    showNavigation: boolean,
  };

  componentDidMount() {
    this.props.fetchMenus()
  }

  render() {
    return (
      <div className="app">
        {this.props.isLoading && <LoadingIndicator />}
        <Header
          transparent={this.props.transparentHeader}
          showNavigation={this.props.showNavigation}
        />
        <main className="content" aria-label="Main Content">
          {this.props.currentModal}
          {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state: Object, ownProps: Object): Object {
  const path = ownProps.location.pathname

  return {
    currentModal: state.modals.currentModal,
    transparentHeader: routesWithOverlayedHeader.includes(path),
    showNavigation: !routesWithNoNavigation.includes(path),
    isLoading: getIsLoading(state),
  }
}

function mapDispatchToProps(dispatch: DispatchType): Object {
  return {
    fetchMenus: () => dispatch(actions.fetchMenus()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chrome)
