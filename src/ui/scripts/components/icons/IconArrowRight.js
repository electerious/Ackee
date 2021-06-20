import { createElement as h } from 'react'
import PropTypes from 'prop-types'

const IconArrowRight = (props) => {
	return (
		h('svg', {
			viewBox: '0 0 512 512',
			className: props.className,
		},
			h('path', {
				d: 'm464 256c0-114.87-93.13-208-208-208s-208 93.13-208 208 93.13 208 208 208 208-93.13 208-208zm-212.65 91.36a16 16 0 0 1 -.09-22.63l52.32-52.73h-133.58a16 16 0 0 1 0-32h133.58l-52.32-52.73a16 16 0 1 1 22.74-22.54l79.39 80a16 16 0 0 1 0 22.54l-79.39 80a16 16 0 0 1 -22.65.09z',
			}),
		)
	)
}

IconArrowRight.propTypes = {
	className: PropTypes.string,
}

export default IconArrowRight