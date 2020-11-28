import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import IconLoading from '../icons/IconLoading'
import IconWarning from '../icons/IconWarning'

export const ICON_LOADING = IconLoading
export const ICON_WARNING = IconWarning

const PresentationEmptyState = (props) => {

	return (
		h('div', { className: 'emptyState' },
			h('div', { className: 'emptyState__inner' },
				h(props.icon, { className: 'emptyState__icon' }),
				props.children,
			  	h("div", null, 
				  h("a", { href: "https://github.com/electerious/ackee-tracker#-options", target: "_blank"},
				    "Detailed tracking"
				   ), 
				"may not be enabled.")
			)
		)
	)

}

PresentationEmptyState.propTypes = {
	icon: PropTypes.oneOf([ ICON_LOADING, ICON_WARNING ]).isRequired,
	children: PropTypes.node.isRequired
}

export default PresentationEmptyState
