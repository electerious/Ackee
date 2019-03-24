import { createElement as h, Component, Fragment } from 'react'

import isUnknownError from '../utils/isUnknownError'

import OverlayFailure from './overlays/OverlayFailure'
import OverlayLogin from './overlays/OverlayLogin'
import Dashboard from './Dashboard'

const Main = class extends Component {

	constructor(props) {

		super(props)

	}

	render() {

		// Only handle errors not handled by other components
		const unknownErrors = this.props.errors.filter(isUnknownError)

		const hasError = unknownErrors.length !== 0
		const hasToken = this.props.token.value.id != null

		return (
			h(Fragment, {},
				hasError === true && h(OverlayFailure, { errors: unknownErrors }),
				hasError === false && hasToken === false && h(OverlayLogin, this.props),
				hasError === false && hasToken === true && h(Dashboard, this.props)
			)
		)

	}

}

export default Main