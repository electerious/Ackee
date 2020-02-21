import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import OverlayFailure from './overlays/OverlayFailure'

const ErrorFallback = (props) => {

	return h(OverlayFailure, {
		errors: [ props.error ]
	})

}

ErrorFallback.propTypes = {
	error: PropTypes.any.isRequired
}

export default ErrorFallback