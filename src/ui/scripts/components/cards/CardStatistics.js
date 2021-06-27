import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Headline from '../Headline'
import Text from '../Text'
import CurrentStatus from '../CurrentStatus'

const CardStatistics = (props) => {
	const { value, status } = props.hook(...props.hookArgs)

	// Use thin space as initial value to avoid that the label changes the height once rendered
	const [ statusLabel, setStatusLabel ] = useState(' ')

	return (
		h('div', {
			className: classNames({
				'card': true,
				'card--wide': props.wide === true,
			}),
		},
			h('div', { className: 'card__inner' },
				h(Headline, {
					type: 'h2',
					size: 'medium',
					onClick: props.onMore,
				}, props.headline),
				h(Text, {
					type: 'div',
					spacing: false,
				},
					h(CurrentStatus, status, statusLabel),
				),
				h(props.renderer, {
					...props.rendererProps,
					items: value,
					setStatusLabel,
				}),
			),
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
	rendererProps: PropTypes.object,
}

export default CardStatistics