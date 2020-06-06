import { createElement as h, Fragment } from 'react'
import PropTypes from 'prop-types'

import formatDuration from '../../utils/formatDuration'
import pluralize from '../../utils/pluralize'

import Headline from '../Headline'
import Spacer from '../Spacer'
import PresentationValueText from '../presentations/PresentationValueText'

const Presentation = (props) => {

	const space = h(Spacer, { size: 1 })

	return (
		h(Fragment, {},
			h(Headline, {
				type: 'h2',
				size: 'small'
			}, props.headline),
			space,
			h(PresentationValueText, {
				value: props.value,
				text: props.text
			})
		)
	)

}

const CardFacts = (props) => {

	return (
		h('div', {
			className: 'card card--wide'
		},
			h('div', { className: 'card__facts' },
				h('div', { className: 'card__inner' },
					h(Presentation, {
						headline: 'Active visitors',
						value: props.items.views_active,
						text: pluralize([ 'visitors', 'visitor', 'visitors' ], props.items.views_active)
					})
				),
				h('div', { className: 'card__separator card__separator--vertical' }),
				h('div', { className: 'card__inner' },
					h(Presentation, {
						headline: 'Average views',
						value: props.items.views_active,
						text: 'per day'
					})
				),
				h('div', { className: 'card__separator card__separator--vertical' }),
				h('div', { className: 'card__inner' },
					h(Presentation, {
						headline: 'Average duration',
						value: formatDuration(props.items.durations_average).value,
						text: formatDuration(props.items.durations_average).unit
					})
				)
			),
			h('div', { className: 'card__separator card__separator--horizontal' }),
			h('div', { className: 'card__facts' },
				h('div', { className: 'card__inner' },
					h(Presentation, {
						headline: 'Views today',
						value: props.items.views_today,
						text: pluralize([ 'views', 'view', 'views' ], props.items.views_today)
					})
				),
				h('div', { className: 'card__separator card__separator--vertical' }),
				h('div', { className: 'card__inner' },
					h(Presentation, {
						headline: 'Views this month',
						value: props.items.views_month,
						text: pluralize([ 'views', 'view', 'views' ], props.items.views_month)
					})
				),
				h('div', { className: 'card__separator card__separator--vertical' }),
				h('div', { className: 'card__inner' },
					h(Presentation, {
						headline: 'Views this year',
						value: props.items.views_year,
						text: pluralize([ 'views', 'view', 'views' ], props.items.views_year)
					})
				)
			)
		)
	)

}

CardFacts.propTypes = {
	loading: PropTypes.bool.isRequired,
	items: PropTypes.object.isRequired
}

export default CardFacts