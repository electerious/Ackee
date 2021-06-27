import { createElement as h, Component } from 'react'
import PropTypes from 'prop-types'

import OverlayFailure from './overlays/OverlayFailure'

const ErrorBoundary = class extends Component {
	constructor(props) {
		super(props)
		this.state = { error: undefined }
	}

	static getDerivedStateFromError(error) {
		return { error }
	}

	render() {
		const hasError = this.state.error != null
		if (hasError === true) {
			return h(OverlayFailure, {
				errors: [ this.state.error ],
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