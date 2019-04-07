import { createElement as h, Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Favicon = class extends Component {

	constructor(props) {

		super(props)

		this.onError = this.onError.bind(this)

		this.state = {
			src: (new URL('/favicon.ico', this.props.url)).href
		}

	}

	onError() {

		this.setState({
			src: undefined
		})

	}

	render() {

		return (
			h('img', {
				className: classNames({
					'favicon': true,
					'favicon--missing': this.state.src == null
				}),
				src: this.state.src,
				onError: this.onError
			})
		)

	}

}

Favicon.propTypes = {
	url: PropTypes.string.isRequired
}

export default Favicon