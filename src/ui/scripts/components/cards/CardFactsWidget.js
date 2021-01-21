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

	const {
		activeVisitors,
		averageViews,
		averageDuration,
		viewsToday,
		viewsMonth,
		viewsYear
	} = props.widget.value

	return (
		h('div', {
			className: 'facts'
		},
			h(Presentation, {
				headline: 'Active visitors',
				value: activeVisitors,
				text: pluralize([ 'visitors', 'visitor', 'visitors' ], activeVisitors)
			}),
			h(Presentation, {
				headline: 'Average views',
				value: formatNumber(averageViews),
				text: 'per day'
			}),
			h(Presentation, {
				headline: 'Average duration',
				value: formatDuration(averageDuration).value,
				text: formatDuration(averageDuration).unit
			}),
			h(Presentation, {
				headline: 'Views today',
				value: formatNumber(viewsToday),
				text: pluralize([ 'views', 'view', 'views' ], viewsToday)
			}),
			h(Presentation, {
				headline: 'Views this month',
				value: formatNumber(viewsMonth),
				text: pluralize([ 'views', 'view', 'views' ], viewsMonth)
			}),
			h(Presentation, {
				headline: 'Views this year',
				value: formatNumber(viewsYear),
				text: pluralize([ 'views', 'view', 'views' ], viewsYear)
			})
		)
	)

}

CardFacts.propTypes = {
	widget: PropTypes.object.isRequired
}

export default CardFacts