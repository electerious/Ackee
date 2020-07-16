import { createElement as h } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Text = (props) => {

	return (
		h(props.type, {
			className: classNames({
				'text': true,
				'text--no-spacing': props.spacing === false
			}, props.className)
		}, props.children)
	)

}

Text.propTypes = {
	type: PropTypes.oneOf([ 'p', 'div' ]).isRequired,
	spacing: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node.isRequired
}

export default Text