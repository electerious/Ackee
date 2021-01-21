import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import Loader from './Loader'
import Updater from './Updater'

export const ICON_LOADER = Loader
export const ICON_UPDATER = Updater

const Status = (props) => {

	return (
		h('div', { className: 'status' },
			props.icon && h(props.icon, {}),
			props.children
		)
	)

}

Status.propTypes = {
	icon: PropTypes.oneOf([ ICON_LOADER, ICON_UPDATER ]),
	children: PropTypes.node.isRequired
}

export default Status