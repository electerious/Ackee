import { createElement as h, Fragment } from 'react'

// import { VIEWS_TYPE_UNIQUE, VIEWS_TYPE_TOTAL } from '../../../../constants/views'
import viewsLoader from '../../loaders/viewsLoader'
import enhanceViews from '../../enhancers/enhanceViews'
// import mergeViews from '../../utils/mergeViews'
import overviewRoute from '../../utils/overviewRoute'
import useWidgetBundles from '../../utils/useWidgetBundles'

import CardViews from '../cards/CardViews'

const RouteViews = (props) => {

	const widgetBundles = useWidgetBundles(props, viewsLoader, {
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

			widgetBundles.map(
				({ domain, widgetId }) => {
					const widget = props.widgets.value[widgetId]

					if (widget == null) return h('p', { key: domain.id }, 'empty')

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