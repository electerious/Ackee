import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const transparentPixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

const Favicon = (props) => {

	const initialMissing = props.url == null
	const [ missing, setMissing ] = useState(initialMissing)

	const onError = () => setMissing(true)

	return (
		h('img', {
			className: classNames({
				'favicon': true,
				'favicon--missing': missing === true
			}),
			src: missing === true ? transparentPixel : props.url,
			onError
		})
	)

}

Favicon.propTypes = {
	url: PropTypes.string
}

export default Favicon