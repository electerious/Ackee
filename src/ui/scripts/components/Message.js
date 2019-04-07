import { createElement as h } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Component = (props) => (

	h('div', {
		className: classNames({
			message: true,
			[`message--${ props.status }`]: props.status != null
		}, props.className)
	}, props.children)

)

Component.displayName = 'Message'

Component.propTypes = {
	status: PropTypes.oneOf([ 'success', 'warning', 'error' ]).isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired
}

export default Component