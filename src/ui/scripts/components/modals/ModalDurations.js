import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import Headline from '../Headline'
import Text from '../Text'
import CurrentStatus from '../CurrentStatus'
import PresentationCounterList from '../presentations/PresentationCounterList'

import useCombinedDurations from '../../api/hooks/durations/useCombinedDurations'
import relativeFn from '../../utils/relativeFn'
import formatDuration from '../../utils/formatDuration'
import commonModalProps from '../../utils/commonModalProps'

const ModalDurations = (props) => {
	const { value, status } = useCombinedDurations({
		interval: props.interval,
		limit: props.limit,
	})

	return (
		h('div', { className: 'card' },
			h('div', { className: 'card__inner' },

				h(Headline, {
					type: 'h2',
					size: 'medium',
				}, 'Durations'),
				h(Text, {
					type: 'div',
					spacing: false,
				},
					h(CurrentStatus, status, relativeFn(props.interval)(props.index)),
				),
				h(PresentationCounterList, {
					items: value[props.index],
					formatter: formatDuration,
				}),

			),
			h('div', { className: 'card__footer' },

				h('button', {
					type: 'button',
					className: 'card__button card__button--primary link',
					onClick: props.closeModal,
				}, 'Close'),

			),
		)
	)
}

ModalDurations.propTypes = {
	...commonModalProps,
	index: PropTypes.number.isRequired,
	interval: PropTypes.string.isRequired,
	limit: PropTypes.number.isRequired,
}

export default ModalDurations