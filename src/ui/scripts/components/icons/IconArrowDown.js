import { createElement as h } from 'react'
import PropTypes from 'prop-types'

const IconArrowDown = (props) => {

	return (
		h('svg', {
			viewBox: '0 0 512 512',
			className: props.className
		},
			h('path', {
				d: 'M256,298.3L256,298.3L256,298.3l174.2-167.2c4.3-4.2,11.4-4.1,15.8,0.2l30.6,29.9c4.4,4.3,4.5,11.3,0.2,15.5L264.1,380.9c-2.2,2.2-5.2,3.2-8.1,3c-3,0.1-5.9-0.9-8.1-3L35.2,176.7c-4.3-4.2-4.2-11.2,0.2-15.5L66,131.3c4.4-4.3,11.5-4.4,15.8-0.2L256,298.3z'
			})
		)
	)

}

IconArrowDown.propTypes = {
	className: PropTypes.string
}

export default IconArrowDown