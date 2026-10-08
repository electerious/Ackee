import PropTypes from 'prop-types'
import { Component, createElement as h } from 'react'

import OverlayFailure from './overlays/overlay-failure.js'

const ErrorBoundary = class extends Component {
  static getDerivedStateFromError(error) {
    return { error }
  }

  constructor(props) {
    super(props)
    this.state = { error: undefined }
  }

  render() {
    const hasError = this.state.error != null
    if (hasError) {
      return h(OverlayFailure, {
        errors: [this.state.error],
        reset: this.props.reset,
      })
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  reset: PropTypes.func.isRequired,
}

export default ErrorBoundary
