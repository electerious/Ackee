import { createElement as h, Fragment, useEffect } from 'react'

// import { VIEWS_TYPE_UNIQUE, VIEWS_TYPE_TOTAL } from '../../../../constants/views'
// import selectViewsValue from '../../selectors/selectViewsValue'
// import enhanceViews from '../../enhancers/enhanceViews'
// import mergeViews from '../../utils/mergeViews'
// import overviewRoute from '../../utils/overviewRoute'

import CardViews from '../cards/CardViews'

const RouteEvents = (props) => {

	useEffect(() => {

		props.fetchEvents(props)

	}, [])

	return (
		h(Fragment, {},

			props.events.value.map(
				(event) => (
					h(CardViews, {
						key: event.id,
						headline: event.title,
						interval: props.filter.interval,
						// loading: props.views.fetching,
						loading: false,
						// items: enhanceViews(selectViewsValue(props, domain.id).value, 7),
						items: []
					})
				)
			)

		)
	)

}

export default RouteEvents