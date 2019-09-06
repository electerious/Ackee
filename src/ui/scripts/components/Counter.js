import { createElement as h } from 'react'
import PropTypes from 'prop-types'

const Counter = (props) => {

	return (
		h('div', {
			className: 'counter'
		}, props.children)
	)

}

Counter.propTypes = {
	children: PropTypes.node.isRequired
}

export default Counter