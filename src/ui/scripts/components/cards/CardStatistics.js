import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Headline from '../Headline'
import Text from '../Text'
import Status, { ICON_LOADER, ICON_UPDATER } from '../Status'
import Tooltip from '../Tooltip'

const CardStatistics = (props) => {

	const { value, status } = props.hook(...props.hookArgs)

	// Use thin space as initial value to avoid that the label changes the height once rendered
	const [ statusLabel, setStatusLabel ] = useState(' ')

	const currentStatus = (() => {
		if (status.isInitializing === true) return h(Status, {
			icon: ICON_LOADER
		}, 'Loading')

		if (status.isUpdating === true) return h(Status, {
			icon: ICON_UPDATER
		}, 'Updating')

		if (status.isEmpty === true) return h(Status, {},
			'No data',
			h(Tooltip, {}, 'There is either no data available or collecting detailed data is disabled in ackee-tracker.')
		)

		return h(Status, {}, statusLabel)
	})()

	return (
		h('div', {
			className: classNames({
				'card': true,
				'card--wide': props.wide === true
			})
		},
			h('div', { className: 'card__inner' },
				h(Headline, {
					type: 'h2',
					size: 'medium',
					onClick: props.onMore
				}, props.headline),
				h(Text, {
					type: 'div',
					spacing: false
				}, currentStatus),
				h(props.renderer, {
					...props.rendererProps,
					items: value,
					setStatusLabel
				})
			)
		)
	)

}

CardStatistics.propTypes = {
	wide: PropTypes.bool,
	headline: PropTypes.string.isRequired,
	onMore: PropTypes.func,
	hook: PropTypes.func.isRequired,
	hookArgs: PropTypes.array.isRequired,
	renderer: PropTypes.elementType.isRequired,
	rendererProps: PropTypes.object
}

export default CardStatistics