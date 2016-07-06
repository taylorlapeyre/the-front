import React, { Component } from 'react'

class LoadingIndicator extends Component {
  constructor(props) {
    super(props)
    this.state = { loadingPercentage: 0 }
  }

  componentDidMount() {
    this.trickle()
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  trickle() {
    if (this.state.loadingPercentage >= 100) {
      return clearTimeout(this.timeout)
    }

    // We are using a dynamic multipler to generate the progress
    // delta so as the loading bar approaches 100%, we can
    // increment it in increasingly smaller amounts.
    const newPercentage = (
      this.state.loadingPercentage + 25 * this.multiplier() * Math.random()
    )

    // Update after a timeout, which should be ~500ms, randomized to provide realness.
    let timeToUpdate
    if (this.state.loadingPercentage > 0) {
      timeToUpdate = 100 + (500 * Math.random())
    } else {
      // fire immediately the first time
      timeToUpdate = 0
    }

    return this.timeout = setTimeout(() => {
      this.setState({ loadingPercentage: newPercentage })
      this.trickle()
    }, timeToUpdate)
  }

  // This makes it so as the progress bar nears completion, it will grow
  // in smaller and smaller increments, approaching 1.
  multiplier() {
    let multiplier

    if (this.state.loadingPercentage < 50) {
      multiplier = 0.9
    } else if (this.state.loadingPercentage < 80) {
      multiplier = 0.5
    } else if (this.state.loadingPercentage < 100) {
      multiplier = 0.2
    } else {
      multiplier = 0
    }

    return multiplier
  }

  render() {
    return (
      <div
        className="loading-indicator"
        style={{ width: `${this.state.loadingPercentage}%` }}
      />
    )
  }
}

export default LoadingIndicator
