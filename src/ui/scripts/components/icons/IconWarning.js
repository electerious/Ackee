import { createElement as h } from 'react'
import PropTypes from 'prop-types'

const IconWarning = (props) => {

	return (
		h('svg', {
			viewBox: '0 0 24 24',
			className: props.className
		},
			h('path', {
				d: 'M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.5 6h3l-1 8h-1l-1-8zm1.5 12.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z'
			})
		)
	)

}

IconWarning.propTypes = {
	className: PropTypes.string
}

export default IconWarning