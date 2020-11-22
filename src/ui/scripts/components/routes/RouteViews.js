import { createElement as h, Fragment } from 'react'

// import { VIEWS_TYPE_UNIQUE, VIEWS_TYPE_TOTAL } from '../../../../constants/views'
import viewsLoader from '../../loaders/viewsLoader'
import enhanceViews from '../../enhancers/enhanceViews'
import * as selectDomainsValue from '../../selectors/selectDomainsValue'
// import mergeViews from '../../utils/mergeViews'
import overviewRoute from '../../utils/overviewRoute'
import useWidgetIds from '../../utils/useWidgetIds'

import CardViews from '../cards/CardViews'

const RouteViews = (props) => {

	const widgetIds = useWidgetIds(props, viewsLoader, {
		interval: props.filter.interval,
		type: props.filter.viewsType
	})

	return (
		h(Fragment, {},

			// h(CardViews, {
			// 	wide: true,
			// 	headline: ({
			// 		[VIEWS_TYPE_UNIQUE]: 'Site Views',
			// 		[VIEWS_TYPE_TOTAL]: 'Page Views'
			// 	})[props.filter.viewsType],
			// 	interval: props.filter.interval,
			// 	loading: props.fetching,
			// 	items: mergeViews(props)
			// }),

			widgetIds.map(
				(widgetId) => {
					const widget = props.widgets.value[widgetId]
					if (widget == null) return h('p', {}, 'empty')

					const domain = selectDomainsValue.byId(props, widget.variables.domainId)

					return h(CardViews, {
						key: domain.id,
						headline: domain.title,
						interval: widget.variables.interval,
						loading: widget.fetching,
						items: enhanceViews(widget.value, 7),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				}
			)

		)
	)

}

export default RouteViews