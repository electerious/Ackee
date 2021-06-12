import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import Status, { ICON_LOADER, ICON_UPDATER } from './Status'
import Tooltip from './Tooltip'

const CurrentStatus = (props) => {
	if (props.isInitializing === true) return h(Status, {
		icon: ICON_LOADER,
	}, 'Loading')

	if (props.isUpdating === true) return h(Status, {
		icon: ICON_UPDATER,
	}, 'Updating')

	if (props.isEmpty === true) return h(Status, {},
		'No data',
		h(Tooltip, {}, 'There is either no data available or collecting detailed data is disabled in ackee-tracker.'),
	)

	return h(Status, {}, props.children)
}

CurrentStatus.propTypes = {
	isEmpty: PropTypes.bool.isRequired,
	isInitializing: PropTypes.bool.isRequired,
	isUpdating: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired,
}

export default CurrentStatus