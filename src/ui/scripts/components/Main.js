import { createElement as h, Component, Fragment } from 'react'

import isUnknownError from '../utils/isUnknownError'

import Failure from './Failure'
import Login from './Login'
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
				hasError === true && h(Failure, { errors: unknownErrors }),
				hasError === false && hasToken === false && h(Login, this.props),
				hasError === false && hasToken === true && h(Dashboard, this.props)
			)
		)

	}

}

export default Main