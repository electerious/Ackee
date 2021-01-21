import { createElement as h } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Label = (props) => {

	return (
		h('label', {
			className: classNames({
				'label': true,
				'label--no-spacing': props.spacing === false
			}),
			htmlFor: props.htmlFor
		}, props.children)
	)

}

Label.propTypes = {
	spacing: PropTypes.bool,
	htmlFor: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired
}

export default Label