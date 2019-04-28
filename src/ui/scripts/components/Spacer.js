import { createElement as h } from 'react'
import PropTypes from 'prop-types'

const Spacer = (props) => {

	return (
		h('div', {
			className: 'spacer',
			style: {
				'--size': props.size
			}
		})
	)

}

Spacer.propTypes = {
	size: PropTypes.number.isRequired
}

export default Spacer