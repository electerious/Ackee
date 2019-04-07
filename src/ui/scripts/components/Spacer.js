import { createElement as h } from 'react'
import PropTypes from 'prop-types'

const Component = (props) => (

	h('div', {
		className: 'spacer',
		style: {
			'--size': props.size
		}
	})

)

Component.displayName = 'Spacer'

Component.propTypes = {
	size: PropTypes.number.isRequired
}

export default Component