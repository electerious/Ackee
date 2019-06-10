import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import IconWarning from '../icons/IconWarning'

const PresentationEmptyState = (props) => {

	return (
		h('div', { className: 'emptyState' },
			h('div', { className: 'emptyState__inner' },
				h(IconWarning, { className: 'emptyState__icon' }),
				props.children
			)
		)
	)

}

PresentationEmptyState.propTypes = {
	children: PropTypes.node.isRequired
}

export default PresentationEmptyState