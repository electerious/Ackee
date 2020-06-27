import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import formatDuration from '../../utils/formatDuration'
import formatNumber from '../../utils/formatNumber'
import pluralize from '../../utils/pluralize'

import Headline from '../Headline'
import PresentationValueText from '../presentations/PresentationValueText'

const Presentation = (props) => {

	return (
		h('div', { className: 'facts__card' },
			h(Headline, {
				type: 'h2',
				size: 'small'
			}, props.headline),
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
			className: 'facts'
		},
			h(Presentation, {
				headline: 'Active visitors',
				value: props.items.views_active,
				text: pluralize([ 'visitors', 'visitor', 'visitors' ], props.items.views_active)
			}),
			h(Presentation, {
				headline: 'Average views',
				value: formatNumber(props.items.views_average),
				text: 'per day'
			}),
			h(Presentation, {
				headline: 'Average duration',
				value: formatDuration(props.items.durations_average).value,
				text: formatDuration(props.items.durations_average).unit
			}),
			h(Presentation, {
				headline: 'Views today',
				value: formatNumber(props.items.views_today),
				text: pluralize([ 'views', 'view', 'views' ], props.items.views_today)
			}),
			h(Presentation, {
				headline: 'Views this month',
				value: formatNumber(props.items.views_month),
				text: pluralize([ 'views', 'view', 'views' ], props.items.views_month)
			}),
			h(Presentation, {
				headline: 'Views this year',
				value: formatNumber(props.items.views_year),
				text: pluralize([ 'views', 'view', 'views' ], props.items.views_year)
			})
		)
	)

}

CardFacts.propTypes = {
	loading: PropTypes.bool.isRequired,
	items: PropTypes.object.isRequired
}

export default CardFacts