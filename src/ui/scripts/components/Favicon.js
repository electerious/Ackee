import { createElement as h, Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const transparentPixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

const Favicon = class extends Component {

	constructor(props) {

		super(props)

		this.onError = this.onError.bind(this)

		this.state = {
			missing: false
		}

	}

	onError() {

		this.setState({
			missing: true
		})

	}

	render() {

		return (
			h('img', {
				className: classNames({
					'favicon': true,
					'favicon--missing': this.state.missing === true
				}),
				src: this.state.missing === true ? transparentPixel : this.props.url,
				onError: this.onError
			})
		)

	}

}

Favicon.propTypes = {
	url: PropTypes.string.isRequired
}

export default Favicon