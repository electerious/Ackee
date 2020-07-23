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
				value: props.items.activeVisitors,
				text: pluralize([ 'visitors', 'visitor', 'visitors' ], props.items.activeVisitors)
			}),
			h(Presentation, {
				headline: 'Average views',
				value: formatNumber(props.items.averageViews),
				text: 'per day'
			}),
			h(Presentation, {
				headline: 'Average duration',
				value: formatDuration(props.items.averageDuration).value,
				text: formatDuration(props.items.averageDuration).unit
			}),
			h(Presentation, {
				headline: 'Views today',
				value: formatNumber(props.items.viewsToday),
				text: pluralize([ 'views', 'view', 'views' ], props.items.viewsToday)
			}),
			h(Presentation, {
				headline: 'Views this month',
				value: formatNumber(props.items.viewsMonth),
				text: pluralize([ 'views', 'view', 'views' ], props.items.viewsMonth)
			}),
			h(Presentation, {
				headline: 'Views this year',
				value: formatNumber(props.items.viewsYear),
				text: pluralize([ 'views', 'view', 'views' ], props.items.viewsYear)
			})
		)
	)

}

CardFacts.propTypes = {
	loading: PropTypes.bool.isRequired,
	items: PropTypes.exact({
		activeVisitors: PropTypes.number.isRequired,
		averageViews: PropTypes.number.isRequired,
		averageDuration: PropTypes.number.isRequired,
		viewsToday: PropTypes.number.isRequired,
		viewsMonth: PropTypes.number.isRequired,
		viewsYear: PropTypes.number.isRequired
	}).isRequired
}

export default CardFacts