import { createElement as h, Component } from 'react'
import { compose, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'

const enhance = compose(

	setPropTypes({
		url: PropTypes.string.isRequired
	})

)

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
			src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
		})

	}

	render() {

		return (
			h('img', {
				className: 'favicon',
				src: this.state.src,
				onError: this.onError
			})
		)

	}

}

export default enhance(Favicon)