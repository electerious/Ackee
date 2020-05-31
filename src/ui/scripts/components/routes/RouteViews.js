import { createElement as h, Fragment, useEffect } from 'react'

import { VIEWS_TYPE_UNIQUE, VIEWS_TYPE_TOTAL } from '../../../../constants/views'
import selectViewsValue from '../../selectors/selectViewsValue'
import enhanceViews from '../../enhancers/enhanceViews'
import mergeViews from '../../utils/mergeViews'
import overviewRoute from '../../utils/overviewRoute'

import CardViews from '../cards/CardViews'

const RouteViews = (props) => {

	useEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchViews(props, domain.data.id)
		})

	}, [ props.filter.interval, props.domains.value, props.views.type ])

	return (
		h(Fragment, {},

			h(CardViews, {
				wide: true,
				headline: ({
					[VIEWS_TYPE_UNIQUE]: 'Site Views',
					[VIEWS_TYPE_TOTAL]: 'Page Views'
				})[props.views.type],
				interval: props.filter.interval,
				loading: props.fetching,
				items: mergeViews(props)
			}),

			props.domains.value.map(
				(domain) => (
					h(CardViews, {
						key: domain.data.id,
						headline: domain.data.title,
						interval: props.filter.interval,
						loading: props.domains.fetching || selectViewsValue(props, domain.data.id).fetching,
						items: enhanceViews(selectViewsValue(props, domain.data.id).value, 7, props.filter.interval),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				)
			)

		)
	)

}

export default RouteViews